'use client'

import LessonEditorPage from '../../../../components/LessonEditorPage'

export default function EditLessonClient({ lesson }) {
  return (
    <LessonEditorPage
      lesson={lesson}
      backHref="/instructor/lessons"
      backLabel="Back to lessons"
      redirectAfterDelete="/instructor/lessons"
    />
  )
}