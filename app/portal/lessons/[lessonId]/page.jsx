// app/portal/lessons/[lessonId]/page.jsx
import { notFound } from 'next/navigation'
import { fetchLesson } from '../../../../lib/queries/lessons'
import { fetchVideo } from '../../../../lib/queries/videos'
import { fetchStandaloneCompletedLessonKeys } from '../../../../lib/queries/user'
import LessonRenderer from '../../../../components/LessonRenderer'

export default async function StandaloneLessonPage({ params, searchParams }) {
  const { lessonId } = await params
  const { from } = await searchParams
  const lesson = await fetchLesson(lessonId)
  if (!lesson) notFound()

  const [completedKeys] = await Promise.all([
    fetchStandaloneCompletedLessonKeys(),
  ])

  let videoData = null
  if (lesson.kind === 'video' && lesson.content?.videoId) {
    videoData = await fetchVideo(lesson.content.videoId)
  }

  return (
    <LessonRenderer
      course={null}
      lesson={lesson}
      isCompleted={completedKeys.includes(`lesson:${lessonId}`)}
      videoData={videoData}
      from={typeof from === 'string' ? from : null}
    />
  )
}