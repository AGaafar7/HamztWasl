// app/portal/reading/page.jsx
import { fetchComprehensionExercises } from '../../../lib/queries/comprehension'
import ReadingClient from './ReadingClient'

export default async function ReadingPage() {
  const exercises = await fetchComprehensionExercises()
  return <ReadingClient exercises={exercises} />
}