import { fetchLettersWithExamples } from '../../../lib/queries/letters'
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys } from '../../../lib/queries/user'
import SpeakingClient from './SpeakingClient'

export default async function SpeakingPage() {
  const [letters, lessons, completedKeys] = await Promise.all([
    fetchLettersWithExamples(),
    fetchFreeLessonsByKind('speaking'),
    fetchStandaloneCompletedLessonKeys(),
  ])
  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))
  return <SpeakingClient letters={letters} lessons={lessons} completedIds={completedIds} />
}