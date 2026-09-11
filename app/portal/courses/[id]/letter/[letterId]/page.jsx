// app/portal/courses/[id]/letter/[letterId]/page.jsx
import { notFound } from 'next/navigation'
import { fetchLetters, fetchLetter } from '../../../../../../lib/queries/letters'
import { fetchCompletedLessonKeys } from '../../../../../../lib/queries/user'
import LetterDetailClient from './LetterDetailClient'

export default async function LetterDetailPage({ params }) {
  const { id, letterId } = await params
  const [letter, letters, completedKeys] = await Promise.all([
    fetchLetter(letterId),
    fetchLetters(),
    fetchCompletedLessonKeys(id),
  ])
  if (!letter) notFound()

  const idx = letters.findIndex((l) => l.id === letterId)
  const prevLetter = idx > 0 ? letters[idx - 1] : null
  const nextLetter = idx >= 0 && idx < letters.length - 1 ? letters[idx + 1] : null

  return (
    <LetterDetailClient
      courseId={id}
      letter={letter}
      prevLetter={prevLetter}
      nextLetter={nextLetter}
      isCompleted={completedKeys.includes(`letter:${letterId}`)}
    />
  )
}