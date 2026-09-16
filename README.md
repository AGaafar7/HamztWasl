# Hamzat Wasl — Next.js version

Migrated from the earlier Vite + React app. Same design system, same
features (courses, video library, audio dictionary, listening practice),
now on Next.js App Router — plus a real AssemblyAI transcription backend.

## ⚠️ Before you do anything else

This project was written in a sandboxed environment with **no access to
the npm registry this turn** (`registry.npmjs.org` was blocked for this
session). That means `next build` could not be run to verify it compiles.

What WAS verified without needing `npm install` (pure Node/JS checks, no
bundler needed):
- Every relative import resolves to a real file
- Every `.jsx`/`.js` file has balanced braces and parens
- Every client component that uses hooks has `'use client'` at the top
- All plain-JS modules (`translations.js`, `data/*.js`, `lib/assemblyai.js`)
  actually execute correctly under Node

What was **not** verified: an actual Next.js compile (JSX transform, App
Router file conventions, Next-specific import resolution). **Run this
first, before assuming anything is broken:**

```bash
npm install
npm run build
```

If it errors, send me the exact error — that'll be a fast, precise fix
rather than another blind rewrite.

## Setup

```bash
npm install
cp .env.local.example .env.local
# edit .env.local and add your AssemblyAI key (see below)
npm run dev
```

## Getting real word-by-word sync on the existing YouTube videos

The transcribe panel highlights words by matching AssemblyAI's timestamps
against the YouTube embed's live playhead — so it's only accurate if the
audio you submit has the **same timing** as that embed, i.e. it's the
actual, untrimmed audio track of that exact video.

This app does not download YouTube audio for you (see the chat history —
deliberate choice, both a real network restriction in the build sandbox
and a values line held throughout). If you decide to do this yourself,
on your own machine, for your own use:

```bash
pip install -U yt-dlp

yt-dlp -x --audio-format mp3 "https://www.youtube.com/watch?v=ISJpE7_TgqI" -o "salamu-alaykum.%(ext)s"
yt-dlp -x --audio-format mp3 "https://www.youtube.com/watch?v=K96gVrHbgr4" -o "wa-alaykum-salam.%(ext)s"
yt-dlp -x --audio-format mp3 "https://www.youtube.com/watch?v=dD-jAMw8PdY" -o "shukran-jazilan.%(ext)s"
yt-dlp -x --audio-format mp3 "https://www.youtube.com/watch?v=L4qYcEwuakI" -o "letter-alif.%(ext)s"
yt-dlp -x --audio-format mp3 "https://www.youtube.com/watch?v=XJzH4rzPsww" -o "letters-alif-to-jim.%(ext)s"
```

Then upload each resulting mp3 to your Supabase bucket (same steps as
above), paste its public URL into that video's transcribe panel, and hit
Transcribe. Because the extracted audio's timing matches the YouTube
embed's exactly, the resulting word-level timestamps will line up with
what's actually playing — press play on the video and watch the words
highlight in real sync.

## Test the pipeline before uploading your own audio

Before setting up storage, verify the AssemblyAI wiring actually works
using AssemblyAI's own public sample file:

```
https://assembly.ai/wildfires.mp3
```

On any video's detail page, paste that URL into the "🎙️ Transcribe with
AssemblyAI" box, switch the language dropdown to **English (test)** (it's
English content — that's the point, this only tests the pipeline
mechanics, not Arabic accuracy), and hit Transcribe. If that completes
successfully, your `ASSEMBLYAI_API_KEY` and the whole submit → poll →
result flow are confirmed working — any issue after that is specifically
about your own audio file/URL, not the integration.

## Getting your own audio online (Supabase Storage)

1. Create a free project at https://supabase.com
2. In the dashboard: **Storage → New bucket** → name it (e.g. `audio`) →
   toggle **Public bucket** on (so AssemblyAI can fetch the file without
   auth — private buckets need signed URLs, more setup)
3. Upload your `.mp3`/`.mp4`/`.wav` file into that bucket
4. Click the file → **Get URL** (or **Copy public URL**) — it looks like
   `https://<project-ref>.supabase.co/storage/v1/object/public/audio/lesson1.mp3`
5. Paste that exact URL into the transcribe panel — it must point
   directly at the file (ending in the audio extension), not a webpage
   that displays a player

## AssemblyAI transcription backend

- Get a key: https://www.assemblyai.com/dashboard/home
- Put it in `.env.local` as `ASSEMBLYAI_API_KEY` (never commit this file —
  it's gitignored)
- `POST /api/transcribe` with `{ "audioUrl": "...", "languageCode": "ar" }`
  submits a job; `GET /api/transcribe/[id]` polls for the result
- There's a UI for this on every video's detail page in the portal
  ("🎙️ Transcribe with AssemblyAI") — paste a hosted audio URL, it submits
  and polls automatically, then gives you copy-pasteable JSON to merge
  into `data/videos.js`

**Important scope note:** this route does NOT download audio from YouTube
for you. You give it a URL to audio you already have hosted (and have the
rights to use) — see the chat history for why that sourcing step is left
as your decision, not automated.

**On provider choice:** this is wired to AssemblyAI per your request, but
`lib/assemblyai.js` is the only file that talks to the provider — routes
and UI only import functions from it. Swapping to Whisper/WhisperX later
(which scored better on real Arabic-dialect benchmarks — see chat) means
rewriting that one file, not the app.

## Fallback: real YouTube captions (no backend needed)

`npm run fetch:captions` pulls actual YouTube caption data for the videos
in `data/videos.js` where captions exist — no API key, no audio hosting.
Phrase-level only (not word-level), but free and instant.

## Manual fallback: in-app calibration

Every video detail page also has a "🎯 Calibrate timing manually" tool —
play the video, click each line as it starts/ends, copy the generated
JSON. No backend, no third-party account, just watching and clicking.

## What's still mock

- Auth (`context/AuthContext.jsx`) — fake session in localStorage, marked
  with `// TODO` where real API calls go
- Course catalog (`data/courses.js`) — same shape a real API/DB would
  return, swap `getCourses()`'s body for a `fetch()` when ready

## SEO

Real server-rendered `<title>`/`<meta>` tags now exist (see `app/layout.jsx`
`metadata` export) — this is the actual, verifiable SEO improvement from
moving off a client-only SPA. Note this covers the default English content
only; true multi-language SEO (indexing the Arabic/Chinese versions
separately) needs locale-based routing (`/ar/...`, `/zh/...`), which is a
further step beyond this pass — the language switcher is still client-side
state, not part of the URL, so search engines currently only ever see the
English version.
