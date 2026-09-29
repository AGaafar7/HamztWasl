'use client'

import { useEffect, useRef } from 'react'

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export default function WordRevealCanvas({
  word,
  height = 260,
  durationMs = 1800,
  autoPlayKey = 0,
  inkColor = '#0E2A47',
  guideColor = 'rgba(14, 42, 71, 0.18)',
  wetInkColor = '#2F9E64',
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !word) return

    const draw = (rawProgress) => {
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
      ctx.strokeStyle = guideColor
      ctx.strokeText(word, cx, cy)
      ctx.restore()

      // --- Layer 2: solid ink, revealed by a jagged leading edge -----
      // Progress eases so the pen speeds through the middle and slows
      // at the ends — much more "handwriting" than a linear sweep.
      const progress = easeInOutCubic(Math.max(0, Math.min(1, rawProgress)))

      // The leading edge travels right-to-left across the word.
      const penX = textRight - (textRight - textLeft) * progress

      // Vertical margin for the clip region. We need this to cover
      // the full height of the tallest glyph plus its dots.
      const clipTop = 0
      const clipBottom = rect.height

      // Build a jagged clip path. For each horizontal row band, we
      // offset the vertical boundary by a small random-looking value
      // (deterministic per-frame seed, so it doesn't shimmer).
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(rect.width, clipTop)

      const jitterSeed = Math.floor(rawProgress * 40)
      const step = 4

      // Right edge down to bottom-right
      ctx.lineTo(rect.width, clipBottom)

      // Bottom edge from right to penX, then jagged boundary going up
      const boundaryPoints = []
      for (let y = clipBottom; y >= clipTop; y -= step) {
        // Deterministic pseudo-random jitter based on y + seed
        const noise = Math.sin((y + jitterSeed * 37) * 0.7) * 3
        boundaryPoints.push({ x: penX + noise, y })
      }

      // Bottom boundary: from right edge to the last boundary point
      ctx.lineTo(boundaryPoints[0].x, boundaryPoints[0].y)
      for (const p of boundaryPoints) {
        ctx.lineTo(p.x, p.y)
      }
      // Close along the top back to the right edge
      ctx.lineTo(rect.width, clipTop)
      ctx.closePath()
      ctx.clip()

      // Fill the glyph solid within the clip.
      ctx.setLineDash([])
      ctx.fillStyle = inkColor
      ctx.fillText(word, cx, cy)
      ctx.restore()

      // --- Layer 3: wet ink at the leading edge ----------------------
      // A short vertical glow where the pen is currently "writing".
      if (rawProgress > 0 && rawProgress < 1) {
        ctx.save()
        const glowGradient = ctx.createLinearGradient(
          penX - 20, 0,
          penX + 8, 0
        )
        glowGradient.addColorStop(0, 'rgba(47, 158, 100, 0)')
        glowGradient.addColorStop(0.6, 'rgba(47, 158, 100, 0.35)')
        glowGradient.addColorStop(1, 'rgba(47, 158, 100, 0.75)')
        ctx.fillStyle = glowGradient
        ctx.fillRect(penX - 20, clipTop, 28, clipBottom - clipTop)

        // The bright tip itself
        ctx.beginPath()
        ctx.arc(penX, cy, 6, 0, Math.PI * 2)
        ctx.fillStyle = wetInkColor
        ctx.fill()
        ctx.beginPath()
        ctx.arc(penX - 2, cy - 2, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
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
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    const startAnim = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      start = null
      rafRef.current = requestAnimationFrame(tick)
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(startAnim)
    } else {
      startAnim()
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [word, durationMs, autoPlayKey, inkColor, guideColor, wetInkColor])

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