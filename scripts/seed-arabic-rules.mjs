// scripts/seed-arabic-rules.mjs
// Run once:  node scripts/seed-arabic-rules.mjs
// Creates the "arabic-rules" course and inserts its first module
// (حروف الجر) as a course_lessons row of kind 'multiplechoice'.

import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'
import { arabicRulesCourse, haroofAlJarModule } from '../data/arabic-rules.js'

config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function main() {
  // Pick any instructor/admin to own the course.
  const { data: instructor, error: instErr } = await supabase
    .from('profiles')
    .select('id')
    .in('role', ['instructor', 'admin'])
    .limit(1)
    .single()
  if (instErr || !instructor) {
    console.error('No instructor/admin profile found. Create one first.')
    process.exit(1)
  }

  // Upsert the course.
  const { error: courseErr } = await supabase
    .from('courses')
    .upsert({
      id: arabicRulesCourse.id,
      glyph: arabicRulesCourse.glyph,
      theme: arabicRulesCourse.theme,
      level: arabicRulesCourse.level,
      type: arabicRulesCourse.type,
      price: arabicRulesCourse.price,
      status: arabicRulesCourse.status,
      instructor_id: instructor.id,
      title: arabicRulesCourse.title,
      desc: arabicRulesCourse.desc,
    })
  if (courseErr) throw courseErr

  // Insert the module (a course_lessons row).
  const { data: existing } = await supabase
    .from('course_lessons')
    .select('id')
    .eq('course_id', arabicRulesCourse.id)
    .eq('instructor_id', instructor.id)
    .eq('content->>title->>ar', 'حروف الجر')
    .maybeSingle()

  if (existing) {
    const { error: upErr } = await supabase
      .from('course_lessons')
      .update({ content: { title: haroofAlJarModule.title, questions: haroofAlJarModule.questions } })
      .eq('id', existing.id)
    if (upErr) throw upErr
    console.log('Updated existing module:', existing.id)
  } else {
    const { error: insErr } = await supabase
      .from('course_lessons')
      .insert({
        course_id: arabicRulesCourse.id,
        instructor_id: instructor.id,
        sort_order: 0,
        kind: haroofAlJarModule.kind,
        content: { title: haroofAlJarModule.title, questions: haroofAlJarModule.questions },
      })
    if (insErr) throw insErr
    console.log('Inserted new module.')
  }

  console.log('✓ Seed complete.')
}

main().catch((err) => {
  console.error('Seed failed:', err.message || err)
  process.exit(1)
})