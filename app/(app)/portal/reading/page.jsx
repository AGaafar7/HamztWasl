import { fetchFreeLessonsByKind } from '@/lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys, fetchSubscriptionStatus } from '@/lib/queries/user'
import ReadingClient from './ReadingClient'
import PracticePaywall from '@/components/PracticePaywall'

export default async function ReadingPage() {
  const { active } = await fetchSubscriptionStatus()
  if (!active) return <PracticePaywall />

  const [lessons, completedKeys] = await Promise.all([
    fetchFreeLessonsByKind('reading'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return <ReadingClient lessons={lessons} completedIds={completedIds} />
}