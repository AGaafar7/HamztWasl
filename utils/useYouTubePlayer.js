'use client'

import { useEffect, useRef, useState } from 'react'
import { loadYouTubeIframeAPI } from './youtubePlayer.js'

/**
 * Mounts a real YT.Player (not a static iframe) into `mountRef` and tracks
 * its live playback position. Shared between the learner video page and the
 * instructor edit page — both need the same "real time from the actual
 * video" clock, just for different UI on top of it.
 */
export function useYouTubePlayer(youtubeId) {
  const mountRef = useRef(null)
  const playerRef = useRef(null)
  const rafRef = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    if (!youtubeId) return
    let cancelled = false

    loadYouTubeIframeAPI().then((YT) => {
      if (cancelled || !YT || !mountRef.current) return
      playerRef.current = new YT.Player(mountRef.current, {
        videoId: youtubeId,
        host: 'https://www.youtube-nocookie.com',
        width: '100%',
        height: '100%',
        playerVars: { rel: 0 },
      })
    })

    return () => {
      cancelled = true
      if (playerRef.current && playerRef.current.destroy) playerRef.current.destroy()
      playerRef.current = null
    }
  }, [youtubeId])

  useEffect(() => {
    const tick = () => {
      const p = playerRef.current
      if (p && typeof p.getCurrentTime === 'function') {
        try { setCurrentTime(p.getCurrentTime()) } catch { /* player not ready yet */ }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return { mountRef, playerRef, currentTime }
}
