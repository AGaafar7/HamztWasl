'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * A tracing canvas. Renders the guide text as a large dotted stroke and
 * lets the student draw over it with mouse, stylus, or finger.
 *
 * `guide` is the Arabic character or word to trace.
 */
export default function TracingCanvas({ guide, height = 280 }) {
  const canvasRef = useRef(null)
  const lastPointRef = useRef(null)
  const drawingRef = useRef(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  // Draw the dotted guide whenever `guide` changes or the canvas is mounted.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    setupCanvas(canvas, guide)
    setHasDrawn(false)
  }, [guide])

  // Keep the guide crisp on resize / orientation change (drawing is lost,
  // which is fine — it's a practice pad, not a saved asset).
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let raf = null
    const onResize = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setupCanvas(canvas, guide)
        setHasDrawn(false)
      })
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [guide])

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
    setupCanvas(canvasRef.current, guide)
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
function setupCanvas(canvas, guide) {
  const rect = canvas.getBoundingClientRect()
  const dpr = window.devicePixelRatio || 1
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, rect.width, rect.height)

  // Scale the guide so it fits comfortably.
  const fontSize = Math.min(rect.width * 0.72, rect.height * 0.85)

  // Font family must match the app's Arabic display font for consistent shapes.
  ctx.font = `700 ${fontSize}px "Cairo", "Noto Naskh Arabic", system-ui, sans-serif`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  // Dotted outline for the tracing feel.
  ctx.setLineDash([7, 9])
  ctx.lineWidth = 3
  ctx.strokeStyle = 'rgba(14, 42, 71, 0.28)'
  ctx.strokeText(guide, rect.width / 2, rect.height / 2)

  // A very faint solid fill underneath so the guide reads clearly even
  // when the outline alone is hard to see on small screens.
  ctx.setLineDash([])
  ctx.fillStyle = 'rgba(14, 42, 71, 0.045)'
  ctx.fillText(guide, rect.width / 2, rect.height / 2)
}