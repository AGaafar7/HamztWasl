'use client'

import { useMemo, useState, useTransition } from 'react'
import Link from 'next/link'
import { useLanguage } from '../../../i18n/LanguageContext.jsx'
import { gloss } from '../../../i18n/gloss.js'
import { youtubeThumbnail } from '../../../lib/youtube.js'
import { toggleFavoriteAction } from '../../actions/favorites'

const LEVELS = ['novice', 'beginner', 'intermediate', 'advanced']
const DIALECTS = ['msa', 'egyptian', 'levantine', 'gulf', 'darija']

export default function VideosClient({ videos, initialFavorites }) {
  const { t, lang } = useLanguage()
  const v = t.learn.videos
  const [levelFilter, setLevelFilter] = useState([])
  const [dialectFilter, setDialectFilter] = useState([])
  const [favorites, setFavorites] = useState(initialFavorites)
  const [, startTransition] = useTransition()

  const toggleList = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value])
  }

  const toggleFavorite = (id) => {
    const wasFavorited = favorites.includes(id)
    // Optimistic: flip the heart instantly.
    setFavorites((prev) =>
      wasFavorited ? prev.filter((x) => x !== id) : [...prev, id]
    )
    startTransition(async () => {
      try {
        await toggleFavoriteAction(id)
      } catch (err) {
        console.error('Favorite toggle failed:', err)
        // Roll back on error.
        setFavorites((prev) =>
          wasFavorited ? [...prev, id] : prev.filter((x) => x !== id)
        )
      }
    })
  }

  const filtered = useMemo(() => {
    return videos.filter((vid) => {
      const levelOk = levelFilter.length === 0 || levelFilter.includes(vid.level)
      const dialectOk =
        dialectFilter.length === 0 || vid.dialects.some((d) => dialectFilter.includes(d))
      return levelOk && dialectOk
    })
  }, [videos, levelFilter, dialectFilter])

  const hasFilters = levelFilter.length > 0 || dialectFilter.length > 0

  return (
    <section>
      <div className="section-head">
        <span className="eyebrow">{v.title}</span>
        <h1 className="page-title">{v.title}</h1>
        <p>{v.lede}</p>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-label">{v.difficulty}</span>
          <div className="filter-chips">
            {LEVELS.map((lvl) => (
              <button
                key={lvl}
                type="button"
                className={`chip ${levelFilter.includes(lvl) ? 'active' : ''}`}
                onClick={() => toggleList(levelFilter, setLevelFilter, lvl)}
              >
                {v[lvl]}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">{v.dialect}</span>
          <div className="filter-chips">
            {DIALECTS.map((d) => (
              <button
                key={d}
                type="button"
                className={`chip ${dialectFilter.includes(d) ? 'active' : ''}`}
                onClick={() => toggleList(dialectFilter, setDialectFilter, d)}
              >
                {v[d]}
              </button>
            ))}
          </div>
        </div>

        {hasFilters && (
          <button
            type="button"
            className="filter-clear"
            onClick={() => { setLevelFilter([]); setDialectFilter([]) }}
          >
            {v.clearFilters}
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="portal-empty">{v.noResults}</p>
      ) : (
        <div className="video-grid">
          {filtered.map((vid) => (
            <Link
              href={`/portal/videos/${vid.id}`}
              className="video-card"
              key={vid.id}
              style={{ backgroundImage: `url(${youtubeThumbnail(vid.youtubeId)})` }}
            >
              <div className="video-card-scrim" />
              <button
                type="button"
                className={`fav-heart ${favorites.includes(vid.id) ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); toggleFavorite(vid.id) }}
                aria-label="favorite"
              >
                ♥
              </button>
              <div className="video-card-body">
                <h3>{gloss(vid.title, lang)}</h3>
                <div className="video-tags">
                  {vid.dialects.map((d) => (
                    <span className="tag" key={d}>{v[d]}</span>
                  ))}
                  <span className="tag tag-level">{v[vid.level]}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}