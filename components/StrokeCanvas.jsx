'use client'

import { useEffect, useRef } from 'react'
import { shapeWord } from '../lib/arabicShaping'

export default function StrokeCanvas({
  word,
  strokesData,
  height = 260,
  durationMs = 2400,
  autoPlayKey = 0,
  drawColor = '#0E2A47',
  penColor = '#2F9E64',
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !word) return

    const forms = shapeWord(word)
    const formData = forms.map((f) => {
      const data = strokesData?.[f.formKey]
      const strokes = data?.strokes || []
      const pointCount = strokes.reduce((s, st) => s + Math.max(1, st.length), 0)
      return { ...f, strokes, pointCount }
    })
    const totalPoints = formData.reduce((s, f) => s + f.pointCount, 0)
    if (totalPoints === 0) return

    const draw = (progress) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Map normalized [0..100] coordinates to canvas pixels,
      // fit to a square region inside the canvas so the shape isn't
      // stretched when the canvas is wide and short.
      const side = Math.min(rect.width, rect.height) * 0.72
      const ox = rect.width / 2 - side / 2
      const oy = rect.height / 2 - side / 2
      const toXY = (pt) => ({
        x: ox + (pt[0] / 100) * side,
        y: oy + (pt[1] / 100) * side,
      })

      // --- Pass 1: faint dotted guide from the full strokes ---
      ctx.save()
      ctx.setLineDash([6, 9])
      ctx.lineWidth = 2
      ctx.strokeStyle = 'rgba(14, 42, 71, 0.20)'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      for (const form of formData) {
        for (const stroke of form.strokes) {
          if (stroke.length === 0) continue
          if (stroke.length === 1) {
            const p = toXY(stroke[0])
            ctx.beginPath()
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2)
            ctx.stroke()
            continue
          }
          ctx.beginPath()
          stroke.forEach((pt, i) => {
            const p = toXY(pt)
            if (i === 0) ctx.moveTo(p.x, p.y)
            else ctx.lineTo(p.x, p.y)
          })
          ctx.stroke()
        }
      }
      ctx.restore()

      // --- Pass 2: solid ink up to current progress ---
      const revealed = totalPoints * progress
      ctx.strokeStyle = drawColor
      ctx.lineWidth = Math.max(3, side * 0.035)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.setLineDash([])

      let drawn = 0
      let penTip = null

      for (const form of formData) {
        if (drawn >= revealed) break
        const localRevealed = Math.min(form.pointCount, revealed - drawn)
        let strokeDrawn = 0

        for (const stroke of form.strokes) {
          if (strokeDrawn >= localRevealed) break
          if (stroke.length === 0) continue

          if (stroke.length === 1) {
            const p = toXY(stroke[0])
            ctx.beginPath()
            ctx.arc(p.x, p.y, ctx.lineWidth * 0.6, 0, Math.PI * 2)
            ctx.fillStyle = drawColor
            ctx.fill()
            penTip = p
            strokeDrawn += 1
            continue
          }

          const segCount = stroke.length - 1
          const remaining = localRevealed - strokeDrawn
          const fraction = Math.min(1, remaining / segCount)
          const pointsToDraw = Math.floor(segCount * fraction)

          ctx.beginPath()
          for (let i = 0; i <= pointsToDraw; i++) {
            const p = toXY(stroke[i])
            if (i === 0) ctx.moveTo(p.x, p.y)
            else ctx.lineTo(p.x, p.y)
          }

          if (pointsToDraw < segCount && fraction > 0) {
            const a = toXY(stroke[pointsToDraw])
            const b = toXY(stroke[pointsToDraw + 1])
            const t = segCount * fraction - pointsToDraw
            const tip = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t }
            ctx.lineTo(tip.x, tip.y)
            penTip = tip
          } else {
            penTip = toXY(stroke[pointsToDraw])
          }
          ctx.stroke()
          strokeDrawn += segCount
        }
        drawn += form.pointCount
      }

      // --- Pen dot ---
      if (penTip && progress < 1) {
        ctx.beginPath()
        ctx.arc(penTip.x, penTip.y, 10, 0, Math.PI * 2)
        ctx.fillStyle = penColor
        ctx.fill()
        ctx.beginPath()
        ctx.arc(penTip.x - 2, penTip.y - 2, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'white'
        ctx.globalAlpha = 0.8
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    let start = null
    const tick = (ts) => {
      if (start == null) start = ts
      const progress = Math.min(1, (ts - start) / durationMs)
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
  }, [word, strokesData, durationMs, autoPlayKey, drawColor, penColor])

  const forms = shapeWord(word || '')
  const anyAuthored = forms.some((f) => strokesData?.[f.formKey]?.strokes?.length)

  if (!anyAuthored) {
    return (
      <div className="stroke-canvas-fallback">
        <p style={{ color: 'var(--grey)', textAlign: 'center' }}>
          Stroke animation not yet authored for this word's letters.
        </p>
      </div>
    )
  }

  return (
    <div className="stroke-canvas-wrap">
      <canvas ref={canvasRef} className="stroke-canvas" style={{ height }} />
    </div>
  )
}