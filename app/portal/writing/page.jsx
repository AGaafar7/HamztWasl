// app/portal/writing/page.jsx
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys } from '../../../lib/queries/user'
import WritingClient from './WritingClient'

export default async function WritingPage() {
  const [lessons, completedKeys] = await Promise.all([
    fetchFreeLessonsByKind('writing'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  // Extract lesson ids from the 'lesson:<uuid>' keys.
  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return <WritingClient lessons={lessons} completedIds={completedIds} />
}