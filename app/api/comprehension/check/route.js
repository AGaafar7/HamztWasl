// app/api/comprehension/check/route.js
import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

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
      { error: 'GEMINI_API_KEY is not configured on the server.' },
      { status: 503 }
    )
  }

  try {
    const ai = new GoogleGenAI({ apiKey })

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

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    })

    // New SDK exposes response.text as a plain property, not a function.
    const text = response.text

    const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim()
    const match = cleaned.match(/\{[\s\S]*\}/)
    if (!match) {
      console.error('Gemini returned unparseable text:', text)
      return NextResponse.json(
        { error: 'The grader returned an unexpected response. Try again.' },
        { status: 502 }
      )
    }
    const parsed = JSON.parse(match[0])

    return NextResponse.json({
      correct: Boolean(parsed.correct),
      feedback: String(parsed.feedback || '').trim() || 'Thanks for your answer.',
    })
  } catch (error) {
    console.error('Gemini evaluation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to evaluate answer. Please try again.' },
      { status: 500 }
    )
  }
}