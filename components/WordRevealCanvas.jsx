'use client'

import { useEffect, useRef } from 'react'

export default function WordRevealCanvas({
  word,
  height = 260,
  durationMs = 1600,
  autoPlayKey = 0,   // change this to replay the animation
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !word) return

    const draw = (progress) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)

      const fontFamily = '"Cairo", "Noto Naskh Arabic", system-ui, sans-serif'
      const maxWidth = rect.width * 0.62
      const maxHeight = rect.height * 0.62

      let fontSize = maxHeight
      ctx.font = `700 ${fontSize}px ${fontFamily}`
      const measured = ctx.measureText(word).width
      if (measured > maxWidth) {
        fontSize = Math.floor(fontSize * (maxWidth / measured))
        ctx.font = `700 ${fontSize}px ${fontFamily}`
      }

      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      const cx = rect.width / 2
      const cy = rect.height / 2

      // Progressively reveal the glyph using a right-to-left clip.
      // The word is centered; the clip rectangle starts at the right
      // edge of the canvas and grows leftward as progress goes 0→1.
      const fullWidth = rect.width
      const clipWidth = fullWidth * progress
      const clipX = fullWidth - clipWidth

      ctx.save()
      ctx.beginPath()
      ctx.rect(clipX, 0, clipWidth, rect.height)
      ctx.clip()

      // Faint dotted guide underneath (always visible within the clip)
      ctx.setLineDash([7, 9])
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(14, 42, 71, 0.18)'
      ctx.strokeText(word, cx, cy)

      // Solid ink on top — this is what "appears" as the wipe progresses
      ctx.setLineDash([])
      ctx.fillStyle = '#0E2A47'
      ctx.fillText(word, cx, cy)
      ctx.restore()

      // Optional: a moving vertical "pen tip" line at the clip edge
      if (progress > 0 && progress < 1) {
        ctx.save()
        ctx.strokeStyle = '#2F9E64'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(clipX, rect.height * 0.2)
        ctx.lineTo(clipX, rect.height * 0.8)
        ctx.stroke()
        ctx.restore()
      }
    }

    let start = null
    const tick = (ts) => {
      if (start == null) start = ts
      const elapsed = ts - start
      const progress = Math.min(1, elapsed / durationMs)
      draw(progress)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    // Wait for fonts so the glyph is measured with Cairo loaded.
    const startAnim = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      start = null
      rafRef.current = requestAnimationFrame(tick)
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(startAnim)
    } else {
      startAnim()
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [word, durationMs, autoPlayKey])

  return (
    <div className="word-reveal-wrap">
      <canvas
        ref={canvasRef}
        className="word-reveal-canvas"
        style={{ height }}
      />
    </div>
  )
}