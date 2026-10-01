import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys, fetchSubscriptionStatus } from '../../../lib/queries/user'
import WritingClient from './WritingClient'
import PracticePaywall from '../../../components/PracticePaywall'

export default async function WritingPage() {
  const { active } = await fetchSubscriptionStatus()
  if (!active) return <PracticePaywall />

  const [lessons, completedKeys] = await Promise.all([
    fetchFreeLessonsByKind('writing'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return <WritingClient lessons={lessons} completedIds={completedIds} />
}