// app/api/tts/route.js
import { NextResponse } from 'next/server';

const HAKIM_API_URL = 'https://api.tryhakim.ai/v1/audio/speech';

// Voice IDs from Hakim's website
const VOICE_MAP = {
  msa: 'layla-msa',
  egyptian: 'yusuf-egyptian',
  levantine: 'nour-levantine',
  gulf: 'reem-khaleeji',
  moroccan: 'amir-maghrebi',
  iraqi: 'omar-iraqi',
};

const MODEL = 'hakim-fast-v1';

export async function POST(request) {
  try {
    const { text, dialect = 'msa' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.HAKIM_API_KEY;

    if (!apiKey) {
      console.warn('Hakim API key not configured');
      return NextResponse.json(
        { error: 'TTS not configured, using fallback' },
        { status: 503 }
      );
    }

    const voiceId = VOICE_MAP[dialect] || VOICE_MAP.msa;

    console.log(`[TTS] Speaking "${text}" with dialect: ${dialect}, voice: ${voiceId}, model: ${MODEL}`);

    const response = await fetch(HAKIM_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        input: text,
        voice: voiceId,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hakim API error:', response.status, errorText);
      
      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      if (response.status === 401) {
        return NextResponse.json(
          { error: 'Invalid API key.' },
          { status: 401 }
        );
      }
      if (response.status === 402) {
        return NextResponse.json(
          { error: 'Insufficient credits.' },
          { status: 402 }
        );
      }

      return NextResponse.json(
        { error: 'TTS service error', details: errorText },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('TTS API error:', error);
    return NextResponse.json(
      { error: 'TTS service unavailable, using fallback' },
      { status: 503 }
    );
  }
}