// app/portal/writing/page.jsx
import { fetchFreeLessonsByKind } from '../../../lib/queries/lessons'
import WritingClient from './WritingClient'

export default async function WritingPage() {
  const lessons = await fetchFreeLessonsByKind('writing')
  return <WritingClient lessons={lessons} />
}