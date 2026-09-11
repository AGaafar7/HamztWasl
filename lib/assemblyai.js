/**
 * Thin wrapper around the AssemblyAI REST API — verified directly against
 * AssemblyAI's own current docs (api.assemblyai.com, POST /v2/transcript,
 * GET /v2/transcript/{id}), not memorized/guessed syntax.
 *
 * Kept deliberately as ONE swappable module: every function here does one
 * job (submit / poll / normalize), so replacing AssemblyAI with Whisper or
 * another provider later means rewriting this file only — nothing in the
 * app routes or UI needs to change, since they only ever import from here.
 */

const BASE_URL = 'https://api.assemblyai.com'

function apiKey() {
  const key = process.env.ASSEMBLYAI_API_KEY
  if (!key) {
    throw new Error(
      'ASSEMBLYAI_API_KEY is not set. Copy .env.local.example to .env.local and add your key from https://www.assemblyai.com/dashboard/home'
    )
  }
  return key
}

/**
 * Submits an already-hosted audio URL for transcription.
 * NOTE: this does NOT download/extract audio from anything (e.g. YouTube)
 * on your behalf — that sourcing step is a separate decision left to you
 * (see the app's chat history for why). Pass a URL to audio you have the
 * rights to use.
 */
export async function submitTranscription(audioUrl, { languageCode = 'ar' } = {}) {
  const res = await fetch(`${BASE_URL}/v2/transcript`, {
    method: 'POST',
    headers: {
      authorization: apiKey(),
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      audio_url: audioUrl,
      language_code: languageCode, // explicit, not auto-detected — see docs/pre-recorded-audio/set-language-manually
      // Required as of AssemblyAI's current docs — there is no default
      // model. universal-3-5-pro / universal-2 = broadest language support.
      // (universal-3-pro was deprecated in favor of universal-3-5-pro —
      // confirmed directly from AssemblyAI's own 400 error response.)
      speech_models: ['universal-3-5-pro', 'universal-2'],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`AssemblyAI submit failed (${res.status}): ${text}`)
  }

  const data = await res.json()
  return { id: data.id, status: data.status }
}

/** Polls a transcript by ID. Caller decides how/when to poll again. */
export async function getTranscription(id) {
  const res = await fetch(`${BASE_URL}/v2/transcript/${id}`, {
    headers: { authorization: apiKey() },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`AssemblyAI fetch failed (${res.status}): ${text}`)
  }

  return res.json()
}

/**
 * Converts AssemblyAI's raw response (word start/end in MILLISECONDS) into
 * this app's transcript-line shape (SECONDS, matching data/videos.js).
 * AssemblyAI returns one flat `words` array on the transcript for
 * non-diarized audio; this groups it into lines by punctuation.
 */
export function normalizeTranscript(assemblyAiTranscript) {
  const words = assemblyAiTranscript.words || []
  const lines = []
  let current = []

  const flush = () => {
    if (current.length === 0) return
    lines.push({
      time: msToClock(current[0].start),
      startSec: current[0].start / 1000,
      endSec: current[current.length - 1].end / 1000,
      arabic: current.map((w) => w.text).join(' '),
      words: current.map((w) => ({
        arabic: w.text,
        startSec: w.start / 1000,
        endSec: w.end / 1000,
      })),
    })
    current = []
  }

  for (const w of words) {
    current.push(w)
    if (/[.!?؟،]$/.test(w.text)) flush()
  }
  flush()

  return lines
}

function msToClock(ms) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}
