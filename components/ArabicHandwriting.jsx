'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Dynamic Arabic handwriting animation.
 *
 * Uses HarfBuzz (WASM) to shape the word into connected glyphs, then
 * opentype.js to extract each glyph's SVG outline. Each outline animates
 * its stroke-dashoffset from full to zero, so the word appears to be
 * written right-to-left. When a glyph finishes drawing, its fill fades
 * in so the final state is solid letters, not outlines.
 *
 * Works for any Arabic word — nothing is precomputed or hardcoded.
 */
export default function ArabicHandwriting({
  word,
  height = 260,
  durationMs = 1800,
  autoPlayKey = 0,
  inkColor = '#0E2A47',
}) {
  const svgRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      setStatus('loading')
      setError(null)

      try {
        // 1. Load harfbuzzjs (browser entry point)
        const hbjsModule = await import('harfbuzzjs/hbjs.js')
        const hbjs = hbjsModule.default || hbjsModule

        // 2. Fetch + instantiate the WASM binary
        const wasmBuffer = await fetch('/harfbuzzjs/hb.wasm').then((r) => r.arrayBuffer())
        const wasm = await WebAssembly.instantiate(wasmBuffer)
        const hb = hbjs(wasm.instance)

        // 3. Load the font
        const fontData = await fetch('/fonts/Cairo-Bold.ttf').then((r) => r.arrayBuffer())

        // 4. Create the HarfBuzz font
        const blob = hb.createBlob(new Uint8Array(fontData))
        const face = hb.createFace(blob, 0)
        const hbFont = hb.createFont(face)

        // 5. Shape the word
        const buffer = hb.createBuffer()
        buffer.addText(word)
        buffer.guessSegmentProperties()
        hb.shape(hbFont, buffer)
        const glyphs = buffer.json()

        if (cancelled) return

        // 6. Parse the font with opentype.js
        const opentype = await import('opentype.js')
        const otFont = opentype.parse(fontData)

        // 7. Build SVG paths in logical order (first letter first).
        //    Position each glyph by HarfBuzz's advance.
        let cursorX = 0
        const paths = []

        for (const g of glyphs) {
          const glyphId = g.g
          const xAdvance = g.ax
          const xDisplacement = g.dx

          const otGlyph = otFont.glyphs.get(glyphId)
          if (otGlyph) {
            const path = otGlyph.getPath(
              cursorX + xDisplacement,
              0,
              otFont.unitsPerEm
            )
            paths.push(path.toPathData(2))
          }
          cursorX += xAdvance
        }

        // Cleanup HarfBuzz resources
        buffer.destroy()
        hbFont.destroy()
        face.destroy()
        blob.destroy()

        if (cancelled) return

        // 8. Render into SVG
        const svg = svgRef.current
        if (!svg) return
        svg.innerHTML = ''

        const totalWidth = cursorX || otFont.unitsPerEm
        const viewBoxHeight = otFont.ascender - otFont.descender
        svg.setAttribute(
          'viewBox',
          `0 ${-otFont.ascender} ${totalWidth} ${viewBoxHeight}`
        )

        // Pen stroke width — thin, scaled to the font size
        const strokeWidth = otFont.unitsPerEm * 0.012

        // Keyframe for revealing each glyph outline
        const styleEl = document.createElementNS('http://www.w3.org/2000/svg', 'style')
        styleEl.textContent = `
          @keyframes ah-draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes ah-fill {
            to { fill-opacity: 1; }
          }
        `
        svg.appendChild(styleEl)

        // Animation timing: distribute the total duration across the paths.
        // Draw right-to-left, which means the last path in `paths`
        // (which is the first letter visually on the right) goes first.
        const drawOrder = paths.slice().reverse()
        const perPathDuration = Math.max(0.25, (durationMs / 1000) / drawOrder.length)
        const perPathDelay = perPathDuration * 0.8  // slight overlap between letters

        drawOrder.forEach((d, i) => {
          const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          pathEl.setAttribute('d', d)
          pathEl.setAttribute('fill', inkColor)
          pathEl.setAttribute('fill-opacity', '0')
          pathEl.setAttribute('stroke', inkColor)
          pathEl.setAttribute('stroke-width', String(strokeWidth))
          pathEl.setAttribute('stroke-linejoin', 'round')
          pathEl.setAttribute('stroke-linecap', 'round')

          svg.appendChild(pathEl)

          // Measure the actual path length and hide the stroke
          const length = pathEl.getTotalLength()
          pathEl.setAttribute('stroke-dasharray', String(length))
          pathEl.setAttribute('stroke-dashoffset', String(length))

          const delay = i * perPathDelay

          // 1) Reveal the outline
          pathEl.style.animation =
            `ah-draw ${perPathDuration}s ease-out ${delay}s forwards, ` +
            // 2) Solidify: fill fades in right after the outline finishes
            `ah-fill 0.35s ease-out ${delay + perPathDuration * 0.6}s forwards`
        })

        setStatus('done')
      } catch (err) {
        console.error('ArabicHandwriting failed:', err)
        if (!cancelled) {
          setError(err.message || String(err))
          setStatus('error')
        }
      }
    }

    run()
    return () => { cancelled = true }
  }, [word, durationMs, autoPlayKey, inkColor])

  if (status === 'error') {
    return (
      <div className="arabic-handwriting-wrap" style={{ height }}>
        <p style={{ color: 'var(--grey)', fontSize: 13 }}>
          Couldn't render this word. Please try again.
        </p>
      </div>
    )
  }

  return (
    <div className="arabic-handwriting-wrap" style={{ height }}>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block' }}
      />
    </div>
  )
}