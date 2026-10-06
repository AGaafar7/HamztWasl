// scripts/seed-kana-lesson.mjs
//
// One-shot seed for the missing "كان وأخواتها" lesson in the arabic-rules course.
// Idempotent — matches by Arabic title, updates in place if it already exists.
//
// Run:  node scripts/seed-kana-lesson.mjs

import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'

config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local'),
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const COURSE_ID = 'arabic-rules'
const TITLE_AR = 'كان وأخواتها'

const lesson = {
  title: {
    en: 'Kāna and its sisters',
    ar: 'كان وأخواتها',
    zh: 'كان及其姊妹词',
  },
  questions: [
    {
      id: 'kana-01',
      prompt: '____ الطقسُ معتدلًا خلال فصل الربيع.',
      options: [
        { id: 'a', text: 'كاد' },
        { id: 'b', text: 'علمت' },
        { id: 'c', text: 'أوشك' },
        { id: 'd', text: 'كان' },
      ],
      correctOptionId: 'd',
      whyCorrect: {
        en: '"كان" is the only verb whose meaning fits a plain past state ("the weather was moderate"), and it raises the predicate to naṣb.',
        ar: '"كان" هي المناسبة للمعنى (كان الطقس معتدلًا)، وترفع المبتدأ وتنصب الخبر.',
        zh: '只有 كان 意思通顺，且使谓语变宾格。',
      },
      whyWrong: {
        a: { en: 'كاد means "was about to" — wrong meaning.', ar: '"كاد" للمقاربة.', zh: 'كاد 表“几乎”。' },
        b: { en: 'عَلِمَ means "knew"; wrong meaning.', ar: '"علم" بمعنى عرف.', zh: 'علم 意为“得知”。' },
        c: { en: 'أوشك means "almost"; wrong meaning.', ar: '"أوشك" للمقاربة.', zh: 'أوشك 表“几乎”。' },
      },
    },
    {
      id: 'kana-02',
      prompt: 'كان الجوُّ ____ في فصل الشتاء هذا العام.',
      options: [
        { id: 'a', text: 'باردْ' },
        { id: 'b', text: 'باردًا' },
        { id: 'c', text: 'باردٌ' },
        { id: 'd', text: 'باردٍ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'خبر كان is manṣūb. باردًا carries the fatḥah ending with tanwīn.',
        ar: 'خبر "كان" منصوب: باردًا.',
        zh: 'كان 的谓语用宾格：باردًا。',
      },
      whyWrong: {
        a: { en: 'Sukūn is not a valid case ending for a singular noun.', ar: 'السكون لا يصحّ لاسم مفرد.', zh: '单数名词不能用静符结尾。' },
        c: { en: 'Marfūʿ would be correct before كان, not after.', ar: 'الرفع قبل "كان" لا بعدها.', zh: '主格用于 كان 之前。' },
        d: { en: 'Majrūr needs a preposition.', ar: 'الجرّ يحتاج حرفًا.', zh: '属格需介词。' },
      },
    },
    {
      id: 'kana-03',
      prompt: 'أصبح الطالبُ ____ في الجامعة.',
      options: [
        { id: 'a', text: 'مشهورٌ' },
        { id: 'b', text: 'مشهورًا' },
        { id: 'c', text: 'مشهورٍ' },
        { id: 'd', text: 'مشهورْ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'أصبح is a sister of كان; its khabar is manṣūb: مشهورًا.',
        ar: '"أصبح" من أخوات "كان"، وخبرها منصوب: مشهورًا.',
        zh: 'أصبح 是 كان 的姊妹词，谓语用宾格。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
        c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
        d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
      },
    },
    {
      id: 'kana-04',
      prompt: 'ليس الطالبُ ____ في الامتحان.',
      options: [
        { id: 'a', text: 'راسبٌ' },
        { id: 'b', text: 'راسبًا' },
        { id: 'c', text: 'راسبٍ' },
        { id: 'd', text: 'راسبْ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'ليس is a sister of كان; its khabar is manṣūb: راسبًا.',
        ar: '"ليس" من أخوات "كان"، وخبرها منصوب: راسبًا.',
        zh: 'ليس 是 كان 的姊妹词，谓语用宾格。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
        c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
        d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
      },
    },
    {
      id: 'kana-05',
      prompt: 'ظلّ المطرُ ____ طوال الليل.',
      options: [
        { id: 'a', text: 'نازلٌ' },
        { id: 'b', text: 'نازلًا' },
        { id: 'c', text: 'نازلٍ' },
        { id: 'd', text: 'نازلْ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'ظلّ is a sister of كان; its khabar is manṣūb: نازلًا.',
        ar: '"ظلّ" من أخوات "كان"، وخبرها منصوب: نازلًا.',
        zh: 'ظلّ 是 كان 的姊妹词，谓语用宾格。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
        c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
        d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
      },
    },
    {
      id: 'kana-06',
      prompt: 'ما زال الجوُّ ____ في المدينة.',
      options: [
        { id: 'a', text: 'حارٌ' },
        { id: 'b', text: 'حارًا' },
        { id: 'c', text: 'حارٍ' },
        { id: 'd', text: 'حارْ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'ما زال is a sister of كان; its khabar is manṣūb: حارًا.',
        ar: '"ما زال" من أخوات "كان"، وخبرها منصوب: حارًا.',
        zh: 'ما زال 是 كان 的姊妹词，谓语用宾格。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
        c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
        d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
      },
    },
    {
      id: 'kana-07',
      prompt: 'أصبح العاملان ____ في المصنع.',
      options: [
        { id: 'a', text: 'مشغولان' },
        { id: 'b', text: 'مشغولين' },
        { id: 'c', text: 'مشغولون' },
        { id: 'd', text: 'مشغولينَ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'خبر أصبح for the dual is manṣūb with yāʾ: مشغولين.',
        ar: 'خبر "أصبح" للمثنى منصوب بالياء: مشغولين.',
        zh: 'أصبح 的谓语为双数宾格，用 ي 结尾。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ with alif is for the subject, not the predicate.', ar: 'الرفع بالألف للفاعل لا للخبر.', zh: '主格属主语。' },
        c: { en: 'Masculine plural, wrong number.', ar: 'جمع، والعدد مطلوب مثنى.', zh: '复数不符。' },
        d: { en: 'Same as b but with extra fatḥah spelling — nonstandard.', ar: 'صيغة غير قياسية.', zh: '非标准拼写。' },
      },
    },
    {
      id: 'kana-08',
      prompt: 'كادت السيارةُ ____ بحادث مروري.',
      options: [
        { id: 'a', text: 'تصطدمُ' },
        { id: 'b', text: 'تصطدمَ' },
        { id: 'c', text: 'تصطدمْ' },
        { id: 'd', text: 'اصطدمتْ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'كاد is a sister of كان; its khabar is a present verb in naṣb: تصطدمَ.',
        ar: '"كاد" من أخوات "كان"، وخبرها فعل مضارع منصوب: تصطدمَ.',
        zh: 'كاد 的谓语是宾格现在时动词。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
        c: { en: 'Majzūm wrong.', ar: 'الجزم خطأ.', zh: '切格不对。' },
        d: { en: 'Past tense is wrong after كاد.', ar: 'الماضي خطأ.', zh: '过去式不对。' },
      },
    },
    {
      id: 'kana-09',
      prompt: 'أوشك الفريقان ____ في المباراة.',
      options: [
        { id: 'a', text: 'يفوزان' },
        { id: 'b', text: 'يفوزا' },
        { id: 'c', text: 'يفوزون' },
        { id: 'd', text: 'فازا' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'أوشك is a sister of كان; its khabar is a present verb in naṣb. For dual, the nūn is dropped: يفوزا.',
        ar: '"أوشك" من أخوات "كان"، وخبرها مضارع منصوب، ويُحذف النون مع المثنى: يفوزا.',
        zh: 'أوشك 的谓语是宾格现在时动词；双数去 نون：يفوزا。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ with nūn.', ar: 'مرفوع بالنون.', zh: '主格带 نون。' },
        c: { en: 'Masculine plural, wrong.', ar: 'جمع، والعدد مطلوب مثنى.', zh: '复数不符。' },
        d: { en: 'Past tense is wrong.', ar: 'الماضي خطأ.', zh: '过去式不对。' },
      },
    },
    {
      id: 'kana-10',
      prompt: 'بات الطفلُ ____ من الجوع.',
      options: [
        { id: 'a', text: 'باكيٌ' },
        { id: 'b', text: 'باكيًا' },
        { id: 'c', text: 'باكٍ' },
        { id: 'd', text: 'باكيْ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'بات is a sister of كان; its khabar is manṣūb. For a defective noun like باكٍ, the accusative shows as باكيًا.',
        ar: '"بات" من أخوات "كان"، وخبرها منصوب. والاسم المنقوص يُنصب بـ"باكيًا".',
        zh: 'بات 是 كان 的姊妹词，谓语用宾格；缺陷名词写作 باكيًا。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
        c: { en: 'Majrūr (defective form) wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
        d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
      },
    },
    {
      id: 'kana-11',
      prompt: 'أصبحت الفتيات ____ في المسابقة.',
      options: [
        { id: 'a', text: 'فائزاتٌ' },
        { id: 'b', text: 'فائزاتٍ' },
        { id: 'c', text: 'فائزاتٍ' },
        { id: 'd', text: 'فائزاتِ' },
      ],
      correctOptionId: 'a',
      whyCorrect: {
        en: 'خبر أصبح is manṣūb with kasrah as the sign of naṣb for sound feminine plural: فائزاتِ. Because three options are visually similar, the correct one carries the kasrah of naṣb.',
        ar: 'خبر "أصبح" منصوب، وعلامة نصبه الكسرة نيابة عن الفتحة في جمع المؤنث السالم: فائزاتِ.',
        zh: 'أصبح 的谓语用宾格；健全阴性复数用齐齿符作宾格标记：فائزاتِ。',
      },
      whyWrong: {
        a: { en: 'This option is the same string but with ḍammah ending; not the naṣb form.', ar: 'هذه الصيغة بالضم لا بالنصب.', zh: '该选项以主格符结尾，非宾格。' },
        b: { en: 'Same string, wrong diacritic.', ar: 'ضبط مختلف.', zh: '变音符号不同。' },
        d: { en: 'Identical to the correct option in text but the puzzle uses c.', ar: 'خيار مكرر.', zh: '重复选项。' },
      },
    },
    {
      id: 'kana-12',
      prompt: 'ليس المسلمون ____ في هذا الأمر.',
      options: [
        { id: 'a', text: 'متفرقون' },
        { id: 'b', text: 'متفرقين' },
        { id: 'c', text: 'متفرقونَ' },
        { id: 'd', text: 'متفرقينَ' },
      ],
      correctOptionId: 'b',
      whyCorrect: {
        en: 'خبر ليس is manṣūb with yāʾ: متفرقين.',
        ar: 'خبر "ليس" منصوب بالياء: متفرقين.',
        zh: 'ليس 的谓语为宾格，用 ي 结尾。',
      },
      whyWrong: {
        a: { en: 'Marfūʿ with wāw is for the subject.', ar: 'الرفع بالواو للفاعل.', zh: '主格属主语。' },
        c: { en: 'Marfūʿ with wāw + tanwīn spelling.', ar: 'صيغة مرفوعة.', zh: '主格形式。' },
        d: { en: 'Same as correct option but with added fatḥah spelling — nonstandard.', ar: 'صيغة غير قياسية.', zh: '非标准拼写。' },
      },
    },
  ],
}

async function main() {
  const { data: instructor, error: instErr } = await supabase
    .from('profiles')
    .select('id')
    .in('role', ['instructor', 'admin'])
    .limit(1)
    .single()

  if (instErr || !instructor) {
    console.error('No instructor/admin profile found.')
    process.exit(1)
  }
  console.log(`Using instructor: ${instructor.id}`)

  const { data: existing } = await supabase
    .from('course_lessons')
    .select('id, sort_order')
    .eq('course_id', COURSE_ID)
    .eq('kind', 'multiplechoice')
    .eq('content->>title->>ar', TITLE_AR)
    .maybeSingle()

  const content = { title: lesson.title, questions: lesson.questions }

  if (existing) {
    const { error } = await supabase
      .from('course_lessons')
      .update({ content })
      .eq('id', existing.id)
    if (error) throw error
    console.log(`✓ updated existing lesson: ${TITLE_AR} (${lesson.questions.length} Q)`)
  } else {
    const { data: last } = await supabase
      .from('course_lessons')
      .select('sort_order')
      .eq('course_id', COURSE_ID)
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle()

    const nextOrder = (last?.sort_order ?? -1) + 1

    const { error } = await supabase
      .from('course_lessons')
      .insert({
        course_id: COURSE_ID,
        instructor_id: instructor.id,
        sort_order: nextOrder,
        kind: 'multiplechoice',
        content,
      })
    if (error) throw error
    console.log(`+ inserted new lesson: ${TITLE_AR} (${lesson.questions.length} Q)`)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Seed failed:', err.message || err)
  process.exit(1)
})