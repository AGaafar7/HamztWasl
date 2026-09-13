'use client'

import { useState, useRef } from 'react'
import { createClient } from '../lib/supabase/client'
import { updateProfileAction } from '../app/actions/profile'

/**
 * Click the avatar (or the Upload button) to pick an image. It uploads to
 * Supabase Storage, saves the public URL to profiles.avatar_url, and
 * shows the new image immediately.
 */
export default function AvatarUploader({ currentUrl = '', fullName = '' }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(currentUrl)
  const inputRef = useRef(null)

  const initial = (fullName || '?')[0].toUpperCase()

  const pick = () => inputRef.current?.click()

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please pick an image file.')
      return
    }
    if (file.size > 4 * 1024 * 1024) {
      setError('Image must be under 4 MB.')
      return
    }

    setBusy(true)
    setError('')
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `${user.id}/avatar.${ext}`

      const { error: upErr } = await supabase
        .storage.from('avatars')
        .upload(path, file, { upsert: true, cacheControl: '3600' })
      if (upErr) throw upErr

      const { data: { publicUrl } } = supabase
        .storage.from('avatars')
        .getPublicUrl(path)

      // Cache-bust so the browser doesn't show the old image.
      const url = `${publicUrl}?v=${Date.now()}`

      await updateProfileAction({ avatarUrl: url })
      setPreview(url)
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    setBusy(true)
    setError('')
    try {
      await updateProfileAction({ avatarUrl: '' })
      setPreview('')
    } catch (err) {
      setError(err.message || 'Failed to remove')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="avatar-uploader">
      <button
        type="button"
        className="profile-avatar avatar-uploader-btn"
        onClick={pick}
        disabled={busy}
        aria-label="Change avatar"
      >
        {preview ? (
          <img src={preview} alt={fullName} />
        ) : (
          <span>{initial}</span>
        )}
        <span className="avatar-uploader-overlay">
          {busy ? '…' : 'Change'}
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="avatar-uploader-input"
        onChange={onFile}
      />

      <div className="avatar-uploader-actions">
        <button
          type="button"
          className="btn btn-ghost btn-small"
          onClick={pick}
          disabled={busy}
        >
          {busy ? 'Uploading…' : 'Upload photo'}
        </button>
        {preview && (
          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={remove}
            disabled={busy}
          >
            Remove
          </button>
        )}
      </div>

      {error && <p className="form-error avatar-uploader-error">{error}</p>}
    </div>
  )
}