'use client'

import { useState } from 'react'
import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../i18n/gloss.js'
import { speak } from '../../../utils/speak.js'

const DIALECT_KEYS = ['msa', 'egyptian', 'levantine', 'gulf', 'darija']

function searchDictionary(entries, query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return entries.filter((entry) =>
    entry.searchTerms.some(
      (term) => term.toLowerCase().includes(q) || q.includes(term.toLowerCase())
    )
  )
}

export default function DictionaryClient({ entries }) {
  const { t, lang } = useLanguage()
  const d = t.learn.dictionary
  const vLabels = t.learn.videos
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  const runSearch = (q) => {
    setQuery(q)
    setResults(searchDictionary(entries, q))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    runSearch(query)
  }

  return (
    <section>
      <div className="section-head">
        <span className="eyebrow">{d.title}</span>
        <h1 className="page-title">{d.title}</h1>
        <p>{d.lede}</p>
      </div>

      <form className="dict-search" onSubmit={onSubmit}>
        <input
          type="text"
          className="form-input"
          placeholder={d.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">{d.searchBtn}</button>
      </form>

      <div className="dict-suggestions">
        <span>{d.tryWords}</span>
        {entries.map((entry) => (
          <button
            type="button"
            key={entry.id}
            className="chip"
            onClick={() => runSearch(entry.searchTerms[0])}
          >
            {entry.arabic}
          </button>
        ))}
      </div>

      {results === null && <p className="portal-empty">{d.empty}</p>}
      {results !== null && results.length === 0 && <p className="portal-empty">{d.noResults}</p>}

      {results && results.map((entry) => (
        <article className="dict-entry" key={entry.id}>
          <div className="dict-entry-head">
            <div>
              <span className="dict-arabic arabic">{entry.arabic}</span>
              <span className="dict-gloss">{gloss(entry.gloss, lang)}</span>
              <span className="dict-grammar">
                {gloss(entry.grammar, lang)} · {d.root}: <span className="arabic">{entry.root}</span>
              </span>
            </div>
            <button type="button" className="btn btn-small btn-ghost" onClick={() => speak(entry.arabic)}>🔊</button>
          </div>

          <div className="dict-dialects">
            {DIALECT_KEYS.map((key) => {
              const form = entry.forms.find((f) => f.dialect === key)
              if (!form) return null
              return (
                <div className="dict-dialect-cell" key={key}>
                  <span className="dict-dialect-label">{vLabels[key]}</span>
                  <button
                    type="button"
                    className="dict-dialect-play"
                    onClick={() => speak(form.arabic)}
                  >
                    <span className="arabic">{form.arabic}</span> 🔊
                  </button>
                </div>
              )
            })}
          </div>

          {entry.conjugations && (
            <div className="dict-conjugations">
              {['present', 'past'].map((tense) =>
                entry.conjugations[tense] && entry.conjugations[tense].length ? (
                  <div key={tense} className="conj-block">
                    <h4>{d[tense]}</h4>
                    <div className="conj-rows">
                      {entry.conjugations[tense].map((c, i) => (
                        <div className="conj-row" key={i}>
                          <span className="arabic">{c.arabic}</span>
                          <span>{gloss(c.label, lang)}</span>
                          <button
                            type="button"
                            className="mini-play"
                            onClick={() => speak(c.arabic)}
                          >
                            🔊
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          )}

          <div className="dict-examples">
            <h4>{d.examples}</h4>
            {entry.examples.map((ex, i) => (
              <div className="dict-example" key={i}>
                <div className="dict-example-arabic">
                  <span className="arabic">{ex.arabic}</span>
                  {ex.dialect && <span className="tag">{vLabels[ex.dialect]}</span>}
                  <button
                    type="button"
                    className="mini-play"
                    onClick={() => speak(ex.arabic)}
                  >
                    🔊
                  </button>
                </div>
                <p>{gloss(ex.gloss, lang)}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  )
}