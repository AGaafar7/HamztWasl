// app/portal/listening/page.jsx
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import { fetchStandaloneCompletedLessonKeys } from '../../../lib/queries/user'
import ListeningClient from './ListeningClient'

export default async function ListeningPage() {
  const [lessons, completedKeys] = await Promise.all([
    fetchFreeLessonsByKind('listening'),
    fetchStandaloneCompletedLessonKeys(),
  ])

  const completedIds = completedKeys
    .filter((k) => k.startsWith('lesson:'))
    .map((k) => k.slice('lesson:'.length))

  return (
    <ListeningClient
      lessons={lessons}
      completedIds={completedIds}
    />
  )
}