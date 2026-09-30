import { GoogleGenAI } from '@google/genai'

const REVISION_MODEL = 'gemini-3.6-flash'

/**
 * Send a raw ASR transcript back to Gemini for error correction.
 * The LLM gets the full passage context and is told to make minimal edits.
 * If anything fails, the caller falls back to the raw output.
 */
export async function reviseTranscript(lines, languageCode = 'ar') {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

  // Build a numbered list of lines with their existing Arabic
  const numbered = lines
    .map((l, i) => `[${i}] ${l.arabic}`)
    .join('\n')

  const prompt = `You are an Arabic speech-to-text post-editor. Below is a raw transcript produced by an automatic speech recognition system. The ASR frequently mishears words, especially proper nouns, technical terms, and dialect-specific expressions.

Your job: correct clear ASR errors while preserving the speaker's actual meaning. Follow these rules strictly:

- Only change words that are clearly ASR errors. Do not rewrite or rephrase.
- Do not add punctuation that wasn't there, do not merge lines, do not reorder lines.
- Preserve dialect. Egyptian speech stays Egyptian, Levantine stays Levantine. Do not normalize to MSA.
- If a line looks correct, keep it exactly as-is.
- Keep the same number of lines as the input.

Input (numbered, one Arabic line per entry):
${numbered}

Return ONLY a valid JSON object with a "lines" array, where each element is the corrected Arabic text of the corresponding input line. No markdown fences, no explanation.

Format:
{ "lines": ["corrected line 0", "corrected line 1", ...] }`

  const ai = new GoogleGenAI({ apiKey })

  // Retry once on transient errors (same pattern as the other Gemini routes)
  let lastErr = null
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: REVISION_MODEL,
        contents: prompt,
      })

      const text = response.text
      const cleaned = text.replace(/```json\s*/gi, '').replace(/```/g, '').trim()
      const match = cleaned.match(/\{[\s\S]*\}/)
      if (!match) throw new Error('Gemini returned unparseable text')

      const parsed = JSON.parse(match[0])
      const corrected = parsed.lines
      if (!Array.isArray(corrected) || corrected.length !== lines.length) {
        throw new Error('Gemini returned wrong number of lines')
      }

      // Merge corrections back, preserving the original structure
      return lines.map((original, i) => ({
        ...original,
        arabic: String(corrected[i] || original.arabic).trim() || original.arabic,
      }))
    } catch (err) {
      lastErr = err
      const msg = String(err?.message || '')
      const retryable =
        msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('high demand')
      if (!retryable) break
      if (attempt === 0) await new Promise((r) => setTimeout(r, 800))
    }
  }

  throw lastErr || new Error('Revision failed')
}