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
        // 1. Load the WASM module
        const hb = await import('harfbuzzjs')
        const wasmResponse = await fetch('/harfbuzzjs/hb.wasm')
        const wasmBinary = await wasmResponse.arrayBuffer()
        const result = await WebAssembly.instantiate(wasmBinary, hb.wasmImports)
        hb.init(result.instance.exports)

        // 2. Load the font
        const fontResponse = await fetch('/fonts/Cairo-Bold.ttf')
        const fontData = await fontResponse.arrayBuffer()
        const blob = hb.createBlob(new Uint8Array(fontData))
        const face = hb.createFace(blob, 0)
        const font = hb.createFont(face)
        font.setScale(1000, 1000)

        // 3. Shape the word
        const buffer = hb.createBuffer()
        buffer.addText(word)
        buffer.guessSegmentProperties()
        hb.shape(font, buffer)
        const glyphs = buffer.json()

        if (cancelled) return

        // 4. Build SVG paths from each glyph
        let cursorX = 0
        const paths = []

        for (const g of glyphs) {
          const glyphId = g.g
          const xAdvance = g.ax
          const xDisplacement = g.dx
          const yDisplacement = g.dy

          const svgPath = font.glyphToPath(glyphId)
          if (svgPath && svgPath !== '') {
            paths.push({
              d: svgPath,
              transform: `translate(${cursorX + xDisplacement}, ${yDisplacement})`,
            })
          }
          cursorX += xAdvance
        }

        buffer.destroy()
        font.destroy()
        face.destroy()
        blob.destroy()

        if (cancelled) return

        // 5. Render into the SVG
        const svg = svgRef.current
        if (!svg) return
        svg.innerHTML = ''

        for (const p of paths) {
          const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path')
          pathEl.setAttribute('d', p.d)
          pathEl.setAttribute('transform', p.transform)
          pathEl.setAttribute('fill', 'none')
          pathEl.setAttribute('stroke', '#0E2A47')
          pathEl.setAttribute('stroke-width', '2')
          pathEl.setAttribute('stroke-linejoin', 'round')
          pathEl.setAttribute('stroke-linecap', 'round')
          svg.appendChild(pathEl)
        }

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
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid meet"
        style={{ background: 'white', borderRadius: 8 }}
      />
    </div>
  )
}