'use client'

import { useEffect, useRef, useState } from 'react'

export default function HarfBuzzTest({ word }) {
  const svgRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        // 1. Load harfbuzzjs (browser entry point)
        const hbjsModule = await import('harfbuzzjs/hbjs.js')
        const hbjs = hbjsModule.default || hbjsModule

        // 2. Fetch the WASM binary. arrayBuffer works regardless of MIME type.
        const wasmBuffer = await fetch('/harfbuzzjs/hb.wasm').then((r) => r.arrayBuffer())
        const wasm = await WebAssembly.instantiate(wasmBuffer)
        const hb = hbjs(wasm.instance)

        // 3. Load the font
        const fontResponse = await fetch('/fonts/Cairo-Bold.ttf')
        const fontData = await fontResponse.arrayBuffer()

        // 4. Create the hb font object
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

        // 6. Use opentype.js to get SVG paths
        const opentype = await import('opentype.js')
        const otFont = opentype.parse(fontData)

        // 7. Build SVG paths.
        //    HarfBuzz returns glyphs in logical order (first letter first).
        //    The cursorX advances through the word. We keep the natural
        //    order so glyph positions match the shaped layout, and reverse
        //    only at animation time so drawing starts on the right.
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

        // Cleanup harfbuzz resources
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
        const viewBox = `0 ${-otFont.ascender} ${totalWidth} ${viewBoxHeight}`
        svg.setAttribute('viewBox', viewBox)

        const strokeWidth = otFont.unitsPerEm * 0.03

        // Inject the keyframe animation definition once
        const style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
        style.textContent = `
          @keyframes handwrite {
            to { stroke-dashoffset: 0; }
          }
        `
        svg.appendChild(style)

        // Animation config
        const PER_PATH_DURATION = 0.6   // seconds per glyph
        const PER_PATH_DELAY = 0.6      // seconds between glyphs

        // Draw order is visual right-to-left. The paths array is in logical
        // order (first letter = rightmost visually). Reverse for the draw
        // sequence so the animation starts on the right.
        const drawOrder = paths.slice().reverse()

        drawOrder.forEach((d, i) => {
          const pathEl = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          )
          pathEl.setAttribute('d', d)
          pathEl.setAttribute('fill', 'none')
          pathEl.setAttribute('stroke', '#0E2A47')
          pathEl.setAttribute('stroke-width', String(strokeWidth))
          pathEl.setAttribute('stroke-linejoin', 'round')
          pathEl.setAttribute('stroke-linecap', 'round')

          // Add to DOM so we can measure it
          svg.appendChild(pathEl)

          // Measure the real path length and hide it
          const length = pathEl.getTotalLength()
          pathEl.setAttribute('stroke-dasharray', String(length))
          pathEl.setAttribute('stroke-dashoffset', String(length))

          // Animate this path to reveal it. Delay shifts each one
          // so they draw in sequence, right to left.
          const delay = i * PER_PATH_DELAY
          pathEl.style.animation =
            `handwrite ${PER_PATH_DURATION}s ease-out ${delay}s forwards`
        })

        setStatus('done')
      } catch (err) {
        console.error('HarfBuzz test failed:', err)
        if (!cancelled) {
          setError(err.message || String(err))
          setStatus('error')
        }
      }
    }

    run()
    return () => { cancelled = true }
  }, [word])

  return (
    <div style={{ padding: 16, border: '1px solid var(--line)', borderRadius: 12 }}>
      <h4>HarfBuzz test — {word}</h4>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p style={{ color: 'red' }}>Error: {error}</p>}
      <svg
        ref={svgRef}
        width="100%"
        height="200"
        preserveAspectRatio="xMidYMid meet"
        style={{ background: 'white', borderRadius: 8 }}
      />
    </div>
  )
}