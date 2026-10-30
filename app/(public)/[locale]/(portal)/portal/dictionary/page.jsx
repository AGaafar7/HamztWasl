// app/(public)/[locale]/(portal)/portal/dictionary/page.jsx
import { fetchDictionaryEntries } from '@/lib/queries/dictionary'
import DictionaryClient from './DictionaryClient'

export default async function DictionaryPage({ params }) {
  const { locale } = await params
  const entries = await fetchDictionaryEntries()
  return <DictionaryClient entries={entries} />
}