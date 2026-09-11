// lib/queries/dictionary.js
import { createClient } from '../supabase/server'

export async function fetchDictionaryEntries() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('dictionary_entries')
    .select(`
      id, search_terms, arabic, gloss, grammar, root,
      dictionary_forms ( dialect, arabic ),
      dictionary_conjugations ( tense, sort_order, arabic, label ),
      dictionary_examples ( sort_order, arabic, gloss, dialect )
    `)
    .order('id', { ascending: true })

  if (error) throw error

  return (data || []).map((entry) => {
    // Group flat conjugation rows back into { present: [...], past: [...] }.
    const conj = { present: [], past: [] }
    for (const c of (entry.dictionary_conjugations || []).sort(
      (a, b) => a.sort_order - b.sort_order
    )) {
      if (conj[c.tense]) conj[c.tense].push({ arabic: c.arabic, label: c.label })
    }

    return {
      id: entry.id,
      searchTerms: entry.search_terms || [],
      arabic: entry.arabic,
      gloss: entry.gloss,
      grammar: entry.grammar,
      root: entry.root,
      forms: (entry.dictionary_forms || []).map((f) => ({
        dialect: f.dialect,
        arabic: f.arabic,
      })),
      // null if there were no conjugation rows at all — matches the old
      // `entry.conjugations === null` check in the page.
      conjugations:
        conj.present.length || conj.past.length ? conj : null,
      examples: (entry.dictionary_examples || [])
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((ex) => ({
          arabic: ex.arabic,
          gloss: ex.gloss,
          dialect: ex.dialect,
        })),
    }
  })
}