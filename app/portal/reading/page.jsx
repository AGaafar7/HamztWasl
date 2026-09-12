import { fetchComprehensionExercises } from '../../../lib/queries/comprehension'
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys } from '../../../lib/queries/user'
import ReadingClient from './ReadingClient'

export default async function ReadingPage() {
  const [exercises, lessons, completedKeys] = await Promise.all([
    fetchComprehensionExercises(),
    fetchFreeLessonsByKind('reading'),
    fetchStandaloneCompletedLessonKeys(),
  ])
  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))
  return <ReadingClient exercises={exercises} lessons={lessons} completedIds={completedIds} />
}