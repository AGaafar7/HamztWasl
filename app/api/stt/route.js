// app/api/stt/route.js
import { NextResponse } from 'next/server';

const HAKIM_STT_URL = 'https://api.tryhakim.ai/v1/audio/transcriptions';

export async function POST(request) {
  try {
    const apiKey = process.env.HAKIM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'STT not configured' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio');
    const language = formData.get('language') || 'ar';

    if (!audioFile) {
      return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
    }

    // Forward to Hakim
    const hakimForm = new FormData();
    hakimForm.append('file', audioFile, 'recording.webm');
    hakimForm.append('model', 'hakim-arab-v2');
    hakimForm.append('language', language);
    hakimForm.append('response_format', 'json');

    console.log(`[STT] Transcribing audio (lang: ${language})...`);

    const response = await fetch(HAKIM_STT_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: hakimForm,
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Hakim STT error:', response.status, errorText);
      return NextResponse.json(
        { error: 'STT service error', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[STT] Result:', data.text);
    return NextResponse.json({ text: data.text || '' });
  } catch (error) {
    console.error('STT API error:', error);
    return NextResponse.json(
      { error: 'STT service unavailable' },
      { status: 503 }
    );
  }
}