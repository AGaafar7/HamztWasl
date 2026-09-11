// app/portal/courses/[id]/lessons/[lessonId]/page.jsx
import { notFound } from 'next/navigation'
import { fetchCourse } from '../../../../../../lib/queries/courses'
import { fetchLesson, fetchLessonSiblings } from '../../../../../../lib/queries/lessons'
import { fetchCompletedLessonKeys } from '../../../../../../lib/queries/user'
import { fetchVideo } from '../../../../../../lib/queries/videos'
import LessonPageClient from './LessonPageClient'

export default async function LessonPage({ params }) {
  const { id, lessonId } = await params

  const [course, lesson, siblings, completedKeys] = await Promise.all([
    fetchCourse(id),
    fetchLesson(lessonId),
    fetchLessonSiblings(id, lessonId),
    fetchCompletedLessonKeys(id),
  ])

  if (!course || !lesson || lesson.courseId !== id) notFound()

  // Video lessons point at a videos row via content.videoId.
  let videoData = null
  if (lesson.kind === 'video' && lesson.content?.videoId) {
    videoData = await fetchVideo(lesson.content.videoId)
  }

  return (
    <LessonPageClient
      course={course}
      lesson={lesson}
      siblings={siblings}
      isCompleted={completedKeys.includes(`lesson:${lessonId}`)}
      videoData={videoData}
    />
  )
}