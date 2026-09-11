import { NextResponse } from 'next/server'
import { submitTranscription } from '../../../lib/assemblyai.js'

/**
 * POST /api/transcribe
 * Body: { audioUrl: string, languageCode?: string }
 *
 * Submits a hosted audio file to AssemblyAI and returns the transcript ID
 * immediately (transcription is async — see GET /api/transcribe/[id] to
 * poll for the result). This does not accept a YouTube URL directly: you
 * need a URL to actual audio AssemblyAI can fetch (your own hosting,
 * Supabase Storage, S3, etc.) — this route only calls AssemblyAI, it
 * doesn't source audio for you.
 */
export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Request body must be JSON.' }, { status: 400 })
  }

  const { audioUrl, languageCode } = body || {}
  if (!audioUrl || typeof audioUrl !== 'string') {
    return NextResponse.json({ error: 'audioUrl (string) is required.' }, { status: 400 })
  }

  try {
    const result = await submitTranscription(audioUrl, { languageCode })
    return NextResponse.json(result)
  } catch (err) {
    console.error('AssemblyAI submit error:', err)
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
