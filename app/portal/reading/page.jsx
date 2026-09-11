// app/portal/reading/page.jsx
import { fetchComprehensionExercises } from '../../../lib/queries/comprehension'
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import ReadingClient from './ReadingClient'

export default async function ReadingPage() {
  const [exercises, lessons] = await Promise.all([
    fetchComprehensionExercises(),
    fetchFreeLessonsByKind('reading'),
  ])
  return <ReadingClient exercises={exercises} lessons={lessons} />
}