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
  const [topicFilter, setTopicFilter] = useState([])
  const [favorites, setFavorites] = useState(initialFavorites)
  const [, startTransition] = useTransition()

  // Every distinct topic that actually appears on at least one video.
  // Sorted for stable chip order. If the library has no topics yet,
  // this is [] and the topic filter group is hidden entirely.
  const availableTopics = useMemo(() => {
    const set = new Set()
    for (const vid of videos) {
      for (const t of vid.topics || []) set.add(t)
    }
    return [...set].sort()
  }, [videos])

  const toggleList = (list, setList, value) => {
    setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value])
  }

  const toggleFavorite = (id) => {
    const wasFavorited = favorites.includes(id)
    setFavorites((prev) =>
      wasFavorited ? prev.filter((x) => x !== id) : [...prev, id]
    )
    startTransition(async () => {
      try {
        await toggleFavoriteAction(id)
      } catch (err) {
        console.error('Favorite toggle failed:', err)
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
      const topics = vid.topics || []
      const topicOk =
        topicFilter.length === 0 || topics.some((tp) => topicFilter.includes(tp))
      return levelOk && dialectOk && topicOk
    })
  }, [videos, levelFilter, dialectFilter, topicFilter])

  const hasFilters =
    levelFilter.length > 0 || dialectFilter.length > 0 || topicFilter.length > 0

  const clearAll = () => {
    setLevelFilter([])
    setDialectFilter([])
    setTopicFilter([])
  }

  // Translate a topic id via i18n if we have a mapping; otherwise show
  // the raw id. Safe for free-form instructor-entered topics.
  const topicLabel = (id) => v.topics?.[id] || id

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

        {availableTopics.length > 0 && (
          <div className="filter-group">
            <span className="filter-label">{v.topic}</span>
            <div className="filter-chips">
              {availableTopics.map((tp) => (
                <button
                  key={tp}
                  type="button"
                  className={`chip ${topicFilter.includes(tp) ? 'active' : ''}`}
                  onClick={() => toggleList(topicFilter, setTopicFilter, tp)}
                >
                  {topicLabel(tp)}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasFilters && (
          <button type="button" className="filter-clear" onClick={clearAll}>
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
                onClick={(e) => {
                  e.preventDefault()
                  toggleFavorite(vid.id)
                }}
                aria-label="favorite"
              >
                ♥
              </button>
              <div className="video-card-body">
                <h3>{gloss(vid.title, lang)}</h3>
                <div className="video-tags">
                  {vid.dialects.map((d) => (
                    <span className="tag" key={d}>
                      {v[d]}
                    </span>
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