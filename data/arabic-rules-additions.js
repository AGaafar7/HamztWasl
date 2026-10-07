// data/arabic-rules-additions.js
//
// Additional questions for the Arabic rules course, extracted from the
// 2009 and 2022 Chinese national Arabic-major exams. Each entry here
// appends to an existing lesson in the course, matched by Arabic title.
//
// Question IDs are prefixed with 'x-' (original pass) or 'x2-' (second
// pass) to avoid collision with the original question IDs in
// data/arabic-rules-lessons.js. The append script
// (seed-arabic-rules-additions.mjs) uses these IDs to detect
// already-present questions on re-run.

export const arabicRulesAdditions = [
  // ============================================================
  // 1. حروف الجرّ — Prepositions
  // ============================================================
  {
    titleAr: 'حروف الجرّ',
    questions: [
      {
        id: 'x-hj-01',
        prompt: 'تكون مراكز الحكومة في وسط المدينة لتسهيل اتصال الناس ____ هذه الأماكن لمعالجة أمورهم.',
        options: [
          { id: 'a', text: 'بـ' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'من' },
          { id: 'd', text: 'على' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'اتصل بـ is a fixed collocation; the second بـ in the sentence ("للمعالجة") marks the purpose, so this blank takes في: "connection of people in these places".',
          ar: '"في" للظرفية المكانية، فالتقدير: اتصال الناس في هذه الأماكن، والاتصال بالباء موجود في موضعه.',
          zh: 'في 表空间，此处“人们在那些地方联系”用 في；接续的 بـ 表目的。',
        },
        whyWrong: {
          a: { en: 'بـ would duplicate the بـ already used for the purpose clause.', ar: '"بـ" تكرّر الباء الموجودة في "لمعالجة".', zh: 'بـ 会与句中已有的 بـ 重复。' },
          c: { en: '"من" marks origin, not location.', ar: '"من" للابتداء.', zh: 'من 表起点。' },
          d: { en: '"على" means "on top of".', ar: '"على" للاستعلاء.', zh: 'على 表“在……上”。' },
        },
      },
      {
        id: 'x-hj-02',
        prompt: 'كان قصدهم من إقامة الأسوار حول المدن هو الدفاع ____ ها وقت الحرب.',
        options: [
          { id: 'a', text: 'على' },
          { id: 'b', text: 'لـ' },
          { id: 'c', text: 'عن' },
          { id: 'd', text: 'في' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'دافع عن = "to defend against" — the verb takes عن for the thing being defended.',
          ar: '"دافع" يتعدّى بـ"عن": دافع عن المدينة.',
          zh: 'دافع 搭配 عن：dافع عن 意为“保卫……”。',
        },
        whyWrong: {
          a: { en: '"على" would mean "on", wrong for defense.', ar: '"على" للاستعلاء.', zh: 'على 表方位。' },
          b: { en: '"لـ" marks possession or purpose.', ar: '"لـ" للتمليك أو التعليل.', zh: 'لـ 表所属或目的。' },
          d: { en: '"في" marks location.', ar: '"في" للظرفية.', zh: 'في 表地点。' },
        },
      },
      {
        id: 'x-hj-03',
        prompt: 'أرجوكم ساعدوني فأنا ____ حيرة من أمري.',
        options: [
          { id: 'a', text: 'على' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'من' },
          { id: 'd', text: 'إلى' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'في حيرة = "in a state of confusion" — a fixed expression for being in a state.',
          ar: '"في حيرة" صيغة ثابتة للدلالة على الحالة.',
          zh: 'في حيرة 是固定搭配，表示“处于困惑中”。',
        },
        whyWrong: {
          a: { en: '"على" would mean "on confusion".', ar: '"على" لا تصلح هنا.', zh: 'على 不适用。' },
          c: { en: '"من" marks origin.', ar: '"من" للابتداء.', zh: 'من 表起点。' },
          d: { en: '"إلى" marks destination.', ar: '"إلى" للغاية.', zh: 'إلى 表方向。' },
        },
      },
      {
        id: 'x-hj-04',
        prompt: 'يُعيش ____ المسلمين في آسيا ويعيش الثلث الباقي في أفريقيا.',
        options: [
          { id: 'a', text: 'ثلث' },
          { id: 'b', text: 'ثلثا' },
          { id: 'c', text: 'ثلثان' },
          { id: 'd', text: 'أثلاث' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'ثلثا is the construct dual in rafʿ (subject position) — "two-thirds of the Muslims live in Asia".',
          ar: '"ثلثا" مثنى مضاف في موقع الفاعل: ثلثا المسلمين.',
          zh: 'ثلثا 是主格双数正偏组合：“三分之二的穆斯林……”。',
        },
        whyWrong: {
          a: { en: 'ثلث is singular; the meaning is two-thirds.', ar: '"ثلث" مفرد، والمعنى ثلثان.', zh: 'ثلث 是单数，此处应为三分之二。' },
          c: { en: 'ثلثان would need to stand without iḍāfah.', ar: '"ثلثان" يحتاج إلى قطع الإضافة.', zh: 'ثلثان 需断开正偏组合。' },
          d: { en: 'أثلاث is a plural, wrong sense.', ar: '"أثلاث" جمع، والمعنى مختلف.', zh: 'أثلاث 是复数，语义不符。' },
        },
      },
      {
        id: 'x-hj-05',
        prompt: 'وفقًا ____ أحدث تقرير لمنظمة الصحة العالمية فإن حوالي ملياري مواطن مصابون بفيروس التهاب الكبد.',
        options: [
          { id: 'a', text: 'على' },
          { id: 'b', text: 'لـ' },
          { id: 'c', text: 'بـ' },
          { id: 'd', text: 'من' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'وفقًا لـ = "according to" — the لام is required with this adverb.',
          ar: '"وفقًا" يتعدّى باللام: وفقًا لأحدث تقرير.',
          zh: 'وفقًا 搭配 لـ：وفقًا لأحدث تقرير（根据最新报告）。',
        },
        whyWrong: {
          a: { en: '"على" does not collocate with وفقًا.', ar: '"على" لا تصلح مع "وفقًا".', zh: 'على 不与 وفقًا 搭配。' },
          c: { en: '"بـ" would change the meaning.', ar: '"بـ" تغيّر المعنى.', zh: 'بـ 改变语义。' },
          d: { en: '"من" marks origin.', ar: '"من" للابتداء.', zh: 'من 表起点。' },
        },
      },
      {
        id: 'x-hj-06',
        prompt: 'أغلب الصينيين الموفَّدين للخارج ____ نفقة الحكومة يختارون العودة إلى الوطن بعد انتهاء الدراسة.',
        options: [
          { id: 'a', text: 'بـ' },
          { id: 'b', text: 'من' },
          { id: 'c', text: 'على' },
          { id: 'd', text: 'عن' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'على نفقة = "at the expense of" — a fixed expression for someone bearing the cost.',
          ar: '"على نفقة" صيغة ثابتة للدلالة على من يتحمّل النفقات.',
          zh: 'على نفقة 是固定搭配，表示“由……承担费用”。',
        },
        whyWrong: {
          a: { en: '"بـ" does not collocate with نفقة in this sense.', ar: '"بـ" لا تصلح هنا.', zh: 'بـ 不适用于此。' },
          b: { en: '"من" marks origin.', ar: '"من" للابتداء.', zh: 'من 表起点。' },
          d: { en: '"عن" means "about / away from".', ar: '"عن" للمجاوزة.', zh: 'عن 表“关于/离开”。' },
        },
      },
      {
        id: 'x-hj-07',
        prompt: 'أهم العيوب التي أصيب بها هذا الشاب هو عدم القدرة على ضبط النفس وعدم ميله ____ تحسين المسؤولية.',
        options: [
          { id: 'a', text: 'إلى' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'عن' },
          { id: 'd', text: 'على' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'مال إلى / يميل إلى = "to incline towards" — the verb takes إلى.',
          ar: '"مال إلى" يتعدّى بـ"إلى": يميل إلى تحسين المسؤولية.',
          zh: 'مال/يميل 搭配 إلى：倾向于……。',
        },
        whyWrong: {
          b: { en: '"في" would mean "in".', ar: '"في" للظرفية.', zh: 'في 表地点。' },
          c: { en: '"عن" would reverse the direction.', ar: '"عن" تفيد البعد.', zh: 'عن 表远离。' },
          d: { en: '"على" would mean "on".', ar: '"على" للاستعلاء.', zh: 'على 表“在……上”。' },
        },
      },
      {
        id: 'x-hj-08',
        prompt: 'الجدير بالذكر أن المسلمين يشكلون أكثر من 89% ____ سكان المنطقة.',
        options: [
          { id: 'a', text: 'في' },
          { id: 'b', text: 'من' },
          { id: 'c', text: 'على' },
          { id: 'd', text: 'بـ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'For percentages, من introduces the reference group: 89% من السكان = "89% of the population".',
          ar: 'النسبة المئوية تُتبع بـ"من" لبيان المرجع: 89% من السكان.',
          zh: '百分比后用 من 引出参照群：89% من السكان。',
        },
        whyWrong: {
          a: { en: '"في" is not used for percentages.', ar: '"في" لا تصلح للنسب المئوية.', zh: 'في 不用于百分比。' },
          c: { en: '"على" would mean "on".', ar: '"على" للاستعلاء.', zh: 'على 表方位。' },
          d: { en: '"بـ" is not used for percentages.', ar: '"بـ" لا تصلح للنسب.', zh: 'بـ 不用于百分比。' },
        },
      },
      {
        id: 'x2-hj-01',
        prompt: 'من الناحية الجغرافية يعتبر الوطن العربي ____ بين قارات العالم.',
        options: [
          { id: 'a', text: 'افتراقًا' },
          { id: 'b', text: 'مفتَرَقًا' },
          { id: 'c', text: 'افتراقيًا' },
          { id: 'd', text: 'مفتَرِقًا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'مفتَرَق is the noun of place ("a crossing-point"), and fits the predicate slot after يعتبر. The sentence means "geographically, the Arab world is considered a meeting-point between the continents".',
          ar: '"مفتَرَق" اسم مكان، وهو المناسب خبرًا لـ"يعتبر": يعتبر الوطن العربي مفتَرَقًا بين القارات.',
          zh: 'مفتَرَق 是处所名词，作 يعتبر 的表语：“阿拉伯世界被认为是各大洲的交汇处”。',
        },
        whyWrong: {
          a: { en: 'افتراقًا is the maṣdar ("separation"), which would mean the homeland is a separation, not a crossing-point.', ar: '"افتراقًا" مصدر، والمعنى لا يستقيم.', zh: 'افتراقًا 是动词名词“分离”，语义不通。' },
          c: { en: 'افتراقيًا is a nisbah adjective ("relating to separation"), wrong sense.', ar: '"افتراقيًا" نسبة، والمعنى مختلف.', zh: 'افتراقيًا 是关系形容词“与分离有关的”，语义错误。' },
          d: { en: 'مفتَرِقًا with kasrah on the ر is a different vocalisation and does not match the standard form of this اسم مكان here.', ar: 'ضبط مختلف لاسم المكان.', zh: '音标不同，非此处标准处所名词形式。' },
        },
      },
    ],
  },

  // ============================================================
  // 2. كان وأخواتها — Kāna and its sisters
  // ============================================================
  {
    titleAr: 'كان وأخواتها',
    questions: [
      {
        id: 'x-kana-01',
        prompt: 'كان المفروض أن يحضر اللقاء مدير الشركة ولكنه لم ____ بما وعد.',
        options: [
          { id: 'a', text: 'يَفِ' },
          { id: 'b', text: 'وَفَى' },
          { id: 'c', text: 'يَفِي' },
          { id: 'd', text: 'يُفِ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After لم, the defective verb وفي takes the jussive with the final yāʾ dropped: يَفِ.',
          ar: 'بعد "لم" يُجزم الفعل الناقص "وفي" بحذف الياء: لم يفِ.',
          zh: 'لم 后缺陷动词省略结尾 ي 为 يفِ。',
        },
        whyWrong: {
          b: { en: 'وَفَى is the past tense; لم requires the jussive.', ar: 'الماضي لا يجتمع مع "لم".', zh: 'لم 后不能接过去式。' },
          c: { en: 'يَفِي is marfūʿ — the yāʾ remains.', ar: 'الرفع يقتضي وجود الياء.', zh: '主格保留 ي。' },
          d: { en: 'يُفِ is not a valid jussive form.', ar: 'ليست صيغة جزم صحيحة.', zh: '不是有效的切格形式。' },
        },
      },
      {
        id: 'x-kana-02',
        prompt: 'ما زال البدوي يسكن بيوت الشعر ____ سكنها أجداده من قبل.',
        options: [
          { id: 'a', text: 'لما' },
          { id: 'b', text: 'منذ' },
          { id: 'c', text: 'كما' },
          { id: 'd', text: 'حيث' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'كما = "just as / the same way that" — a comparative conjunction introducing the manner clause.',
          ar: '"كما" للتشبيه: يسكنها كما سكنها أجداده.',
          zh: 'كما 表比喻：“就像……那样”。',
        },
        whyWrong: {
          a: { en: '"لما" is a temporal negative particle, not a comparison.', ar: '"لما" للزمن والنفي.', zh: 'لما 是时间/否定虚词。' },
          b: { en: '"منذ" = "since", does not fit.', ar: '"منذ" للزمن.', zh: 'منذ 表时间起点。' },
          d: { en: '"حيث" = "where", does not fit.', ar: '"حيث" للمكان.', zh: 'حيث 表地点。' },
        },
      },
      {
        id: 'x-kana-03',
        prompt: 'لما سمع حسن هذا الخبر السار كاد يطير ____.',
        options: [
          { id: 'a', text: 'فرحٌ' },
          { id: 'b', text: 'فَرَحٌ' },
          { id: 'c', text: 'فَرَحًا' },
          { id: 'd', text: 'فَرِحًا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'كاد is a sister of كان; its khabar is a present verb (يطير) plus an optional مفعول له/حال. فرحًا is the manṣūb adverbial expressing the reason/manner.',
          ar: '"كاد" من أخوات "كان"، و"فرحًا" مفعول لأجله أو حال منصوب.',
          zh: 'كاد 是 كان 的姊妹词；فرحًا 作宾格状语。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ with tanwīn, wrong case.', ar: 'الرفع لا يصح.', zh: '主格不对。' },
          b: { en: 'Same as (a).', ar: 'الرفع لا يصح.', zh: '主格不对。' },
          d: { en: 'فَرِحًا is the active participle, but the maṣdar/state form is expected here.', ar: '"فَرِحًا" اسم فاعل، والأليق المصدر "فرحًا".', zh: 'فَرِحًا 是主动分词，此处更宜用动词名词。' },
        },
      },
    ],
  },

  // ============================================================
  // 3. إنّ وأخواتها — Inna and its sisters
  // ============================================================
  {
    titleAr: 'إنّ وأخواتها',
    questions: [
      {
        id: 'x-in-01',
        prompt: 'قال الرجل لأهله ____ أن ينجز هذا العمل اليوم.',
        options: [
          { id: 'a', text: 'لا شكّ' },
          { id: 'b', text: 'لا بدّ' },
          { id: 'c', text: 'لا غنى' },
          { id: 'd', text: 'لا ريب' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لا بدّ = "it is necessary that" — followed by أن + manṣūb verb: لا بدّ أن ينجز.',
          ar: '"لا بدّ" تفيد الوجوب، ويليها "أن" + فعل منصوب: لا بدّ أن ينجز.',
          zh: 'لا بدّ 表必须，后接 أن + 动词宾格。',
        },
        whyWrong: {
          a: { en: '"لا شكّ" = "no doubt" — grammatical but semantic change.', ar: '"لا شكّ" تفيد اليقين، لا الوجوب.', zh: 'لا شكّ 表“毫无疑问”，非必要性。' },
          c: { en: '"لا غنى" needs عن to complete.', ar: '"لا غنى" تحتاج "عن".', zh: 'لا غنى 需搭配 عن。' },
          d: { en: '"لا ريب" = "no doubt", similar to لا شكّ.', ar: '"لا ريب" تفيد اليقين.', zh: 'لا ريب 表“无疑”。' },
        },
      },
      {
        id: 'x-in-02',
        prompt: 'تعدّى الاتفاقية بين الصين والسعودية ترحيبًا حارًّا من ____ الطرفين.',
        options: [
          { id: 'a', text: 'كِلتَا' },
          { id: 'b', text: 'كِلا' },
          { id: 'c', text: 'كِلْتَا' },
          { id: 'd', text: 'كُلّ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'كِلا is used with masculine dual nouns: كلا الطرفين = "both parties" (الطرف is masculine).',
          ar: '"كِلا" للمثنى المذكر: كلا الطرفين.',
          zh: 'كلا 用于阳性双数：كلا الطرفين。',
        },
        whyWrong: {
          a: { en: 'كِلتَا is for feminine dual.', ar: '"كِلتَا" للمثنى المؤنث.', zh: 'كلتا 用于阴性双数。' },
          c: { en: 'Same as (a), nonstandard vowel spelling.', ar: 'ضبط مختلف.', zh: '拼写不同。' },
          d: { en: 'كُلّ = "all/every", not dual.', ar: '"كُلّ" للجمع.', zh: 'كل 表全部。' },
        },
      },
      {
        id: 'x-in-03',
        prompt: 'قال _____ إن العلم نور والجهل ظلام.',
        options: [
          { id: 'a', text: 'أنّ' },
          { id: 'b', text: 'إنّ' },
          { id: 'c', text: 'أنْ' },
          { id: 'd', text: 'إنْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After قال introducing direct quoted speech, إنّ is standard: قال إنّ العلم نور.',
          ar: 'بعد "قال" في الاقتباس المباشر تأتي "إنّ".',
          zh: 'قال 引出直接引语时用 إنّ。',
        },
        whyWrong: {
          a: { en: 'أنّ is for indirect/reported speech.', ar: '"أنّ" للكلام المنقول غير المباشر.', zh: 'أنّ 用于间接引语。' },
          c: { en: 'أنْ must be followed by a verb, not a noun phrase.', ar: '"أنْ" يليها فعل.', zh: 'أنْ 后接动词。' },
          d: { en: 'إنْ is conditional.', ar: '"إنْ" شرطية.', zh: 'إنْ 是条件虚词。' },
        },
      },
      {
        id: 'x-in-04',
        prompt: 'إنه لا يأكل نهارًا في شهر رمضان لأنه ____.',
        options: [
          { id: 'a', text: 'نائم' },
          { id: 'b', text: 'صائِم' },
          { id: 'c', text: 'مشهور' },
          { id: 'd', text: 'مشغول' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The reason for not eating during Ramadan is that he is fasting (صائِم).',
          ar: 'السبب في عدم الأكل نهار رمضان هو الصيام: صائم.',
          zh: '斋月白天不吃是因为封斋：صائِم。',
        },
        whyWrong: {
          a: { en: 'Sleeping is not the reason.', ar: '"نائم" ليس السبب.', zh: '“睡觉”不是原因。' },
          c: { en: '"مشهور" means famous.', ar: '"مشهور" بمعنى معروف.', zh: 'مشهور 意为“有名”。' },
          d: { en: '"مشغول" means busy.', ar: '"مشغول" بمعنى منشغل.', zh: 'مشغول 意为“忙”。' },
        },
      },
    ],
  },

  // ============================================================
  // 4. الأسماء الموصولة — Relative pronouns
  // ============================================================
  {
    titleAr: 'الأسماء الموصولة',
    questions: [
      {
        id: 'x-rel-01',
        prompt: 'إن الفتاتين هما ____ قامتا بزيارة لسور الصين العظيم يوم السبت.',
        options: [
          { id: 'a', text: 'اللتان' },
          { id: 'b', text: 'اللتين' },
          { id: 'c', text: 'الذان' },
          { id: 'd', text: 'الذين' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'الفتاتين is feminine dual → اللتان (rafʿ feminine dual relative pronoun).',
          ar: '"الفتاتين" مثنى مؤنث، فالموصول المرفوع "اللتان".',
          zh: 'الفتاتين 是阴性双数，用主格关系代词 اللتان。',
        },
        whyWrong: {
          b: { en: 'اللتين is naṣb/jarr feminine dual.', ar: '"اللتين" منصوب أو مجرور.', zh: 'اللتين 是宾/属格。' },
          c: { en: 'الذان is masculine dual.', ar: '"الذان" للمذكر.', zh: 'الذان 是阳性双数。' },
          d: { en: 'الذين is masculine plural.', ar: '"الذين" للجمع.', zh: 'الذين 是阳性复数。' },
        },
      },
      {
        id: 'x-rel-02',
        prompt: 'عاد المقاتلون من ميدان المعركة ____ ثلاثة.',
        options: [
          { id: 'a', text: 'ما عدا' },
          { id: 'b', text: 'إلا' },
          { id: 'c', text: 'غير' },
          { id: 'd', text: 'سوى' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'ما عدا is an exceptive particle used with a counted noun in the manṣūb (mufrad) form: ما عدا ثلاثة (masculine because مقاتلون).',
          ar: '"ما عدا" للاستثناء، والمستثنى بعدها منصوب.',
          zh: 'ما عدا 是例外虚词，后接宾格名词。',
        },
        whyWrong: {
          b: { en: '"إلا" works but here would require a different case agreement.', ar: '"إلا" صحيحة لكن الإعراب يختلف.', zh: 'إلا 也可，但格位不同。' },
          c: { en: '"غير" needs a different structure.', ar: '"غير" تحتاج إضافة.', zh: 'غير 需正偏组合。' },
          d: { en: '"سوى" needs a different structure.', ar: '"سوى" تحتاج ترتيبًا مخالفًا.', zh: 'سوى 需不同结构。' },
        },
      },
      {
        id: 'x-rel-03',
        prompt: 'يأمل الرئيس الصيني مقابلة ____ القدامى وإقامة صداقات جديدة في زيارته لليابان.',
        options: [
          { id: 'a', text: 'أصدقائه' },
          { id: 'b', text: 'أصدقاء' },
          { id: 'c', text: 'أصدقاءه' },
          { id: 'd', text: 'أصدقاؤه' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'أصدقاء is the direct object (manṣūb) of مقابلة, and it is in iḍāfah with the adjective القدامى. No possessive pronoun is needed — القدامى modifies it.',
          ar: '"أصدقاء" مفعول به منصوب وهو مضاف إلى "القدامى" صفةً.',
          zh: 'أصدقاء 作 مقابلة 的宾语，与形容词 القدامى 构成正偏组合，无需代词所有格。',
        },
        whyWrong: {
          a: { en: 'Adding the pronoun creates a conflicting iḍāfah.', ar: 'إضافة الضمير تتعارض مع الإضافة إلى الصفة.', zh: '加代词与正偏组合冲突。' },
          c: { en: 'Same as (a) plus a nonstandard spelling.', ar: 'صيغة غير صحيحة إملائيًا.', zh: '拼写不标准。' },
          d: { en: 'أصدقاؤه is marfūʿ, wrong case for a direct object.', ar: '"أصدقاؤه" مرفوع، ولا يصح مفعولًا.', zh: 'أصدقاؤه 是主格，不能作宾语。' },
        },
      },
      {
        id: 'x-rel-04',
        prompt: 'خرج ذات يوم يتجول مع أبيه يتفقدان بيض الدواجن ____ يربيها في مزرعته.',
        options: [
          { id: 'a', text: 'التي' },
          { id: 'b', text: 'الذي' },
          { id: 'c', text: 'الذين' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'الدواجن is a non-human plural → treated as feminine singular for relative pronouns: التي.',
          ar: '"الدواجن" جمع غير عاقل، ويعامل معاملة المفردة المؤنثة: التي.',
          zh: 'الدواجن 是非人类复数，按阴性单数处理：التي。',
        },
        whyWrong: {
          b: { en: '"الذي" is masculine singular.', ar: '"الذي" للمذكر.', zh: 'الذي 是阳性单数。' },
          c: { en: '"الذين" is for human masculine plural.', ar: '"الذين" للعقلاء.', zh: 'الذين 用于人类复数。' },
          d: { en: '"ما" is for indefinite things.', ar: '"ما" للنكرة.', zh: 'ما 用于不定名词。' },
        },
      },
      {
        id: 'x-rel-05',
        prompt: 'إن عميد الكلية ____ مسابقة القراءة ويوزع الجوائز على الطلبة الفائزين.',
        options: [
          { id: 'a', text: 'سيشترك في' },
          { id: 'b', text: 'سيشارك في' },
          { id: 'c', text: 'سيحضر' },
          { id: 'd', text: 'سيجيء' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The dean presides over the reading competition and distributes prizes — سيحضر ("will attend/preside").',
          ar: 'العميد يشرف على المسابقة ويوزع الجوائز، فالأليق "سيحضر".',
          zh: '院长主持比赛并颁奖，用 سيحضر（将出席）。',
        },
        whyWrong: {
          a: { en: '"سيشترك في" implies participating as a contestant.', ar: '"سيشترك في" تفيد المشاركة كمتبارٍ.', zh: 'سيشترك 意为参赛。' },
          b: { en: '"سيشارك في" also implies participating, not presiding.', ar: '"سيشارك" تفيد المشاركة.', zh: 'سيشارك 意为参与。' },
          d: { en: '"سيجيء" = "will come", too vague for the context.', ar: '"سيجيء" عامة، لا تفي بالسياق.', zh: 'سيجيء 太笼统。' },
        },
      },
    ],
  },

  // ============================================================
  // 5. الأعداد والمعدود — Numbers and counted nouns
  // ============================================================
  {
    titleAr: 'الأعداد والمعدود',
    questions: [
      {
        id: 'x-num-01',
        prompt: 'سيعقد المؤتمر الأول للشباب يوم ____ يناير عام ١٩٣٢ في يافا.',
        options: [
          { id: 'a', text: 'رابع' },
          { id: 'b', text: 'الرابع' },
          { id: 'c', text: 'رابعة' },
          { id: 'd', text: 'الرابعة' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'A date uses the indefinite masculine ordinal form without ال: يوم رابع يناير.',
          ar: 'التاريخ يستعمل العدد الترتيبي نكرةً بلا "ال": يوم رابع يناير.',
          zh: '日期用不定阳性序数词：يوم رابع يناير。',
        },
        whyWrong: {
          b: { en: 'Adding ال makes it definite, unnatural for a bare date.', ar: 'التعريف بـ"ال" لا يصلح هنا.', zh: '加 ال 使日期确指，不合习惯。' },
          c: { en: 'رابعة is feminine.', ar: '"رابعة" مؤنثة.', zh: 'رابعة 是阴性。' },
          d: { en: 'Feminine + definite, doubly wrong.', ar: 'مؤنثة ومعرفة، خطأ مزدوج.', zh: '阴性且确指，双重错误。' },
        },
      },
      {
        id: 'x-num-02',
        prompt: 'قد بلغ عدد سكان الهند ١٤١٥٦٥٠٠٠٠ نسمة، لتصبح أكبر دولة في العالم من حيث عدد السكان.',
        options: [
          { id: 'a', text: 'مليار وأربعمائة وخمسة عشر مليونًا وخمسمائة وخمسون ألف نسمة' },
          { id: 'b', text: 'مليار وأربعمائة وخمسة عشر مليونًا وخمسمائة وأربعون ألف نسمة' },
          { id: 'c', text: 'مليار وأربعمائة وخمسة عشر مليونًا وخمسمائة وخمسة وأربعون ألف نسمة' },
          { id: 'd', text: 'مليار وأربعمائة وأربعون مليونًا وخمسمائة وخمسون ألف نسمة' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: '1415650000 = 1,415,650,000 — مليار + أربعمائة وخمسة عشر مليونًا + خمسمائة وخمسون ألفًا.',
          ar: 'العدد ١٤١٥٦٥٠٠٠٠ = مليار وأربعمائة وخمسة عشر مليونًا وخمسمائة وخمسون ألفًا.',
          zh: '1,415,650,000 读作：十亿 + 4.15 亿 + 55 万。',
        },
        whyWrong: {
          b: { en: 'الدقة تتطلب "خمسون" لا "أربعون".', ar: '"أربعون" خطأ؛ الصواب "خمسون".', zh: '应为“五十五万”而非“四十五万”。' },
          c: { en: 'Digits misordered ("خمسة وأربعون" instead of "خمسون").', ar: 'ترتيب الأرقام خطأ.', zh: '位数排列错误。' },
          d: { en: 'Millions digit wrong ("أربعون" instead of "خمسة عشر").', ar: 'خانة الملايين خطأ.', zh: '百万位数错误。' },
        },
      },
      {
        id: 'x-num-03',
        prompt: 'حافظت جامعتنا على مكانتها في صفوف الوحدات المتحضّرة طوال ____ متواصلة.',
        options: [
          { id: 'a', text: 'ثمانية' },
          { id: 'b', text: 'ثماني' },
          { id: 'c', text: 'ثماني سنوات' },
          { id: 'd', text: 'ثمان سنوات' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'سنوات is a feminine sound plural; numbers 3–10 take the opposite gender, so ثماني (masculine form) is used in construct: ثماني سنوات.',
          ar: '"سنوات" جمع مؤنث، فيكون العدد بالمذكر: "ثماني سنوات"، والعدد مضاف بدون تاء.',
          zh: 'سنوات 是阴性复数，数词用阳性形式：ثماني سنوات。',
        },
        whyWrong: {
          a: { en: 'ثمانية with tāʾ marbūṭah is the feminine form, wrong before سنوات.', ar: '"ثمانية" بالتاء، والصواب بلا تاء.', zh: 'ثمانية 带 ة，不适用于 سنوات。' },
          c: { en: 'Duplicates سنوات already provided.', ar: '"ثماني سنوات" تكرّر الكلمة.', zh: '重复 سنوات。' },
          d: { en: 'ثمان بلا ياء غير فصيحة في هذا السياق.', ar: 'صيغة غير فصيحة.', zh: '拼写不规范。' },
        },
      },
      {
        id: 'x-num-04',
        prompt: 'من العادة تضع أنثى طيور السمان ____ بيضات.',
        options: [
          { id: 'a', text: 'ثماني' },
          { id: 'b', text: 'ثمان' },
          { id: 'c', text: 'ثمانية' },
          { id: 'd', text: 'ثمن' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'بيضات is feminine plural; numbers 3–10 take the opposite gender (masculine), so ثماني is correct in construct: ثماني بيضات.',
          ar: '"بيضات" جمع مؤنث، فيكون العدد بالمذكر: "ثماني بيضات".',
          zh: 'بيضات 是阴性复数，数词用阳性：ثماني بيضات。',
        },
        whyWrong: {
          b: { en: 'ثمان without the yāʾ is a nonstandard variant.', ar: 'صيغة غير فصيحة.', zh: '非标准拼写。' },
          c: { en: 'ثمانية with tāʾ marbūṭah, wrong here.', ar: '"ثمانية" لا تصح مع "بيضات".', zh: 'ثمانية 不适用于此。' },
          d: { en: 'ثمن is a completely different word.', ar: '"ثمن" كلمة مختلفة.', zh: 'ثمن 是另一个词。' },
        },
      },
      {
        id: 'x-num-05',
        prompt: 'فقدت ٢٣٩ عائلة أملها بعودة أبنائها الذين كانوا على متن الطائرة.',
        options: [
          { id: 'a', text: 'مائتان وتسعة وثلاثون' },
          { id: 'b', text: 'مائتين وثلاثة وتسعين' },
          { id: 'c', text: 'مائتين وتسعة وثلاثين' },
          { id: 'd', text: 'مائتان وتسع وثلاثون' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: '239 with feminine counted noun عائلة — مائتين وتسعة وثلاثين (the numeral in the manṣūb form, and the counted noun منصوب: عائلةً).',
          ar: 'العدد ٢٣٩ مع معدود مؤنث: "مائتين وتسعة وثلاثين" (المضاف مجرور بالياء).',
          zh: '239 后接阴性名词，数词用宾格形式 مائتين وتسعة وثلاثين。',
        },
        whyWrong: {
          a: { en: 'مائتان is rafʿ; here manṣūb is required.', ar: '"مائتان" مرفوع، والصواب المنصوب.', zh: 'مائتان 是主格，此处需宾格。' },
          b: { en: 'Reversed digit order (393).', ar: 'ترتيب الأرقام خطأ.', zh: '数字颠倒。' },
          d: { en: 'Mixed: مائتان (rafʿ) + وتسع (wrong form).', ar: 'خلط بين الصيغ.', zh: '形式混用。' },
        },
      },
      {
        id: 'x-num-06',
        prompt: 'يعيش في هذه القرية الجبلية ____ عائلة.',
        options: [
          { id: 'a', text: 'بضعة وثلاثون' },
          { id: 'b', text: 'بضع وثلاثون' },
          { id: 'c', text: 'البضع والثلاثون' },
          { id: 'd', text: 'بضعة ثلاثون' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'بضع is used with a masculine counted noun; here عائلة is feminine but بضع is part of the compound بضع وثلاثون, which is standard.',
          ar: '"بضع وثلاثون" هي الصيغة الفصيحة للأعداد المركبة من ٣ و٣٠.',
          zh: 'بضع وثلاثون 是“三十几”的标准说法。',
        },
        whyWrong: {
          a: { en: 'بضعة with tāʾ marbūṭah changes agreement; here بضع is preferred.', ar: 'التاء تغيّر المطابقة.', zh: '加 ة 改变一致性。' },
          c: { en: 'Definite article wrong here.', ar: 'التعريف لا يصلح.', zh: '确指不适用。' },
          d: { en: 'Word order breaks the numeral compound.', ar: 'الترتيب يكسر تركيب العدد.', zh: '语序破坏数词组合。' },
        },
      },
      {
        id: 'x-num-07',
        prompt: 'قرأت هذا العام ____ في اللغة والتاريخ.',
        options: [
          { id: 'a', text: 'سبعة عشر كتيّبًا' },
          { id: 'b', text: 'سبع عشرة كتابًا' },
          { id: 'c', text: 'سبعة عشر كتابًا' },
          { id: 'd', text: 'سبعة عشر كتبًا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'كتاب is masculine singular; the number 17 uses the masculine form سبعة عشر with a manṣūb tamyīz: كتابًا.',
          ar: '"كتاب" مذكر مفرد، فالعدد "سبعة عشر"، والتمييز منصوب: كتابًا.',
          zh: 'كتاب 是阳性单数，数词用 سبعة عشر；区分语用宾格 كتابًا。',
        },
        whyWrong: {
          a: { en: 'كتيّبًا is a diminutive, not the target word.', ar: '"كتيّبًا" تصغير، لا يلائم.', zh: 'كتيّبًا 是小称。' },
          b: { en: 'سبع عشرة is used with feminine nouns.', ar: '"سبع عشرة" للمؤنث.', zh: 'سبع عشرة 用于阴性。' },
          d: { en: 'كتب is plural, wrong after 11–99.', ar: 'الجمع لا يصلح بعد العدد.', zh: '复数不用于 11–99 之后。' },
        },
      },
      {
        id: 'x-num-08',
        prompt: 'حصل والدي على فرصة عمل ممتازة فانتقلنا من مدينتنا هذه إلى العاصمة بعد ____ سنة.',
        options: [
          { id: 'a', text: 'خمسةَ عشرَ' },
          { id: 'b', text: 'خمسَ عشرةَ' },
          { id: 'c', text: 'خمس عشرة' },
          { id: 'd', text: 'خمسة عشر' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'سنة is feminine, so 15 uses the masculine form خمسة عشر (a feminine counted noun takes a masculine numeral).',
          ar: '"سنة" مؤنثة، فيكون العدد بالمذكر: خمسة عشر سنة.',
          zh: 'سنة 是阴性，数词用阳性 خمسة عشر。',
        },
        whyWrong: {
          b: { en: 'خمس عشرة is feminine form.', ar: '"خمس عشرة" للمؤنث.', zh: 'خمس عشرة 是阴性。' },
          c: { en: 'Missing vowel marks / nonstandard.', ar: 'ضبط ناقص.', zh: '变音符号缺失。' },
          d: { en: 'Missing the fatḥah on عَشرَ.', ar: 'ضبط ناقص.', zh: '符号缺失。' },
        },
      },
      {
        id: 'x-num-09',
        prompt: 'ظهر القمران الاصطناعيان في الفضاء في الساعة ____ بعد الظهر.',
        options: [
          { id: 'a', text: 'السادسة واثنتين وعشرين دقيقة' },
          { id: 'b', text: 'سادسة واثنان وعشرون دقائق' },
          { id: 'c', text: 'ست ساعات واثنين وعشرين دقيقة' },
          { id: 'd', text: 'الساعة الست واثنتين وعشرين دقائق' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Telling time: الساعة + feminine ordinal (السادسة) + و + counted minutes (اثنتين وعشرين دقيقة).',
          ar: 'الصيغة الفصيحة للوقت: الساعة السادسة واثنتين وعشرين دقيقة.',
          zh: '报时格式：الساعة + 阴性序数 + 分钟数。',
        },
        whyWrong: {
          b: { en: 'Missing الساعة, and دقائق is plural where دقيقة is expected.', ar: 'ناقص وغير فصيح.', zh: '结构不完整且数词错误。' },
          c: { en: '"ست ساعات" wrong form; should be الساعة السادسة.', ar: 'صيغة غير فصيحة.', zh: '形式错误。' },
          d: { en: '"الست" is wrong; should be السادسة.', ar: '"الست" خطأ، والصواب "السادسة".', zh: 'الست 错误，应为 السادسة。' },
        },
      },
      {
        id: 'x-num-10',
        prompt: 'قُتل كثير من الأطفال في سوريا ____ بدء النزاع.',
        options: [
          { id: 'a', text: 'في' },
          { id: 'b', text: 'منذ' },
          { id: 'c', text: 'عن' },
          { id: 'd', text: 'على' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'منذ = "since" — marking the point in time when the killing started.',
          ar: '"منذ" لابتداء الغاية الزمنية: منذ بدء النزاع.',
          zh: 'منذ 表时间起点：自冲突爆发以来。',
        },
        whyWrong: {
          a: { en: '"في" would mean "in", wrong for "since".', ar: '"في" للظرفية.', zh: 'في 表地点。' },
          c: { en: '"عن" means "about / away from".', ar: '"عن" للمجاوزة.', zh: 'عن 表“关于/离开”。' },
          d: { en: '"على" means "on".', ar: '"على" للاستعلاء.', zh: 'على 表方位。' },
        },
      },
      {
        id: 'x2-num-01',
        prompt: 'تُقيم وزارة المعارف السعودية ____ كل عام.',
        options: [
          { id: 'a', text: 'مئات المدارس الجديدة' },
          { id: 'b', text: 'مائة المدرسة الجديدة' },
          { id: 'c', text: 'مئات المدرسة الجديدة' },
          { id: 'd', text: 'المئات المدارس الجديدة' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'مئات is the plural of مائة used as the first term of an iḍāfah with a plural genitive noun: مئات المدارس الجديدة = "hundreds of new schools".',
          ar: '"مئات" جمع "مائة"، وهو مضاف إلى "المدارس" المجرور بالكسرة.',
          zh: 'مئات 是 مائة 的复数，构成正偏组合：مئات المدارس الجديدة。',
        },
        whyWrong: {
          b: { en: 'مائة المدرسة does not fit the plural "every year" sense, and the adjective agreement breaks.', ar: '"مائة المدرسة" لا تلائم المعنى الجمعي.', zh: 'مائة المدرسة 与“每年”复数语义不符。' },
          c: { en: 'مئات requires a plural مضاف إليه, not a singular with ال.', ar: '"مئات" تحتاج مضافًا إليه جمعًا.', zh: 'مئات 需接复数属格名词。' },
          d: { en: 'المئات with ال is definite and breaks the numeral reading here.', ar: 'تعريف "المئات" لا يصلح هنا.', zh: 'المئات 确指，不合此处数词语境。' },
        },
      },
    ],
  },

  // ============================================================
  // 6. أدوات النفي والنهي — Negation and prohibition
  // ============================================================
  {
    titleAr: 'أدوات النفي والنهي',
    questions: [
      {
        id: 'x-neg-01',
        prompt: 'أنا لم أفعل هذا في حياتي قط، و____ أفعله ما دمت حيًّا.',
        options: [
          { id: 'a', text: 'لا' },
          { id: 'b', text: 'لم' },
          { id: 'c', text: 'ما' },
          { id: 'd', text: 'لن' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'لن negates future with naṣb: لن أفعله = "I will never do it". Matches "ما دمت حيًّا" (as long as I live).',
          ar: '"لن" تنفي المستقبل، وتناسب "ما دمت حيًّا".',
          zh: 'لن 否定将来，与“只要我活着”一致。',
        },
        whyWrong: {
          a: { en: 'لا negates the present.', ar: '"لا" للمضارع الحاضر.', zh: 'لا 否定现在。' },
          b: { en: 'لم negates past and makes jussive.', ar: '"لم" للماضي.', zh: 'لم 否定过去。' },
          c: { en: 'ما is for past negation.', ar: '"ما" للماضي.', zh: 'ما 用于过去。' },
        },
      },
      {
        id: 'x-neg-02',
        prompt: 'متى تفهم النكتة العربية ____ مجيدًا اللغة العربية يا أحمد.',
        options: [
          { id: 'a', text: 'تكون' },
          { id: 'b', text: 'ستكون' },
          { id: 'c', text: 'كن' },
          { id: 'd', text: 'تَكُنْ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'متى + jussive triggers the verb تَكُنْ; the following مجيدًا is the khabar in manṣūb.',
          ar: 'بعد "متى" يُجزم الفعل: تكُنْ، و"مجيدًا" خبرها منصوب.',
          zh: 'متى 后动词用切格：تَكُنْ；خبرها مجيدًا 用宾格。',
        },
        whyWrong: {
          a: { en: 'تكون is marfūʿ; متى requires jussive.', ar: 'الرفع لا يصح مع "متى".', zh: '主格不适用于 متى。' },
          b: { en: 'ستكون is future marfūʿ; wrong mood.', ar: 'مرفوع، والصواب الجزم.', zh: '主格错误。' },
          c: { en: 'كن is the imperative, not a jussive.', ar: 'الأمر لا يصلح هنا.', zh: '命令式不适用。' },
        },
      },
      {
        id: 'x-neg-03',
        prompt: 'لا ____ الوالدان بما فعله ولدهما.',
        options: [
          { id: 'a', text: 'يقتنعان' },
          { id: 'b', text: 'يكتفيان' },
          { id: 'c', text: 'يرتضيان' },
          { id: 'd', text: 'يرتضي' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'يرتضي = "to be satisfied with" — the dual verb يرتضيان agrees with الوالدان.',
          ar: '"يرتضيان" للمثنى، يوافق "الوالدان"، والمعنى: لا يقبلان ما فعله ولدهما.',
          zh: 'يرتضيان 是双数动词，与 الوالدان 一致，意为“不满意”。',
        },
        whyWrong: {
          a: { en: 'يقتنعان = "to be convinced", slightly different meaning; the sentence calls for "not accept".', ar: '"يقتنعان" تفيد الاقتناع، لا الرضا.', zh: 'يقتنعان 意为“被说服”，语义略异。' },
          b: { en: 'يكتفيان = "to be content with", different verb.', ar: '"يكتفيان" بمعنى الاستغناء.', zh: 'يكتفيان 意为“满足于”。' },
          d: { en: 'يرتضي is singular, wrong agreement.', ar: '"يرتضي" مفرد، لا يوافق المثنى.', zh: '单数不匹配双数。' },
        },
      },
    ],
  },

  // ============================================================
  // 7. النواصب والجوازم — Subjunctive and jussive triggers
  // ============================================================
  {
    titleAr: 'النواصب والجوازم',
    questions: [
      {
        id: 'x-nasb-01',
        prompt: 'عليك أن تقرأ الكتب النافعة حتى ____ عقلك.',
        options: [
          { id: 'a', text: 'يَنْمُو' },
          { id: 'b', text: 'تَنْمُو' },
          { id: 'c', text: 'يَنْمُ' },
          { id: 'd', text: 'تَنْمُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'حتى as a purpose particle makes the verb manṣūb: ينمو (عقل is the subject, masculine).',
          ar: 'بعد "حتى" الناصبة يكون الفعل منصوبًا: ينمو عقلك.',
          zh: 'حتى 引导目的从句，动词用宾格：ينمو。',
        },
        whyWrong: {
          b: { en: 'تنمو is feminine — عقلك is masculine.', ar: '"تنمو" للمؤنث، و"العقل" مذكر.', zh: 'تنمو 是阴性，العقل 是阳性。' },
          c: { en: 'ينم is not the standard manṣūb form of the defective verb.', ar: 'صيغة غير فصيحة.', zh: '缺陷动词宾格形式不规范。' },
          d: { en: 'Same as (c) plus gender error.', ar: 'خطأ مزدوج.', zh: '双重错误。' },
        },
      },
      {
        id: 'x-nasb-02',
        prompt: 'قال المدير للطلاب ____ تتأخروا عن الحضور.',
        options: [
          { id: 'a', text: 'لم' },
          { id: 'b', text: 'لا' },
          { id: 'c', text: 'لن' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لا الناهية + jussive with dropped nūn: لا تتأخروا.',
          ar: '"لا" الناهية تجزم بحذف النون: لا تتأخروا.',
          zh: 'لا 表禁止 + 去掉 نون 的切格动词。',
        },
        whyWrong: {
          a: { en: 'لم is past negation.', ar: '"لم" للماضي.', zh: 'لم 否定过去。' },
          c: { en: 'لن is future negation with naṣb.', ar: '"لن" للمستقبل.', zh: 'لن 否定将来。' },
          d: { en: 'ما is past negation.', ar: '"ما" للماضي.', zh: 'ما 用于过去。' },
        },
      },
      {
        id: 'x-nasb-03',
        prompt: 'عندما وصل الضيوف ____ الغرفة.',
        options: [
          { id: 'a', text: 'دخلوا' },
          { id: 'b', text: 'يدخلوا' },
          { id: 'c', text: 'دخلو' },
          { id: 'd', text: 'يدخلون' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'عندما (when) takes the past tense for a completed action: دخلوا.',
          ar: '"عندما" للزمن الماضي، فالفعل ماضٍ: دخلوا.',
          zh: 'عندما 引出过去动作，动词用过去式 دخلوا。',
        },
        whyWrong: {
          b: { en: 'Manṣūb plural without a naṣb trigger.', ar: 'المنصوب بلا ناصب.', zh: '无宾格虚词。' },
          c: { en: 'Missing the final alif.', ar: 'ناقص الألف.', zh: '缺少结尾 alif。' },
          d: { en: 'Present tense mismatches عندما.', ar: 'المضارع لا يوافق "عندما".', zh: '现在时与 عندما 不符。' },
        },
      },
      {
        id: 'x-nasb-04',
        prompt: 'يجب على كل ____ ألا يخالف نظام المرور.',
        options: [
          { id: 'a', text: 'أحد' },
          { id: 'b', text: 'واحد' },
          { id: 'c', text: 'الواحد' },
          { id: 'd', text: 'أحدًا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'أحد is the indefinite "one (person)" used after كل: كل أحد = "everyone".',
          ar: '"أحد" تستعمل بعد "كل" للدلالة على العموم: كل أحد.',
          zh: 'أحد 在 كل 后表示“任何人”。',
        },
        whyWrong: {
          b: { en: 'واحد is "one (number)", wrong sense here.', ar: '"واحد" للعدد.', zh: 'واحد 表数字。' },
          c: { en: 'الواحد is definite, breaks the generic sense.', ar: 'التعريف يمنع العموم.', zh: '确指破坏泛指。' },
          d: { en: 'أحدًا is manṣūb, wrong case after كل.', ar: 'المنصوب لا يصلح بعد "كل".', zh: '宾格不适用于 كل 之后。' },
        },
      },
      {
        id: 'x-nasb-05',
        prompt: 'ذهبت إلى السوق ____ بعض الفواكه.',
        options: [
          { id: 'a', text: 'لأشتري' },
          { id: 'b', text: 'أشتري' },
          { id: 'c', text: 'أشتريَ' },
          { id: 'd', text: 'اشترى' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لام التعليل + أنْ (implied) makes the verb manṣūb: لأشتري = "in order to buy".',
          ar: 'لام التعليل تقتضي النصب: لأشتري.',
          zh: 'لام التعليل 使动词变宾格：لأشتري。',
        },
        whyWrong: {
          b: { en: 'Marfūʿ needs to be preceded by nothing.', ar: 'الرفع بلا ناصب.', zh: '无宾格虚词。' },
          c: { en: 'أشتريَ would need a preceding أنْ.', ar: 'يحتاج ناصبًا صريحًا.', zh: '需显性宾格虚词。' },
          d: { en: 'اشترى is past tense.', ar: 'الماضي لا يصلح.', zh: '过去式不适用。' },
        },
      },
      {
        id: 'x-nasb-06',
        prompt: 'ادرسْ بجدٍّ ____ تنجحَ في الامتحان.',
        options: [
          { id: 'a', text: 'حتى' },
          { id: 'b', text: 'لكي' },
          { id: 'c', text: 'ثم' },
          { id: 'd', text: 'بل' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لكي is a naṣb particle introducing the purpose: لكي تنجحَ.',
          ar: '"لكي" ناصبة للتعليل: لكي تنجحَ.',
          zh: 'لكي 是宾格虚词，引出目的：لكي تنجحَ。',
        },
        whyWrong: {
          a: { en: 'حتى works but the meaning is slightly different (extent).', ar: '"حتى" تفيد الغاية، والمعنى هنا للتعليل.', zh: 'حتى 表程度，语义略异。' },
          c: { en: 'ثم is a sequencing conjunction.', ar: '"ثم" للترتيب.', zh: 'ثم 表顺序。' },
          d: { en: 'بل is for correction.', ar: '"بل" للإضراب.', zh: 'بل 表纠正。' },
        },
      },
      {
        id: 'x2-nasb-01',
        prompt: 'لمْ ____ المسؤولُ الحقيقةَ كاملةً.',
        options: [
          { id: 'a', text: 'يَقُلْ' },
          { id: 'b', text: 'يَقُلُ' },
          { id: 'c', text: 'يَقُولْ' },
          { id: 'd', text: 'يَقُولُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After لم, the defective verb قال takes the jussive with the long vowel dropped: يَقُلْ.',
          ar: 'بعد "لم" يُجزم الفعل الناقص "قال" بحذف حرف العلة: يَقُلْ.',
          zh: 'لم 后缺陷动词省略长元音：يَقُلْ。',
        },
        whyWrong: {
          b: { en: 'يَقُلُ is marfūʿ.', ar: '"يَقُلُ" مرفوع.', zh: 'يَقُلُ 是主格。' },
          c: { en: 'يَقُولْ is not the standard jussive for this defective verb.', ar: '"يَقُولْ" غير فصيحة.', zh: 'يَقُولْ 不是标准切格形式。' },
          d: { en: 'يَقُولُ is marfūʿ.', ar: '"يَقُولُ" مرفوع.', zh: 'يَقُولُ 是主格。' },
        },
      },
      {
        id: 'x2-nasb-02',
        prompt: 'الطلاب يريدون أن ____ في المسابقة.',
        options: [
          { id: 'a', text: 'يشتركون' },
          { id: 'b', text: 'يشتركوا' },
          { id: 'c', text: 'يشتركْ' },
          { id: 'd', text: 'اشتركوا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After أنْ, the masculine plural drops the nūn: يشتركوا.',
          ar: 'بعد "أنْ" تُحذف النون من جمع المذكر: يشتركوا.',
          zh: 'أنْ 后阳性复数动词去 نون 为 يشتركوا。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ with nūn.', ar: 'مرفوع بنون.', zh: '主格带 نون。' },
          c: { en: 'Wrong form for the plural.', ar: 'صيغة غير فصيحة.', zh: '复数形式错误。' },
          d: { en: 'Past tense clashes with أنْ.', ar: 'الماضي لا يلي "أنْ".', zh: 'أنْ 后不接过去式。' },
        },
      },
    ],
  },

  // ============================================================
  // 8. الممنوع من الصرف — Diptotes
  // ============================================================
  {
    titleAr: 'الممنوع من الصرف',
    questions: [
      {
        id: 'x-dip-01',
        prompt: 'يقع السودان بين خطي عرض ٨.٤٥ درجة و٢٣.٨ شمالًا.',
        options: [
          { id: 'a', text: 'عرضَ' },
          { id: 'b', text: 'عرضِ' },
          { id: 'c', text: 'عرضُ' },
          { id: 'd', text: 'عرضًا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'خطي عرض is an iḍāfah: خطي (dual majrūr) + عرض (diptote, so its genitive takes fatḥah instead of kasrah): خطي عرضَ.',
          ar: '"عرض" مضاف إليه مجرور بفتحة لأنه ممنوع من الصرف.',
          zh: 'عرض 是禁止变尾名词，属格用开口符。',
        },
        whyWrong: {
          b: { en: 'Kasrah is for triptotes.', ar: 'الكسرة للمنصرف.', zh: '齐齿符属变尾名词。' },
          c: { en: 'Marfūʿ does not fit.', ar: 'الرفع لا يصلح.', zh: '主格不适用。' },
          d: { en: 'Manṣūb does not fit.', ar: 'النصب لا يصلح.', zh: '宾格不适用。' },
        },
      },
      {
        id: 'x-dip-02',
        prompt: 'تقع مصر في قارة ____ .',
        options: [
          { id: 'a', text: 'أفريقيا' },
          { id: 'b', text: 'أفريقيَا' },
          { id: 'c', text: 'أفريقياء' },
          { id: 'd', text: 'أفارقة' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'أفريقيا is a diptote (foreign proper noun, feminine); after في it takes fatḥah.',
          ar: '"أفريقيا" ممنوعة من الصرف (علمية أعجمية)، فتُجرّ بالفتحة.',
          zh: 'أفريقيا 是禁止变尾名词（外来专有名词），属格用开口符。',
        },
        whyWrong: {
          b: { en: 'Vowel diacritic spelling nonstandard.', ar: 'ضبط غير قياسي.', zh: '变音符号不标准。' },
          c: { en: 'Broken plural, wrong sense.', ar: 'جمع مكسّر، لا يصلح.', zh: '复数形式不符。' },
          d: { en: 'أفارقة is a plural of "African people", wrong here.', ar: '"أفارقة" جمع للأشخاص، لا للقارة.', zh: 'أفارقة 是人的复数，指大洲不对。' },
        },
      },
      {
        id: 'x2-dip-01',
        prompt: 'قدمتُ هديةً لـ ____ .',
        options: [
          { id: 'a', text: 'فاطمةَ' },
          { id: 'b', text: 'فاطمةِ' },
          { id: 'c', text: 'فاطمةُ' },
          { id: 'd', text: 'فاطمةٍ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'فاطمة is a diptote proper feminine noun, so after لـ it takes fatḥah instead of kasrah.',
          ar: '"فاطمة" ممنوعة من الصرف (علمية مؤنثة)، فتُجرّ بالفتحة.',
          zh: 'فاطمة 是禁止变尾名词（阴性专有名词），属格用开口符。',
        },
        whyWrong: {
          b: { en: 'Kasrah is for triptotes.', ar: 'الكسرة للمنصرف.', zh: '齐齿符属变尾名词。' },
          c: { en: 'Marfūʿ does not fit after لـ.', ar: 'الرفع لا يصلح.', zh: '主格不适用。' },
          d: { en: 'Tanwīn cannot attach to a diptote.', ar: 'التنوين لا يلحق.', zh: '不带鼻音。' },
        },
      },
      {
        id: 'x2-dip-02',
        prompt: 'شاهدتُ ____ في الحديقة.',
        options: [
          { id: 'a', text: 'سعادَ' },
          { id: 'b', text: 'سعادِ' },
          { id: 'c', text: 'سعادُ' },
          { id: 'd', text: 'سعادٍ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'سعاد is a diptote feminine proper noun → direct object with fatḥah, no tanwīn.',
          ar: '"سعاد" ممنوعة من الصرف، فالنصب بالفتحة بلا تنوين.',
          zh: 'سعاد 是禁止变尾名词，宾格用开口符、无鼻音。',
        },
        whyWrong: {
          b: { en: 'Majrūr does not fit as object.', ar: 'الجرّ لا يصلح.', zh: '属格不适用。' },
          c: { en: 'Marfūʿ does not fit.', ar: 'الرفع لا يصلح.', zh: '主格不适用。' },
          d: { en: 'Tanwīn cannot attach.', ar: 'التنوين لا يلحق.', zh: '不带鼻音。' },
        },
      },
    ],
  },
]