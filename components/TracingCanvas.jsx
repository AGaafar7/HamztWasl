'use client'

import { useEffect, useRef, useState } from 'react'
import { STROKE_ORDER } from '../lib/arabicStrokeOrder'

/**
 * A tracing canvas. Renders the guide text as a large dotted stroke and
 * lets the student draw over it with mouse, stylus, or finger.
 *
 * Pass `showStrokeOrder` to overlay small numbered badges and direction
 * arrows on the guide — used on the alphabet letter page to teach the
 * correct stroke order. Off by default so writing lessons are unaffected.
 *
 * `strokeOrderKey` should match a key in lib/arabicStrokeOrder.js.
 */
export default function TracingCanvas({
  guide,
  height = 280,
  showStrokeOrder = false,
  strokeOrderKey = null,
}) {
  const canvasRef = useRef(null)
  const lastPointRef = useRef(null)
  const drawingRef = useRef(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    setupCanvas(canvas, guide, {
      showStrokeOrder,
      strokeOrderKey,
    })
    setHasDrawn(false)
  }, [guide, showStrokeOrder, strokeOrderKey])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let raf = null
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setupCanvas(canvas, guide, { showStrokeOrder, strokeOrderKey })
        setHasDrawn(false)
      })
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [guide, showStrokeOrder, strokeOrderKey])

  const getPoint = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const onDown = (e) => {
    e.preventDefault()
    const canvas = canvasRef.current
    try { canvas.setPointerCapture(e.pointerId) } catch { /* ignore */ }
    drawingRef.current = true
    lastPointRef.current = getPoint(e)
  }

  const onMove = (e) => {
    if (!drawingRef.current) return
    e.preventDefault()
    const p = getPoint(e)
    const last = lastPointRef.current
    if (!last) { lastPointRef.current = p; return }

    const ctx = canvasRef.current.getContext('2d')
    ctx.strokeStyle = '#E7621E'
    ctx.lineWidth = 9
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.moveTo(last.x, last.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()

    lastPointRef.current = p
    if (!hasDrawn) setHasDrawn(true)
  }

  const onUp = (e) => {
    try { canvasRef.current.releasePointerCapture(e.pointerId) } catch { /* ignore */ }
    drawingRef.current = false
    lastPointRef.current = null
  }

  const clear = () => {
    setupCanvas(canvasRef.current, guide, { showStrokeOrder, strokeOrderKey })
    setHasDrawn(false)
  }

  return (
    <div className="tracing-wrap">
      <canvas
        ref={canvasRef}
        className="tracing-canvas"
        style={{ height }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onPointerLeave={onUp}
      />
      <button
        type="button"
        className="btn btn-ghost btn-small tracing-clear"
        onClick={clear}
        disabled={!hasDrawn}
      >
        Clear
      </button>
    </div>
  )
}

/**
 * Sizes the canvas for the current device pixel ratio and draws the guide
 * as a large dotted outline in the center.
 */
function setupCanvas(canvas, guide, { showStrokeOrder, strokeOrderKey } = {}) {
  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, rect.width, rect.height)

  const fontFamily = '"Cairo", "Noto Naskh Arabic", system-ui, sans-serif'
  const maxWidth = rect.width * 0.85     // leave a 7.5% margin each side
  const maxHeight = rect.height * 0.80   // leave a 10% margin top and bottom

  // Start with a font size based on height, then shrink it until the
  // rendered word actually fits within maxWidth.
  let fontSize = maxHeight
  ctx.font = `700 ${fontSize}px ${fontFamily}`

  // measureText gives the width for the current font size; scale down
  // proportionally if it overflows.
  const measured = ctx.measureText(guide).width
  if (measured > maxWidth) {
    fontSize = Math.floor(fontSize * (maxWidth / measured))
    ctx.font = `700 ${fontSize}px ${fontFamily}`
  }

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Dotted outline for the tracing feel.
  ctx.setLineDash([7, 9])
  ctx.lineWidth = Math.max(2, fontSize * 0.012)
  ctx.strokeStyle = 'rgba(14, 42, 71, 0.28)'
  ctx.strokeText(guide, rect.width / 2, rect.height / 2)

  // Faint solid fill underneath.
  ctx.setLineDash([])
  ctx.fillStyle = 'rgba(14, 42, 71, 0.045)'
  ctx.fillText(guide, rect.width / 2, rect.height / 2)

  // Optional stroke-order overlay.
  if (showStrokeOrder && strokeOrderKey) {
    const strokes = STROKE_ORDER[strokeOrderKey] || []
    drawStrokeBadges(ctx, strokes, rect.width, rect.height)
  }
}

/**
 * Draws numbered circle badges + direction arrows over the guide glyph.
 */
function drawStrokeBadges(ctx, strokes, w, h) {
  for (const s of strokes) {
    const cx = s.x * w
    const cy = s.y * h

    // Badge circle
    ctx.beginPath()
    ctx.arc(cx, cy, 14, 0, Math.PI * 2)
    ctx.fillStyle = '#2F9E64'
    ctx.fill()
    ctx.lineWidth = 2
    ctx.strokeStyle = '#ffffff'
    ctx.stroke()

    // Number
    ctx.fillStyle = '#ffffff'
    ctx.font = '700 14px "Manrope", system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(String(s.label), cx, cy + 1)

    // Direction arrow
    if (s.dir && s.dir !== 'none') {
      drawArrow(ctx, cx, cy + 22, s.dir)
    }
  }
}

function drawArrow(ctx, x, y, dir) {
  ctx.save()
  ctx.strokeStyle = '#2F9E64'
  ctx.fillStyle = '#2F9E64'
  ctx.lineWidth = 2
  ctx.setLineDash([])

  const len = 14
  let dx = 0, dy = 0
  if (dir === 'down') dy = 1
  else if (dir === 'up') dy = -1
  else if (dir === 'left') dx = -1
  else if (dir === 'right') dx = 1

  ctx.beginPath()
  ctx.moveTo(x - dx * len / 2, y - dy * len / 2)
  ctx.lineTo(x + dx * len / 2, y + dy * len / 2)
  ctx.stroke()

  // Arrowhead
  const ax = x + dx * len / 2
  const ay = y + dy * len / 2
  const s = 5
  ctx.beginPath()
  if (dy !== 0) {
    ctx.moveTo(ax, ay)
    ctx.lineTo(ax - s, ay - dy * s)
    ctx.lineTo(ax + s, ay - dy * s)
  } else {
    ctx.moveTo(ax, ay)
    ctx.lineTo(ax - dx * s, ay - s)
    ctx.lineTo(ax - dx * s, ay + s)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}