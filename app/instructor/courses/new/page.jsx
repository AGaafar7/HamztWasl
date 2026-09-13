'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createCourseAction } from '../../../actions/courses'

const STEPS = [
  { id: 'basics', label: 'Basics' },
  { id: 'settings', label: 'Settings' },
  { id: 'review', label: 'Review' },
]

export default function NewCoursePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
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
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }))

  const goNext = () => {
    setError('')
    if (step === 0 && !form.titleEn.trim()) {
      setError('English title is required.')
      return
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const goBack = () => {
    setError('')
    setStep((s) => Math.max(s - 1, 0))
  }

  const onSubmit = async () => {
    if (!form.titleEn.trim()) {
      setError('English title is required.')
      setStep(0)
      return
    }
    setError('')
    setSaving(true)
    try {
      const { id } = await createCourseAction(form)
      router.push(`/instructor/courses/${id}`)
      router.refresh()
    } catch (err) {
      setError(err.message || 'Failed to create course')
      setSaving(false)
    }
  }

  return (
    <section className="wizard-page">
      <Link href="/instructor/courses" className="back-link">← Back to my courses</Link>

      <div className="wizard-head">
        <h1 className="page-title">Create a new course</h1>
        <p>We'll save it as a draft. You'll add lessons next.</p>
      </div>

      <div className="wizard-steps">
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`wizard-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
          >
            <div className="wizard-step-num">{i < step ? '✓' : i + 1}</div>
            <div className="wizard-step-label">{s.label}</div>
            {i < STEPS.length - 1 && <div className="wizard-step-line" />}
          </div>
        ))}
      </div>

      {step === 0 && <BasicsStep form={form} update={update} />}
      {step === 1 && <SettingsStep form={form} update={update} />}
      {step === 2 && <ReviewStep form={form} />}

      {error && (
        <p className="form-error" style={{ maxWidth: 720, margin: '0 auto 12px' }}>
          {error}
        </p>
      )}

      <div className="wizard-actions">
        {step > 0 ? (
          <button type="button" className="btn btn-ghost" onClick={goBack} disabled={saving}>
            ← Back
          </button>
        ) : (
          <Link href="/instructor/courses" className="btn btn-ghost">Cancel</Link>
        )}

        {step < STEPS.length - 1 ? (
          <button type="button" className="btn btn-primary" onClick={goNext}>
            Continue →
          </button>
        ) : (
          <button type="button" className="btn btn-primary" onClick={onSubmit} disabled={saving}>
            {saving ? 'Creating…' : 'Create course'}
          </button>
        )}
      </div>
    </section>
  )
}

/* ============================================================
   Step 1 — Basics
   ============================================================ */

function BasicsStep({ form, update }) {
  return (
    <div className="wizard-card">
      <div className="wizard-card-head">
        <h2>Let's start with the basics</h2>
        <p>Give your course a name in the languages you want to support.</p>
      </div>

      <div className="form-group">
        <label className="form-label">Title (English) *</label>
        <input
          className="form-input"
          value={form.titleEn}
          onChange={(e) => update('titleEn', e.target.value)}
          placeholder="e.g. Arabic for Travelers"
          autoFocus
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
            placeholder="العنوان"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Title (Chinese)</label>
          <input
            className="form-input"
            value={form.titleZh}
            onChange={(e) => update('titleZh', e.target.value)}
            placeholder="标题"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description (English)</label>
        <textarea
          className="form-input"
          rows="4"
          value={form.descEn}
          onChange={(e) => update('descEn', e.target.value)}
          placeholder="What will students learn in this course?"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Description (Arabic)</label>
          <textarea
            className="form-input arabic"
            dir="rtl"
            rows="4"
            value={form.descAr}
            onChange={(e) => update('descAr', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description (Chinese)</label>
          <textarea
            className="form-input"
            rows="4"
            value={form.descZh}
            onChange={(e) => update('descZh', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

/* ============================================================
   Step 2 — Settings
   ============================================================ */

function SettingsStep({ form, update }) {
  return (
    <div className="wizard-card">
      <div className="wizard-card-head">
        <h2>How should students find it?</h2>
        <p>These affect how the course appears in the catalog.</p>
      </div>

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
        <label className="form-label">Glyph (single character, shown on the card)</label>
        <input
          className="form-input arabic"
          maxLength={2}
          value={form.glyph}
          onChange={(e) => update('glyph', e.target.value)}
          placeholder="ا"
          style={{ maxWidth: 100 }}
        />
      </div>

      <div className="wizard-divider" />

      <div className="form-group">
        <label className="form-label">Type</label>
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
  )
}

/* ============================================================
   Step 3 — Review
   ============================================================ */

function ReviewStep({ form }) {
  return (
    <div className="wizard-card">
      <div className="wizard-card-head">
        <h2>Looks good?</h2>
        <p>Review the details. You can edit everything later.</p>
      </div>

      <div className="review-list">
        <ReviewRow label="Title (English)" value={form.titleEn} />
        {form.titleAr && <ReviewRow label="Title (Arabic)" value={form.titleAr} ar />}
        {form.titleZh && <ReviewRow label="Title (Chinese)" value={form.titleZh} />}
        {form.descEn && <ReviewRow label="Description" value={form.descEn} multiline />}
        <ReviewRow label="Level" value={form.level} />
        <ReviewRow label="Theme" value={form.theme} />
        {form.glyph && <ReviewRow label="Glyph" value={form.glyph} ar />}
        <ReviewRow
          label="Type"
          value={form.type === 'free' ? 'Free' : `Paid — $${form.price}`}
        />
      </div>

      <div className="review-note">
        The course will be saved as a <strong>draft</strong>. You'll add lessons on
        the next screen, then publish when it's ready.
      </div>
    </div>
  )
}

function ReviewRow({ label, value, ar, multiline }) {
  return (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span
        className={`review-value ${ar ? 'arabic' : ''} ${multiline ? 'multiline' : ''}`}
        dir={ar ? 'rtl' : undefined}
      >
        {value || '—'}
      </span>
    </div>
  )
}