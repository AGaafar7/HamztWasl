/**
 * Mock audio dictionary. `forms` covers the 5 dialects shown per entry;
 * `conjugations` mirrors a present/past table; `examples` link back to
 * videos in data/videos.js so "watch this in context" works end to end.
 */

export const dictionaryEntries = [
  {
    id: 'najah',
    searchTerms: ['i succeeded', 'succeed', 'نجحت', 'نجح'],
    arabic: 'نجحت',
    gloss: { en: '(I) succeeded, was successful, passed (an exam)', zh: '（我）成功了，考试及格了' },
    grammar: { en: '1st person, singular, past tense verb', zh: '第一人称单数，过去时动词' },
    root: 'ن ج ح',
    forms: [
      { dialect: 'msa', arabic: 'نجحت' },
      { dialect: 'egyptian', arabic: 'نجحت' },
      { dialect: 'levantine', arabic: 'نجحت' },
      { dialect: 'gulf', arabic: 'نجحت' },
      { dialect: 'darija', arabic: 'نجحت' },
    ],
    conjugations: {
      present: [
        { arabic: 'أنجح', label: { en: 'I', zh: '我' } },
        { arabic: 'تنجح', label: { en: 'you (m.)', zh: '你（男）' } },
        { arabic: 'تنجحي', label: { en: 'you (f.)', zh: '你（女）' } },
        { arabic: 'ينجح', label: { en: 'he', zh: '他' } },
        { arabic: 'تنجح', label: { en: 'she', zh: '她' } },
        { arabic: 'ننجح', label: { en: 'we', zh: '我们' } },
        { arabic: 'ينجحوا', label: { en: 'they', zh: '他们' } },
      ],
      past: [
        { arabic: 'نجحت', label: { en: 'I', zh: '我' } },
        { arabic: 'نجحت', label: { en: 'you', zh: '你' } },
        { arabic: 'نجح', label: { en: 'he', zh: '他' } },
        { arabic: 'نجحت', label: { en: 'she', zh: '她' } },
      ],
    },
    examples: [
      {
        arabic: 'بابا، بابا، بابا، أنا نجحت في الابتدائية.',
        gloss: { en: 'Dad, dad, dad, I passed my elementary school exams!', zh: '爸爸，爸爸，爸爸，我小学毕业考试通过了！' },
        dialect: 'egyptian',
      },
      {
        arabic: 'لكن في النهاية بعد مرور هالسنة، نجحت في الثانوية.',
        gloss: { en: 'But in the end, after this year, I passed high school.', zh: '但最终，经过这一年，我高中毕业了。' },
        dialect: 'levantine',
      },
    ],
  },
  {
    id: 'ashrab',
    searchTerms: ['i drink', 'drink', 'أشرب', 'شرب'],
    arabic: 'أشرب',
    gloss: { en: '(I) drink', zh: '（我）喝' },
    grammar: { en: '1st person, singular, present tense verb', zh: '第一人称单数，现在时动词' },
    root: 'ش ر ب',
    forms: [
      { dialect: 'msa', arabic: 'أشرَب' },
      { dialect: 'egyptian', arabic: 'أشرب' },
      { dialect: 'levantine', arabic: 'بشرب' },
      { dialect: 'gulf', arabic: 'أشرب' },
      { dialect: 'darija', arabic: 'نشرب' },
    ],
    conjugations: {
      present: [
        { arabic: 'أشرب', label: { en: 'I', zh: '我' } },
        { arabic: 'تشرب', label: { en: 'you (m.)', zh: '你（男）' } },
        { arabic: 'تشربي', label: { en: 'you (f.)', zh: '你（女）' } },
        { arabic: 'يشرب', label: { en: 'he', zh: '他' } },
        { arabic: 'تشرب', label: { en: 'she', zh: '她' } },
      ],
      past: [
        { arabic: 'شربت', label: { en: 'I', zh: '我' } },
        { arabic: 'شربت', label: { en: 'you', zh: '你' } },
        { arabic: 'شرب', label: { en: 'he', zh: '他' } },
      ],
    },
    examples: [
      {
        arabic: 'أنا بحب أشربها مظبوط، فهحط معلقة سكر واحدة.',
        gloss: { en: "I like it with a moderate amount of sugar, so I'm going to add just one teaspoon.", zh: '我喜欢适量的糖，所以我只加一勺。' },
        dialect: 'egyptian',
      },
      {
        arabic: 'والمية أشربها طول يومي.',
        gloss: { en: 'And I drink water all day.', zh: '我一整天都在喝水。' },
        dialect: 'egyptian',
      },
    ],
  },
  {
    id: 'kam-sana',
    searchTerms: ['how old are you', 'how old', 'كام سنة', 'عندك كام سنة'],
    arabic: 'كام سنة؟',
    gloss: { en: 'how old is/are (s.o.)?', zh: '（某人）多大了？' },
    grammar: { en: 'literally: how many years (one) has?', zh: '字面意思：（某人）有多少年？' },
    root: 'س ن ة',
    forms: [
      { dialect: 'msa', arabic: 'كم عمرك؟' },
      { dialect: 'egyptian', arabic: 'عندك كام سنة؟' },
      { dialect: 'levantine', arabic: 'قديش عمرك؟' },
      { dialect: 'gulf', arabic: 'كم عمرك؟' },
      { dialect: 'darija', arabic: 'شحال عمرك؟' },
    ],
    conjugations: null,
    examples: [
      {
        arabic: 'وعندك كام سنة؟ تسعتاشر.',
        gloss: { en: 'How old are you? Nineteen.', zh: '你多大了？十九岁。' },
        dialect: 'levantine',
      },
    ],
  },
]

export function searchDictionary(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return dictionaryEntries.filter((entry) =>
    entry.searchTerms.some((term) => term.toLowerCase().includes(q) || q.includes(term.toLowerCase()))
  )
}
