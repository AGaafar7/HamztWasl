// app/actions/videos.js
'use server'

import { findWordExamples } from '../../lib/queries/videos'

export async function findWordExamplesAction(word) {
  return await findWordExamples(word)
}