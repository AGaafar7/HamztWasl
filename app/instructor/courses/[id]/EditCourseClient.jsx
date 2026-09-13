'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  updateCourseAction,
  publishCourseAction,
  deleteCourseAction,
} from '../../../actions/courses'
import LessonsEditor from '../../../../components/LessonsEditor'
import SaveButton from '../../../../components/SaveButton'

const TABS = [
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
  { id: 'lessons', label: 'Lessons' },
]

export default function EditCourseClient({
  course,
  initialLessons = [],
  defaultTab = 'details',
}) {
  const router = useRouter()
  const [tab, setTab] = useState(defaultTab)
  const [form, setForm] = useState({
    titleEn: course.title?.en || '',
    titleAr: course.title?.ar || '',
    titleZh: course.title?.zh || '',
    descEn: course.desc?.en || '',
    descAr: course.desc?.ar || '',
    descZh: course.desc?.zh || '',
    glyph: course.glyph || '',
    theme: course.theme || 't1',
    level: course.level || 'beginner',
    type: course.type || 'free',
    price: course.price || 0,
    lessons: course.lessons || 0,
  })
  const [status, setStatus] = useState(course.status || 'draft')
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [savedFlash, setSavedFlash] = useState(false)

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const onTogglePublish = async () => {
    const next = status !== 'published'
    setError('')
    try {
      await publishCourseAction(course.id, next)
      setStatus(next ? 'published' : 'draft')
    } catch (err) {
      console.error('Publish toggle failed:', err)
      setError(err.message || 'Failed to update status')
    }
  }

  const onDelete = async () => {
    if (!confirm(`Delete "${form.titleEn}"? This can't be undone.`)) return
    setError('')
    setDeleting(true)
    try {
      await deleteCourseAction(course.id)
      router.push('/instructor/courses')
      router.refresh()
    } catch (err) {
      console.error('Delete failed:', err)
      setError(err.message || 'Failed to delete')
      setDeleting(false)
    }
  }

  const showSaveButton = tab !== 'lessons'

  return (
    <section className="course-edit-page">
      <Link href="/instructor/courses" className="back-link">← Back to my courses</Link>

      <div className="course-edit-head">
        <div className="course-edit-head-main">
          <h1 className="page-title">{form.titleEn || 'Untitled course'}</h1>
          <div className="course-edit-head-meta">
            <span className={`instructor-status ${status}`}>{status}</span>
            <span className="course-admin-chip">id: {course.id}</span>
          </div>
        </div>
        <div className="course-edit-head-actions">
                    {showSaveButton && (
            <SaveButton onClick={onSave} label="Save changes" />
          )}
          <button
            type="button"
            className={`btn ${status === 'published' ? 'btn-ghost' : 'btn-primary'}`}
            onClick={onTogglePublish}
          >
            {status === 'published' ? 'Unpublish' : 'Publish'}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onDelete}
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="course-edit-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`course-edit-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {t.id === 'lessons' && initialLessons.length > 0 && (
              <span className="course-edit-tab-count">{initialLessons.length}</span>
            )}
          </button>
        ))}
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="course-edit-body">
        {tab === 'details' && <DetailsTab form={form} update={update} />}
        {tab === 'settings' && <SettingsTab form={form} update={update} />}
        {tab === 'lessons' && (
          <LessonsEditor
            courseId={course.id}
            initialLessons={initialLessons}
          />
        )}
      </div>
    </section>
  )
}

/* ============================================================
   Details tab (same as before)
   ============================================================ */

function DetailsTab({ form, update }) {
  return (
    <div className="edit-tab-body">
      <div className="edit-section">
        <h3 className="edit-section-title">Titles</h3>
        <p className="edit-section-desc">How the course name appears to students.</p>

        <div className="form-group">
          <label className="form-label">Title (English) *</label>
          <input
            className="form-input"
            value={form.titleEn}
            onChange={(e) => update('titleEn', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Title (Arabic)</label>
            <input
              className="form-input arabic"
              dir="rtl"
              value={form.titleAr}
              onChange={(e) => update('titleAr', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Title (Chinese)</label>
            <input
              className="form-input"
              value={form.titleZh}
              onChange={(e) => update('titleZh', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="edit-section">
        <h3 className="edit-section-title">Descriptions</h3>
        <p className="edit-section-desc">
          A short summary students see on the course card.
        </p>

        <div className="form-group">
          <label className="form-label">Description (English)</label>
          <textarea
            className="form-input"
            rows="3"
            value={form.descEn}
            onChange={(e) => update('descEn', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Description (Arabic)</label>
            <textarea
              className="form-input arabic"
              dir="rtl"
              rows="3"
              value={form.descAr}
              onChange={(e) => update('descAr', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description (Chinese)</label>
            <textarea
              className="form-input"
              rows="3"
              value={form.descZh}
              onChange={(e) => update('descZh', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Settings tab (same as before)
   ============================================================ */

function SettingsTab({ form, update }) {
  return (
    <div className="edit-tab-body">
      <div className="edit-section">
        <h3 className="edit-section-title">Appearance</h3>
        <p className="edit-section-desc">
          The badge, colors and glyph shown on the course card.
        </p>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Level</label>
            <select
              className="form-input"
              value={form.level}
              onChange={(e) => update('level', e.target.value)}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Theme</label>
            <select
              className="form-input"
              value={form.theme}
              onChange={(e) => update('theme', e.target.value)}
            >
              <option value="t1">Navy</option>
              <option value="t2">Gold</option>
              <option value="t3">Orange</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Glyph (single character, optional)</label>
          <input
            className="form-input arabic"
            maxLength={2}
            value={form.glyph}
            onChange={(e) => update('glyph', e.target.value)}
            placeholder="ا"
            style={{ maxWidth: 100 }}
          />
        </div>
      </div>

      <div className="edit-section">
        <h3 className="edit-section-title">Type &amp; Pricing</h3>
        <p className="edit-section-desc">Whether students pay to enroll.</p>

        <div className="type-toggle">
          <button
            type="button"
            className={`type-toggle-btn ${form.type === 'free' ? 'active' : ''}`}
            onClick={() => update('type', 'free')}
          >
            <span className="type-toggle-title">Free</span>
            <span className="type-toggle-desc">Anyone can enroll</span>
          </button>
          <button
            type="button"
            className={`type-toggle-btn ${form.type === 'paid' ? 'active' : ''}`}
            onClick={() => update('type', 'paid')}
          >
            <span className="type-toggle-title">Paid</span>
            <span className="type-toggle-desc">Students pay to enroll</span>
          </button>
        </div>

        {form.type === 'paid' && (
          <div className="form-group" style={{ marginTop: 18 }}>
            <label className="form-label">Price (USD)</label>
            <input
              className="form-input"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => update('price', Number(e.target.value))}
              style={{ maxWidth: 160 }}
            />
          </div>
        )}
      </div>
    </div>
  )
}