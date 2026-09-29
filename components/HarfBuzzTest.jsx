'use client'

import { useEffect, useRef, useState } from 'react'
import hbjs from 'harfbuzzjs/hbjs.js'

export default function HarfBuzzTest({ word }) {
  const svgRef = useRef(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function run() {
      try {
        // 1. Load harfbuzzjs and the wasm binary
        const wasmResponse = await fetch('/harfbuzzjs/hb.wasm')
        const wasm = await WebAssembly.instantiateStreaming(wasmResponse)
        const hb = hbjs(wasm.instance)
        const wasmBinary = await wasmResponse.arrayBuffer()
        const wasmModule = await WebAssembly.instantiate(wasmBinary, {})
        const hbInstance = hb(wasmModule.instance)

        // 2. Load the font for shaping
        const fontResponse = await fetch('/fonts/Cairo-Bold.ttf')
        const fontData = await fontResponse.arrayBuffer()

        const blob = hbInstance.createBlob(new Uint8Array(fontData))
        const face = hbInstance.createFace(blob, 0)
        const hbFont = hbInstance.createFont(face)

        // 3. Shape the word
        const buffer = hbInstance.createBuffer()
        buffer.addText(word)
        buffer.guessSegmentProperties()
        hbInstance.shape(hbFont, buffer)
        const glyphs = buffer.json()

        if (cancelled) return

        // 4. Use opentype.js to get SVG paths for each glyph
        const opentype = await import('opentype.js')
        const otFont = opentype.parse(fontData)

        // 5. Build SVG paths, placing each glyph by its x-advance
        let cursorX = 0
        const paths = []

        for (const g of glyphs) {
          const glyphId = g.g
          const xAdvance = g.ax
          const xDisplacement = g.dx
          const yDisplacement = g.dy

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

        // 6. Render into SVG
        const svg = svgRef.current
        if (!svg) return
        svg.innerHTML = ''

        // Compute a viewBox from the shaped glyphs
        const totalWidth = cursorX
        const viewBox = `0 ${-otFont.ascender} ${totalWidth} ${otFont.unitsPerEm}`

        svg.setAttribute('viewBox', viewBox)

        for (const d of paths) {
          const pathEl = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          )
          pathEl.setAttribute('d', d)
          pathEl.setAttribute('fill', 'none')
          pathEl.setAttribute('stroke', '#0E2A47')
          pathEl.setAttribute('stroke-width', '8')
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
        preserveAspectRatio="xMidYMid meet"
        style={{ background: 'white', borderRadius: 8 }}
      />
    </div>
  )
}