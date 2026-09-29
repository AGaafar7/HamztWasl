'use client'

import { useEffect, useRef } from 'react'

export default function WordRevealCanvas({
  word,
  height = 260,
  durationMs = 2200,
  autoPlayKey = 0,
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

      const textWidth = ctx.measureText(word).width
      const textLeft = cx - textWidth / 2
      const textRight = cx + textWidth / 2

      // --- Layer 1: faint dotted guide, always visible ---------------
      ctx.save()
      ctx.setLineDash([7, 9])
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(14, 42, 71, 0.18)'
      ctx.strokeText(word, cx, cy)
      ctx.restore()

      // --- Layer 2: solid ink, clipped to a moving circular window ---
      // The marker travels right-to-left along the glyph baseline.
      // Its reveal radius is large enough to cover the full glyph
      // height, so as it sweeps, the solid form appears to be drawn.
      const markerX = textRight - (textRight - textLeft) * progress
      const markerY = cy
      const revealRadius = fontSize * 0.75

      ctx.save()
      ctx.beginPath()
      ctx.arc(markerX, markerY, revealRadius, 0, Math.PI * 2)
      ctx.clip()

      ctx.setLineDash([])
      ctx.fillStyle = '#0E2A47'
      ctx.fillText(word, cx, cy)
      ctx.restore()

      // --- Layer 3: the marker dot itself ----------------------------
      if (progress > 0 && progress < 1) {
        ctx.save()
        // Outer glow
        ctx.beginPath()
        ctx.arc(markerX, markerY, 14, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(47, 158, 100, 0.18)'
        ctx.fill()

        // Inner dot
        ctx.beginPath()
        ctx.arc(markerX, markerY, 8, 0, Math.PI * 2)
        ctx.fillStyle = '#2F9E64'
        ctx.fill()

        // Small highlight
        ctx.beginPath()
        ctx.arc(markerX - 2, markerY - 2, 3, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.globalAlpha = 0.7
        ctx.fill()
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