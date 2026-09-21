// app/api/generate-questions/route.js
import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const MODEL = 'gemini-3.6-flash'
const MAX_ATTEMPTS = 3

// Retry only on transient capacity errors. Anything else (bad input,
// auth failure) should surface immediately.
function isRetryable(err) {
  const msg = String(err?.message || '')
  return (
    msg.includes('503') ||
    msg.includes('UNAVAILABLE') ||
    msg.includes('overloaded') ||
    msg.includes('high demand')
  )
}

function friendlyError(err) {
  const msg = String(err?.message || '')
  if (isRetryable(err)) {
    return 'The AI is temporarily busy. Please try again in a moment, or add questions manually.'
  }
  if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
    return 'Too many requests right now. Please wait a few seconds and try again.'
  }
  if (msg.includes('API key') || msg.includes('API_KEY')) {
    return 'The AI service is not configured correctly. Please contact support.'
  }
  return 'Could not generate questions right now. Please try again, or add questions manually.'
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 })
  }

  const { passage, count = 3, instructions = '' } = body || {}
  if (!passage || !passage.trim()) {
    return NextResponse.json({ error: 'Passage is required.' }, { status: 400 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The AI service is not configured. Please contact support.' },
      { status: 503 }
    )
  }

  const num = Math.max(1, Math.min(10, Number(count) || 3))

  const prompt = `You are an Arabic language teacher creating a reading comprehension exercise.

You are given an Arabic passage below. Write ${num} comprehension question(s) in Arabic that test whether a student understood the passage.

Passage (Arabic):
"""${passage}"""

${instructions ? `Extra instructions from the teacher: ${instructions}\n` : ''}
Rules:
- Every question must be in Arabic.
- Every expected answer must be in Arabic and must be answerable from the passage alone.
- Add a short hint in Arabic for each question, or an empty string if no hint is needed.
- Return ONLY valid JSON, with no markdown fences, no explanation before or after.

Format:
{ "questions": [ { "prompt": "…", "answer": "…", "hint": "…" } ] }`

  const ai = new GoogleGenAI({ apiKey })

  let lastErr = null

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      })

      const text = response.text
      const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim()
      const match = cleaned.match(/\{[\s\S]*\}/)
      if (!match) {
        console.error('Gemini returned unparseable text:', text)
        return NextResponse.json(
          { error: 'The AI returned an unexpected response. Please try again, or add questions manually.' },
          { status: 502 }
        )
      }

      const parsed = JSON.parse(match[0])
      const questions = (parsed.questions || []).map((q, i) => ({
        id: `q${Date.now()}-${i}`,
        prompt: String(q.prompt || '').trim(),
        answer: String(q.answer || '').trim(),
        hint: String(q.hint || '').trim(),
      }))

      return NextResponse.json({ questions })
    } catch (err) {
      lastErr = err
      const retryable = isRetryable(err)
      console.error(`Gemini attempt ${attempt + 1} failed:`, err?.message || err)

      if (!retryable) break
      // Exponential backoff: 800ms, 1600ms
      if (attempt < MAX_ATTEMPTS - 1) {
        await new Promise((r) => setTimeout(r, 800 * Math.pow(2, attempt)))
      }
    }
  }

  return NextResponse.json(
    { error: friendlyError(lastErr) },
    { status: 503 }
  )
}