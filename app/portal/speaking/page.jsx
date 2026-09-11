// app/portal/speaking/page.jsx
import { fetchLettersWithExamples } from '../../../lib/queries/letters'
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import SpeakingClient from './SpeakingClient'

export default async function SpeakingPage() {
  const [letters, lessons] = await Promise.all([
    fetchLettersWithExamples(),
    fetchFreeLessonsByKind('speaking'),
  ])
  return <SpeakingClient letters={letters} lessons={lessons} />
}