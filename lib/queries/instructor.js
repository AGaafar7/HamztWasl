// lib/queries/instructor.js
import { createClient } from '../supabase/server'

// These two are policy, not per-instructor data — same for everyone.
// If you ever need per-instructor overrides, move them into profiles.
const PAYOUT_SCHEDULE = 'Monthly, on the 15th'

function nextPayoutDate() {
  const now = new Date()
  const d = new Date(now.getFullYear(), now.getMonth(), 15)
  if (d <= now) d.setMonth(d.getMonth() + 1)
  return d.toISOString().slice(0, 10)
}

export async function fetchInstructorCourses(instructorId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('courses')
    .select('id, title, level, type, price, lessons_count, status, created_at, updated_at')
    .eq('instructor_id', instructorId)
    .order('created_at', { ascending: false })
  if (error) throw error

  return (data || []).map((c) => ({
    id: c.id,
    title: c.title,                    // { en, ar, zh }
    level: c.level,
    type: c.type,
    price: Number(c.price),
    lessons: c.lessons_count,
    status: c.status,
    createdAt: c.created_at?.slice(0, 10),
    updatedAt: c.updated_at?.slice(0, 10),
  }))
}

/*export async function fetchInstructorPractices(instructorId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('practices')
    .select('id, title, type, status, course_id, created_at, courses:course_id ( title )')
    .eq('instructor_id', instructorId)
    .order('created_at', { ascending: false })
  if (error) throw error

  return (data || []).map((p) => ({
    id: p.id,
    title: p.title,
    type: p.type,
    status: p.status,
    courseId: p.course_id,
    courseTitle: p.courses?.title || null,   // jsonb, same shape as courses.title
    // These two columns don't exist in the schema yet. Zeros until we
    // add an aggregates view in step 4.
    attempts: 0,
    avgScore: 0,
  }))
}*/

export async function fetchInstructorEarnings(instructorId) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('transactions')
    .select('id, course_id, student_email, amount, currency, status, created_at, courses:course_id ( title )')
    .eq('instructor_id', instructorId)
    .order('created_at', { ascending: false })
  if (error) throw error

  const rows = (data || []).map((t) => ({
    id: t.id,
    date: t.created_at?.slice(0, 10),
    courseTitle: t.courses?.title || null,
    student: t.student_email,
    amount: Number(t.amount),
    status: t.status,
  }))

  const now = new Date()
  const thisMonth = now.getMonth()
  const thisYear = now.getFullYear()
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear

  let total = 0
  let thisMonthSum = 0
  let lastMonthSum = 0
  let pending = 0

  for (const t of rows) {
    const d = new Date(t.date)
    if (t.status === 'paid') {
      total += t.amount
      if (d.getMonth() === thisMonth && d.getFullYear() === thisYear) thisMonthSum += t.amount
      if (d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear) lastMonthSum += t.amount
    }
    if (t.status === 'pending') pending += t.amount
  }

  return {
    total,
    thisMonth: thisMonthSum,
    lastMonth: lastMonthSum,
    pending,
    currency: 'USD',
    payoutSchedule: PAYOUT_SCHEDULE,
    nextPayout: nextPayoutDate(),
    transactions: rows,
  }
}

/**
 * Aggregated numbers for the dashboard: enrolled students across the
 * instructor's courses, and count of authoring practices (listening,
 * reading, speaking lessons) — not the legacy `practices` table.
 */
export async function fetchInstructorStats(instructorId) {
  const supabase = await createClient()

  // Courses owned by this instructor.
  const { data: courses, error: courseErr } = await supabase
    .from('courses')
    .select('id')
    .eq('instructor_id', instructorId)
  if (courseErr) throw courseErr

  const courseIds = (courses || []).map((c) => c.id)

  // Enrollments across those courses (deduplicated by user).
  let studentCount = 0
  if (courseIds.length > 0) {
    const { data: enrollments, error: enrErr } = await supabase
      .from('enrollments')
      .select('user_id')
      .in('course_id', courseIds)
    if (enrErr) throw enrErr
    studentCount = new Set((enrollments || []).map((e) => e.user_id)).size
  }

  // All lessons authored by this instructor (course lessons + standalone).
  const { data: allLessons, error: lessonErr } = await supabase
    .from('course_lessons')
    .select('id')
    .eq('instructor_id', instructorId)
  if (lessonErr) throw lessonErr

  return {
    studentCount,
    lessonCount: (allLessons || []).length,
  }
}