// app/portal/dictionary/page.jsx
import { fetchDictionaryEntries } from '../../../lib/queries/dictionary'
import DictionaryClient from './DictionaryClient'

export default async function DictionaryPage() {
  const entries = await fetchDictionaryEntries()
  return <DictionaryClient entries={entries} />
}