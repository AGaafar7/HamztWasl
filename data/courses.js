/**
 * Mock course catalog.
 * This stands in for a real courses API/database — same shape either way,
 * so swapping this for a fetch() later should be a drop-in replacement.
 * `id`, `glyph`, `theme`, `type`, `price`, `progress`, `lessons` and `level`
 * are language-agnostic; `title`/`desc`/`levelLabel`/`instructor` are per-language.
 */

const base = [
   {
    id: 'alphabet',
    glyph: 'ا',
    theme: 't1',
    level: 'beginner',
    type: 'free',
    price: 0,
    progress: 0,
    lessons: 28,
  },
  { id: 'alphabet-101', glyph: 'ا', theme: 't1', level: 'beginner', type: 'free', price: 0, progress: 75, lessons: 24 },
  { id: 'everyday-conversation', glyph: 'ك', theme: 't2', level: 'intermediate', type: 'paid', price: 39, progress: null, lessons: 32 },
  { id: 'reading-msa', glyph: 'ق', theme: 't3', level: 'advanced', type: 'paid', price: 59, progress: null, lessons: 28 },
  { id: 'numbers-counting', glyph: 'ب', theme: 't1', level: 'beginner', type: 'free', price: 0, progress: null, lessons: 12 },
  { id: 'arabic-for-travel', glyph: 'ن', theme: 't2', level: 'intermediate', type: 'free', price: 0, progress: 30, lessons: 18 },
  { id: 'business-arabic', glyph: 'ج', theme: 't3', level: 'advanced', type: 'paid', price: 79, progress: null, lessons: 36 },
]

const text = {
  en: {
    levels: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    items: {
     'alphabet': { 
        title: 'Arabic Alphabet (Alef Ba2)', 
        desc: 'Learn all 28 Arabic letters with correct pronunciation, articulation points, and example words. The perfect foundation for your Arabic journey.', 
        instructor: 'Hamzat Wasl Team' 
      },
      'alphabet-101': { title: 'The Arabic Alphabet, from Scratch', desc: 'All 28 letters, their sounds, and how they connect — built for absolute beginners.', instructor: 'Yusuf A.' },
      'everyday-conversation': { title: 'Everyday Conversation', desc: 'Order food, ask directions, and hold a real conversation with confidence.', instructor: 'Layla H.' },
      'reading-msa': { title: 'Reading Modern Standard Arabic', desc: 'Move from spoken Arabic to reading news, signage, and everyday text.', instructor: 'Omar S.' },
      'numbers-counting': { title: 'Numbers & Counting', desc: 'Master Arabic numerals, prices, dates, and telling time.', instructor: 'Yusuf A.' },
      'arabic-for-travel': { title: 'Arabic for Travelers', desc: 'Airports, taxis, hotels, and markets — the phrases you actually need on a trip.', instructor: 'Layla H.' },
      'business-arabic': { title: 'Business Arabic Essentials', desc: 'Meetings, emails, and negotiation language for professional settings.', instructor: 'Omar S.' },
    },
  },
  ar: {
    levels: { beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم' },
    items: {
      'alphabet': { 
        title: 'الأبجدية العربية (ألف باء)', 
        desc: 'تعلم جميع الهمزة وصل العربية الثمانية والعشرين مع النطق الصحيح، مخارج الهمزة وصل، وكلمات مثال. الأساس المثالي لرحلتك في تعلم العربية.', 
        instructor: 'فريق همزة وصل' 
      },
      'alphabet-101': { title: 'الأبجدية العربية من الصفر', desc: 'الهمزة وصل الـ28 كاملة، أصواتها، وكيفية اتصالها ببعضها — مصممة للمبتدئين تمامًا.', instructor: 'يوسف أ.' },
      'everyday-conversation': { title: 'محادثة يومية', desc: 'اطلب الطعام، اسأل عن الاتجاهات، وتحدّث بثقة في مواقف حقيقية.', instructor: 'ليلى ح.' },
      'reading-msa': { title: 'قراءة العربية الفصحى', desc: 'انتقل من التحدث إلى قراءة الأخبار واللافتات والنصوص اليومية.', instructor: 'عمر س.' },
      'numbers-counting': { title: 'الأرقام والعد', desc: 'أتقن الأرقام العربية، والأسعار، والتواريخ، وقول الوقت.', instructor: 'يوسف أ.' },
      'arabic-for-travel': { title: 'العربية للمسافرين', desc: 'المطارات وسيارات الأجرة والفنادق والأسواق — العبارات التي تحتاجها فعلاً في السفر.', instructor: 'ليلى ح.' },
      'business-arabic': { title: 'أساسيات عربية الأعمال', desc: 'لغة الاجتماعات والبريد الإلكتروني والتفاوض في البيئة المهنية.', instructor: 'عمر س.' },
    },
  },
  zh: {
    levels: { beginner: '初级', intermediate: '中级', advanced: '高级' },
    items: {
       'alphabet': { 
        title: '阿拉伯字母 (Alef Ba2)', 
        desc: '学习全部28个阿拉伯字母，包括正确发音、发音部位和示例单词。为您阿拉伯语学习之旅打下完美基础。', 
        instructor: 'Hamzat Wasl 团队' 
      },
      'alphabet-101': { title: '从零开始的阿拉伯字母', desc: '完整的28个字母及其发音，以及它们如何连接——专为完全初学者设计。', instructor: '优素福 A.' },
      'everyday-conversation': { title: '日常对话', desc: '点餐、问路，自信地进行真实对话。', instructor: '莱拉 H.' },
      'reading-msa': { title: '阅读标准阿拉伯语', desc: '从口语过渡到阅读新闻、标识和日常文本。', instructor: '奥马尔 S.' },
      'numbers-counting': { title: '数字与计数', desc: '掌握阿拉伯数字、价格、日期和报时表达。', instructor: '优素福 A.' },
      'arabic-for-travel': { title: '旅行阿拉伯语', desc: '机场、出租车、酒店和市场——旅行中真正用得上的表达。', instructor: '莱拉 H.' },
      'business-arabic': { title: '商务阿拉伯语基础', desc: '面向职场场景的会议、邮件与谈判用语。', instructor: '奥马尔 S.' },
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
