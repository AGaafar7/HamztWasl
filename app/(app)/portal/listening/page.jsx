import { fetchFreeLessonsByKind } from '@/lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys, fetchSubscriptionStatus } from '@/lib/queries/user'
import ListeningClient from './ListeningClient'
import PracticePaywall from '@/components/PracticePaywall'

export default async function ListeningPage() {
  const { active } = await fetchSubscriptionStatus()
  if (!active) return <PracticePaywall />

  const [lessons, completedKeys] = await Promise.all([
    fetchFreeLessonsByKind('listening'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return <ListeningClient lessons={lessons} completedIds={completedIds} />
}