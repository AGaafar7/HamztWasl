'use client'

import { useState } from 'react'

const TYPE_LABEL = {
  listening: '🎧 Listening',
  reading: '📖 Reading',
  speaking: '🎤 Speaking',
}

export default function InstructorPracticesClient({ practices, courses }) {
  const [showForm, setShowForm] = useState(false)

  return (
    <section>
      <div className="portal-header">
        <div>
          <h1>Practices</h1>
          <p>Exercise sets attached to your courses. Students see them in the portal.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? 'Cancel' : '+ New Practice'}
        </button>
      </div>

      {showForm && <NewPracticeForm courses={courses} onClose={() => setShowForm(false)} />}

      {practices.length === 0 ? (
        <p className="portal-empty">No practices yet.</p>
      ) : (
        <div className="instructor-table instructor-table-full">
          {practices.map((p) => (
            <div className="instructor-row instructor-row-course" key={p.id}>
              <span className="instructor-row-main">
                <strong>{p.title}</strong>
                <span>{p.courseTitle?.en || p.courseId}</span>
              </span>
              <span className="instructor-row-date">{TYPE_LABEL[p.type]}</span>
              <span className={`instructor-status ${p.status}`}>{p.status}</span>
              <span className="instructor-row-date">{p.attempts} attempts</span>
              <span className="instructor-row-amount">{p.avgScore}% avg</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function NewPracticeForm({ courses, onClose }) {
  const [form, setForm] = useState({
    title: '',
    type: 'listening',
    courseId: courses[0]?.id || '',
    content: '',
  })
  const [saved, setSaved] = useState(false)

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const onSubmit = (e) => {
    e.preventDefault()
    // Step 4 will make this a real insert.
    console.log('[NEW PRACTICE]', form)
    setSaved(true)
    setTimeout(() => { onClose(); setSaved(false) }, 1000)
  }

  return (
    <form className="instructor-form instructor-form-inline" onSubmit={onSubmit}>
      <div className="instructor-form-row">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input className="form-input" value={form.title}
            onChange={(e) => update('title', e.target.value)} required />
        </div>
        <div className="form-group">
          <label className="form-label">Type</label>
          <select className="form-input" value={form.type}
            onChange={(e) => update('type', e.target.value)}>
            <option value="listening">Listening</option>
            <option value="reading">Reading</option>
            <option value="speaking">Speaking</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Course</label>
          <select className="form-input" value={form.courseId}
            onChange={(e) => update('courseId', e.target.value)}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title?.en || c.id}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Content / instructions</label>
        <textarea className="form-input" rows="3" value={form.content}
          onChange={(e) => update('content', e.target.value)}
          placeholder="Paste the passage, audio URL, or prompt here…" />
      </div>
      <div className="instructor-form-actions">
        <button type="submit" className="btn btn-primary" disabled={saved}>
          {saved ? '✅ Saved!' : 'Create Practice'}
        </button>
      </div>
    </form>
  )
}