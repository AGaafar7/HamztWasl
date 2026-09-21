// app/api/comprehension/check/route.js
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
    return 'The AI grader is temporarily busy. Please try again in a moment.'
  }
  if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED')) {
    return 'Too many checks right now. Please wait a few seconds and try again.'
  }
  if (msg.includes('API key') || msg.includes('API_KEY')) {
    return 'The grading service is not configured correctly. Please contact support.'
  }
  return 'Could not check your answer right now. Please try again.'
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 })
  }

  const { passage, question, userAnswer } = body || {}
  if (!passage || !question || !userAnswer) {
    return NextResponse.json(
      { error: 'Missing required fields: passage, question, userAnswer.' },
      { status: 400 }
    )
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'The grading service is not configured. Please contact support.' },
      { status: 503 }
    )
  }

  const prompt = `You are a friendly, encouraging Arabic tutor. Evaluate the student's answer to the question based on the passage.

Passage: """${passage}"""
Question: """${question}"""
Student's answer: """${userAnswer}"""

Rules:
- Be lenient. Accept paraphrases and answers that convey the same meaning, even if worded differently.
- If the passage literally contains the answer and the student captured it (or its clear paraphrase), mark correct: true.
- Return ONLY valid JSON, with no markdown fences, no explanation before or after.

Format:
{ "correct": true | false, "feedback": "<one or two short, encouraging sentences>" }`

  const ai = new GoogleGenAI({ apiKey })

  let lastErr = null

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: MODEL,
        contents: prompt,
      })

      // New SDK exposes response.text as a plain property, not a function.
      const text = response.text
      const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim()
      const match = cleaned.match(/\{[\s\S]*\}/)
      if (!match) {
        console.error('Gemini returned unparseable text:', text)
        return NextResponse.json(
          { error: 'The grader returned an unexpected response. Please try again.' },
          { status: 502 }
        )
      }

      const parsed = JSON.parse(match[0])

      return NextResponse.json({
        correct: Boolean(parsed.correct),
        feedback: String(parsed.feedback || '').trim() || 'Thanks for your answer.',
      })
    } catch (err) {
      lastErr = err
      const retryable = isRetryable(err)
      console.error(`Gemini check attempt ${attempt + 1} failed:`, err?.message || err)

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