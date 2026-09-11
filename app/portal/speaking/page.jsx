// app/portal/speaking/page.jsx
import { fetchLettersWithExamples } from '../../../lib/queries/letters'
import SpeakingClient from './SpeakingClient'

export default async function SpeakingPage() {
  const letters = await fetchLettersWithExamples()
  return <SpeakingClient letters={letters} />
}