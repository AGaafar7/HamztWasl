// lib/arabicStrokeOrder.js
//
// Stroke-order hints for each of the 28 Arabic letters.
// Each stroke is a normalized position (0..1 relative to the canvas)
// plus a direction arrow and a numeric label. Used by TracingCanvas
// to draw small "1 / 2 / 3" badges and arrow hints over the guide glyph.
//
// Coordinates are approximate — they're drawn over the letter as it
// appears in the Cairo font at the canvas's center. If a letter's
// indicators look off, tweak its entries here.

export const STROKE_ORDER = {
  alif:          [{ x: 0.50, y: 0.12, dir: 'down', label: 1 }],
  baa:           [
    { x: 0.55, y: 0.42, dir: 'left', label: 1 },  // bowl
    { x: 0.55, y: 0.62, dir: 'none', label: 2 },  // dot below
  ],
  taa:           [
    { x: 0.55, y: 0.42, dir: 'left', label: 1 },
    { x: 0.55, y: 0.30, dir: 'none', label: 2 },  // two dots above
  ],
  thaa:          [
    { x: 0.55, y: 0.42, dir: 'left', label: 1 },
    { x: 0.55, y: 0.28, dir: 'none', label: 2 },
  ],
  jeem:          [
    { x: 0.55, y: 0.40, dir: 'left', label: 1 },
    { x: 0.55, y: 0.60, dir: 'none', label: 2 },
  ],
  haa:           [
    { x: 0.52, y: 0.40, dir: 'left', label: 1 },
  ],
  khaa:          [
    { x: 0.52, y: 0.40, dir: 'left', label: 1 },
    { x: 0.52, y: 0.28, dir: 'none', label: 2 },
  ],
  daal:          [{ x: 0.50, y: 0.38, dir: 'left', label: 1 }],
  dhaal:         [
    { x: 0.50, y: 0.38, dir: 'left', label: 1 },
    { x: 0.50, y: 0.26, dir: 'none', label: 2 },
  ],
  raa:           [{ x: 0.50, y: 0.38, dir: 'left', label: 1 }],
  zaay:          [
    { x: 0.50, y: 0.38, dir: 'left', label: 1 },
    { x: 0.50, y: 0.26, dir: 'none', label: 2 },
  ],
  seen:          [
    { x: 0.50, y: 0.42, dir: 'left', label: 1 },
  ],
  sheen:         [
    { x: 0.50, y: 0.42, dir: 'left', label: 1 },
    { x: 0.50, y: 0.28, dir: 'none', label: 2 },
  ],
  saad:          [{ x: 0.50, y: 0.42, dir: 'left', label: 1 }],
  daad:          [
    { x: 0.50, y: 0.42, dir: 'left', label: 1 },
    { x: 0.50, y: 0.30, dir: 'none', label: 2 },
  ],
  'taa-emphatic':[{ x: 0.50, y: 0.42, dir: 'left', label: 1 }],
  'thaa-emphatic':[
    { x: 0.50, y: 0.42, dir: 'left', label: 1 },
    { x: 0.50, y: 0.28, dir: 'none', label: 2 },
  ],
  ayn:           [{ x: 0.52, y: 0.40, dir: 'left', label: 1 }],
  ghayn:         [
    { x: 0.52, y: 0.40, dir: 'left', label: 1 },
    { x: 0.52, y: 0.28, dir: 'none', label: 2 },
  ],
  faa:           [
    { x: 0.52, y: 0.40, dir: 'left', label: 1 },
    { x: 0.52, y: 0.26, dir: 'none', label: 2 },
  ],
  qaaf:          [
    { x: 0.50, y: 0.38, dir: 'left', label: 1 },
    { x: 0.50, y: 0.26, dir: 'none', label: 2 },
  ],
  kaaf:          [{ x: 0.50, y: 0.40, dir: 'left', label: 1 }],
  laam:          [{ x: 0.50, y: 0.15, dir: 'down', label: 1 }],
  meem:          [{ x: 0.50, y: 0.42, dir: 'left', label: 1 }],
  noon:          [
    { x: 0.50, y: 0.42, dir: 'left', label: 1 },
    { x: 0.50, y: 0.28, dir: 'none', label: 2 },
  ],
  'haa-final':   [{ x: 0.50, y: 0.42, dir: 'left', label: 1 }],
  waaw:          [{ x: 0.50, y: 0.42, dir: 'left', label: 1 }],
  yaa:           [
    { x: 0.55, y: 0.42, dir: 'left', label: 1 },
    { x: 0.55, y: 0.62, dir: 'none', label: 2 },
  ],
}