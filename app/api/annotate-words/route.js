import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const MODEL = 'gemini-3.5-flash'
const BATCH_SIZE = 30

function isQuotaExceeded(err) {
  const msg = String(err?.message || '')
  return msg.includes('RESOURCE_EXHAUSTED') || msg.includes('429')
}

function isRetryable(err) {
  // Don't retry quota — retrying immediately never helps, it just
  // burns another attempt against the same cap.
  if (isQuotaExceeded(err)) return false

  const msg = String(err?.message || '')
  return (
    msg.includes('503') ||
    msg.includes('UNAVAILABLE') ||
    msg.includes('overload') ||
    msg.includes('high demand')
  )
}

async function annotateBatch(ai, batch) {
  // Build a per-line structure so Gemini sees each word in context.
  const grouped = {}
  for (const w of batch) {
    if (!grouped[w.lineId]) grouped[w.lineId] = { line: w.lineArabic, words: [] }
    grouped[w.lineId].words.push(w)
  }

  const lines = Object.entries(grouped).map(([lineId, { line, words }]) => {
    const wordList = words
      .map((w, i) => `  - ${w.arabic} (id: ${w.id})`)
      .join('\n')
    return `Line (id: ${lineId}): "${line}"\nWords to annotate:\n${wordList}`
  }).join('\n\n')

  const prompt = `You are annotating Arabic words for a language-learning app. Words come from real Arabic video transcripts, often in Egyptian or Levantine dialect.

For each word below, provide:
- meaning_en: a short English gloss (1–4 words) that fits the line's context
- meaning_zh: a short Chinese gloss (1–6 characters)
- grammar_en: a short grammatical classification (e.g. "interrogative pronoun", "1st person past verb", "definite noun", "preposition + pronoun suffix")
- grammar_zh: the same in Chinese
- root: the Arabic trilateral root with spaces between letters (e.g. "ك ت ب"), or an empty string for particles, prepositions, pronouns, proper nouns, and loanwords where no root applies

Rules:
- Always consider the FULL LINE when choosing a meaning. أهلا alone is "hello", but أهلا بكم is "welcome to you".
- Preserve dialect. Egyptian words get Egyptian meanings.
- If you're not confident about a root, return an empty string rather than guessing.
- Return ONLY valid JSON.

${lines}

Format:
{
  "words": [
    { "id": "...", "meaning_en": "...", "meaning_zh": "...", "grammar_en": "...", "grammar_zh": "...", "root": "..." },
    ...
  ]
}`

  let lastErr = null
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await ai.models.generateContent({ model: MODEL, contents: prompt })
      const text = response.text
      const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim()
      const match = cleaned.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('unparseable')
      const parsed = JSON.parse(match[0])
      if (!Array.isArray(parsed.words)) throw new Error('missing words array')
      return parsed.words
    } catch (err) {
      lastErr = err
      if (!isRetryable(err)) throw err
      if (attempt === 0) await new Promise((r) => setTimeout(r, 1500))
    }
  }
  throw lastErr
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { words } = body || {}
  if (!Array.isArray(words) || words.length === 0) {
    return NextResponse.json({ error: 'words array required' }, { status: 400 })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'GEMINI_API_KEY not set' }, { status: 503 })

  const ai = new GoogleGenAI({ apiKey })

  // Filter to only unannotated words
  const toAnnotate = words.filter((w) => {
    const hasGloss = w.gloss && (w.gloss.en || w.gloss.zh)
    const hasGrammar = w.grammar && (w.grammar.en || w.grammar.zh)
    return !hasGloss && !hasGrammar && !w.root
  })

  if (toAnnotate.length === 0) {
    return NextResponse.json({ annotated: [] })
  }

  const results = []
  const failures = []
  for (let i = 0; i < toAnnotate.length; i += BATCH_SIZE) {
    const batch = toAnnotate.slice(i, i + BATCH_SIZE)
    try {
      const annotated = await annotateBatch(ai, batch)
      results.push(...annotated)
    } catch (err) {
      const msg = String(err?.message || '')
      const isQuota = isQuotaExceeded(err)
const isOverload = !isQuota && (
  msg.includes('503') ||
  msg.includes('UNAVAILABLE') ||
  msg.includes('high demand') ||
  msg.includes('overload')
)
failures.push({ batchIndex: i / BATCH_SIZE, overloaded: isOverload, quota: isQuota })
    }
  }

return NextResponse.json({
  annotated: results,
  totalRequested: toAnnotate.length,
  failed: failures.length,
  anyOverload: failures.some((f) => f.overloaded),
  anyQuota: failures.some((f) => f.quota),
})
}