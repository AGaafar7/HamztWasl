'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  updateCourseAction,
  publishCourseAction,
  deleteCourseAction,
} from '../../../actions/courses'

export default function EditCourseClient({ course }) {
  const router = useRouter()
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

  const onSave = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      await updateCourseAction(course.id, form)
      setSavedFlash(true)
      setTimeout(() => setSavedFlash(false), 1800)
    } catch (err) {
      console.error('Update failed:', err)
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

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

  return (
    <section>
      <Link href="/instructor/courses" className="back-link">← Back to my courses</Link>

      <div className="portal-header">
        <div>
          <h1 className="page-title">{form.titleEn || 'Untitled course'}</h1>
          <p>
            <span className={`instructor-status ${status}`}>{status}</span>
            <span className="course-admin-chip" style={{ marginInlineStart: 10 }}>
              id: {course.id}
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
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

      <form className="instructor-form" onSubmit={onSave}>
        <fieldset className="instructor-fieldset">
          <legend>Course titles</legend>
          <div className="form-group">
            <label className="form-label">Title (English) *</label>
            <input
              className="form-input"
              value={form.titleEn}
              onChange={(e) => update('titleEn', e.target.value)}
              required
            />
          </div>
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
        </fieldset>

        <fieldset className="instructor-fieldset">
          <legend>Descriptions</legend>
          <div className="form-group">
            <label className="form-label">Description (English)</label>
            <textarea
              className="form-input"
              rows="3"
              value={form.descEn}
              onChange={(e) => update('descEn', e.target.value)}
            />
          </div>
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
        </fieldset>

        <fieldset className="instructor-fieldset">
          <legend>Settings</legend>
          <div className="instructor-form-row">
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
              <label className="form-label">Type</label>
              <select
                className="form-input"
                value={form.type}
                onChange={(e) => update('type', e.target.value)}
              >
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price (USD)</label>
              <input
                className="form-input"
                type="number"
                min="0"
                value={form.price}
                onChange={(e) => update('price', Number(e.target.value))}
                disabled={form.type === 'free'}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Lessons</label>
              <input
                className="form-input"
                type="number"
                min="0"
                value={form.lessons}
                onChange={(e) => update('lessons', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="instructor-form-row">
            <div className="form-group">
              <label className="form-label">Glyph (a single character, optional)</label>
              <input
                className="form-input arabic"
                maxLength={2}
                value={form.glyph}
                onChange={(e) => update('glyph', e.target.value)}
                placeholder="ا"
              />
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
        </fieldset>

        {error && <p className="form-error">{error}</p>}

        <div className="instructor-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : savedFlash ? '✅ Saved!' : 'Save changes'}
          </button>
        </div>
      </form>
    </section>
  )
}