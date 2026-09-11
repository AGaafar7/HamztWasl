// data/instructor.js
/**
 * Mock instructor data. All of this will come from the database later.
 * For now, we hard-code the demo instructor (Yusuf A.) and give him
 * a couple of courses, sales, and practices.
 */

export const MOCK_INSTRUCTOR_EMAIL = 'yusuf@huroof.com'

export const instructorProfile = {
  name: 'Yusuf A.',
  email: MOCK_INSTRUCTOR_EMAIL,
  bio: 'Native Arabic instructor with 8 years of teaching experience. Specialised in MSA and Levantine.',
  joinedAt: '2025-01-15',
  avatar: 'Y',
}

export const instructorCourses = [
  {
    id: 'alphabet-101',
    title: { en: 'The Arabic Alphabet, from Scratch', ar: 'الأبجدية العربية من الصفر', zh: '从零开始的阿拉伯字母' },
    level: 'beginner',
    type: 'free',
    price: 0,
    lessons: 24,
    status: 'published',
    students: 342,
    sales: 0,
    revenue: 0,
    rating: 4.8,
    createdAt: '2025-02-10',
    updatedAt: '2025-04-22',
  },
  {
    id: 'everyday-conversation',
    title: { en: 'Everyday Conversation', ar: 'محادثة يومية', zh: '日常对话' },
    level: 'intermediate',
    type: 'paid',
    price: 39,
    lessons: 32,
    status: 'published',
    students: 128,
    sales: 128,
    revenue: 4992,
    rating: 4.7,
    createdAt: '2025-03-05',
    updatedAt: '2025-05-01',
  },
  {
    id: 'numbers-counting',
    title: { en: 'Numbers & Counting', ar: 'الأرقام والعد', zh: '数字与计数' },
    level: 'beginner',
    type: 'free',
    price: 0,
    lessons: 12,
    status: 'draft',
    students: 0,
    sales: 0,
    revenue: 0,
    rating: null,
    createdAt: '2026-01-10',
    updatedAt: '2026-01-12',
  },
]

export const instructorPractices = [
  {
    id: 'p-listen-01',
    title: 'Listening — Greetings',
    type: 'listening',
    courseId: 'alphabet-101',
    status: 'published',
    attempts: 1240,
    avgScore: 82,
    createdAt: '2025-04-01',
  },
  {
    id: 'p-read-01',
    title: 'Reading — Introducing Yourself',
    type: 'reading',
    courseId: 'everyday-conversation',
    status: 'published',
    attempts: 420,
    avgScore: 71,
    createdAt: '2025-04-15',
  },
  {
    id: 'p-speak-01',
    title: 'Speaking — Letter Names',
    type: 'speaking',
    courseId: 'alphabet-101',
    status: 'published',
    attempts: 890,
    avgScore: 76,
    createdAt: '2025-04-28',
  },
]

export const instructorEarnings = {
  total: 4820.00,
  thisMonth: 820.00,
  lastMonth: 740.00,
  pending: 210.00,
  currency: 'USD',
  payoutSchedule: 'Monthly, on the 15th',
  nextPayout: '2026-04-15',
  transactions: [
    { id: 'tx-01', date: '2026-03-28', course: 'Everyday Conversation', amount: 39, student: 'ahmed@example.com' },
    { id: 'tx-02', date: '2026-03-26', course: 'Everyday Conversation', amount: 39, student: 'mei@example.com' },
    { id: 'tx-03', date: '2026-03-22', course: 'Everyday Conversation', amount: 39, student: 'karl@example.com' },
    { id: 'tx-04', date: '2026-03-18', course: 'Everyday Conversation', amount: 39, student: 'sora@example.com' },
    { id: 'tx-05', date: '2026-03-12', course: 'Everyday Conversation', amount: 39, student: 'jin@example.com' },
    { id: 'tx-06', date: '2026-03-08', course: 'Everyday Conversation', amount: 39, student: 'siti@example.com' },
  ],
}