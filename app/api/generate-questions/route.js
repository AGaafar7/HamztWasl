// app/api/generate-questions/route.js
import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

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
      { error: 'GEMINI_API_KEY is not configured on the server.' },
      { status: 503 }
    )
  }

  const num = Math.max(1, Math.min(10, Number(count) || 3))

  try {
    const ai = new GoogleGenAI({ apiKey })

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

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    })

    const text = response.text
    const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim()
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (!match) {
      console.error('Gemini returned unparseable text:', text)
      return NextResponse.json(
        { error: 'The model returned an unexpected response. Try again.' },
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
  } catch (error) {
    console.error('Gemini question generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate questions. Try again.' },
      { status: 500 }
    )
  }
}