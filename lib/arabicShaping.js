// lib/arabicShaping.js
//
// Given an Arabic word, produce the ordered list of contextual forms
// that compose it. Order is right-to-left (visual reading order), which
// is the order the animation should draw them.

import { LETTER_FORMS } from './arabicForms'

// Arabic letters by their Unicode codepoint → our letter id.
const CHAR_TO_LETTER_ID = {}
for (const [id, meta] of Object.entries(LETTER_FORMS)) {
  CHAR_TO_LETTER_ID[meta.arabic] = id
}
// Alif variants all map to 'alif'
CHAR_TO_LETTER_ID['أ'] = 'alif'
CHAR_TO_LETTER_ID['إ'] = 'alif'
CHAR_TO_LETTER_ID['آ'] = 'alif'

// Strip diacritics and tatweel — they aren't letters and don't affect shaping.
function stripDiacritics(str) {
  return str.replace(/[\u064B-\u0652\u0640]/g, '')
}

// Does this letter connect to the letter before it (to its right visually)?
// Every letter connects to the *previous* letter except the six non-connectors.
function connectsToPrevious(letterId) {
  return !LETTER_FORMS[letterId]?.isNonConnecting
}

// Does this letter connect to the letter after it (to its left visually)?
// Non-connecting letters never join the next letter.
function connectsToNext(letterId) {
  return !LETTER_FORMS[letterId]?.isNonConnecting
}

/**
 * shapeWord(word) → array of { formKey, letterId, form }
 * Ordered RIGHT to LEFT (visual reading order).
 */
export function shapeWord(word) {
  const cleaned = stripDiacritics(word || '')
  const chars = [...cleaned]        // logical order (first letter first)
  const ids = chars.map((c) => CHAR_TO_LETTER_ID[c]).filter(Boolean)

  // Now decide the form for each letter in logical order.
  const logical = ids.map((letterId, i) => {
    const isFirst = i === 0
    const isLast = i === ids.length - 1

    const joinsNext = !isLast && connectsToNext(letterId) && connectsToPrevious(ids[i + 1])
    const joinsPrev = !isFirst && connectsToPrevious(letterId) && connectsToNext(ids[i - 1])

    let form
    if (!joinsNext && !joinsPrev) form = 'isolated'
    else if (joinsNext && !joinsPrev) form = 'initial'
    else if (!joinsNext && joinsPrev) form = 'final'
    else form = 'medial'

    // Guard: if the letter doesn't support this form, fall back to isolated.
    if (!LETTER_FORMS[letterId].forms.includes(form)) form = 'isolated'

    return { letterId, form, formKey: `${letterId}-${form}` }
  })

  // Return in visual right-to-left order = reverse of logical order.
  return logical.slice().reverse()
}