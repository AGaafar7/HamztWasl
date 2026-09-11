'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createCourseAction } from '../../../actions/courses'

export default function NewCoursePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    titleEn: '',
    titleAr: '',
    titleZh: '',
    descEn: '',
    descAr: '',
    descZh: '',
    glyph: '',
    theme: 't1',
    level: 'beginner',
    type: 'free',
    price: 0,
    lessons: 12,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const { id } = await createCourseAction(form)
      router.push(`/instructor/courses/${id}`)
      router.refresh()
    } catch (err) {
      console.error('Create course failed:', err)
      setError(err.message || 'Failed to create course')
      setSaving(false)
    }
  }

  return (
    <section>
      <Link href="/instructor/courses" className="back-link">← Back to my courses</Link>

      <div className="section-head">
        <h1 className="page-title">Create a new course</h1>
        <p>Fill in the details below. It'll be saved as a draft — you can publish when ready.</p>
      </div>

      <form className="instructor-form" onSubmit={onSubmit}>
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
            {saving ? 'Creating…' : 'Create Course'}
          </button>
          <Link href="/instructor/courses" className="btn btn-ghost">Cancel</Link>
        </div>
      </form>
    </section>
  )
}