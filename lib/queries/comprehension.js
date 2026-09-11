// lib/queries/comprehension.js
import { createClient } from '../supabase/server'

export async function fetchComprehensionExercises() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('comprehension_exercises')
    .select(`
      id, title, passage,
      comprehension_questions ( sort_order, question, reference_answer )
    `)
    .order('id', { ascending: true })

  if (error) throw error

  return (data || []).map((ex) => ({
    id: ex.id,
    title: ex.title,
    passage: ex.passage,
    questions: (ex.comprehension_questions || [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((q) => ({
        question: q.question,
        referenceAnswer: q.reference_answer,
      })),
  }))
}