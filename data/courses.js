/**
 * Mock course catalog.
 * This stands in for a real courses API/database — same shape either way,
 * so swapping this for a fetch() later should be a drop-in replacement.
 * `id`, `glyph`, `theme`, `type`, `price`, `progress`, `lessons` and `level`
 * are language-agnostic; `title`/`desc`/`levelLabel`/`instructor` are per-language.
 */

const base = [
  { id: 'alphabet',     glyph: 'ا', theme: 't1', level: 'beginner',     type: 'paid', price: 40, progress: 75, lessons: 28 },
  { id: 'arabic-rules', glyph: 'ك', theme: 't2', level: 'intermediate', type: 'paid', price: 25, progress: null, lessons: 32 },
]

const text = {
  en: {
    levels: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    items: {
      'alphabet': {
        title: 'Arabic Alphabet (Alef Ba2)',
        desc: 'Learn all 28 Arabic letters with correct pronunciation, articulation points, and example words. The perfect foundation for your Arabic journey.',
        instructor: 'Hamzat Wasl Team',
      },
      'arabic-rules': {
        title: 'Arabic Rules',
        desc: 'Grammar rules for Arabic learners — starting with the prepositions.',
        instructor: 'Hamzat Wasl Team',
      },
    },
  },
  ar: {
    levels: { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' },
    items: {
      'alphabet': {
        title: 'الأبجدية العربية (ألف باء)',
        desc: 'تعلم جميع الحروف العربية الثمانية والعشرين مع النطق الصحيح، ومخارج الحروف، وكلمات مثال. الأساس المثالي لرحلتك في تعلم العربية.',
        instructor: 'فريق همزة وصل',
      },
      'arabic-rules': {
        title: 'القواعد العربية',
        desc: 'قواعد النحو للمتعلمين — نبدأ بحروف الجر.',
        instructor: 'فريق همزة وصل',
      },
    },
  },
  zh: {
    levels: { beginner: '初级', intermediate: '中级', advanced: '高级' },
    items: {
      'alphabet': {
        title: '阿拉伯字母 (Alef Ba2)',
        desc: '学习全部 28 个阿拉伯字母，包括正确发音、发音部位和示例单词。为您阿拉伯语学习之旅打下完美基础。',
        instructor: 'Hamzat Wasl 团队',
      },
      'arabic-rules': {
        title: '阿拉伯语规则',
        desc: '面向阿拉伯语学习者的语法规则——从介词开始。',
        instructor: 'Hamzat Wasl 团队',
      },
    },
  },
}

export function getCourses(lang) {
  const dict = text[lang] || text.en
  return base.map((c) => ({
    ...c,
    levelLabel: dict.levels[c.level],
    ...dict.items[c.id],
  }))
}