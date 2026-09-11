/**
 * Small helper for bilingual/trilingual mock content (video transcripts,
 * dictionary entries) where we keep English + Chinese glosses but not a
 * full Arabic-UI gloss (showing an Arabic gloss for Arabic source text
 * doesn't make sense for this product). Falls back to English.
 */
export function gloss(obj, lang) {
  if (!obj) return ''
  return obj[lang] || obj.en || ''
}
