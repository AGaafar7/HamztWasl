import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys } from '../../../lib/queries/user'
import SpeakingClient from './SpeakingClient'

export default async function SpeakingPage() {
  const [lessons, completedKeys] = await Promise.all([
    fetchFreeLessonsByKind('speaking'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return <SpeakingClient lessons={lessons} completedIds={completedIds} />
}