import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys } from '../../../lib/queries/user'
import ReadingClient from './ReadingClient'

export default async function ReadingPage() {
  const [lessons, completedKeys] = await Promise.all([
    fetchFreeLessonsByKind('reading'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return <ReadingClient lessons={lessons} completedIds={completedIds} />
}