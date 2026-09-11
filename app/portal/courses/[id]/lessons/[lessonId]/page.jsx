// app/portal/lessons/[lessonId]/page.jsx
import { notFound } from 'next/navigation'
import { createClient } from '../../../../lib/supabase/server'
import { fetchLesson } from '../../../../lib/queries/lessons'
import { fetchVideo } from '../../../../lib/queries/videos'
import LessonRenderer from '../../../../components/LessonRenderer'

export default async function StandaloneLessonPage({ params }) {
  const { lessonId } = await params
  const lesson = await fetchLesson(lessonId)
  if (!lesson || lesson.courseId) notFound()

  let videoData = null
  if (lesson.kind === 'video' && lesson.content?.videoId) {
    videoData = await fetchVideo(lesson.content.videoId)
  }

  return <LessonRenderer course={null} lesson={lesson} videoData={videoData} />
}