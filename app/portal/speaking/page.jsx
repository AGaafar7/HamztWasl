import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys, fetchSubscriptionStatus } from '../../../lib/queries/user'
import SpeakingClient from './SpeakingClient'
import PracticePaywall from '../../../components/PracticePaywall'

export default async function SpeakingPage() {
  const { active } = await fetchSubscriptionStatus()
  if (!active) return <PracticePaywall />

  const [lessons, completedKeys] = await Promise.all([
    fetchFreeLessonsByKind('speaking'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return <SpeakingClient lessons={lessons} completedIds={completedIds} />
}