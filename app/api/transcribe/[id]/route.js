import { NextResponse } from 'next/server'
import { getTranscription, normalizeTranscript } from '../../../../lib/assemblyai.js'

/**
 * GET /api/transcribe/[id]
 *
 * Polls AssemblyAI for a submitted transcript. Returns:
 *   { status: "queued" | "processing" }                          — not done yet
 *   { status: "error", error }                                    — failed
 *   { status: "completed", lines }                                — done; `lines`
 *     is already normalized into this app's data/videos.js transcript shape
 *     (seconds, not milliseconds — see lib/assemblyai.js normalizeTranscript).
 */
export async function GET(_request, { params }) {
  const { id } = await params
  if (!id) {
    return NextResponse.json({ error: 'Transcript id is required.' }, { status: 400 })
  }

  try {
    const transcript = await getTranscription(id)

    if (transcript.status === 'error') {
      return NextResponse.json({ status: 'error', error: transcript.error }, { status: 200 })
    }
    if (transcript.status !== 'completed') {
      return NextResponse.json({ status: transcript.status }, { status: 200 })
    }

    return NextResponse.json({
      status: 'completed',
      languageCode: transcript.language_code,
      confidence: transcript.confidence,
      lines: normalizeTranscript(transcript),
    })
  } catch (err) {
    console.error('AssemblyAI poll error:', err)
    return NextResponse.json({ error: err.message }, { status: 502 })
  }
}
