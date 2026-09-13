'use client'

import LessonEditorPage from '../../../../../../components/LessonEditorPage'

export default function CourseLessonEditClient({ lesson, course, videoChoices }) {
  const courseTitle = course.title?.en || 'course'
  return (
    <LessonEditorPage
      lesson={lesson}
      videoChoices={videoChoices}
      backHref={`/instructor/courses/${course.id}?tab=lessons`}
      backLabel={`Back to ${courseTitle}`}
      redirectAfterDelete={`/instructor/courses/${course.id}?tab=lessons`}
    />
  )
}