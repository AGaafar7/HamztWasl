import { GoogleGenAI } from '@google/genai'

const REVISION_MODEL = 'gemini-3.6-flash'

/**
 * Send a raw ASR transcript back to Gemini for error correction.
 *
 * `context` is optional — pass the video title so Gemini can disambiguate
 * nonsense-looking words using the video's topic. Without context, Gemini
 * can only fix errors that are internally inconsistent.
 *
 * If anything fails, the caller falls back to the raw output.
 */
export async function reviseTranscript(lines, languageCode = 'ar', context = '') {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY is not set')

  // Build a numbered list of lines with their existing Arabic
  const numbered = lines
    .map((l, i) => `[${i}] ${l.arabic}`)
    .join('\n')

  const prompt = `You are an Arabic speech-to-text post-editor. Below is a raw transcript produced by an automatic speech recognition system. The ASR frequently mishears words, especially proper nouns, technical terms, and dialect-specific expressions.

${context ? `Context about this video: "${context}". Use this to disambiguate words that don't make sense on their own — if a transcribed word seems nonsensical, consider whether it sounds close to a word that would fit this topic.` : ''}

## Your task

For EACH line, examine every Arabic word. For any word that is NOT a common, standard Arabic word you are confident about, do the following test:

1. **Read the word out loud** (mentally). What does it sound like phonetically?
2. **Ask: is this a real Arabic word with a clear meaning?** If yes, leave it alone.
3. **Ask: does it fit the surrounding sentence?** If a word looks like a plausible noun but is unusual or semantically odd in context, it is likely an ASR error.
4. **Guess what the speaker probably said.** Consider the phonetic neighbors of the transcribed word:
   - ه ↔ ج at word-end: "لاجة" is very often "لهجة" (dialect). This is one of the most common ASR errors in Egyptian speech.
   - ق ↔ ك ↔ ء (glottal stop): Egyptian speakers often drop the ق entirely.
   - ث ↔ س ↔ ت, ذ ↔ ز ↔ د, ظ ↔ ض ↔ ز: dialect-driven substitutions.
   - Vowel shortening/lengthening: "استاز" → "أستاذ", "حاجات" ↔ "حاجت".
5. **Replace it if you find a better candidate.** If the corrected word fits the topic and the surrounding words, apply the correction.

## Rules

- Correct ASR errors. Do NOT rewrite for style or paraphrase.
- Do NOT change words that are already correct.
- Preserve dialect. Egyptian stays Egyptian, Levantine stays Levantine. Do not normalize to MSA.
- Keep the same number of lines as the input.
- If a word is unusual but you genuinely cannot think of a better candidate, leave it unchanged.

## Specific case to check for in this transcript

The word "اللاجة" — if it appears, it is almost certainly "اللهجة" (dialect, accent). "اللاجة" is not a real Arabic word. This is a very common ASR error where the ه is heard as ج. Fix every occurrence of "اللاجة" to "اللهجة".

## Input (numbered, one Arabic line per entry)

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