// data/arabic-rules.js
//
// Initial content for the "Arabic Rules" (القواعد العربية) course and
// its "حروف الجر" module (multiple choice).

export const arabicRulesCourse = {
  id: 'arabic-rules',
  glyph: 'ق',
  theme: 't3',
  level: 'intermediate',
  type: 'free',
  price: 0,
  status: 'published',
  title: {
    en: 'Arabic Rules',
    ar: 'القواعد العربية',
    zh: '阿拉伯语规则',
  },
  desc: {
    en: 'Grammar rules for Arabic learners — starting with the prepositions.',
    ar: 'قواعد النحو للمتعلمين — نبدأ بحروف الجر.',
    zh: '面向阿拉伯语学习者的语法规则——从介词开始。',
  },
}

export const haroofAlJarModule = {
  kind: 'multiplechoice',
  title: {
    en: 'Prepositions — Haroof al-Jar',
    ar: 'حروف الجر',
    zh: '介词 — 哈鲁夫·阿尔·贾尔',
  },
  questions: [
    {
      id: 'hj-q1',
      prompt: 'الكتاب ___ الطاولة.',
      options: [
        { id: 'hj-q1-a', text: 'في' },
        { id: 'hj-q1-b', text: 'على' },
        { id: 'hj-q1-c', text: 'من' },
        { id: 'hj-q1-d', text: 'إلى' },
      ],
      correctOptionId: 'hj-q1-b',
      whyCorrect: {
        en: '"على" (ʿalā) means "on / on top of". A book resting on a table is described with "على".',
        ar: '"على" تفيد الاستعلاء، والكتاب فوق الطاولة، فهي المناسبة هنا.',
        zh: '“على” 表示“在……上面”。书在桌子上，所以用“على”。',
      },
      whyWrong: {
        'hj-q1-a': {
          en: '"في" (fī) means "in / inside". A book is not inside a table.',
          ar: '"في" تفيد الظرفية، والكتاب ليس داخل الطاولة.',
          zh: '“في” 表示“在……里面”。书不在桌子里。',
        },
        'hj-q1-c': {
          en: '"من" (min) means "from". It indicates origin, not position on something.',
          ar: '"من" تفيد الابتداء، ولا تفيد الاستعلاء.',
          zh: '“من” 表示“从……”，表示来源，不表示在什么上面。',
        },
        'hj-q1-d': {
          en: '"إلى" (ilā) means "to / towards". It indicates direction, not position.',
          ar: '"إلى" تفيد الانتهاء، ولا تدل على استقرار الكتاب على الطاولة.',
          zh: '“إلى” 表示“到……”，表示方向，不表示位置。',
        },
      },
    },
    {
      id: 'hj-q2',
      prompt: 'ذهبتُ ___ المدرسة.',
      options: [
        { id: 'hj-q2-a', text: 'في' },
        { id: 'hj-q2-b', text: 'على' },
        { id: 'hj-q2-c', text: 'إلى' },
        { id: 'hj-q2-d', text: 'عن' },
      ],
      correctOptionId: 'hj-q2-c',
      whyCorrect: {
        en: '"إلى" (ilā) means "to", and is used with verbs of movement to indicate destination.',
        ar: '"إلى" تفيد الانتهاء، وهي المناسبة مع أفعال الحركة مثل "ذهبتُ".',
        zh: '“إلى” 表示“到……”，用于表示移动的动词后，指明目的地。',
      },
      whyWrong: {
        'hj-q2-a': {
          en: '"في" would mean "inside" — you are inside the school, but the verb "went" needs a destination, not a location.',
          ar: '"في" تفيد الظرفية، والفعل "ذهبتُ" يحتاج إلى غاية لا ظرف.',
          zh: '“في” 表示“在……里面”。动词“去”需要的是目的地，不是位置。',
        },
        'hj-q2-b': {
          en: '"على" means "on top of" — you are not on top of the school.',
          ar: '"على" تفيد الاستعلاء، ولا يصح هنا.',
          zh: '“على” 表示“在……上面”，此处不适用。',
        },
        'hj-q2-d': {
          en: '"عن" means "about / away from" — it does not mark a destination.',
          ar: '"عن" تفيد المجاوزة أو البعد، ولا تدل على الغاية.',
          zh: '“عن” 表示“关于 / 远离”，不表示目的地。',
        },
      },
    },
    {
      id: 'hj-q3',
      prompt: 'أنا ___ مصر.',
      options: [
        { id: 'hj-q3-a', text: 'من' },
        { id: 'hj-q3-b', text: 'إلى' },
        { id: 'hj-q3-c', text: 'على' },
        { id: 'hj-q3-d', text: 'في' },
      ],
      correctOptionId: 'hj-q3-a',
      whyCorrect: {
        en: '"من" (min) means "from", and is used to say where someone originates.',
        ar: '"من" تفيد الابتداء، وهي المناسبة للتعبير عن الأصل أو المنشأ.',
        zh: '“من” 表示“来自”，用于说明来自哪里。',
      },
      whyWrong: {
        'hj-q3-b': {
          en: '"إلى" means "to" — used for destination, not origin.',
          ar: '"إلى" للغاية، لا للأصل.',
          zh: '“إلى” 表示“到……”，表示目的地，不表示来源。',
        },
        'hj-q3-c': {
          en: '"على" means "on top of" — does not fit a statement of origin.',
          ar: '"على" للاستعلاء، ولا تصح هنا.',
          zh: '“على” 表示“在……上面”，此处不适用。',
        },
        'hj-q3-d': {
          en: '"في" means "in" — describes current location, not where someone is from.',
          ar: '"في" للظرفية، ولا تفيد الأصل.',
          zh: '“في” 表示“在……里面”，说明所在位置，不表示来自哪里。',
        },
      },
    },
    {
      id: 'hj-q4',
      prompt: 'تحدثنا ___ الدرس.',
      options: [
        { id: 'hj-q4-a', text: 'عن' },
        { id: 'hj-q4-b', text: 'في' },
        { id: 'hj-q4-c', text: 'إلى' },
        { id: 'hj-q4-d', text: 'على' },
      ],
      correctOptionId: 'hj-q4-a',
      whyCorrect: {
        en: '"عن" (ʿan) means "about", and is used with verbs like "talked" to indicate the topic.',
        ar: '"عن" تفيد المجاوزة، وتُستعمل مع أفعال مثل "تحدث" للدلالة على الموضوع.',
        zh: '“عن” 表示“关于”，与“谈论”等动词连用，指出话题。',
      },
      whyWrong: {
        'hj-q4-b': {
          en: '"في" would mean "in" — a location, not a topic.',
          ar: '"في" للظرفية، لا للموضوع.',
          zh: '“في” 表示位置，不是话题。',
        },
        'hj-q4-c': {
          en: '"إلى" means "to" — used for direction or destination.',
          ar: '"إلى" للغاية، ولا تفيد الموضوع.',
          zh: '“إلى” 表示方向或目的地，不表示话题。',
        },
        'hj-q4-d': {
          en: '"على" means "on" — does not fit with "talked about".',
          ar: '"على" للاستعلاء، ولا تصح مع "تحدث".',
          zh: '“على” 表示“在……上面”，此处不适用。',
        },
      },
    },
    {
      id: 'hj-q5',
      prompt: 'كتبتُ ___ القلم.',
      options: [
        { id: 'hj-q5-a', text: 'بـ' },
        { id: 'hj-q5-b', text: 'من' },
        { id: 'hj-q5-c', text: 'إلى' },
        { id: 'hj-q5-d', text: 'في' },
      ],
      correctOptionId: 'hj-q5-a',
      whyCorrect: {
        en: '"بـ" (bāʾ) is used to indicate the instrument or tool with which something is done — "I wrote with the pen."',
        ar: '"الباء" تفيد الاستعانة، وهي المناسبة للدلالة على الأداة.',
        zh: '“بـ” 表示所用的工具或手段，“我用笔写”。',
      },
      whyWrong: {
        'hj-q5-b': {
          en: '"من" means "from" — describes origin, not the tool used.',
          ar: '"من" للابتداء، لا للاستعانة.',
          zh: '“من” 表示来源，不表示所用工具。',
        },
        'hj-q5-c': {
          en: '"إلى" means "to" — used for direction.',
          ar: '"إلى" للغاية، ولا تفيد الأداة.',
          zh: '“إلى” 表示方向。',
        },
        'hj-q5-d': {
          en: '"في" means "in" — a location, not an instrument.',
          ar: '"في" للظرفية، لا للأداة.',
          zh: '“في” 表示位置，不表示工具。',
        },
      },
    },
    {
      id: 'hj-q6',
      prompt: 'هو ___ أخيه.',
      options: [
        { id: 'hj-q6-a', text: 'كـ' },
        { id: 'hj-q6-b', text: 'في' },
        { id: 'hj-q6-c', text: 'إلى' },
        { id: 'hj-q6-d', text: 'من' },
      ],
      correctOptionId: 'hj-q6-a',
      whyCorrect: {
        en: '"كـ" (kāf) means "like / as" — used for comparison.',
        ar: '"الكاف" تفيد التشبيه، وهي المناسبة هنا.',
        zh: '“كـ” 表示“像 / 如同”，用于比较。',
      },
      whyWrong: {
        'hj-q6-b': {
          en: '"في" means "in" — a location, not a comparison.',
          ar: '"في" للظرفية، لا للتشبيه.',
          zh: '“في” 表示位置，不表示比较。',
        },
        'hj-q6-c': {
          en: '"إلى" means "to" — direction, not comparison.',
          ar: '"إلى" للغاية، لا للتشبيه.',
          zh: '“إلى” 表示方向，不表示比较。',
        },
        'hj-q6-d': {
          en: '"من" means "from" — origin, not comparison.',
          ar: '"من" للابتداء، لا للتشبيه.',
          zh: '“من” 表示来源，不表示比较。',
        },
      },
    },
  ],
}