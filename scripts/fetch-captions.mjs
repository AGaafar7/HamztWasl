/**
 * Fetches REAL YouTube captions for every video in src/data/videos.js,
 * using the youtube-caption-extractor package. Run this locally, where
 * you have normal internet access (this sandbox's build environment does
 * not allow outbound requests to youtube.com, so it can't be run here).
 *
 * Usage:
 *   npm run fetch:captions
 *
 * This does NOT auto-edit src/data/videos.js. Caption quality/coverage
 * varies a lot per video (auto-captions in particular can garble or skip
 * short foreign-language phrases inside English narration), so results are
 * printed for you to review, plus saved to scripts/captions-output.json.
 * Once you've found the right segment for a video, copy its start/end
 * time into that video's transcript line in src/data/videos.js:
 *
 *   { time: "0:00", startSec: 4.2, endSec: 6.8, arabic: "...", ... }
 *
 * If a video has no usable captions at all, use the in-app
 * "Calibrate timing" tool on that video's detail page instead — that
 * captures real timestamps by watching the video and clicking along.
 */
import { getSubtitles } from 'youtube-caption-extractor'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import { videos } from '../data/videos.js'

const LANGS_TO_TRY = ['ar', 'en']

async function fetchFor(video) {
  for (const lang of LANGS_TO_TRY) {
    try {
      const subs = await getSubtitles({ videoID: video.youtubeId, lang })
      if (subs && subs.length > 0) return { lang, subs }
    } catch {
      // try the next language
    }
  }
  return null
}

async function main() {
  const results = {}

  for (const video of videos) {
    console.log(`\n▶ ${video.id}  (youtube.com/watch?v=${video.youtubeId})`)
    const result = await fetchFor(video)

    if (!result) {
      console.log('  No usable captions found (tried: ar, en).')
      console.log('  → Use the in-app "Calibrate timing" tool for this one instead.')
      results[video.id] = null
      continue
    }

    console.log(`  Found ${result.subs.length} caption segment(s), language: ${result.lang}`)
    result.subs.forEach((s) => {
      const start = Number(s.start).toFixed(2)
      const end = (Number(s.start) + Number(s.dur)).toFixed(2)
      console.log(`    [${start}s → ${end}s]  ${s.text}`)
    })
    results[video.id] = result
  }

  console.log('\n──────────────────────────────────────────────')
  console.log('Review the segments above. For each video, find the one that')
  console.log('actually contains the Arabic phrase this app teaches, then copy')
  console.log('its start/end seconds into that line in src/data/videos.js.')
  console.log('Full raw output saved to scripts/captions-output.json for reference.')

  const outPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'captions-output.json')
  writeFileSync(outPath, JSON.stringify(results, null, 2))
}

main().catch((err) => {
  console.error('\nFetch failed:', err.message)
  console.error('If this is a network/CORS/429 error, YouTube is rate-limiting or blocking')
  console.error('this environment — try again later, from a different network, or fall back')
  console.error('to the in-app "Calibrate timing" tool.')
  process.exit(1)
})
