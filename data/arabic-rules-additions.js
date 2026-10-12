// data/arabic-rules-additions.js
//
// Additional questions for the Arabic rules course, extracted from the
// 2009 and 2022 Chinese national Arabic-major exams. Each entry here
// appends to an existing lesson in the course, matched by Arabic title.
//
// Question IDs are prefixed with 'x-' (original pass), 'x2-' (second
// pass), or 'x3-' (third pass) to avoid collision with the original
// question IDs in data/arabic-rules-lessons.js. The append script
// (seed-arabic-rules-additions.mjs) uses these IDs to detect
// already-present questions on re-run.
//
// New lessons added by the additions file itself use 'new-' prefixed IDs.

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
          zh: 'دافع 搭配 عن：دافع عن 意为“保卫……”。',
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

      // ---- Third pass additions (x3-) ----
      {
        id: 'x3-hj-01',
        prompt: 'تقع مدينة بكين ......الصين.',
        options: [
          { id: 'a', text: 'عن' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'إلى' },
          { id: 'd', text: 'من' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'في marks location — "Beijing is located in China". It answers "where?", which is what تقع asks.',
          ar: '"في" للظرفية المكانية، وهي المناسبة مع فعل "تقع" لبيان مكان المدينة.',
          zh: '这里要用 في，因为 تقع（位于）后面要说明“在哪个地方”，في 就是表示地点的介词。',
        },
        whyWrong: {
          a: { en: '"عن" means "about / away from" — it cannot mark a location.', ar: '"عن" للمجاوزة، ولا تفيد المكان.', zh: 'عن 表示“关于/远离”，不能表示地点。' },
          c: { en: '"إلى" marks destination or direction, not location.', ar: '"إلى" للغاية، لا للظرفية.', zh: 'إلى 表示“到……”，是方向或终点。' },
          d: { en: '"من" marks origin or starting point.', ar: '"من" للابتداء.', zh: 'من 表示“从……”，是起点。' },
        },
      },
      {
        id: 'x3-hj-02',
        prompt: 'يعيش أخي في منطقة قريبة .......جامعته.',
        options: [
          { id: 'a', text: 'عن' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'من' },
          { id: 'd', text: 'على' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'قريب من = "near to" — the adjective قريب takes من to name what it is near to.',
          ar: '"قريب" يتعدّى بـ"من": قريبة من جامعته.',
          zh: '这里要用 من，因为 قريب（近的）后面要接 من，表示“离……近”。',
        },
        whyWrong: {
          a: { en: '"عن" does not collocate with قريب.', ar: '"قريب" لا يتعدّى بـ"عن".', zh: 'عن 不能和 قريب 搭配。' },
          b: { en: '"في" would place the region inside the university, which is wrong.', ar: '"في" تجعل المنطقة داخل الجامعة، وهو غير صحيح.', zh: 'في 会让句子变成“在校园里”，意思不对。' },
          d: { en: '"على" means "on top of".', ar: '"على" للاستعلاء.', zh: 'على 表示“在……上面”。' },
        },
      },
      {
        id: 'x3-hj-03',
        prompt: 'بعد التخرّج ......الجامعة والحصول على الشهادة سأعمل في شركة كبيرة.',
        options: [
          { id: 'a', text: 'من' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'بـ' },
          { id: 'd', text: 'على' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'التخرّج من = "graduation from". The verb تخرّج takes من for the institution.',
          ar: '"تخرّج" يتعدّى بـ"من": التخرّج من الجامعة.',
          zh: 'تخرّج（毕业）后面接 من，表示“从……毕业”。',
        },
        whyWrong: {
          b: { en: '"في" does not collocate with تخرّج.', ar: '"تخرّج" لا يتعدّى بـ"في".', zh: 'في 不能和 تخرّج 搭配。' },
          c: { en: '"بـ" would change the meaning to "graduated by means of".', ar: '"بـ" تغيّر المعنى.', zh: 'بـ 会把意思变成“借助……毕业”，不通。' },
          d: { en: '"على" means "on top of".', ar: '"على" للاستعلاء.', zh: 'على 表示“在……上面”。' },
        },
      },
      {
        id: 'x3-hj-04',
        prompt: 'تطبخ أمي ........نا الطعام كل يوم.',
        options: [
          { id: 'a', text: 'من' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'لـ' },
          { id: 'd', text: 'بـ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لام الاختصاص (لـ) names the person for whom the food is cooked: "cooks for us".',
          ar: '"لـ" للاختصاص، تفيد أن الطعام معدّ لنا.',
          zh: '这里用 لـ，表示“为我们做饭”，lām 表示“为……（做）”。',
        },
        whyWrong: {
          a: { en: '"من" would mean "cooks from us", which is nonsense.', ar: '"من" تجعل المعنى "تطبخ منا"، وهو غير صحيح.', zh: 'من 会让句意变成“用我们做饭”，不通。' },
          b: { en: '"في" marks location, not a beneficiary.', ar: '"في" للظرفية، لا للاختصاص.', zh: 'في 表示地点，不表示“为谁”。' },
          d: { en: '"بـ" would mean "cooks by means of us".', ar: '"بـ" للاستعانة، والمعنى غير صحيح.', zh: 'بـ 表示“借助……”，意思不对。' },
        },
      },
      {
        id: 'x3-hj-05',
        prompt: 'تخصصت ......دراسة التاريخ العربي القديم.',
        options: [
          { id: 'a', text: 'من' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'إلى' },
          { id: 'd', text: 'على' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'تخصّص في = "to specialize in" — a fixed collocation.',
          ar: '"تخصّص" يتعدّى بـ"في": تخصصت في دراسة التاريخ.',
          zh: 'تخصّص（专攻）固定搭配 في，表示“专攻……”。',
        },
        whyWrong: {
          a: { en: '"من" does not collocate with تخصّص.', ar: '"تخصّص" لا يتعدّى بـ"من".', zh: 'تخصّص 不能和 من 搭配。' },
          c: { en: '"إلى" marks destination.', ar: '"إلى" للغاية.', zh: 'إلى 表示方向。' },
          d: { en: '"على" does not collocate with تخصّص.', ar: '"تخصّص" لا يتعدّى بـ"على".', zh: 'تخصّص 不能和 على 搭配。' },
        },
      },
      {
        id: 'x3-hj-06',
        prompt: 'تبتعد صديقتي ......ـي إذا تكلمت مع أي صديقة أخرى.',
        options: [
          { id: 'a', text: 'من' },
          { id: 'b', text: 'عن' },
          { id: 'c', text: 'إلى' },
          { id: 'd', text: 'لـ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'ابتعد عن = "to move away from" — the verb takes عن, not من.',
          ar: '"ابتعد" يتعدّى بـ"عن": تبتعد عني.',
          zh: 'ابتعد（远离）固定搭配 عن，表示“远离……”。',
        },
        whyWrong: {
          a: { en: 'بَعُدَ takes من, but ابتعد (Form VIII) takes عن.', ar: '"بعد" يتعدّى بـ"من"، لكن "ابتعد" يتعدّى بـ"عن".', zh: 'بعد 用 من，但 ابتعد（第八式）用 عن。' },
          c: { en: '"إلى" marks destination, the opposite of moving away.', ar: '"إلى" للغاية، وهي عكس المعنى المطلوب.', zh: 'إلى 表示“到……”，意思正好相反。' },
          d: { en: '"لـ" marks possession or purpose.', ar: '"لـ" للاختصاص أو التعليل.', zh: 'لـ 表示所属或目的。' },
        },
      },
      {
        id: 'x3-hj-07',
        prompt: 'القطة تجلس ..... الكرسي أمام البيت.',
        options: [
          { id: 'a', text: 'عن' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'على' },
          { id: 'd', text: 'كـ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'على marks being on top of something — the cat is sitting on the chair.',
          ar: '"على" للاستعلاء، والقطة جالسة فوق الكرسي.',
          zh: '这里用 على，因为猫是坐在椅子“上面”。',
        },
        whyWrong: {
          a: { en: '"عن" means "about / away from".', ar: '"عن" للمجاوزة.', zh: 'عن 表示“关于/远离”。' },
          b: { en: '"في" would mean "inside the chair".', ar: '"في" تجعل القطة داخل الكرسي.', zh: 'في 会变成“在椅子里面”，不对。' },
          d: { en: '"كـ" marks comparison.', ar: '"كـ" للتشبيه.', zh: 'كـ 表示“像……一样”。' },
        },
      },
      {
        id: 'x3-hj-08',
        prompt: 'تسافر البنت إلى القاهرة..... السيارة.',
        options: [
          { id: 'a', text: 'بـ' },
          { id: 'b', text: 'على' },
          { id: 'c', text: 'من' },
          { id: 'd', text: 'عن' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'بـ marks the means of transport — "travels by car".',
          ar: '"بـ" للاستعانة، تفيد وسيلة السفر.',
          zh: '这里用 بـ，表示“乘坐（汽车）”，bāʾ 可以表示所用的工具或方式。',
        },
        whyWrong: {
          b: { en: '"على" would suggest travelling on top of the car.', ar: '"على" تجعل السفر فوق السيارة.', zh: 'على 会变成“在车顶上”，不对。' },
          c: { en: '"من" marks origin.', ar: '"من" للابتداء.', zh: 'من 表示起点。' },
          d: { en: '"عن" means "about / away from".', ar: '"عن" للمجاوزة.', zh: 'عن 表示“关于/远离”。' },
        },
      },
      {
        id: 'x3-hj-09',
        prompt: 'التحقت.... الجامعة العام الماضي.',
        options: [
          { id: 'a', text: 'في' },
          { id: 'b', text: 'بـ' },
          { id: 'c', text: 'عن' },
          { id: 'd', text: 'إلى' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'التحق بـ = "to enroll in / join" — fixed collocation.',
          ar: '"التحق" يتعدّى بالباء: التحقت بالجامعة.',
          zh: 'التحق（入学/加入）固定搭配 بـ，表示“加入……”。',
        },
        whyWrong: {
          a: { en: '"في" does not collocate with التحق.', ar: '"التحق" لا يتعدّى بـ"في".', zh: 'التحق 不能和 في 搭配。' },
          c: { en: '"عن" means "about / away from".', ar: '"عن" للمجاوزة.', zh: 'عن 表示“关于/远离”。' },
          d: { en: '"إلى" marks physical direction; التحق uses بـ.', ar: '"إلى" للغاية المكانية، و"التحق" يتعدّى بالباء.', zh: 'إلى 表示空间方向，التحق 用 بـ。' },
        },
      },
      {
        id: 'x3-hj-10',
        prompt: 'اشتركت ..... المسابقة مع الطلاب الآخرين وفزنا بالمركز الأول.',
        options: [
          { id: 'a', text: 'بـ' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'من' },
          { id: 'd', text: 'إلى' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'اشترك في = "to participate in" — the verb takes في.',
          ar: '"اشترك" يتعدّى بـ"في": اشتركت في المسابقة.',
          zh: 'اشترك（参加）固定搭配 في，表示“参加……”。',
        },
        whyWrong: {
          a: { en: '"بـ" does not collocate with اشترك in this sense.', ar: '"اشترك" لا يتعدّى بالباء في هذا المعنى.', zh: 'اشترك 在这里不能搭配 بـ。' },
          c: { en: '"من" marks origin.', ar: '"من" للابتداء.', zh: 'من 表示起点。' },
          d: { en: '"إلى" marks destination.', ar: '"إلى" للغاية.', zh: 'إلى 表示终点。' },
        },
      },
      {
        id: 'x3-hj-11',
        prompt: 'قال المعلم ..... نا: يجب أن تكتبوا الواجبات وتستعدوا قبل الصف.',
        options: [
          { id: 'a', text: 'على' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'لـ' },
          { id: 'd', text: 'كـ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'قال لـ = "said to". The verb قال takes the lām before the addressee.',
          ar: '"قال" يتعدّى باللام للمخاطب: قال لنا.',
          zh: '这里用 لـ，因为 قال 后面要用 lām 引出听话对象：“对我们说”。',
        },
        whyWrong: {
          a: { en: '"على" means "on top of".', ar: '"على" للاستعلاء.', zh: 'على 表示“在……上面”。' },
          b: { en: '"في" marks location.', ar: '"في" للظرفية.', zh: 'في 表示地点。' },
          d: { en: '"كـ" marks comparison.', ar: '"كـ" للتشبيه.', zh: 'كـ 表示“像……一样”。' },
        },
      },
      {
        id: 'x3-hj-12',
        prompt: 'يعمل أبي مترجمًا ..... اللغة العربية والفرنسية والصينية.',
        options: [
          { id: 'a', text: 'من وإلى' },
          { id: 'b', text: 'إلى ومن' },
          { id: 'c', text: 'في وإلى' },
          { id: 'd', text: 'بين وإلى' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'A translator works from one language to another: من … وإلى …, the standard pair.',
          ar: 'المترجم ينقل من لغة إلى أخرى، فالصواب: "من … وإلى …".',
          zh: '翻译是“从”一种语言“到”另一种语言，所以用 من … وإلى。',
        },
        whyWrong: {
          b: { en: 'Reversing the order breaks the fixed pair.', ar: 'العكس يخالف الترتيب المألوف.', zh: '颠倒顺序不符合固定搭配。' },
          c: { en: '"في" does not fit a translator\'s pair of languages.', ar: '"في" لا تصلح لبيان زوج اللغات.', zh: 'في 不用于表示翻译的语言对。' },
          d: { en: '"بين…وإلى" is not a valid pair.', ar: '"بين…وإلى" ليست صيغة صحيحة.', zh: 'بين…وإلى 不是正确搭配。' },
        },
      },
      {
        id: 'x3-hj-13',
        prompt: 'الدول العربية من الدول التي تستخدم البترول ......معظم الصناعات.',
        options: [
          { id: 'a', text: 'إلى' },
          { id: 'b', text: 'على' },
          { id: 'c', text: 'في' },
          { id: 'd', text: 'عن' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'يستخدم … في … = "uses … in …". في marks the domain in which the using takes place.',
          ar: '"يستخدم … في …" هي الصيغة الصحيحة، فـ"في" للظرفية المجازية.',
          zh: '这里用 في，因为 يستخدم（使用）后面要接 في 来说明“用在哪个领域”。',
        },
        whyWrong: {
          a: { en: '"إلى" marks destination.', ar: '"إلى" للغاية.', zh: 'إلى 表示终点。' },
          b: { en: '"على" would change the verb\'s meaning.', ar: '"على" تغيّر معنى الفعل.', zh: 'على 会改变动词含义。' },
          d: { en: '"عن" marks topic or separation.', ar: '"عن" للمجاوزة أو الموضوع.', zh: 'عن 表示话题或远离。' },
        },
      },
      {
        id: 'x3-hj-14',
        prompt: 'انتقلت مع أسرتي ......نعيش في بلد أجنبي جديد.',
        options: [
          { id: 'a', text: 'إلى' },
          { id: 'b', text: 'لـ' },
          { id: 'c', text: 'في' },
          { id: 'd', text: 'من' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لام التعليل introduces the purpose: "we moved in order to live in a new country".',
          ar: '"لـ" للتعليل، والمعنى: انتقلنا لكي نعيش في بلد جديد.',
          zh: '这里用 لـ，表示目的：“我们搬去是为了在新国家生活”。',
        },
        whyWrong: {
          a: { en: '"إلى" would make نعيش the destination, which is wrong.', ar: '"إلى" تجعل "نعيش" غاية، وهو غير صحيح.', zh: 'إلى 会把“生活”当作目的地，不通。' },
          c: { en: '"في" marks location only.', ar: '"في" للظرفية المكانية فقط.', zh: 'في 只表示地点。' },
          d: { en: '"من" marks origin.', ar: '"من" للابتداء.', zh: 'من 表示起点。' },
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

      // ---- Third pass additions (x3-) ----
      {
        id: 'x3-kana-01',
        prompt: 'الجوُّ .........في فصل الشتاء هذا العام.',
        options: [
          { id: 'a', text: 'باردٌ' },
          { id: 'b', text: 'باردًا' },
          { id: 'c', text: 'باردُ' },
          { id: 'd', text: 'باردَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'كان makes its subject marfūʿ and its predicate manṣūb. الجوُّ is the subject (marfūʿ), so the predicate takes manṣūb: باردًا.',
          ar: '"كان" ترفع المبتدأ وتنصب الخبر؛ فـ"الجوُّ" اسمها مرفوع، و"باردًا" خبرها منصوب.',
          zh: 'كان 让主语保持主格、谓语变宾格。الجوُّ 是主语（主格），所以谓语要用宾格：باردًا。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ would be correct for a plain nominal sentence, but كان requires the predicate in manṣūb.', ar: 'الرفع صحيح لو كانت الجملة اسمية بلا "كان"، ووجودها يقتضي النصب.', zh: '如果句子没有 كان，主格是对的；但有 كان 时谓语必须用宾格。' },
          c: { en: 'Same as (a) with a different vowel mark.', ar: 'الرفع لا يصح بعد "كان".', zh: 'كان 后不能用主格。' },
          d: { en: 'Manṣūb is correct in case, but باردَ without tanwīn is ungrammatical for this indefinite noun.', ar: 'النصب صحيح لكن "باردَ" بلا تنوين لا يصح.', zh: '宾格是对的，但不定名词不能省略鼻音。' },
        },
      },
      {
        id: 'x3-kana-02',
        prompt: 'كان .......يعلمنا كثيرا بطريقة ممتازة.',
        options: [
          { id: 'a', text: 'الأستاذُ' },
          { id: 'b', text: 'الأستاذَ' },
          { id: 'c', text: 'الأستاذِ' },
          { id: 'd', text: 'الأستاذْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'كان raises its subject to rafʿ. الأستاذ is the subject, so it takes ḍammah: الأستاذُ.',
          ar: '"كان" ترفع اسمها؛ فـ"الأستاذُ" اسمها مرفوع بالضمة.',
          zh: 'كان 让主语变主格。الأستاذ 是主语，所以用主格符号：الأستاذُ。',
        },
        whyWrong: {
          b: { en: 'Manṣūb is for the predicate (خبر كان), not the subject.', ar: 'النصب للخبر لا للاسم.', zh: '宾格是谓语的格，不是主语的。' },
          c: { en: 'Majrūr is for a noun after a preposition or in iḍāfah, neither of which applies here.', ar: 'الجرّ لا يصلح لاسم "كان".', zh: '属格用于介词后或正偏组合第二项，此处都不适用。' },
          d: { en: 'Sukūn is never a case ending for a definite noun.', ar: 'السكون لا يكون علامة إعراب.', zh: '静符不是名词的格位符号。' },
        },
      },
      {
        id: 'x3-kana-03',
        prompt: 'كان الجو حارًا و.........باردًا الآن.',
        options: [
          { id: 'a', text: 'ليس' },
          { id: 'b', text: 'أصبح' },
          { id: 'c', text: 'مازال' },
          { id: 'd', text: 'كان' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The sentence contrasts past and present: "the weather was hot and has now become cold". أصبح (a sister of كان, meaning "became") fits the change of state.',
          ar: 'السياق يفيد التحول من حالة إلى أخرى؛ و"أصبح" من أخوات "كان" وتفيد التحول، فهي المناسبة.',
          zh: '句子对比过去和现在：“天气曾热，现在变冷了”。أصبح 是 كان 的姊妹词，表示“变成”，正好合语境。',
        },
        whyWrong: {
          a: { en: 'ليس negates rather than expressing change; it cannot follow "حارًا و" as a parallel predicate.', ar: '"ليس" للنفي لا للتحول، ولا تصح في هذا السياق.', zh: 'ليس 是否定，不表变化，与语境不符。' },
          c: { en: 'مازال means "still is"; "still cold now" contradicts the contrast the sentence is drawing.', ar: '"مازال" تفيد الاستمرار، والمعنى هنا للتحول.', zh: 'مازال 表“仍然”，与“现在变冷”的对比语义冲突。' },
          d: { en: 'Repeating كان would make the second clause also past-tense, losing the contrast.', ar: 'تكرار "كان" يفقد الجملة معنى التحول.', zh: '重复 كان 会让第二句也变成过去，失去对比。' },
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

      // ---- Third pass additions (x3-) ----
      {
        id: 'x3-in-02',
        prompt: 'من الضروري أن يدرس .......... جيدا قبل الامتحان.',
        options: [
          { id: 'a', text: 'الطلابُ' },
          { id: 'b', text: 'الطلابّ' },
          { id: 'c', text: 'الطلابِ' },
          { id: 'd', text: 'الطلابٌ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'الطلاب is the فاعل of the manṣūb verb يدرس (governed by أنْ), and the فاعل is always marfūʿ: الطلابُ.',
          ar: '"الطلاب" فاعل الفعل "يدرس" المنصوب بـ"أنْ"، والفاعل مرفوع دائمًا: الطلابُ.',
          zh: 'الطلاب 是动词 يدرس（受 أنْ 影响用宾格）的施事，施事永远用主格：الطلابُ。',
        },
        whyWrong: {
          b: { en: 'Shaddah on the final ب is a spelling error.', ar: 'الشدة على الباء خطأ إملائي.', zh: '末尾的 شدّة 是拼写错误。' },
          c: { en: 'Majrūr would require a preceding preposition or iḍāfah.', ar: 'الجرّ يحتاج حرفًا أو إضافة.', zh: '属格需要介词或正偏组合。' },
          d: { en: 'Tanwīn on a definite noun (with ال) is ungrammatical.', ar: 'التنوين لا يجتمع مع "ال".', zh: '确指名词（带 ال）不能带鼻音。' },
        },
      },
      {
        id: 'x3-in-03',
        prompt: 'سمعت ..... لدينا هذا العام أساتذة جددًا، ولكن يقال..... هذا الخبر ليس صحيحًا.',
        options: [
          { id: 'a', text: 'أنّ / أنْ' },
          { id: 'b', text: 'إنّ / إنّ' },
          { id: 'c', text: 'إنّ / أنّ' },
          { id: 'd', text: 'أنَّ / إنَّ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'First blank: إنّ after سمعت as a light introductory particle in the sentence "إنّ لدينا أساتذة" (nominal). Second blank: أنّ after يقال because what follows is the reported content.',
          ar: 'الأول: "إنّ" بعد "سمعت" في جملة اسمية. الثاني: "أنّ" بعد "يقال" لأن ما بعدها مقول.',
          zh: '第一空：سمعت 后用 إنّ 引出名词句。第二空：يقال 后用 أنّ 引出转述内容。',
        },
        whyWrong: {
          a: { en: 'Reverses the two: أنّ does not fit the first slot after سمعت here, and أنْ must precede a verb.', ar: 'عكس الترتيب: "أنّ" لا تصلح في الأول، و"أنْ" يليها فعل.', zh: '顺序颠倒：أنّ 不适合第一空，أنْ 后必须接动词。' },
          b: { en: 'Two إنّs; the second slot after يقال requires أنّ.', ar: '"إنّ" في الموضع الثاني خطأ.', zh: '第二空应为 أنّ。' },
          d: { en: 'Two أنّs; the first slot after سمعت here takes إنّ.', ar: '"أنّ" في الموضع الأول خطأ.', zh: '第一空应为 إنّ。' },
        },
      },
      {
        id: 'x3-in-04',
        prompt: 'أتمنى ..... يغيّروا نظام التعليم.',
        options: [
          { id: 'a', text: 'أنْ' },
          { id: 'b', text: 'أنّ' },
          { id: 'c', text: 'إنّ' },
          { id: 'd', text: 'إنْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After verbs of wishing (أتمنى), the complement is introduced by أنْ + manṣūb verb: أتمنى أنْ يغيّروا.',
          ar: 'بعد أفعال التمني مثل "أتمنى" تأتي "أنْ" المصدرية الناصبة: أتمنى أنْ يغيّروا.',
          zh: 'أتمنى（希望）这类意愿动词后面要用 أنْ 引出动词补语：أتمنى أنْ يغيّروا。',
        },
        whyWrong: {
          b: { en: 'أنّ must be followed by a nominal clause (اسم + خبر), not a verb.', ar: '"أنّ" يليها اسم وخبر لا فعل.', zh: 'أنّ 后接名词句，不接动词。' },
          c: { en: 'إنّ does not follow verbs of wishing.', ar: '"إنّ" لا تقع بعد أفعال التمني.', zh: 'إنّ 不用于意愿动词之后。' },
          d: { en: 'إنْ is conditional.', ar: '"إنْ" شرطية.', zh: 'إنْ 是条件虚词。' },
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

      // ---- Third pass additions (x3-) ----
      {
        id: 'x3-rel-01',
        prompt: 'البنت ......أعطتني الهدية في عيد ميلادي لطيفة جدا.',
        options: [
          { id: 'a', text: 'الذي' },
          { id: 'b', text: 'اللتان' },
          { id: 'c', text: 'اللائي' },
          { id: 'd', text: 'التي' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'البنت is feminine singular → the relative pronoun is التي.',
          ar: '"البنت" مفردة مؤنثة، فالموصول "التي".',
          zh: 'البنت 是阴性单数，关系代词用 التي。',
        },
        whyWrong: {
          a: { en: 'الذي is masculine singular.', ar: '"الذي" للمذكر.', zh: 'الذي 是阳性单数。' },
          b: { en: 'اللتان is feminine dual — the noun here is singular.', ar: '"اللتان" للمثنى، والاسم هنا مفرد.', zh: 'اللتان 是阴性双数，此处名词是单数。' },
          c: { en: 'اللائي is feminine plural.', ar: '"اللائي" لجمع المؤنث.', zh: 'اللائي 是阴性复数。' },
        },
      },
      {
        id: 'x3-rel-02',
        prompt: 'هؤلاء هم الطلاب ......نجحوا في اختبار القبول بالجامعة هذا العام.',
        options: [
          { id: 'a', text: 'الذي' },
          { id: 'b', text: 'التي' },
          { id: 'c', text: 'الذين' },
          { id: 'd', text: 'اللواتي' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'الطلاب is a masculine human plural → the relative pronoun is الذين.',
          ar: '"الطلاب" جمع مذكر عاقل، فالموصول "الذين".',
          zh: 'الطلاب 是阳性人类复数，关系代词用 الذين。',
        },
        whyWrong: {
          a: { en: 'الذي is masculine singular.', ar: '"الذي" للمفرد المذكر.', zh: 'الذي 是阳性单数。' },
          b: { en: 'التي is feminine singular.', ar: '"التي" للمفردة المؤنثة.', zh: 'التي 是阴性单数。' },
          d: { en: 'اللواتي is feminine human plural.', ar: '"اللواتي" لجمع النساء.', zh: 'اللواتي 是阴性人类复数。' },
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

      // ---- Third pass additions (x3-) ----
      {
        id: 'x3-num-01',
        prompt: 'اشتريت من السوق ..... برتقالة.',
        options: [
          { id: 'a', text: 'ثلاثُ عشرةُ' },
          { id: 'b', text: 'ثلاثةُ عشرةُ' },
          { id: 'c', text: 'ثلاثةَ عشرةَ' },
          { id: 'd', text: 'ثلاثَ عشرةَ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'برتقالة is feminine, so numbers 11–99 take the masculine form, and because the numeral is the direct object of اشتريت it is manṣūb: ثلاثَ عشرةَ.',
          ar: '"برتقالة" مؤنثة، فيكون العدد بالمذكر (ثلاث)، وهو مفعول به منصوب: ثلاثَ عشرةَ.',
          zh: 'برتقالة 是阴性名词，所以数词用阳性形式 ثلاث；因为它是动词 اشتريت 的宾语，用宾格：ثلاثَ عشرةَ。',
        },
        whyWrong: {
          a: { en: 'ثلاثُ عشرةُ is both the wrong gender and rafʿ; the number here is manṣūb.', ar: 'مؤنث ومرفوع، والصواب مذكر منصوب.', zh: '阴性 + 主格，性别和格位都错。' },
          b: { en: 'ثلاثةُ عشرةُ is masculine but marfūʿ; as object it must be manṣūb.', ar: 'مذكر لكن مرفوع، والصواب النصب.', zh: '阳性对，但格位应是宾格。' },
          c: { en: 'ثلاثةَ عشرةَ is masculine manṣūb but the number does not match the feminine counted noun: for عشرة plus a masculine unit before a feminine counted noun, the unit is ثلاثَ.', ar: '"ثلاثة" خلاف القاعدة؛ يقال "ثلاثَ عشرةَ" قبل المؤنث.', zh: 'ثلاثة 与阴性名词搭配时，标准形式是 ثلاثَ 而不是 ثلاثةَ。' },
        },
      },
      {
        id: 'x3-num-02',
        prompt: 'معي خمسة عشر .........',
        options: [
          { id: 'a', text: 'جنيهٌ' },
          { id: 'b', text: 'جنيهًا' },
          { id: 'c', text: 'جنيهْ' },
          { id: 'd', text: 'جنيهٍ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Tamyīz after numbers 11–99 is singular manṣūb with tanwīn: خمسة عشر جنيهًا. جنيه is masculine, so the number uses the masculine form خمسة عشر.',
          ar: 'التمييز بعد الأعداد من ١١ إلى ٩٩ مفرد منصوب: خمسة عشر جنيهًا.',
          zh: '11–99 后的区分语用宾格单数并带鼻音：خمسة عشر جنيهًا。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ cannot be tamyīz here.', ar: 'الرفع لا يصح في التمييز.', zh: '区分语不能用主格。' },
          c: { en: 'Sukūn is not a valid noun ending.', ar: 'السكون لا يصح في الأسماء.', zh: '名词不能用静符结尾。' },
          d: { en: 'Majrūr needs a preposition or iḍāfah.', ar: 'الجرّ يحتاج حرفًا أو إضافة.', zh: '属格需要介词或正偏组合。' },
        },
      },
      {
        id: 'x3-num-03',
        prompt: '............قصص جميلة وممتعة.',
        options: [
          { id: 'a', text: 'ألفَ ليلةِ وليلةِ' },
          { id: 'b', text: 'ألفَ ليلةٌ وليلةِ' },
          { id: 'c', text: 'ألفُ ليلةٍ وليلةٌ' },
          { id: 'd', text: 'ألفٌ ليلةً وليلةً' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'ألف is the mubtadaʾ (rafʿ with ḍammah), and it is in iḍāfah with ليلةٍ (majrūr with kasrah). The whole phrase is the title "ألف ليلة وليلة" (One Thousand and One Nights), used here as a mubtadaʾ followed by the khabar قصص جميلة وممتعة.',
          ar: '"ألف" مبتدأ مرفوع، مضاف إلى "ليلةٍ" المجرورة، والجملة بعدها خبر.',
          zh: 'ألف 是主语，用主格；与 ليلةٍ（属格）构成正偏组合。整句是《一千零一夜》的书名，后接谓语 قصص جميلة وممتعة。',
        },
        whyWrong: {
          a: { en: 'ألفَ is manṣūb — the mubtadaʾ must be marfūʿ.', ar: 'النصب لا يصلح للمبتدأ.', zh: '主语不能用宾格。' },
          b: { en: 'Mixed: ألفَ manṣūb, ليلةٌ marfūʿ without iḍāfah.', ar: 'خلط بين الإعراب والإضافة.', zh: '格位混乱，正偏组合也未建立。' },
          d: { en: 'ألفٌ with tanwīn breaks the iḍāfah.', ar: 'التنوين يمنع الإضافة.', zh: '带鼻音会切断正偏组合。' },
        },
      },
      {
        id: 'x3-num-04',
        prompt: 'كم..... اشتريت من المكتبة؟',
        options: [
          { id: 'a', text: 'كتبٌ' },
          { id: 'b', text: 'كتابًا' },
          { id: 'c', text: 'كتابٌ' },
          { id: 'd', text: 'كتبًا' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'With كم الاستفهامية, the counted noun is manṣūb and plural: كم كتبًا = "how many books?".',
          ar: 'بعد "كم" الاستفهامية يكون التمييز منصوبًا جمعًا: كم كتبًا اشتريت؟',
          zh: 'كم（疑问词）后面的区分语要用宾格复数：كم كتبًا（多少本书）。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ plural, wrong case after كم.', ar: 'الرفع لا يصح بعد "كم" الاستفهامية.', zh: 'كم 后不能用主格。' },
          b: { en: 'كتابًا is singular; the counted noun after كم is plural.', ar: 'المفرد لا يصلح بعد "كم" الاستفهامية.', zh: 'كم 后的名词应用复数，不用单数。' },
          c: { en: 'كتابٌ is both singular and marfūʿ — doubly wrong.', ar: 'مفرد ومرفوع، خطأ مزدوج.', zh: '单数 + 主格，双重错误。' },
        },
      },
      {
        id: 'x3-num-05',
        prompt: 'في جامعتنا ثلاثة ......دراسية.',
        options: [
          { id: 'a', text: 'فصلٌ' },
          { id: 'b', text: 'فصولٍ' },
          { id: 'c', text: 'فصلٍ' },
          { id: 'd', text: 'فصولًا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Numbers 3–10 are in iḍāfah with a plural genitive counted noun. فصل is masculine, so the number is feminine ثلاثة, and the counted noun is majrūr plural: ثلاثة فصولٍ.',
          ar: '"ثلاثة" من ٣ إلى ١٠، والمعدود جمع مجرور: ثلاثة فصولٍ دراسية.',
          zh: '3–10 的数词后接复数属格名词：ثلاثة فصولٍ。فصل 是阳性，所以数词用阴性 ثلاثة。',
        },
        whyWrong: {
          a: { en: 'فصلٌ is singular; after 3–10 the counted noun is plural.', ar: 'المفرد لا يصلح بعد الأعداد من ٣ إلى ١٠.', zh: '3–10 后的名词要用复数，不用单数。' },
          c: { en: 'فصلٍ is singular majrūr; still the wrong number.', ar: 'مفرد مجرور، والعدد مطلوب جمع.', zh: '单数属格，数词所要求的复数不满足。' },
          d: { en: 'فصولًا is manṣūb plural — after 3–10 the counted noun is majrūr, not manṣūb.', ar: 'النصب خطأ، والصواب الجر.', zh: '宾格错误，此处应用属格。' },
        },
      },
      {
        id: 'x3-num-06',
        prompt: 'رأيت ........رجلًا في السوق يشترون اللحم والدجاج.',
        options: [
          { id: 'a', text: 'سبعون' },
          { id: 'b', text: 'سبعةً' },
          { id: 'c', text: 'سبعُ' },
          { id: 'd', text: 'سبعين' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'The number is the direct object of رأيت and must be manṣūb; 70 takes the yāʾ form سبعين. The tamyīz رجلًا is singular manṣūb.',
          ar: '"سبعين" مفعول به منصوب بالياء، و"رجلًا" تمييز مفرد منصوب.',
          zh: '数词是 رأيت 的宾语，用宾格；70 用 سبعين 形式。区分语 رجلًا 是宾格单数。',
        },
        whyWrong: {
          a: { en: 'سبعون is the marfūʿ form; as object it must be سبعين.', ar: 'الرفع لا يصح للمفعول به.', zh: '宾语不能用主格。' },
          b: { en: 'سبعةً is "seven", not "seventy".', ar: '"سبعة" سبعة، لا سبعين.', zh: 'سبعة 是“七”，不是“七十”。' },
          c: { en: 'سبعُ is 3–10 form ("seven") and marfūʿ — wrong number and case.', ar: 'صيغة غير مناسبة.', zh: '数与格都不对。' },
        },
      },
      {
        id: 'x3-num-07',
        prompt: 'لقد قامت الدولة بعقد اتفاقات تجارية واقتصادية مع ......دولة أخرى في سبيل تحقيق التطور والازدهار.',
        options: [
          { id: 'a', text: 'عشرون' },
          { id: 'b', text: 'أحد وعشرين' },
          { id: 'c', text: 'ثلاثة وعشرين' },
          { id: 'd', text: 'عشرين' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After the preposition مع, the numeral must be majrūr. For 21, the compound uses the yāʾ form of عشرون: أحد وعشرين.',
          ar: 'بعد حرف الجر "مع" يكون العدد مجرورًا بالياء في المركّب: أحد وعشرين.',
          zh: '介词 مع 后面的数词要用属格。21 的复合形式用 عشرين（属格 yāʾ 形）：أحد وعشرين。',
        },
        whyWrong: {
          a: { en: 'عشرون is marfūʿ; after مع it must be مجرور.', ar: 'الرفع لا يصح بعد حرف الجر.', zh: 'مع 后不能用主格。' },
          c: { en: 'ثلاثة وعشرين is 23, not 21.', ar: 'العدد مختلف (٢٣ لا ٢١).', zh: '这是 23，不是 21。' },
          d: { en: 'عشرين alone is 20, not 21.', ar: '"عشرين" وحدها عشرون لا أحد وعشرون.', zh: 'عشرين 单用是 20，不是 21。' },
        },
      },
      {
        id: 'x3-num-08',
        prompt: 'حضر إلى هذا المؤتمر حوالي أحد عشر.......للنقاش حول القضايا والمشكلات التي تفسد المجتمع.',
        options: [
          { id: 'a', text: 'متحدثٌ' },
          { id: 'b', text: 'متحدثون' },
          { id: 'c', text: 'متحدثًا' },
          { id: 'd', text: 'متحدثات' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'Tamyīz after 11–99 is singular manṣūb. متحدث is masculine singular, so متحدثًا is the correct tamyīz of أحد عشر.',
          ar: 'التمييز بعد ١١–٩٩ مفرد منصوب. و"متحدث" مذكر مفرد، فالصواب: أحد عشر متحدثًا.',
          zh: '11–99 后的区分语用宾格单数。متحدث 是阳性单数，所以正确的区分语是 متحدثًا。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ cannot be tamyīz after 11–99.', ar: 'الرفع لا يصح في التمييز.', zh: '区分语不能用主格。' },
          b: { en: 'متحدثون is plural — tamyīz after 11–99 is singular.', ar: 'الجمع لا يصلح، والتمييز مفرد.', zh: '区分语要用单数，不用复数。' },
          d: { en: 'متحدثات is feminine plural — wrong gender and number.', ar: 'مؤنث جمع، خطأ في الجنس والعدد.', zh: '阴性复数，性和数都不对。' },
        },
      },
      {
        id: 'x3-num-09',
        prompt: 'هذه الورقة تحتوي على أكثر من .......أسئلة عن المفردات التي درسناها الأسبوع الماضي.',
        options: [
          { id: 'a', text: 'خمسة' },
          { id: 'b', text: 'خمس' },
          { id: 'c', text: 'خمسين' },
          { id: 'd', text: 'أخماس' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'أسئلة is a broken plural that counts as feminine singular for numeral agreement. Numbers 3–10 take the opposite gender of the counted noun, so أسئلة (grammatically feminine) → خمسة (masculine form).',
          ar: '"أسئلة" جمع تكسير يعامل معاملة المفردة المؤنثة، فيخالفه العدد: خمسة أسئلة.',
          zh: 'أسئلة 是破碎复数，按阴性单数处理，数词用阳性形式：خمسة أسئلة。',
        },
        whyWrong: {
          b: { en: 'خمس without tāʾ marbūṭah is the feminine form of the number, but أسئلة requires the masculine form خمسة.', ar: 'الصيغة المؤنثة لا تصلح قبل "أسئلة".', zh: '阴性形式 خمس 不适用于 أسئلة。' },
          c: { en: 'خمسين is 50 — the sentence means "more than five".', ar: 'المعنى المطلوب خمسة لا خمسون.', zh: '句子意思是“五个以上”，不是 50。' },
          d: { en: 'أخماس is a plural noun ("fifths"), not a numeral.', ar: '"أخماس" جمع، لا عدد.', zh: 'أخماس 是“五分之一”的复数，不是数词。' },
        },
      },
      {
        id: 'x3-num-10',
        prompt: 'كم..... سيأتي لزيارتنا في عيد الربيع يا أمي؟',
        options: [
          { id: 'a', text: 'الضيوف' },
          { id: 'b', text: 'ضيفٌ' },
          { id: 'c', text: 'ضيوفًا' },
          { id: 'd', text: 'ضيفًا' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'With كم الاستفهامية the tamyīz is singular manṣūb: كم ضيفًا = "how many guests?".',
          ar: 'تمييز "كم" الاستفهامية مفرد منصوب: كم ضيفًا.',
          zh: 'كم（疑问词）后的区分语用宾格单数：كم ضيفًا（多少位客人）。',
        },
        whyWrong: {
          a: { en: 'الضيوف is definite plural; tamyīz after كم is indefinite singular.', ar: 'معرفة جمع، والتمييز نكرة مفرد.', zh: '确指复数，但区分语应是不定单数。' },
          b: { en: 'ضيفٌ is marfūʿ; the tamyīz is manṣūb.', ar: 'الرفع لا يصح في التمييز.', zh: '主格不能作区分语。' },
          c: { en: 'ضيوفًا is plural; tamyīz after كم is singular.', ar: 'الجمع لا يصلح.', zh: '区分语要用单数。' },
        },
      },
      {
        id: 'x3-num-11',
        prompt: 'لا يستطيع الإنسان العمل بشكل جيد إلا إذا حصل على........من النوم كل يوم.',
        options: [
          { id: 'a', text: 'ثماني ساعاتٍ' },
          { id: 'b', text: 'ثماني ساعاتٌ' },
          { id: 'c', text: 'ثماني ساعاتٍ' },
          { id: 'd', text: 'ثمانية ساعةٍ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'ساعات is a feminine sound plural, and numbers 3–10 take the opposite gender of the counted noun, so the number is masculine: ثماني. Since it is preceded by على, the counted noun is majrūr: ثماني ساعاتٍ.',
          ar: '"ساعات" جمع مؤنث سالم، فالعدد بالمذكر: ثماني، وهو مضاف إلى "ساعاتٍ" المجرورة بالكسرة.',
          zh: 'ساعات 是阴性健全复数，数词用阳性形式 ثماني。因为前面有 على，被数名词用属格：ثماني ساعاتٍ。',
        },
        whyWrong: {
          b: { en: 'ساعاتٌ is marfūʿ; the counted noun after على is majrūr.', ar: 'الرفع لا يصح بعد حرف الجر.', zh: 'على 后不能用主格。' },
          c: { en: 'This option is textually identical to (a); treat (a) as the intended correct answer.', ar: 'خيار مكرر.', zh: '与 a 相同，本题答案取 a。' },
          d: { en: 'ثمانية with tāʾ marbūṭah is the feminine form — but ساعات is feminine plural, so the masculine form ثماني is required; also ساعة is singular.', ar: 'الصيغة المؤنثة لا تصلح، والمعدود مفرد.', zh: 'ثمانية 是阴性，而此处需阳性；ساعة 也是单数。' },
        },
      },
      {
        id: 'x3-num-12',
        prompt: 'لقد قامت الصين في الفترة الأخيرة بافتتاح نحو ...........في منطقة الشرق الأوسط.',
        options: [
          { id: 'a', text: 'عشرين شركاتٍ' },
          { id: 'b', text: 'ثلاثون شركةً' },
          { id: 'c', text: 'خمسين شركةً' },
          { id: 'd', text: 'تسعون شركةً' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'After نحو ("about"), the numeral is manṣūb: خمسين (yāʾ form). The counted noun شركةً is singular manṣūb as tamyīz after 11–99.',
          ar: 'بعد "نحو" يكون العدد منصوبًا: خمسين، و"شركةً" تمييز مفرد منصوب.',
          zh: 'نحو（大约）后面的数词用宾格：خمسين。被数名词 شركةً 是 11–99 后的区分语，用宾格单数。',
        },
        whyWrong: {
          a: { en: 'عشرين شركاتٍ mixes cases: عشرين manṣūb, شركاتٍ majrūr — and 3–10 range plural requires iḍāfah without tamyīz.', ar: 'خلط بين الإعراب والإضافة.', zh: '格位与正偏组合矛盾，不合规则。' },
          b: { en: 'ثلاثون is marfūʿ; بعد نحو requires manṣūb.', ar: 'الرفع لا يصح بعد "نحو".', zh: 'نحو 后不能用主格。' },
          d: { en: 'تسعون is marfūʿ, same problem as (b).', ar: 'الرفع لا يصح.', zh: '主格不适用。' },
        },
      },
      {
        id: 'x3-num-13',
        prompt: 'عندنا اليوم محاضرة الساعة التاسعةُ إلا......',
        options: [
          { id: 'a', text: 'ستَّ دقائقَ' },
          { id: 'b', text: 'ستةُ دقائقُ' },
          { id: 'c', text: 'ستُّ دقائقِ' },
          { id: 'd', text: 'ستَّ دقيقةً' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After إلا in the sense of "except / minus", the numeral ستَّ is manṣūb (as mustathnā), and its counted noun دقائقَ is the tamyīz, plural manṣūb in this construction: ستَّ دقائقَ.',
          ar: '"ستَّ" مستثنى منصوب، و"دقائقَ" تمييز جمع منصوب، والصيغة الفصيحة: ستَّ دقائقَ.',
          zh: '这里 إلا 表“减去”，数词 ستَّ 用宾格（作例外词），被数名词 دقائقَ 是区分语，用宾格复数：ستَّ دقائقَ。',
        },
        whyWrong: {
          b: { en: 'ستةُ is marfūʿ with tāʾ marbūṭah, but the numeral here is مستثنى and must be manṣūb.', ar: 'الرفع لا يصح في المستثنى.', zh: '例外词要用宾格，不能用主格。' },
          c: { en: 'ستُّ is marfūʿ, same problem; also دقائقِ should be منصوب not مجرور.', ar: 'الرفع لا يصح.', zh: '主格不对，且 دقائق 应用宾格。' },
          d: { en: 'دقيقةً is singular, but دقائق should be plural here for this construction.', ar: 'المفرد لا يلائم هذا السياق.', zh: '此处应用复数 دقائق 而非单数。' },
        },
      },
      {
        id: 'x3-num-14',
        prompt: 'قرأتُ ......قصةً خلال إجازة نصف العام.',
        options: [
          { id: 'a', text: 'اثنتي عشرة' },
          { id: 'b', text: 'اثني عشر' },
          { id: 'c', text: 'اثنتا عشرة' },
          { id: 'd', text: 'اثنا عشر' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'قصة is feminine, so the compound 12 uses the feminine unit form: اثنتي عشرة. Since it is the direct object of قرأتُ, the number takes the manṣūb yāʾ form اثنتي.',
          ar: '"قصة" مؤنثة، فالعدد "اثنتي عشرة" بالياء لأنه مفعول به منصوب.',
          zh: 'قصة 是阴性，所以 12 用阴性单位形式 اثنتي عشرة。它是动词 قرأتُ 的宾语，用宾格 yāʾ 形式：اثنتي。',
        },
        whyWrong: {
          b: { en: 'اثني عشر is masculine — قصة is feminine.', ar: 'مذكر، والمعدود مؤنث.', zh: 'اثني عشر 是阳性，但 قصة 是阴性。' },
          c: { en: 'اثنتا عشرة is feminine but with alif (rafʿ); as object it must be اثنتي (manṣūb).', ar: 'الصيغة بالألف للرفع، والصواب الياء للنصب.', zh: 'اثنتا عشرة 是主格（用 alif），此处应用宾格 اثنتي。' },
          d: { en: 'اثنا عشر is both masculine and marfūʿ — doubly wrong.', ar: 'مذكر ومرفوع، خطأ مزدوج.', zh: '阳性 + 主格，双重错误。' },
        },
      },
      {
        id: 'x3-num-15',
        prompt: 'في جامعتنا ......قصة رائعة تحكي لأكثر من .......مؤلفًا عن تاريخ العالم.',
        options: [
          { id: 'a', text: 'ألفان..... مائة وخمس عشرة' },
          { id: 'b', text: 'ألفيّ...... مائة وخمسة عشر' },
          { id: 'c', text: 'ألفا........مائة وخمسة عشر' },
          { id: 'd', text: 'ألفين... مائة وخمس عشرة' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'First blank: ألفا is the dual in iḍāfah, the correct form for "two thousand". Second blank: مائة وخمسة عشر = "115", with the masculine form خمسة عشر because مؤلف is masculine.',
          ar: 'الأول: "ألفا" مثنى مضاف، والصيغة الفصيحة لألفين. الثاني: "مائة وخمسة عشر" بالمذكر لأن "مؤلف" مذكر.',
          zh: '第一空：ألفا 是正偏组合中的双数形式，表示“两千”。第二空：مائة وخمسة عشر = 115，用阳性形式因为 مؤلف 是阳性。',
        },
        whyWrong: {
          a: { en: 'ألفان is rafʿ but the sentence requires iḍāfah (so ألفا not ألفان); also مائة وخمس عشرة is feminine — should be خمسة عشر with masculine مؤلف.', ar: '"ألفان" لا تصلح للإضافة، و"خمس عشرة" للمؤنث.', zh: 'ألفان 不能作正偏组合第一项；خمس عشرة 是阴性，不符。' },
          b: { en: 'ألفيّ is the manṣūb/majrūr dual, wrong case; second blank is fine.', ar: '"ألفيّ" لا تصلح هنا.', zh: 'ألفيّ 是宾/属格双数，格位不对。' },
          d: { en: 'ألفين is wrong case here (should be ألفا in iḍāfah as subject); also مائة وخمس عشرة is feminine.', ar: 'خطأ في الإعراب والمطابقة.', zh: '格位和性别都不对。' },
        },
      },
      {
        id: 'x3-num-16',
        prompt: 'تنتهي صفوفنا عادة في الساعة 11:25 صباحا.',
        options: [
          { id: 'a', text: 'الحادية عشرة وخمس وعشرين دقيقة' },
          { id: 'b', text: 'الحادي عشر وخمسة وعشرون دقيقة' },
          { id: 'c', text: 'الحادية عشر وخمس عشرون دقائق' },
          { id: 'd', text: 'الحادي عشرة وخمسة وعشرين دقائق' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Telling time: الساعة takes a feminine ordinal (الحادية عشرة), then the counted minutes. 25 takes a masculine unit form before دقيقة: خمس وعشرين دقيقة.',
          ar: 'في التوقيت: "الساعة الحادية عشرة وخمس وعشرين دقيقة" — الساعة تتبع بترتيب مؤنث، والدقائق بالمذكر لأن "دقيقة" مؤنثة.',
          zh: '报时：الساعة 后用阴性序数词 الحادية عشرة；分钟部分用阳性形式 خمس وعشرين，因为 دقيقة 是阴性。',
        },
        whyWrong: {
          b: { en: 'الحادي عشر is masculine — the ساعت-hour ordinal must be feminine.', ar: 'الصيغة المذكرة لا تصلح للساعة.', zh: 'الحادي عشر 是阳性，但报时需要阴性。' },
          c: { en: 'الحادية عشر uses the wrong compound form (missing tāʾ on عشر); دقائق is plural where singular is required.', ar: 'صيغة مركّبة غير فصيحة.', zh: '复合形式不规范，且分钟应用单数。' },
          d: { en: 'الحادي عشرة mixes masculine unit with feminine ten; دقائق should be singular دقيقة.', ar: 'خلط بين المذكر والمؤنث.', zh: '单位与十位的性别混用，且分钟数应用单数。' },
        },
      },
      {
        id: 'x3-num-17',
        prompt: 'تُوفي طه حسين سنة 1973 ميلاديا.',
        options: [
          { id: 'a', text: 'ثلاثة وسبعين وتسعمائة وألف' },
          { id: 'b', text: 'ألف وتسعمائة وثلاثة وسبعين' },
          { id: 'c', text: 'ألف وتسعمائة وثلاث وسبعين' },
          { id: 'd', text: 'تسعة عشر وثلاثة وسبعون' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'For the year 1973: ألف وتسعمائة وثلاثة وسبعين. The units form is masculine ثلاثة because سنة is feminine (feminine counted noun → masculine unit numeral).',
          ar: '"ألف وتسعمائة وثلاثة وسبعين" هي الصيغة الفصيحة للعدد ١٩٧٣، والمذكر لأنه precedes المؤنث "سنة".',
          zh: '1973 的标准读法是 ألف وتسعمائة وثلاثة وسبعين。用阳性形式 ثلاثة 因为后面的 سنة 是阴性。',
        },
        whyWrong: {
          a: { en: 'Word order is reversed: Arabic numbers go from largest to smallest.', ar: 'الترتيب مقلوب، والصواب من الأكبر إلى الأصغر.', zh: '顺序颠倒，阿拉伯语数词从大到小排列。' },
          c: { en: 'ثلاث without tāʾ marbūṭah is the feminine form of the numeral — should be ثلاثة before وسبعين here.', ar: '"ثلاث" بالتاء مطلوبة في هذا الموضع.', zh: '此处应用带 ة 的 ثلاثة 形式。' },
          d: { en: '"تسعة عشر وثلاثة وسبعون" is a misread of the digits (19 + 73).', ar: 'أرقام خاطئة.', zh: '数字误读（19 + 73）。' },
        },
      },
      {
        id: 'x3-num-18',
        prompt: 'تبلغ مساحة الصحراء الغربية نسبة 67% من مساحة مصر تقريبا.',
        options: [
          { id: 'a', text: 'سبع وستون بالمائة' },
          { id: 'b', text: 'ستة وسبعون بالمائة' },
          { id: 'c', text: 'سبعًا وستين بالمائة' },
          { id: 'd', text: 'سبعة وستون بالمائة' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The compound 67 uses the masculine form سبع وستون (بالمائة is treated as masculine for numeral agreement).',
          ar: 'العدد ٦٧ بالمذكر: سبع وستون، ثم "بالمائة" للدلالة على النسبة.',
          zh: '67 用阳性形式 سبع وستون（بالمائة 在数词搭配中按阳性处理）。',
        },
        whyWrong: {
          b: { en: 'ستة وسبعون is 76, not 67.', ar: 'العدد ٧٦ لا ٦٧.', zh: '这是 76，不是 67。' },
          c: { en: 'سبعًا وستين is manṣūb — the numeral here is marfūʿ as part of the khabar.', ar: 'النصب لا يصح هنا.', zh: '此处数词用主格，不能用宾格。' },
          d: { en: 'سبعة is the feminine-unit form; the masculine form سبع is required here.', ar: '"سبعة" للتأنيث، والصواب "سبع" هنا.', zh: 'سبعة 是阴性单位形式，此处应用阳性 سبع。' },
        },
      },
      {
        id: 'x3-num-19',
        prompt: 'لقد التحق بقسم علم النفس بجامعتنا هذا العام ........وخمسون طالبة جديدة.',
        options: [
          { id: 'a', text: 'بضعُ' },
          { id: 'b', text: 'بضعةٌ' },
          { id: 'c', text: 'بضعَ' },
          { id: 'd', text: 'بضعةِ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'بضع is a numeral meaning "a few" (3–9), used in iḍāfah with the following number. Here it is the mubtadaʾ muʾakhkhar (subject) of التحق, so it is marfūʿ: بضعُ وخمسون. And because it is in iḍāfah with وخمسون, the tanwīn is dropped.',
          ar: '"بضع" عدد مبهم في الإضافة، وهو مرفوع لأنه مبتدأ مؤخر: بضعُ وخمسون طالبة.',
          zh: 'بضع 意为“几个”（3–9），与后面的数词构成正偏组合。它是主语（推迟），用主格：بضعُ وخمسون。因为处于正偏组合，所以不带鼻音。',
        },
        whyWrong: {
          b: { en: 'بضعةٌ with tāʾ marbūṭah and tanwīn breaks the iḍāfah with وخمسون.', ar: 'التاء والتنوين يمنعان الإضافة.', zh: '加 ة 和鼻音会破坏正偏组合。' },
          c: { en: 'بضعَ is manṣūb, but the numeral here is the delayed subject (marfūʿ).', ar: 'النصب لا يصح في المبتدأ.', zh: '此处数词是主语，用主格而非宾格。' },
          d: { en: 'بضعةِ with kasrah and tāʾ is doubly wrong.', ar: 'خطأ مزدوج.', zh: '齐齿符 + ة，双重错误。' },
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

      // ---- Third pass additions (x3-) ----
      {
        id: 'x3-neg-01',
        prompt: '..... أستمع إلى الموسيقى صباحًا.',
        options: [
          { id: 'a', text: 'لا' },
          { id: 'b', text: 'ليس' },
          { id: 'c', text: 'ما' },
          { id: 'd', text: 'لم' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لا النافية negates the present-tense verb أستمع without changing its mood: "I do not listen to music in the morning".',
          ar: '"لا" النافية تنفي المضارع "أستمع" دون تغيير إعرابه.',
          zh: 'لا 是否定现在时的虚词，不改变动词的格：“我早上不听音乐”。',
        },
        whyWrong: {
          b: { en: 'ليس negates nominal sentences and verbs of "to be"; it does not precede أستمع here.', ar: '"ليس" تنفي الجملة الاسمية أو الفعل "يكون"، ولا تسبق "أستمع".', zh: 'ليس 否定名词句或“是”动词，不能直接用在 أستمع 前。' },
          c: { en: 'ما negates the past, not the present.', ar: '"ما" تنفي الماضي.', zh: 'ما 否定过去，不否定现在。' },
          d: { en: 'لم negates the past and requires the jussive: لم أستمعْ.', ar: '"لم" للماضي وتجزم.', zh: 'لم 否定过去并要求动词用切格。' },
        },
      },
      {
        id: 'x3-neg-02',
        prompt: 'ليس العمل ..... في هذه الشركة.',
        options: [
          { id: 'a', text: 'جيدٌ' },
          { id: 'b', text: 'جيدًا' },
          { id: 'c', text: 'الجيدُ' },
          { id: 'd', text: 'الجيدَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'ليس is a sister of كان; it makes its subject marfūʿ (العمل) and its predicate manṣūb (جيدًا).',
          ar: '"ليس" من أخوات "كان" ترفع اسمها "العمل" وتنصب خبرها: جيدًا.',
          zh: 'ليس 是 كان 的姊妹词，使主语（العمل）保持主格、谓语（جيدًا）用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ is correct for a plain nominal sentence but not after ليس.', ar: 'الرفع صحيح بلا "ليس"، ووجودها يقتضي النصب.', zh: '没有 ليس 时主格是对的，有它时谓语必须用宾格。' },
          c: { en: 'Definite with ال — but the predicate here is indefinite.', ar: 'التعريف بـ"ال" لا يصلح.', zh: '谓语不能加 ال，此处应是不定。' },
          d: { en: 'Definite and manṣūb — both wrong.', ar: 'معرفة ومنصوبة بلا تنوين، خطأ مزدوج.', zh: '确指且无鼻音，双重错误。' },
        },
      },
      {
        id: 'x3-neg-03',
        prompt: 'العمل الجيد ..... فيه مشكلة.',
        options: [
          { id: 'a', text: 'لم' },
          { id: 'b', text: 'لن' },
          { id: 'c', text: 'ليس' },
          { id: 'd', text: 'لمّا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The sentence is nominal (العمل الجيد هو مبدوء باسم), so negation uses ليس: العمل الجيد ليس فيه مشكلة.',
          ar: 'الجملة اسمية، فتنفى بـ"ليس": العمل الجيد ليس فيه مشكلة.',
          zh: '这是一个名词句（以名词开头），所以用 ليس 来否定：العمل الجيد ليس فيه مشكلة。',
        },
        whyWrong: {
          a: { en: 'لم negates past verbs and takes the jussive — but فيه is not a verb.', ar: '"لم" تنفي الأفعال، و"فيه" ليست فعلًا.', zh: 'لم 否定动词，但 فيه 不是动词。' },
          b: { en: 'لن negates future verbs; same problem.', ar: '"لن" للفعل المضارع.', zh: 'لن 否定将来动词，同样不适用。' },
          d: { en: 'لمّا is a temporal negative particle used with verbs, not nominal sentences.', ar: '"لمّا" للفعل لا للجملة الاسمية.', zh: 'لمّا 用于动词，不用于名词句。' },
        },
      },
      {
        id: 'x3-neg-04',
        prompt: 'أنا .......مصرية، بل صينية.',
        options: [
          { id: 'a', text: 'ليس' },
          { id: 'b', text: 'ليست' },
          { id: 'c', text: 'لستُ' },
          { id: 'd', text: 'لستِ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'With the pronoun أنا, ليس takes the tāʾ of the 1st person singular: لستُ. The sentence means "I am not Egyptian; rather, Chinese".',
          ar: '"ليس" مع ضمير المتكلم "أنا" تتصل بتاء المتكلم: لستُ.',
          zh: 'ليس 与“我”（أنا）连用时加上第一人称 ت：لستُ。“我不是埃及人，而是中国人”。',
        },
        whyWrong: {
          a: { en: 'ليس is the bare form; without a suffix it cannot attach to أنا.', ar: '"ليس" بلا ضمير لا تصلح بعد "أنا".', zh: 'ليس 是不带后缀的形态，不能和 أنا 直接连用。' },
          b: { en: 'ليست is for 3rd person feminine singular ("she is not").', ar: '"ليست" للغائبة.', zh: 'ليست 是“她不是”。' },
          d: { en: 'لستِ is 2nd person feminine singular ("you (f.) are not").', ar: '"لستِ" للمخاطبة.', zh: 'لستِ 是“你不是（女）”。' },
        },
      },
      {
        id: 'x3-neg-05',
        prompt: 'لا ......التلفزيون في الشتاء.',
        options: [
          { id: 'a', text: 'أشاهدُ' },
          { id: 'b', text: 'أشاهدَ' },
          { id: 'c', text: 'أشاهدْ' },
          { id: 'd', text: 'أشاهدِ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لا الناهية makes the present verb jussive: لا أشاهدْ. This is a prohibition ("don\'t watch TV in winter"), not a plain negation.',
          ar: '"لا" الناهية تجزم الفعل المضارع: لا أشاهدْ.',
          zh: 'لا 表禁止，使现在时动词变切格：لا أشاهدْ（“冬天别看电……”）。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ is the form after لا النافية, not لا الناهية.', ar: 'الرفع بعد "لا" النافية لا الناهية.', zh: '主格用于否定 لا，不用于禁止 لا。' },
          b: { en: 'Manṣūb needs a naṣb particle, not لا الناهية.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需要宾格虚词。' },
          d: { en: 'أشاهدِ with kasrah is not a valid jussive form.', ar: 'الكسرة لا تصلح في الجزم.', zh: '带齐齿符的形态不是切格。' },
        },
      },
      {
        id: 'x3-neg-06',
        prompt: 'أشعر أحيانا بالوحدة لأنني بنت وحيدة لذلك ..... أترك أصدقائي أبدا.',
        options: [
          { id: 'a', text: 'ما' },
          { id: 'b', text: 'لن' },
          { id: 'c', text: 'لا' },
          { id: 'd', text: 'ليس' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The word أبدا ("ever") signals future negation, so لن is required: لن أترك أصدقائي أبدا = "I will never leave my friends."',
          ar: '"أبدا" تفيد نفي المستقبل، فتكون "لن": لن أترك أصدقائي أبدا.',
          zh: 'أبدا（永远不）表示否定将来，所以要用 لن：لن أترك أصدقائي أبدا（我永远不会离开我的朋友）。',
        },
        whyWrong: {
          a: { en: 'ما negates the past; it does not combine with أبدا in the future sense.', ar: '"ما" للماضي.', zh: 'ما 否定过去，不与 أبدا 连用表将来。' },
          c: { en: 'لا negates the present; أبدا signals future.', ar: '"لا" للمضارع الحاضر.', zh: 'لا 否定现在，与将来的 أبدا 不符。' },
          d: { en: 'ليس negates nominal sentences, not present-tense verbs.', ar: '"ليس" للجملة الاسمية.', zh: 'ليس 否定名词句，不否定动词。' },
        },
      },
      {
        id: 'x3-neg-07',
        prompt: 'سأكمل دراستي الجامعية في هذه الجامعة الخاصة، لكني ......أستطيع إكمال الدراسات العليا بها.',
        options: [
          { id: 'a', text: 'ما' },
          { id: 'b', text: 'لا' },
          { id: 'c', text: 'لن' },
          { id: 'd', text: 'ليس' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The context is future (completing undergraduate studies, then later post-graduate) — لن is the future negator: لن أستطيع.',
          ar: 'السياق مستقبلي، فالفعل "أستطيع" منفي بـ"لن": لن أستطيع.',
          zh: '语境是将来（先完成本科，再谈研究生），用 لن 否定将来：لن أستطيع。',
        },
        whyWrong: {
          a: { en: 'ما negates the past.', ar: '"ما" للماضي.', zh: 'ما 否定过去。' },
          b: { en: 'لا negates the present.', ar: '"لا" للمضارع الحاضر.', zh: 'لا 否定现在。' },
          d: { en: 'ليس does not precede verbs.', ar: '"ليس" لا تسبق الفعل المضارع.', zh: 'ليس 不能接动词。' },
        },
      },
      {
        id: 'x3-neg-08',
        prompt: 'يا علي، ......تأخذ تلك الأشياء فهي .......لك.',
        options: [
          { id: 'a', text: 'ليست، ما' },
          { id: 'b', text: 'لم، لم' },
          { id: 'c', text: 'لا، ليست' },
          { id: 'd', text: 'لا، لن' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'First blank: لا الناهية + jussive (تأخذْ). Second blank: ليست negates the nominal sentence فهي ليست لك ("they are not yours").',
          ar: 'الأول: "لا" الناهية + فعل مجزوم. الثاني: "ليست" نفي للجملة الاسمية: فهي ليست لك.',
          zh: '第一空：لا 表禁止 + 动词切格（تأخذْ）。第二空：ليست 否定名词句：“它们不是你的”。',
        },
        whyWrong: {
          a: { en: 'ليست does not fit the prohibition sense of the first blank.', ar: '"ليست" لا تفيد النهي.', zh: 'ليست 不表禁止。' },
          b: { en: 'لم is past negation; both blanks lose their sense.', ar: '"لم" لا تصلح في الفراغين.', zh: '两个空用 لم 都不通。' },
          d: { en: 'لن is future negation; the second clause is a present nominal statement.', ar: '"لن" للمستقبل، والجملة الثانية اسمية حالية.', zh: '第二句是现在的名词句，不能用将来否定。' },
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

      // ---- Third pass additions (x3-) ----
      {
        id: 'x3-nasb-01',
        prompt: 'أحب..... أذهب للتسوق كل يوم بعد الدراسة.',
        options: [
          { id: 'a', text: 'أنْ' },
          { id: 'b', text: 'أنّ' },
          { id: 'c', text: 'إنّ' },
          { id: 'd', text: 'إنْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After verbs like أحبّ that express wishing or wanting, the complement is introduced by أنْ + manṣūb verb: أحبّ أنْ أذهبَ.',
          ar: 'بعد أفعال المحبة تأتي "أنْ" المصدرية الناصبة: أحب أنْ أذهبَ.',
          zh: 'أحب（喜欢）这类意愿动词后面要用 أنْ 引出动词补语：أحب أنْ أذهبَ。',
        },
        whyWrong: {
          b: { en: 'أنّ must be followed by a nominal clause (اسم + خبر), not a verb.', ar: '"أنّ" يليها اسم وخبر.', zh: 'أنّ 后接名词句，不接动词。' },
          c: { en: 'إنّ does not follow verbs of wishing.', ar: '"إنّ" لا تقع بعد أفعال المحبة.', zh: 'إنّ 不用于意愿动词后。' },
          d: { en: 'إنْ is conditional.', ar: '"إنْ" شرطية.', zh: 'إنْ 是条件虚词。' },
        },
      },
      {
        id: 'x3-nasb-02',
        prompt: 'يريد المدير أن ......الموظفون بجد واجتهاد.',
        options: [
          { id: 'a', text: 'يعملوا' },
          { id: 'b', text: 'يعملَ' },
          { id: 'c', text: 'يعملُ' },
          { id: 'd', text: 'يعملا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After أنْ, the present verb is manṣūb. With a masculine plural subject (الموظفون), the nūn is dropped: يعملوا.',
          ar: 'بعد "أنْ" يُنصب المضارع، ومع جمع المذكر تُحذف النون: يعملوا.',
          zh: 'أنْ 后动词用宾格；阳性复数主语时，去掉 نون：يعملوا。',
        },
        whyWrong: {
          b: { en: 'يعملَ is singular — the subject الموظفون is plural.', ar: 'مفرد، والفاعل جمع.', zh: '单数，但主语是复数。' },
          c: { en: 'يعملُ is marfūʿ — the verb must be manṣūb after أنْ.', ar: 'الرفع لا يصح بعد "أنْ".', zh: 'أنْ 后不能用主格。' },
          d: { en: 'يعملا is dual, but الموظفون is plural.', ar: 'مثنى، والفاعل جمع.', zh: '双数，主语是复数。' },
        },
      },
      {
        id: 'x3-nasb-03',
        prompt: 'لم .......منذ يومين إلا خمس ساعات فقط لأنني استعد للامتحان.',
        options: [
          { id: 'a', text: 'أنامُ' },
          { id: 'b', text: 'نمت' },
          { id: 'c', text: 'أنامْ' },
          { id: 'd', text: 'أنمْ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'After لم, the present verb is jussive. For the defective verb نام (middle-weak), the jussive drops the long alif: أنمْ.',
          ar: 'بعد "لم" يُجزم المضارع، والفعل الناقص "نام" يُجزم بحذف الألف: لم أنمْ.',
          zh: 'لم 后动词用切格。缺陷动词 نام 在切格时省略长 alif：أنمْ。',
        },
        whyWrong: {
          a: { en: 'أنامُ is marfūʿ — لم requires jussive.', ar: 'الرفع لا يصح بعد "لم".', zh: 'لم 后不能用主格。' },
          b: { en: 'نمت is past tense; لم requires a present verb.', ar: 'الماضي لا يجتمع مع "لم".', zh: 'لم 后不能接过去式。' },
          c: { en: 'أنامْ is a nonstandard jussive form for this defective verb.', ar: 'صيغة غير فصيحة للفعل الناقص.', zh: '缺陷动词的非标准切格形式。' },
        },
      },
      {
        id: 'x3-nasb-04',
        prompt: '......اليوم ل........غدا.',
        options: [
          { id: 'a', text: 'أجتهدَ / أنجحُ' },
          { id: 'b', text: 'أجتهدَ / أنجحْ' },
          { id: 'c', text: 'أجتهدُ / أنجحَ' },
          { id: 'd', text: 'أجتهدْ / أنجحْ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'The لام before أنجح is لام الأمر, which makes the verb jussive: أنجحْ. The first verb أجتهد is in a conditional-like imperative context, also jussive: أجتهدْ.',
          ar: '"لـ" في "لأنجح" لام الأمر، تجزم: أنجحْ. والفعل الأول في سياق الأمر: أجتهدْ.',
          zh: '“لأنجح”中的 لام 是命令 lām，使动词变切格：أنجحْ。前一个动词同属命令语境，也用切格：أجتهدْ。',
        },
        whyWrong: {
          a: { en: 'أجتهدَ is manṣūb without a naṣb particle; أنجحُ is marfūʿ but لام الأمر requires jussive.', ar: 'لا ناصب في الأول، والثاني يحتاج جزمًا.', zh: '第一个没有宾格虚词，第二个需要切格。' },
          b: { en: 'أجتهدَ is manṣūb without a trigger.', ar: 'النصب بلا ناصب.', zh: '无宾格虚词。' },
          c: { en: 'أجتهدُ is marfūʿ; أنجحَ is manṣūb — both wrong moods.', ar: 'خلط في الصيغ.', zh: '格位都错。' },
        },
      },
      {
        id: 'x3-nasb-05',
        prompt: 'لا ..... من الآخرين فـ.........منك.',
        options: [
          { id: 'a', text: 'تسخرُ / يسخروا' },
          { id: 'b', text: 'تسخرْ / يسخرْ' },
          { id: 'c', text: 'تسخرْ / يسخرُوا' },
          { id: 'd', text: 'تسخرُوا / يسخرْ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لا الناهية makes the first verb jussive: تسخرْ. After فـ, the verb is in a purpose/consequence clause and also takes the jussive with the nūn dropped: يسخرُوا.',
          ar: '"لا" الناهية تجزم الأول: تسخرْ. والثاني بعد "فـ" في سياق النهي يجزم بحذف النون: يسخرُوا.',
          zh: 'لا 表禁止使第一动词变切格：تسخرْ。فـ 后的动词也在禁止语境中，用切格并去掉 نون：يسخرُوا。',
        },
        whyWrong: {
          a: { en: 'تسخرُ is marfūʿ — لا الناهية requires jussive.', ar: 'الرفع لا يصح بعد "لا" الناهية.', zh: 'لا 表禁止时不能用主格。' },
          b: { en: 'يسخرْ is singular jussive; the context implies plural (الآخرون), so the nūn should drop as يسخرُوا.', ar: 'المفرد لا يلائم جمع الفاعل.', zh: '单数形式，但主语是复数。' },
          d: { en: 'تسخرُوا is plural manṣūb, not singular jussive — but the first clause addresses one person.', ar: 'الصيغة للمخاطب الجمع، والسياق للمفرد.', zh: '第一个动词针对单数，不应加 واو الجماعة。' },
        },
      },
      {
        id: 'x3-nasb-06',
        prompt: 'من يحترمْ الآخرين .....',
        options: [
          { id: 'a', text: 'يحترمون' },
          { id: 'b', text: 'يحترمْ' },
          { id: 'c', text: 'يُحترمْ' },
          { id: 'd', text: 'يُحترمُ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'The first verb يحترمْ is jussive (conditional مَن). When the jawab al-shart (response clause) is a present-tense verb expressing a general truth or possibility, it may be marfūʿ: يُحترمُ. The passive voice fits the meaning "whoever respects others will be respected".',
          ar: 'الفعل الأول مجزوم لأنه شرط بـ"من". والجواب هنا يجوز رفعه إن دلّ على الاستقبال أو العموم: يُحترمُ. والمبني للمجهول يناسب المعنى.',
          zh: '第一个动词因 مَن 条件句用切格。答句用现在时动词时，如果表示普遍真理或将来，可以用主格：يُحترمُ。被动语态符合“尊重别人的人会被尊重”的句意。',
        },
        whyWrong: {
          a: { en: 'يحترمون is active voice ("they respect") — the meaning requires the passive.', ar: 'المعلوم لا يناسب المعنى.', zh: '主动语态，与句意不符。' },
          b: { en: 'يحترمْ is active jussive, wrong voice and wrong mood for jawab al-shart here.', ar: 'المعلوم المجزوم لا يناسب.', zh: '主动切格，语态和格位都不符。' },
          c: { en: 'يُحترمْ is passive jussive — jawab al-shart here takes rafʿ (marfūʿ) because the meaning is general.', ar: 'الجزم لا يصح في جواب الشرط هنا.', zh: '此处答句应用主格，不用切格。' },
        },
      },
      {
        id: 'x3-nasb-07',
        prompt: '..... ما يكون.',
        options: [
          { id: 'a', text: 'ليكونَ' },
          { id: 'b', text: 'ليكونُ' },
          { id: 'c', text: 'ليكنْ' },
          { id: 'd', text: 'ليكونْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The لام here is لام التعليل (purpose lām), which is followed by أنْ understood, making the verb manṣūb: ليكونَ. This is the standard reading of the idiomatic expression "ليكونَ ما يكون" ("let whatever will be, be").',
          ar: '"اللام" هنا للتعليل، و"أنْ" مقدَّرة بعدها، فينصب المضارع: ليكونَ.',
          zh: '这里的 لام 表目的（لام التعليل），后面省略了 أنْ，所以动词用宾格：ليكونَ。固定说法“ليكون ما يكون”（该发生的就发生）就是这种用法。',
        },
        whyWrong: {
          b: { en: 'ليكونُ is marfūʿ — but with a purpose lām and implied أنْ the verb must be manṣūb.', ar: 'الرفع لا يصح مع لام التعليل.', zh: 'لام التعليل 后应用宾格，不能用主格。' },
          c: { en: 'ليكنْ is also grammatical if the لام is read as لام الأمر (jussive). The exam key prefers the purpose-lām reading (manṣūb), so I ship ليكونَ as correct and note the alternative in whyWrong.', ar: 'لو كانت اللام للأمر لجاز "ليكنْ"، لكن الامتحان اعتمد لام التعليل.', zh: '如果 lām 表命令，ليكنْ 也成立；但本题按目的 lām（宾格）取答案。' },
          d: { en: 'ليكونْ is not a valid form: either manṣūb (ليكونَ) or jussive (ليكنْ).', ar: 'صيغة غير فصيحة.', zh: '不是有效形式：要么宾格 ليكونَ，要么切格 ليكنْ。' },
        },
      },
      {
        id: 'x3-nasb-08',
        prompt: 'من درسَ........',
        options: [
          { id: 'a', text: 'ينجحُ' },
          { id: 'b', text: 'ينجحْ' },
          { id: 'c', text: 'ينجحَ' },
          { id: 'd', text: 'نجحَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'When the jawab al-shart (response clause) of a condition with مَن is itself a present-tense verb that could function as the answer to the condition, it takes the jussive: من درسَ ينجحْ.',
          ar: 'جواب الشرط بـ"من" يكون مجزومًا إن كان مضارعًا: من درسَ ينجحْ.',
          zh: 'مَن 条件句的答句如果是现在时动词，可以用切格：من درسَ ينجحْ。',
        },
        whyWrong: {
          a: { en: 'ينجحُ is marfūʿ; when the jawab al-shart is a pure future/promise, jussive is preferred here.', ar: 'الرفع جائز في بعض السياقات، والأفصح الجزم.', zh: '主格在部分语境可行，此处更宜用切格。' },
          c: { en: 'ينجحَ is manṣūb without a naṣb particle.', ar: 'النصب بلا ناصب.', zh: '无宾格虚词，不能用宾格。' },
          d: { en: 'نجحَ is past tense; the jawab al-shart here is a general rule (present/future).', ar: 'الماضي لا يناسب العموم.', zh: '过去式与“普遍真理”语义不符。' },
        },
      },
      {
        id: 'x3-nasb-09',
        prompt: 'من يضحكْ من الآخرين ف.......منه الآخرون.',
        options: [
          { id: 'a', text: 'يسخرْ' },
          { id: 'b', text: 'سيسخرْ' },
          { id: 'c', text: 'يسخرُ' },
          { id: 'd', text: 'سيسخرُ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'The first verb يضحكْ is jussive (conditional). After فـ, the jawab al-shart is a present-tense verb preceded by the future prefix سـ — the سـ makes the marfūʿ reading (سيسخرُ) correct, because the سـ removes the verb from the jussive pattern.',
          ar: 'الفعل الأول مجزوم (شرط). وبعد "فـ" يكون الجواب مضارعًا مسبوقًا بـ"سـ"، والسين تنقله إلى الرفع: سيسخرُ.',
          zh: '第一个动词因条件句用切格。فـ 后的答句前有将来虚词 سـ，这个 سـ 使动词转为现在时主格：سيسخرُ。',
        },
        whyWrong: {
          a: { en: 'يسخرْ is jussive — the سـ prefix makes it marfūʿ instead.', ar: 'الجزم لا يصح مع "سـ".', zh: '带 سـ 时不能用切格。' },
          b: { en: 'سيسخرْ mixes سـ with the jussive ending, which is ungrammatical.', ar: 'الجزم مع "سـ" لا يصح.', zh: 'سـ 与切格形式混用，不成立。' },
          c: { en: 'يسخرُ is marfūʿ but without the future marker; the exam key uses سيسخرُ.', ar: 'الرفع صحيح لكن بلا "سـ"، والامتحان اعتمد "سيسخرُ".', zh: '主格对但缺 سـ；本题答案为 سيسخرُ。' },
        },
      },
      {
        id: 'x3-nasb-10',
        prompt: 'لا ......ما ليس لكِ يا فاطمة.',
        options: [
          { id: 'a', text: 'تأخذْ' },
          { id: 'b', text: 'تأخذي' },
          { id: 'c', text: 'تأخذين' },
          { id: 'd', text: 'تأخذا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لا الناهية + jussive. The addressee is feminine singular (يا فاطمة), so the verb drops the nūn: تأخذي.',
          ar: '"لا" الناهية تجزم، والمخاطبة مؤنثة مفردة (يا فاطمة)، فتُحذف النون: تأخذي.',
          zh: 'لا 表禁止 + 切格。被呼唤的是阴性单数（فاطمة），所以去掉 نون：تأخذي。',
        },
        whyWrong: {
          a: { en: 'تأخذْ is masculine singular jussive — wrong gender.', ar: 'للمذكر، والمخاطبة مؤنثة.', zh: '阳性形式，被呼唤者却是阴性。' },
          c: { en: 'تأخذين is marfūʿ — لا الناهية requires jussive.', ar: 'الرفع لا يصح بعد "لا" الناهية.', zh: 'لا 表禁止时不能用主格。' },
          d: { en: 'تأخذا is dual — the addressee is singular.', ar: 'مثنى، والمخاطبة مفردة.', zh: '双数，被呼唤者是单数。' },
        },
      },
      {
        id: 'x3-nasb-11',
        prompt: 'لم ......تلك الرسالة كل المشاعر التي أشعر بها تجاه صديقتي المفضلة.',
        options: [
          { id: 'a', text: 'تصفُ' },
          { id: 'b', text: 'تصفَ' },
          { id: 'c', text: 'توصفْ' },
          { id: 'd', text: 'تصفْ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'After لم, the verb is jussive. The defective verb وصف (middle-weak) drops its long alif: تصفْ. The sentence means "that letter did not describe all the feelings..."',
          ar: 'بعد "لم" يُجزم المضارع، والفعل الناقص "وصف" يُجزم بحذف الألف: تصفْ.',
          zh: 'لم 后动词用切格。缺陷动词 وصف 在切格时省略长 alif：تصفْ。',
        },
        whyWrong: {
          a: { en: 'تصفُ is marfūʿ — لم requires jussive.', ar: 'الرفع لا يصح بعد "لم".', zh: 'لم 后不能用主格。' },
          b: { en: 'تصفَ is manṣūb without a naṣb particle.', ar: 'النصب بلا ناصب.', zh: '无宾格虚词，不能用宾格。' },
          c: { en: 'توصفْ is the passive jussive, but the sentence is active (تلك الرسالة is subject, not object).', ar: 'المبني للمجهول لا يناسب البنية.', zh: '被动语态与句子结构不符。' },
        },
      },
      {
        id: 'x3-nasb-12',
        prompt: 'إن ......خيرًا تلقَ خيرًا، وإن تعمل شرًا تلق شرًا.',
        options: [
          { id: 'a', text: 'تعملُ' },
          { id: 'b', text: 'تعملْ' },
          { id: 'c', text: 'تعملَ' },
          { id: 'd', text: 'عملتَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'إنْ الشرطية makes both the condition verb and its jawab jussive: إن تعملْ … تلقَ. The jawab تلقَ drops its alif because it is a defective verb in the jussive.',
          ar: '"إنْ" الشرطية تجزم الفعلين: إن تعملْ … تلقَ. وجواب الشرط "تلقَ" فعل ناقص مجزوم بحذف الألف.',
          zh: 'إنْ 条件句使条件动词和答句动词都用切格：إن تعملْ … تلقَ。答句 تلقَ 是缺陷动词，切格时省略 alif。',
        },
        whyWrong: {
          a: { en: 'تعملُ is marfūʿ — إنْ الشرطية requires jussive.', ar: 'الرفع لا يصح بعد "إنْ" الشرطية.', zh: 'إنْ 条件句中不能用主格。' },
          c: { en: 'تعملَ is manṣūb — no naṣb particle here.', ar: 'النصب بلا ناصب.', zh: '无宾格虚词，不能用宾格。' },
          d: { en: 'عملتَ is past tense — the conditional sentence here is generic/future.', ar: 'الماضي لا يناسب سياق العموم.', zh: '过去式与普遍性语境不符。' },
        },
      },
      {
        id: 'x3-nasb-13',
        prompt: '......عملت طوال اليوم بلا راحة لمرضت.',
        options: [
          { id: 'a', text: 'مهما' },
          { id: 'b', text: 'إن' },
          { id: 'c', text: 'لما' },
          { id: 'd', text: 'لو' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'لو is the hypothetical conditional particle. It introduces a counterfactual condition: "if I had worked all day without rest, I would have gotten sick". The jawab takes لـ + past: لمرضت.',
          ar: '"لو" حرف شرط امتناعي، والجواب اقترن باللام: لمرضت.',
          zh: 'لو 是虚拟条件虚词，引出与事实相反的假设：“如果我整天不休息地工作，我早就病了”。答句用 لـ + 过去式：لمرضت。',
        },
        whyWrong: {
          a: { en: 'مهما is a general conditional ("whenever"); it does not pair with a counterfactual jawab with لـ.', ar: '"مهما" شرطية عامة، ولا يليق بها الجواب باللام هنا.', zh: 'مهما 表“无论何时”，不搭配带 لـ 的反事实答句。' },
          b: { en: 'إن is the plain conditional, which does not license the "لـ + past" jawab pattern used here.', ar: '"إنْ" لا تصلح للجواب المقرون باللام.', zh: 'إنْ 不引出带 لـ 的反事实答句。' },
          c: { en: 'لما is a temporal negative particle ("when … not yet").', ar: '"لما" ظرفية نافية.', zh: 'لما 是带否定的时间虚词。' },
        },
      },
      {
        id: 'x3-nasb-14',
        prompt: 'من يساعد الآخرين .............................',
        options: [
          { id: 'a', text: 'هو محبوبٌ' },
          { id: 'b', text: 'محبوبًا هو' },
          { id: 'c', text: 'فهو محبوبٌ' },
          { id: 'd', text: 'فهو محبوبًا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The jawab al-shart is preceded by فـ when it is a nominal sentence: فهو محبوبٌ. The pronoun هو is the mubtadaʾ and محبوبٌ is the khabar (marfūʿ).',
          ar: 'إذا كان جواب الشرط جملة اسمية اقترن بـ"فـ": فهو محبوبٌ. و"هو" مبتدأ و"محبوبٌ" خبر مرفوع.',
          zh: '如果答句是名词句，要用 فـ 连接：فهو محبوبٌ。هو 是主语，محبوبٌ 是谓语（主格）。',
        },
        whyWrong: {
          a: { en: 'Missing the فـ that must precede a nominal jawab al-shart.', ar: 'يفتقد "فـ" الواجبة قبل الجملة الاسمية.', zh: '名词句作答句时前面必须加 فـ。' },
          b: { en: 'محبوبًا is manṣūb — the khabar must be marfūʿ.', ar: 'الخبر مرفوع، لا منصوب.', zh: '谓语要用主格，不是宾格。' },
          d: { en: 'محبوبًا is manṣūb, wrong case for the khabar.', ar: 'النصب خطأ في الخبر.', zh: '宾格不能作谓语。' },
        },
      },
      {
        id: 'x3-nasb-15',
        prompt: 'أكثر من ممارسة الرياضة......جسمك.',
        options: [
          { id: 'a', text: 'يقوى' },
          { id: 'b', text: 'يقوا' },
          { id: 'c', text: 'يقوَ' },
          { id: 'd', text: 'تقوي' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'After the imperative أكثرْ, the following verb is the jawab al-ṭalab (response to a command), which takes the jussive. The defective verb قَويَ (final-weak) drops its alif in the jussive: يقوَ.',
          ar: 'بعد الطلب "أكثر" يكون الجواب مجزومًا. والفعل الناقص "قوي" يُجزم بحذف الألف: يقوَ.',
          zh: '在命令句 أكثر 后，答句用切格。缺陷动词 قوي 在切格时省略 alif：يقوَ。',
        },
        whyWrong: {
          a: { en: 'يقوى is marfūʿ — the jawab al-ṭalab requires jussive.', ar: 'الرفع لا يصح في جواب الطلب.', zh: '命令答句中不能用主格。' },
          b: { en: 'يقوا is not a valid form for this defective verb.', ar: 'صيغة غير فصيحة.', zh: '不是该缺陷动词的有效形式。' },
          d: { en: 'تقوي is feminine — جسمك is masculine.', ar: 'مؤنث، و"جسمك" مذكر.', zh: '阴性形式，但 جسمك 是阳性。' },
        },
      },
      {
        id: 'x3-nasb-16',
        prompt: 'مَنْ يَحْتَرِمْ النَّاسَ .....',
        options: [
          { id: 'a', text: 'يَحْتَرِمُ' },
          { id: 'b', text: 'يُحْترَمُ' },
          { id: 'c', text: 'يُحْتَرَمْ' },
          { id: 'd', text: 'يَحْترِمْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Conditional مَن → first verb jussive (يحترمْ). The jawab al-shart is a general-truth statement in the passive voice, so it takes rafʿ: يُحترَمُ. Meaning: "whoever respects people will be respected".',
          ar: '"من" شرطية، فالفعل الأول مجزوم. والجواب جملة فعلية تفيد العموم بصيغة المبني للمجهول، فيكون مرفوعًا: يُحترَمُ.',
          zh: 'مَن 条件句使第一动词切格。答句表普遍真理，用被动语态、主格：يُحترَمُ。“尊重别人的人也会被尊重”。',
        },
        whyWrong: {
          a: { en: 'يَحْتَرِمُ is active voice ("he respects") — the meaning requires the passive.', ar: 'المعلوم لا يناسب المعنى.', zh: '主动语态与句意不符。' },
          c: { en: 'يُحْتَرَمْ is passive jussive — jawab al-shart takes rafʿ here because the meaning is general.', ar: 'الجزم لا يصح في هذا الجواب.', zh: '此处答句应用主格，不能用切格。' },
          d: { en: 'يَحْترِمْ is active jussive — wrong voice, wrong mood for jawab al-shart here.', ar: 'المعلوم المجزوم لا يناسب.', zh: '主动切格，语态和格位都不符。' },
        },
      },
      {
        id: 'x3-nasb-17',
        prompt: 'عليك أن تسلِّم واجباتك في الموعد المحدد لئلا....درجاتك كاملة.',
        options: [
          { id: 'a', text: 'تخسرُ' },
          { id: 'b', text: 'تخسرْ' },
          { id: 'c', text: 'تخسرَ' },
          { id: 'd', text: 'خسرتَ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لئلا = لِ + أنْ + لا, and أنْ is a naṣb particle: the verb is manṣūb as تخسرَ.',
          ar: '"لئلا" أصلها "لأنْ لا"، و"أنْ" ناصبة، فالفعل منصوب: تخسرَ.',
          zh: 'لئلا 相当于 لأن لا，أنْ 是宾格虚词，所以动词用宾格：تخسرَ。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ is wrong after أنْ.', ar: 'الرفع بعد "أنْ" خطأ.', zh: 'أنْ 后不能用主格。' },
          b: { en: 'Majzūm needs a jussive particle, not أنْ.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词，此处是 أنْ。' },
          d: { en: 'Past tense would clash with the future/purpose sense of لئلا.', ar: 'الماضي يخالف سياق التعليل.', zh: '过去式与 لئلا 表目的的语义不符。' },
        },
      },
      {
        id: 'x3-nasb-18',
        prompt: 'اُتركيني يا أمي .....هذا الطَّعام الشَّهيّ.',
        options: [
          { id: 'a', text: 'آكُلُ' },
          { id: 'b', text: 'أكلتُ' },
          { id: 'c', text: 'آكُلْ' },
          { id: 'd', text: 'كلي' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The verb اتركيني carries a request/command meaning, so the following verb is jawab al-ṭalab and takes the jussive: آكُلْ.',
          ar: 'الفعل "اتركيني" طلب، فجوابه مجزوم: آكُلْ.',
          zh: 'اتركيني（让我……吧）表请求/命令，所以后接的动词是“答请求句”，用切格：آكُلْ。',
        },
        whyWrong: {
          a: { en: 'آكُلُ is marfūʿ — jawab al-ṭalab requires jussive.', ar: 'الرفع لا يصح في جواب الطلب.', zh: '答请求句不能用主格。' },
          b: { en: 'أكلتُ is past tense — wrong context.', ar: 'الماضي لا يصلح.', zh: '过去式不适用。' },
          d: { en: 'كلي is the imperative; the sentence is not asking the mother to eat.', ar: 'الأمر لا يناسب السياق.', zh: '命令式与句意不符。' },
        },
      },
      {
        id: 'x3-nasb-19',
        prompt: 'يجب على كل الناس أنْ ......عن الشكوى وخلق الأعذار.',
        options: [
          { id: 'a', text: 'يتوقَّفُ' },
          { id: 'b', text: 'يتوقَّفُوا' },
          { id: 'c', text: 'يتوقفون' },
          { id: 'd', text: 'يتوقَّفَا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After أنْ, the verb is manṣūb. The subject الناس is masculine plural, so the verb drops the nūn: يتوقَّفُوا.',
          ar: 'بعد "أنْ" يُنصب الفعل، والفاعل جمع مذكر (الناس)، فتُحذف النون: يتوقَّفُوا.',
          zh: 'أنْ 后动词用宾格。主语 الناس 是阳性复数，去掉 نون：يتوقَّفُوا。',
        },
        whyWrong: {
          a: { en: 'يتوقَّفُ is singular marfūʿ — wrong number and mood.', ar: 'مفرد ومرفوع، خطأ مزدوج.', zh: '单数 + 主格，双重错误。' },
          c: { en: 'يتوقفون is marfūʿ plural — أنْ requires manṣūb.', ar: 'الرفع لا يصح بعد "أنْ".', zh: 'أنْ 后不能用主格。' },
          d: { en: 'يتوقَّفَا is dual, but الناس is plural.', ar: 'مثنى، والفاعل جمع.', zh: '双数，但主语是复数。' },
        },
      },
      {
        id: 'x3-nasb-20',
        prompt: 'يا شباب المستقبل،....... بوطنكم.',
        options: [
          { id: 'a', text: 'انهضوا' },
          { id: 'b', text: 'انهضْ' },
          { id: 'c', text: 'نهضتم' },
          { id: 'd', text: 'انهضُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The vocative يا شباب المستقبل addresses a plural audience, so the imperative takes the wāw of the plural: انهضوا.',
          ar: '"يا شباب المستقبل" نداء لجمع، فالأمر يتصل بواو الجماعة: انهضوا.',
          zh: 'يا شباب المستقبل 呼唤的是复数对象，命令式加 واو الجماعة：انهضوا。',
        },
        whyWrong: {
          b: { en: 'انهضْ is singular masculine — but the addressees are plural.', ar: 'مفرد، والمنادى جمع.', zh: '单数形式，被呼唤者是复数。' },
          c: { en: 'نهضتم is past tense — not an imperative.', ar: 'الماضي لا يصلح هنا.', zh: '过去式不是命令式。' },
          d: { en: 'انهضُ is not a valid imperative form.', ar: 'صيغة غير فصيحة.', zh: '不是有效的命令形式。' },
        },
      },
      {
        id: 'x3-nasb-21',
        prompt: 'قال الأب لابنه لا .....وقتك في اللعب واجتهد كي تنجح.',
        options: [
          { id: 'a', text: 'تقضِي' },
          { id: 'b', text: 'تقضِ' },
          { id: 'c', text: 'تقضين' },
          { id: 'd', text: 'تقضُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لا الناهية + jussive. The defective verb قضى drops its final long vowel in the jussive: تقضِ.',
          ar: '"لا" الناهية تجزم، والفعل الناقص "قضى" يُجزم بحذف حرف العلة: تقضِ.',
          zh: 'لا 表禁止 + 切格。缺陷动词 قضى 在切格时省略末尾长元音：تقضِ。',
        },
        whyWrong: {
          a: { en: 'تقضِي is marfūʿ — لا الناهية requires jussive.', ar: 'الرفع لا يصح بعد "لا" الناهية.', zh: 'لا 表禁止时不能用主格。' },
          c: { en: 'تقضين is marfūʿ with nūn — wrong mood.', ar: 'الرفع لا يصح.', zh: '主格形式，不能用。' },
          d: { en: 'تقضُ is not a valid form of this defective verb.', ar: 'صيغة غير فصيحة.', zh: '不是有效的形式。' },
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

      // ---- Third pass additions (x3-) ----
      {
        id: 'x3-dip-01',
        prompt: 'ذهبنا إلى ......منذ عامين ولن ننسى تلك المدن التي زرناها.',
        options: [
          { id: 'a', text: 'مصرِ' },
          { id: 'b', text: 'مصرَ' },
          { id: 'c', text: 'مصرْ' },
          { id: 'd', text: 'مصرٍ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'مصر is a diptote (علمية أعجمية مؤنثة) — after في/إلى it takes fatḥah instead of kasrah, with no tanwīn.',
          ar: '"مصر" ممنوعة من الصرف (علمية، أعجمية، مؤنثة)، فتُجرّ بالفتحة نيابةً عن الكسرة، ولا تنوّن.',
          zh: 'مصر 是禁止变尾名词（外来阴性专有名词），所以前面有 إلى 时，它用开口符而不是齐齿符，而且不带鼻音。',
        },
        whyWrong: {
          a: { en: 'Kasrah is for triptotes; a diptote takes fatḥah in the genitive.', ar: 'الكسرة للمنصرف، والممنوع من الصرف يُجرّ بالفتحة.', zh: '齐齿符是给变尾名词用的；禁止变尾名词在属格位置要用开口符。' },
          c: { en: 'Sukūn is not a valid case ending for a noun.', ar: 'السكون لا يكون علامة إعراب في الأسماء.', zh: '静符不是名词的格位符号。' },
          d: { en: 'Tanwīn cannot attach to a diptote.', ar: 'التنوين لا يلحق الممنوع من الصرف.', zh: '禁止变尾名词不带鼻音。' },
        },
      },
    ],
  },
    // ============================================================
  // 9. إعراب الفعل المضارع — Iʿrāb of the present-tense verb (NEW block)
  // ============================================================
  {
    titleAr: 'إعراب الفعل المضارع',
    questions: [
      {
        id: 'x3-mud-01',
        prompt: '............واجباتي كل يوم في المساء.',
        options: [
          { id: 'a', text: 'أكتبُ' },
          { id: 'b', text: 'أكتبَ' },
          { id: 'c', text: 'كتبتُ' },
          { id: 'd', text: 'كتبتِ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The subject is أنا (implied in the verb), and there is no naṣb or jazm particle — so the present verb stays marfūʿ: أكتبُ.',
          ar: 'الفاعل ضمير مستتر تقديره "أنا"، ولا ناصب ولا جازم، فالفعل المضارع مرفوع: أكتبُ.',
          zh: '主语是“我”（隐藏在动词里），前面没有宾格或切格虚词，所以现在时动词用主格：أكتبُ。',
        },
        whyWrong: {
          b: { en: 'Manṣūb needs a naṣb particle (أنْ، لن، كي، …), and none is present.', ar: 'النصب يحتاج ناصبًا، ولا ناصب هنا.', zh: '宾格需要宾格虚词（أنْ、لن、كي 等），这里没有。' },
          c: { en: 'كتبتُ is past tense, but كل يوم signals a habitual present.', ar: 'الفعل ماضٍ، و"كل يوم" تقتضي المضارع.', zh: '这是过去式，但“每天”要用现在时。' },
          d: { en: 'كتبتِ is 2nd person feminine past, wrong person and tense.', ar: '"كتبتِ" للمخاطبة المؤنثة الماضي، وهو غير مناسب.', zh: '这是“你（女）写了”的过去式，人称和时态都不对。' },
        },
      },
      {
        id: 'x3-mud-02',
        prompt: 'أنتم ......كل هذه الأسماء جيدا.',
        options: [
          { id: 'a', text: 'تذكرين' },
          { id: 'b', text: 'تذكر' },
          { id: 'c', text: 'تذكرون' },
          { id: 'd', text: 'تذكرا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The subject أنتم is masculine plural, and there is no naṣb or jazm particle — so the present verb takes the wāw of the plural: تذكرون.',
          ar: 'الفاعل "أنتم" جمع مذكر، ولا ناصب ولا جازم، فالفعل المضارع مرفوع بثبوت النون: تذكرون.',
          zh: '主语 أنتم（你们）是阳性复数，动词没有宾格或切格虚词，所以用主格形式 تذكرون。',
        },
        whyWrong: {
          a: { en: 'تذكرين is 2nd person feminine singular, wrong person and number.', ar: '"تذكرين" للمخاطبة المفردة المؤنثة، وهو غير مناسب.', zh: 'تذكرين 是“你（女）记得”，人称和数都不对。' },
          b: { en: 'تذكر is 2nd person masculine singular, wrong number.', ar: '"تذكر" للمخاطب المفرد، والمراد الجمع.', zh: 'تذكر 是“你（男）记得”的单数形式，不是复数。' },
          d: { en: 'تذكرا is dual, but أنتم refers to three or more.', ar: '"تذكرا" للمثنى، والفاعل جمع.', zh: 'تذكرا 是双数形式，而“你们”是三个或以上。' },
        },
      },
    ],
  },

  // ============================================================
  // 10. النعت والمنعوت — Adjective-noun agreement (NEW block)
  // ============================================================
  {
    titleAr: 'النعت والمنعوت',
    questions: [
      {
        id: 'x3-naat-01',
        prompt: 'سام شاب وسيم عينه زرقاء ........',
        options: [
          { id: 'a', text: 'الطويل القامة' },
          { id: 'b', text: 'طويل القامة' },
          { id: 'c', text: 'الطويل' },
          { id: 'd', text: 'طويلًا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The naʿt agrees with its manʿūt (شاب) in definiteness — شاب is indefinite, so the naʿt is indefinite: طويل القامة. And since it\'s an iḍāfah (طويل + القامة), only طويل carries the case ending.',
          ar: 'النعت يطابق المنعوت في التعريف والتنكير؛ "شاب" نكرة، فيكون النعت نكرة: "طويل القامة". والقامة مضاف إليه مجرور.',
          zh: '形容词要和被修饰词“شاب”（不定）一致，所以也要用不定形式 طويل القامة。الـقامة 是正偏组合的第二项，用属格。',
        },
        whyWrong: {
          a: { en: 'Definite with ال, but شاب is indefinite — mismatched definiteness.', ar: '"الطويل" معرفة، و"شاب" نكرة، فلا يطابقه.', zh: 'الطويل 带冠词是确指，但“شاب”是不定，所以不匹配。' },
          c: { en: 'Definite and truncated — wrong definiteness and drops the iḍāfah.', ar: 'معرفة ومقطوعة عن الإضافة، وهو خطأ.', zh: '确指而且切断了正偏组合，不对。' },
          d: { en: 'Manṣūb; the manʿūt is marfūʿ, so the naʿt must be marfūʿ too.', ar: '"طويلًا" منصوب، والمنعوت مرفوع، فيجب أن يكون النعت مرفوعًا.', zh: '“طويلًا”是宾格，但被修饰词是主格，形容词也必须用主格。' },
        },
      },
      {
        id: 'x3-naat-02',
        prompt: 'حصل الفائز على حقيبة كبيرة......',
        options: [
          { id: 'a', text: 'أحمر' },
          { id: 'b', text: 'حمراء' },
          { id: 'c', text: 'الحمراء' },
          { id: 'd', text: 'الأحمر' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'حقيبة is feminine, so the adjective agrees in gender and is indefinite (since حقيبة is indefinite): حمراء.',
          ar: '"حقيبة" مؤنثة نكرة، فيأتي النعت مؤنثًا نكرة: حمراء.',
          zh: 'حقيبة 是阴性不定名词，所以形容词也要用阴性不定形式：حمراء。',
        },
        whyWrong: {
          a: { en: 'Masculine form; the manʿūt (حقيبة) is feminine.', ar: '"أحمر" مذكر، والمنعوت مؤنث.', zh: 'أحمر 是阳性，但被修饰词是阴性。' },
          c: { en: 'Definite with ال, but حقيبة is indefinite.', ar: '"الحمراء" معرفة، و"حقيبة" نكرة.', zh: 'الحمراء 是确指，但 حقيبة 是不定。' },
          d: { en: 'Both wrong gender and definite — doubly mismatched.', ar: 'مذكر ومعرفة، وهو خطأ مزدوج.', zh: '既是阳性又是确指，双重不匹配。' },
        },
      },
      {
        id: 'x3-naat-03',
        prompt: 'سافرت مع أصدقائي إلى بلاد كثيرة، واستمتعنا بمشاهدة المناظر ...... فيها.',
        options: [
          { id: 'a', text: 'طبيعيةَ' },
          { id: 'b', text: 'الطبيعيةِ' },
          { id: 'c', text: 'الطبيعيةُ' },
          { id: 'd', text: 'طبيعيةِ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'المناظر is definite and majrūr (object of the preposition بـ), so the naʿt is definite and majrūr: الطبيعيةِ.',
          ar: '"المناظر" معرفة مجرورة (بعد حرف الجر "بـ")، فيكون النعت معرفة مجرورًا: الطبيعيةِ.',
          zh: 'المناظر 是确指且因为前面的介词 بـ 而变属格，所以形容词也要用确指属格：الطبيعيةِ。',
        },
        whyWrong: {
          a: { en: 'Indefinite; the manʿūt is definite.', ar: 'نكرة، والمنعوت معرفة.', zh: '这是不定形式，但被修饰词是确指。' },
          c: { en: 'Marfūʿ; the manʿūt is majrūr, so the naʿt must be majrūr too.', ar: 'مرفوع، والمنعوت مجرور.', zh: '这是主格，但被修饰词是属格。' },
          d: { en: 'Indefinite and majrūr — mismatched definiteness.', ar: 'نكرة ومجرور، والتعريف غير متطابق.', zh: '属格对，但不定形式和确指名词不匹配。' },
        },
      },
    ],
  },

  // ============================================================
  // 11. التمييز والحال — Tamyīz and Ḥāl (NEW block)
  // ============================================================
  {
    titleAr: 'التمييز والحال',
    questions: [
      {
        id: 'x3-thal-01',
        prompt: 'حضر الطالب المتأخر إلى الصف........',
        options: [
          { id: 'a', text: 'مسرعٌ' },
          { id: 'b', text: 'أسرع' },
          { id: 'c', text: 'مسرعًا' },
          { id: 'd', text: 'سارعًا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'Ḥāl is always manṣūb. مسرعًا describes the state of الطالب at the moment of arriving — "he arrived at the classroom hurrying".',
          ar: 'الحال منصوب دائمًا، وهو هنا "مسرعًا"، يصف هيئة الطالب عند وصوله.',
          zh: '状语（حال）一定用宾格。مسرعًا 描述学生到达时的状态：“他急忙来到教室”。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ cannot be ḥāl.', ar: 'الرفع لا يصحّ للحال.', zh: '主格不能作状语。' },
          b: { en: 'أسرع is a comparative/verb form; it does not function as ḥāl here.', ar: '"أسرع" صيغة تفضيل أو فعل، ولا تصلح حالًا.', zh: 'أسرع 是比较级或动词形式，不能作状语。' },
          d: { en: 'سارعًا means "rushing" but is less idiomatic than مسرعًا for this construction.', ar: '"سارعًا" أقل فصاحة من "مسرعًا" هنا.', zh: 'سارعًا 意为“匆忙”，但不如 مسرعًا 地道。' },
        },
      },
      {
        id: 'x3-thal-02',
        prompt: 'هذا هو المعلم الذي أتيناه........حبًا واحترامًا له.',
        options: [
          { id: 'a', text: 'سرعان' },
          { id: 'b', text: 'مسرعين' },
          { id: 'c', text: 'سريع' },
          { id: 'd', text: 'سريعون' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Ḥāl for a plural subject (understood "we" in أتيناه) takes the manṣūb plural form: مسرعين. The accusatives حبًا واحترامًا after it are مفعول لأجله.',
          ar: 'الحال هنا "مسرعين" لأن فاعل "أتيناه" جمع، والحال منصوب بالياء. و"حبًا واحترامًا" مفعول لأجله.',
          zh: '主语是“我们”（复数），所以状语用宾格复数 مسرعين。后面的 حبًا واحترامًا 是原因宾语。',
        },
        whyWrong: {
          a: { en: 'سرعان is part of the fixed سرعان ما, not a ḥāl form.', ar: '"سرعان" جزء من صيغة "سرعان ما".', zh: 'سرعان 属于固定结构 سرعان ما，不是状语形式。' },
          c: { en: 'سريع is a singular adjective, not a plural ḥāl.', ar: '"سريع" مفرد، والحال هنا جمع.', zh: 'سريع 是单数形容词，此处状语要用复数。' },
          d: { en: 'سريعون is marfūʿ with wāw, wrong case for ḥāl.', ar: 'الرفع بالواو لا يصح للحال.', zh: '主格（带 واو）不能作状语。' },
        },
      },
      {
        id: 'x3-thal-03',
        prompt: 'انطلقت صافرة الإنذار........قويًّا.',
        options: [
          { id: 'a', text: 'منطلقٌ' },
          { id: 'b', text: 'انطلاقةً' },
          { id: 'c', text: 'انطلاقًا' },
          { id: 'd', text: 'انطلاقةٌ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'This is a مفعول مطلق (absolute object) confirming the verb: انطلاقًا is the manṣūb maṣdar of انطلق, and قويًّا is its adjective.',
          ar: '"انطلاقًا" مفعول مطلق منصوب مؤكِّد لفعله "انطلقت"، و"قويًّا" صفته.',
          zh: 'انطلاقًا 是“绝对宾语”（动词名词），用来强调动词 انطلقت，قويًّا 是它的形容词。',
        },
        whyWrong: {
          a: { en: 'منطلقٌ is a participle, not the maṣdar expected here.', ar: '"منطلق" اسم فاعل، والمطلوب مصدر.', zh: 'منطلق 是主动分词，此处需动词名词。' },
          b: { en: 'انطلاقةً is a single-instance noun; the standard مفعول مطلق uses the maṣdar انطلاقًا.', ar: '"انطلاقة" اسم مرة، والأليق المصدر "انطلاقًا".', zh: 'انطلاقة 是“一次”名词，标准绝对宾语用动词名词 انطلاقًا。' },
          d: { en: 'Marfūʿ with tanwīn; the مفعول مطلق must be manṣūb.', ar: 'الرفع لا يصح للمفعول المطلق.', zh: '主格不能作绝对宾语。' },
        },
      },
    ],
  },

  // ============================================================
  // 12. المبتدأ والخبر — Subject and predicate (NEW block)
  // ============================================================
  {
    titleAr: 'المبتدأ والخبر',
    questions: [
      {
        id: 'x3-mub-01',
        prompt: 'الجوُّ .........في فصل الشتاء.',
        options: [
          { id: 'a', text: 'باردٌ' },
          { id: 'b', text: 'باردًا' },
          { id: 'c', text: 'باردٍ' },
          { id: 'd', text: 'باردْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'In a plain nominal sentence (no كان or إنّ), both mubtadaʾ and khabar are marfūʿ: الجوُّ باردٌ.',
          ar: 'في الجملة الاسمية بلا "كان" ولا "إنّ" يكون المبتدأ والخبر مرفوعين: الجوُّ باردٌ.',
          zh: '在没有 كان 也没有 إنّ 的名词句中，主语和谓语都用主格：الجوُّ باردٌ。',
        },
        whyWrong: {
          b: { en: 'Manṣūb would require كان or a sister of كان.', ar: 'النصب يحتاج "كان" أو إحدى أخواتها.', zh: '宾格需要 كان 或其姊妹词。' },
          c: { en: 'Majrūr needs a preceding preposition or iḍāfah.', ar: 'الجرّ يحتاج حرفًا أو إضافة.', zh: '属格需要介词或正偏组合。' },
          d: { en: 'Sukūn is not a case ending for a noun.', ar: 'السكون لا يكون علامة إعراب.', zh: '静符不是格位符号。' },
        },
      },
      {
        id: 'x3-mub-02',
        prompt: 'فاطمة بنت ......',
        options: [
          { id: 'a', text: 'ذكيةٌ' },
          { id: 'b', text: 'ذكيةً' },
          { id: 'c', text: 'ذكيةٍ' },
          { id: 'd', text: 'ذكيةُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'بنت is the khabar of the nominal sentence headed by فاطمة, and the khabar is marfūʿ. ذكيةٌ is indefinite marfūʿ with tanwīn.',
          ar: '"بنت" خبر مرفوع، و"ذكيةٌ" صفة له مرفوعة بالضمة والتنوين.',
          zh: 'بنت 是谓语，用主格；ذكيةٌ 是它的形容词，也用主格并带鼻音。',
        },
        whyWrong: {
          b: { en: 'Manṣūb would require كان or إنّ.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需要宾格虚词。' },
          c: { en: 'Majrūr needs a preceding preposition.', ar: 'الجرّ يحتاج حرفًا.', zh: '属格需要介词。' },
          d: { en: 'ذكيةُ without tanwīn is ungrammatical for this indefinite adjective.', ar: 'التعريف بلا "ال" ولا إضافة لا يصح.', zh: '既无 ال 也无正偏组合，不定名词必须带鼻音。' },
        },
      },
      {
        id: 'x3-mub-03',
        prompt: '......يدرسان اللغة العربية كل يوم في الصباح.',
        options: [
          { id: 'a', text: 'الولد' },
          { id: 'b', text: 'الولَدين' },
          { id: 'c', text: 'الولَدان' },
          { id: 'd', text: 'الوِلدان' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The verb يدرسا (underlying) carries the alif of the dual, so the subject is dual. الولَدان is the masculine dual nominative form of ولد.',
          ar: 'الفعل "يدرسان" مثنى، فالفاعل مثنى مرفوع بالألف: الولَدان.',
          zh: '动词 يدرسان 带 alif 表示双数，所以主语也是双数，用主格形式 الولَدان。',
        },
        whyWrong: {
          a: { en: 'الولد is singular; the verb is dual.', ar: '"الولد" مفرد، والفعل مثنى.', zh: 'الولد 是单数，但动词是双数。' },
          b: { en: 'الولَدين is the manṣūb/majrūr dual form (with yāʾ), wrong case for a subject.', ar: 'المنصوب/المجرور بالياء لا يصلح للمبتدأ.', zh: '这是宾/属格双数（带 ي），不能作主语。' },
          d: { en: 'الوِلدان has the wrong internal vowel (kasrah on ل); the standard form is الولَدان.', ar: 'ضبط غير قياسي.', zh: '内部元音有误，标准形式是 الولَدان。' },
        },
      },
      {
        id: 'x3-mub-05',
        prompt: 'أغسل وجهي وأفطر قبل......من البيت.',
        options: [
          { id: 'a', text: 'خرج' },
          { id: 'b', text: 'أخرج' },
          { id: 'c', text: 'الخروج' },
          { id: 'd', text: 'خروج' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'After قبل ("before"), the noun is majrūr. The definite maṣdar الخروج fits the slot and is idiomatic: "before leaving the house".',
          ar: '"قبل" تضاف إلى اسم مجرور، والمناسب هنا المصدر المعرّف "الخروج": قبل الخروج من البيت.',
          zh: 'قبل 后面接属格名词。这里用确指的动词名词 الخروج：“出门之前”。',
        },
        whyWrong: {
          a: { en: 'خرج is a past verb; before cannot precede a bare verb.', ar: 'الفعل الماضي لا يقع بعد "قبل" مباشرة.', zh: 'خرج 是过去式动词，不能直接跟在 قبل 后。' },
          b: { en: 'أخرج is a present verb; same problem.', ar: 'الفعل المضارع لا يقع بعد "قبل".', zh: 'أخرج 是现在时动词，同样不适用。' },
          d: { en: 'خروج is indefinite; the idiomatic expression here uses الخروج with ال.', ar: 'النكرة تقل فصاحتها هنا.', zh: '不定形式在这里不如带 ال 的地道。' },
        },
      },
      {
        id: 'x3-mub-06',
        prompt: 'أنا وزميلتي نستمع إلى الموسيقى في .........',
        options: [
          { id: 'a', text: 'الوقت نفسه' },
          { id: 'b', text: 'نفس وقت' },
          { id: 'c', text: 'الوقت النفس' },
          { id: 'd', text: 'النفس الوقت' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The idiomatic expression is في الوقت نفسه ("at the same time"): definite noun الوقت + the emphatic نفسه agreeing in definiteness.',
          ar: 'الصيغة الفصيحة: "في الوقت نفسه"، فـ"الوقت" مضاف إلى "نفس" و"نفس" مضاف إلى ضمير، وكلاهما معرفة.',
          zh: '地道说法是 في الوقت نفسه（在同一时间）：الوقت 与 نفسه 构成正偏组合，都用确指形式。',
        },
        whyWrong: {
          b: { en: 'نفس وقت is missing ال on both words; the expression requires definite forms.', ar: 'ناقص التعريف.', zh: '两个词都缺确指冠词。' },
          c: { en: 'الوقت النفس reverses the iḍāfah — نفس is the head and الوقت is its complement, not the other way around.', ar: 'عكس الإضافة.', zh: '正偏组合顺序颠倒。' },
          d: { en: 'النفس الوقت is both reversed and misordered.', ar: 'مقلوب ومرتب خطأ.', zh: '顺序颠倒且搭配错误。' },
        },
      },
      {
        id: 'x3-mub-07',
        prompt: 'حفظت الكلمات الجديدة.........',
        options: [
          { id: 'a', text: 'الحفظِ' },
          { id: 'b', text: 'حفظًا' },
          { id: 'c', text: 'حفظُ' },
          { id: 'd', text: 'الحفظَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'حفظًا is a مفعول مطلق (absolute object) confirming the verb حفظت: "I memorized the new words — memorizing them thoroughly". It is manṣūb, indefinite.',
          ar: '"حفظًا" مفعول مطلق منصوب مؤكِّد لفعله "حفظت".',
          zh: 'حفظًا 是绝对宾语（动词名词），用来强调动词 حفظت，用宾格且不定。',
        },
        whyWrong: {
          a: { en: 'الحفظِ is definite and majrūr — wrong case and definiteness for مفعول مطلق here.', ar: 'معرفة ومجرورة، خطأ.', zh: '确指且属格，双重错误。' },
          c: { en: 'حفظُ is marfūʿ without tanwīn — ungrammatical for this indefinite accusative.', ar: 'الرفع بلا تنوين خطأ.', zh: '主格且无鼻音，不成立。' },
          d: { en: 'الحفظَ is definite; مفعول مطلق is normally indefinite.', ar: 'التعريف يخالف القاعدة.', zh: '绝对宾语通常是不定的。' },
        },
      },
      {
        id: 'x3-mub-08',
        prompt: 'أقرأ القصص العاطفية......',
        options: [
          { id: 'a', text: 'ليلًا نهارًا' },
          { id: 'b', text: 'ليلُ نهارُ' },
          { id: 'c', text: 'ليلَ نهارَ' },
          { id: 'd', text: 'ليلٌ نهارٌ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'ليلًا نهارًا is a pair of accusative adverbs (ظرفا زمان) meaning "by night and by day". Both take tanwīn manṣūb.',
          ar: '"ليلًا نهارًا" ظرفا زمان منصوبان على التوكيد.',
          zh: 'ليلًا نهارًا 是一对时间状语（宾格），意思是“夜以继日”。两者都带宾格鼻音。',
        },
        whyWrong: {
          b: { en: 'ليلُ نهارُ is marfūʿ without tanwīn — ungrammatical.', ar: 'الرفع بلا تنوين خطأ.', zh: '主格且无鼻音，不成立。' },
          c: { en: 'ليلَ نهارَ is manṣūb but missing tanwīn (should be ليلًا نهارًا).', ar: 'النصب صحيح لكن بلا تنوين.', zh: '宾格对，但缺鼻音。' },
          d: { en: 'ليلٌ نهارٌ is marfūʿ — wrong case for a ظرف.', ar: 'الرفع لا يصح للظرف.', zh: '主格不能作时间状语。' },
        },
      },
      {
        id: 'x3-mub-11',
        prompt: 'رأينا الرجل ...........قامةً في العالم والذي دخل موسوعة جينيس العام الماضي.',
        options: [
          { id: 'a', text: 'أطول' },
          { id: 'b', text: 'الطويل' },
          { id: 'c', text: 'الأطول' },
          { id: 'd', text: 'طويل' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The superlative "the tallest" in this context is الأطول, and it acts as an adjective describing الرجل. The following قامةً is tamyīz (منصوب).',
          ar: '"الأطول" اسم تفضيل معرّف، صفة لـ"الرجل"، و"قامةً" تمييز منصوب.',
          zh: '此处“最高的”用确指最高级 الأطول，作 الرجل 的形容词；后面的 قامةً 是区分语（宾格）。',
        },
        whyWrong: {
          a: { en: 'أطول is the indefinite comparative — but here the manʿūt is definite الرجل, so the naʿt must be definite too.', ar: 'نكرة، والمنعوت معرفة.', zh: '不定，而被修饰的名词 الرجل 是确指。' },
          b: { en: 'الطويل is the definite positive ("the tall one"), not a superlative.', ar: '"الطويل" صفة لا تفضيل فيها.', zh: 'الطويل 只是“高的”，不是最高级。' },
          d: { en: 'طويل is indefinite and not a superlative.', ar: 'نكرة ولا تفضيل فيها.', zh: '不定且不是最高级。' },
        },
      },
      {
        id: 'x3-mub-12',
        prompt: 'نظر الولد إلى ...........وقال يا أبتي إني أحبك كثيرا.',
        options: [
          { id: 'a', text: 'أبُوه' },
          { id: 'b', text: 'أبَاه' },
          { id: 'c', text: 'أبيه' },
          { id: 'd', text: 'أبَه' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'After the preposition إلى, the noun أب must be majrūr: أبيه. The yāʾ form also serves as the possessive pronoun ("his father").',
          ar: 'بعد حرف الجر "إلى" يكون الاسم مجرورًا: أبيه.',
          zh: '介词 إلى 后面的名词要用属格：أبيه（他的父亲）。',
        },
        whyWrong: {
          a: { en: 'أبُوه is marfūʿ (with wāw), wrong case after إلى.', ar: 'الرفع لا يصح بعد حرف الجر.', zh: 'إلى 后不能用主格。' },
          b: { en: 'أبَاه is manṣūb (with alif), wrong case after إلى.', ar: 'النصب لا يصح بعد حرف الجر.', zh: 'إلى 后不能用宾格。' },
          d: { en: 'أبَه is a shortened form used in the vocative (يا أبه), not after a preposition.', ar: 'صيغة النداء لا تصلح بعد حرف الجر.', zh: 'أبَه 是呼语专用形式，不用于介词后。' },
        },
      },
    ],
  },

  // ============================================================
  // 13. تعدّي الفعل ومفعولاته — Verb transitivity and objects (NEW block)
  // ============================================================
  {
    titleAr: 'تعدّي الفعل ومفعولاته',
    questions: [
      {
        id: 'x3-trans-01',
        prompt: 'أنا.........الفتاة السيئة أمس.',
        options: [
          { id: 'a', text: 'ضربتْ' },
          { id: 'b', text: 'ضربتِ' },
          { id: 'c', text: 'ضربتَ' },
          { id: 'd', text: 'ضربتُ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'The subject is أنا (1st person singular), so the past verb takes the tāʾ of the speaker: ضربتُ. الفتاةَ السيئة is the direct object.',
          ar: 'الفاعل ضمير المتكلم "أنا"، فالفعل الماضي يتصل بتاء الفاعل: ضربتُ. و"الفتاةَ السيئة" مفعول به منصوب.',
          zh: '主语是“我”，所以过去式动词要加说话者的 ت：ضربتُ。“الفتاةَ السيئة”是直接宾语，用宾格。',
        },
        whyWrong: {
          a: { en: 'ضربتْ is 3rd person feminine singular ("she hit") — wrong person.', ar: '"ضربتْ" للغائبة، لا للمتكلم.', zh: 'ضربتْ 是“她打了”，第三人称阴性，人称不对。' },
          b: { en: 'ضربتِ is 2nd person feminine singular ("you (f.) hit") — wrong person.', ar: '"ضربتِ" للمخاطبة، لا للمتكلم.', zh: 'ضربتِ 是“你（女）打了”，人称不对。' },
          c: { en: 'ضربتَ is 2nd person masculine singular ("you (m.) hit") — wrong person.', ar: '"ضربتَ" للمخاطب، لا للمتكلم.', zh: 'ضربتَ 是“你（男）打了”，人称不对。' },
        },
      },
      {
        id: 'x3-trans-02',
        prompt: 'عمي لديه.... كثيرة.',
        options: [
          { id: 'a', text: 'بنت' },
          { id: 'b', text: 'ابن' },
          { id: 'c', text: 'بنات' },
          { id: 'd', text: 'ابنة' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The adjective كثيرة is feminine plural, so the noun it modifies must be feminine plural: بنات ("daughters").',
          ar: '"كثيرة" صفة مؤنثة جمع، فالموصوف جمع مؤنث: "بنات".',
          zh: '形容词 كثيرة 是阴性复数，所以被它修饰的名词也必须是阴性复数：بنات（女儿们）。',
        },
        whyWrong: {
          a: { en: 'بنت is singular; كثيرة is plural.', ar: '"بنت" مفرد، و"كثيرة" جمع.', zh: 'بنت 是单数，而 كثيرة 是复数。' },
          b: { en: 'ابن is masculine singular; both gender and number clash.', ar: '"ابن" مذكر مفرد، والصفة مؤنثة جمع.', zh: 'ابن 是阳性单数，性和数都不符。' },
          d: { en: 'ابنة is singular; كثيرة is plural.', ar: '"ابنة" مفرد.', zh: 'ابنة 是单数，与复数形容词不符。' },
        },
      },
      {
        id: 'x3-trans-03',
        prompt: 'صعوبة القواعد تحول بيننا وبين فهمنا ...........',
        options: [
          { id: 'a', text: 'اللغةُ العربيةُ' },
          { id: 'b', text: 'اللغةَ العربيةَ' },
          { id: 'c', text: 'اللغةَ العربيةُ' },
          { id: 'd', text: 'اللغةُ العربيةَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'فهمنا takes a direct object in manṣūb: فهمنا اللغةَ العربيةَ — "our understanding of the Arabic language". The adjective العربيةَ agrees with the noun in case, so both are manṣūb.',
          ar: '"فهمنا" مضاف إلى مفعوله، والمفعول به منصوب: فهمنا اللغةَ العربيةَ. والنعت يتبع المنعوت في النصب.',
          zh: 'فهمنا（我们的理解）带直接宾语，宾语用宾格：اللغةَ العربيةَ。形容词 العربيةَ 跟着名词一起用宾格。',
        },
        whyWrong: {
          a: { en: 'Both marfūʿ — but a direct object cannot be marfūʿ.', ar: 'الرفع لا يصح للمفعول به.', zh: '直接宾语不能用主格。' },
          c: { en: 'Mismatched: اللغةَ is manṣūb, العربيةُ is marfūʿ — the naʿt must agree with its manʿūt.', ar: 'عدم تطابق بين المنعوت والنعت.', zh: '名词和形容词格位不一致。' },
          d: { en: 'Mismatched the other way: اللغةُ is marfūʿ.', ar: 'الرفع في المنعوت والنصب في النعت.', zh: '名词主格、形容词宾格，不匹配。' },
        },
      },
      {
        id: 'x3-trans-04',
        prompt: 'كسرت قلم أختي وأنا ألعب معها فهو.........',
        options: [
          { id: 'a', text: 'مكسورٌ' },
          { id: 'b', text: 'كاسرٌ' },
          { id: 'c', text: 'كسرَ' },
          { id: 'd', text: 'كسرةٌ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'قلم is the thing that got broken, so the passive participle is required: مكسورٌ ("broken"). It is marfūʿ as the khabar of the nominal sentence.',
          ar: '"قلم" مفعول به في المعنى، فيأتي اسم المفعول: "مكسورٌ" وهو خبر مرفوع.',
          zh: 'قلم 是被弄断的东西，所以要用被动分词 مكسورٌ（“被弄断的”）。它作名词句的谓语，用主格。',
        },
        whyWrong: {
          b: { en: 'كاسرٌ is the active participle ("breaking") — it would mean the pen is doing the breaking.', ar: '"كاسرٌ" اسم فاعل، والمعنى أن القلم هو الذي يكسر.', zh: 'كاسرٌ 是主动分词，意思会变成“笔在弄断别的东西”。' },
          c: { en: 'كسرَ is a past verb, cannot fill the predicate slot after فهو.', ar: 'الفعل الماضي لا يصلح خبرًا بعد "فهو".', zh: '过去式动词不能作 فهو 之后的谓语。' },
          d: { en: 'كسرةٌ means "a fracture / a kasrah vowel" — wrong sense.', ar: '"كسرة" بمعنى الكسر أو الحركة، والمعنى مختلف.', zh: 'كسرة 意为“裂口”或“齐齿符”，语义不对。' },
        },
      },
      {
        id: 'x3-trans-05',
        prompt: 'حصل والدي على فرصة عمل ممتازة ف..........من مدينتنا هذه إلى العاصمة.',
        options: [
          { id: 'a', text: 'نقلنا' },
          { id: 'b', text: 'انتقلنا' },
          { id: 'c', text: 'تنقلنا' },
          { id: 'd', text: 'تناقلنا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'انتقل من … إلى = "to move from … to …". The Form VIII verb انتقلنا is intransitive and takes من/إلى, matching the sentence\'s direction.',
          ar: '"انتقل من … إلى …" هي الصيغة الصحيحة، فالفعل "انتقلنا" لازم، ويتعدّى بحرفي الجر "من" و"إلى".',
          zh: 'انتقل من…إلى 表示“从……搬到……”。انتقلنا 是不及物动词，搭配 من 和 إلى，与句意相符。',
        },
        whyWrong: {
          a: { en: 'نقلنا is transitive ("we moved/transferred something") and needs a direct object.', ar: '"نقلنا" فعل متعدٍّ يحتاج مفعولًا به.', zh: 'نقلنا 是及物动词，需要宾语，不能单独使用。' },
          c: { en: 'تنقلنا means "we moved about / travelled around", implying repeated motion in many directions.', ar: '"تنقلنا" تفيد التنقل المتكرر، لا الانتقال مرة واحدة.', zh: 'تنقلنا 表示反复移动、四处游走，与“搬一次家”不符。' },
          d: { en: 'تناقلنا means "we passed (something) around among ourselves" — wrong verb entirely.', ar: '"تناقلنا" بمعنى تداول الشيء، وهو فعل مختلف.', zh: 'تناقلنا 意为“互相传递（某物）”，是另一个动词。' },
        },
      },
      {
        id: 'x3-trans-06',
        prompt: 'أعْلمَ المعلِّم....... ......... في إتقان الترجمة.',
        options: [
          { id: 'a', text: 'الطلابُ دراسةَ القواعدِ مفيدةً' },
          { id: 'b', text: 'الطلابَ دراسةِ القواعدِ مفيدةً' },
          { id: 'c', text: 'الطلابَ دراسةَ القواعدِ مفيدةً' },
          { id: 'd', text: 'الطلابُ دراسةَ القواعدِ مفيدةٌ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'أعلم takes three direct objects: الطلابَ (first, manṣūb), دراسةَ (second, manṣūb), مفيدةً (third, manṣūb). And دراسة is in iḍāfah with القواعدِ, so القواعد is majrūr with kasrah.',
          ar: '"أعلم" تنصب ثلاثة مفاعيل: الطلابَ، دراسةَ، مفيدةً. و"دراسة" مضاف، و"القواعد" مضاف إليه مجرور.',
          zh: 'أعلم 带三个宾语，都用宾格：الطلابَ、دراسةَ、مفيدةً。دراسة 与 القواعد 构成正偏组合，第二项用属格。',
        },
        whyWrong: {
          a: { en: 'الطلابُ is marfūʿ, but it must be manṣūb as the first object of أعلم.', ar: 'الرفع في المفعول الأول خطأ.', zh: '第一个宾语不能用主格。' },
          b: { en: 'دراسةِ has kasrah on the wrong word: دراسة is the head of the iḍāfah and must be manṣūb; only القواعد is majrūr.', ar: 'الجرّ في "دراسة" خطأ؛ فهي المنعوت المنصوب، والمجرور هو "القواعد".', zh: 'دراسة 是正偏组合的头词，用宾格；只有 القواعد 用属格。' },
          d: { en: 'Two errors: الطلابُ (should be manṣūb) and مفيدةٌ (should be manṣūb as the third object).', ar: 'خطآن: رفع المفعول الأول ورفع المفعول الثالث.', zh: '两处错误：第一个宾语和第三个宾语都用主格了，应都用宾格。' },
        },
      },
    ],
  },

  // ============================================================
  // 14. الاستثناء والأعداد المركّبة — Exception and compound numbers (NEW block)
  // ============================================================
  {
    titleAr: 'الاستثناء والأعداد المركّبة',
    questions: [
      {
        id: 'x3-excp-01',
        prompt: 'ما جاءني اليوم في المحاضرة سوى.......',
        options: [
          { id: 'a', text: 'خالدُ' },
          { id: 'b', text: 'خالدًا' },
          { id: 'c', text: 'خالدٍ' },
          { id: 'd', text: 'خالدٌ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'In a negative sentence with سوى, the mustathnā may be marfūʿ as badal from the (omitted) subject: ما جاءني … سوى خالدُ.',
          ar: 'في الكلام المنفي مع "سوى" يجوز رفع المستثنى على البدلية: ما جاءني … سوى خالدُ.',
          zh: '否定句中，سوى 后面的例外词可以用主格（作 بدل 替换省略的主语）：سوى خالدُ。',
        },
        whyWrong: {
          b: { en: 'Manṣūb would be the case if the sentence were affirmative with إلا; with سوى after negation, rafʿ on badal is preferred.', ar: 'النصب يغلب مع "إلا" في الكلام الموجب، والصواب هنا الرفع على البدلية.', zh: '宾格通常出现在肯定句的 إلا 后；这里是否定句 + سوى，优先用主格。' },
          c: { en: 'Majrūr would require a preceding preposition.', ar: 'الجرّ يحتاج حرف جر.', zh: '属格需要前面的介词。' },
          d: { en: 'Tanwīn on a proper noun like خالد (definite by ʿalamiyyah) is ungrammatical.', ar: 'التنوين لا يلحق العلم.', zh: '专有名词如 خالد 不能带鼻音。' },
        },
      },
      {
        id: 'x3-excp-02',
        prompt: '.... حضر اليوم من الطلاب .... واحدًا.',
        options: [
          { id: 'a', text: 'ما / غير' },
          { id: 'b', text: 'لا / إلا' },
          { id: 'c', text: 'لن / إلا' },
          { id: 'd', text: 'ما / إلا' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'ما … إلا … is the standard negative-restrictive pair: "none of the students came today except one". The mustathnā after إلا in the negative sentence is manṣūb: واحدًا.',
          ar: '"ما … إلا …" صيغة الحصر بعد النفي: ما حضر … إلا واحدًا. والمستثنى منصوب.',
          zh: 'ما…إلا 是“只有”的固定结构：“今天没有一个学生来，只有一个来了”。否定句里 إلا 后的例外词用宾格。',
        },
        whyWrong: {
          a: { en: 'غير cannot complete the negative-restrictive construction with ما.', ar: '"غير" لا تصلح في هذا التركيب.', zh: 'غير 不能和 ما 构成这种否定限定结构。' },
          b: { en: 'لا … إلا is not a valid exception pair; لن is future negation.', ar: '"لا … إلا" ليست صيغة استثناء صحيحة.', zh: 'لا…إلا 不是有效的例外结构。' },
          c: { en: 'لن is future negation, incompatible with the past verb حضر.', ar: '"لن" للمستقبل، والفعل ماضٍ.', zh: 'لن 否定将来，与过去式 حضر 不符。' },
        },
      },
      {
        id: 'x3-excp-03',
        prompt: 'لا يتكلم اللغة الإنجليزية إلا........',
        options: [
          { id: 'a', text: 'محمدٌ' },
          { id: 'b', text: 'محمدُ' },
          { id: 'c', text: 'محمدَ' },
          { id: 'd', text: 'محمدًا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'In a negative sentence with إلا, the mustathnā is manṣūb if the sentence is complete and affirmative-negative (كلام تام منفي), but may be marfūʿ on badal. Here the standard reading treats محمد as badal from the (omitted) subject, hence marfūʿ with tanwīn: محمدٌ.',
          ar: 'المستثنى بعد "إلا" في الكلام المنفي يجوز فيه الرفع على البدلية. والتقدير: لا يتكلم … إلا محمدٌ.',
          zh: '否定句里 إلا 后的例外词可以用主格（بدل）。这里按“只有穆罕默德会说”解析，用主格 محمدٌ。',
        },
        whyWrong: {
          b: { en: 'محمدُ without tanwīn is wrong because محمد here is indefinite by context (بدل), not definite by ال or iḍāfah.', ar: 'التعريف بلا "ال" ولا إضافة لا يصح.', zh: '既没有 ال 也没有正偏组合，名词不能确指，所以必须带鼻音。' },
          c: { en: 'محمدَ without tanwīn is not a valid indefinite form.', ar: 'صيغة غير صحيحة إعرابيًا.', zh: '不带鼻音的宾格形式不成立。' },
          d: { en: 'محمدًا is manṣūb — the alternative reading, but here the exam key prefers the badal (rafʿ) reading.', ar: 'النصب تحليل بديل، والامتحان اعتمد الرفع على البدلية.', zh: '宾格是另一种解析，本题按主格（بدل）取答案。' },
        },
      },
      {
        id: 'x3-excp-04',
        prompt: 'لم يرسبْ الطلابُ اليوم إلَّا .......',
        options: [
          { id: 'a', text: 'طالبٌ' },
          { id: 'b', text: 'طالبًا' },
          { id: 'c', text: 'الطلابُ' },
          { id: 'd', text: 'الطالبَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'In a negative sentence with إلا, the mustathnā may be marfūʿ as badal from the subject الطلابُ: "none of the students failed today except one student". طالبٌ is the badal, indefinite.',
          ar: 'في الكلام المنفي مع "إلا" يجوز رفع المستثنى على البدلية: إلا طالبٌ (بدل من "الطلاب").',
          zh: '否定句里 إلا 后的例外词可以用主格（作 بدل 替换前面的主语 الطلابُ）：إلا طالبٌ。',
        },
        whyWrong: {
          b: { en: 'طالبًا is manṣūb — the alternative reading, but here the badal (rafʿ) reading is preferred.', ar: 'النصب تحليل بديل، والأفصح الرفع على البدلية.', zh: '宾格是另一种解析，本题取主格。' },
          c: { en: 'الطلابُ with ال would make the exception identical to the general class, defeating the meaning of إلا.', ar: 'التعريف بـ"ال" يبطل معنى الاستثناء.', zh: '加 ال 会使例外词和前面的整体相同，失去“例外”之意。' },
          d: { en: 'Both definite and manṣūb — doubly wrong.', ar: 'معرفة ومنصوبة، خطأ مزدوج.', zh: '既确指又宾格，双重错误。' },
        },
      },
    ],
  },

  // ============================================================
  // 15. الضمائر والأسماء الإشارية — Pronouns and demonstratives (NEW block)
  // ============================================================
  {
    titleAr: 'الضمائر والأسماء الإشارية',
    questions: [
      {
        id: 'x3-pro-01',
        prompt: '.......هم الأشخاص الذين حضروا المحاضرة منذ ساعتين.',
        options: [
          { id: 'a', text: 'هذه' },
          { id: 'b', text: 'هذان' },
          { id: 'c', text: 'هؤلاء' },
          { id: 'd', text: 'هذا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'Masculine human plural → هؤلاء ("these"). The following هم confirms the plural.',
          ar: '"هم" ضمير جمع، والأشخاص جمع عاقل مذكر، فالإشارة "هؤلاء".',
          zh: '“他们”是复数，الأشخاص 是阳性人类复数，指示代词用 هؤلاء。',
        },
        whyWrong: {
          a: { en: 'هذه is feminine singular.', ar: '"هذه" للمفردة المؤنثة.', zh: 'هذه 是阴性单数。' },
          b: { en: 'هذان is masculine dual — but here the referent is plural.', ar: '"هذان" للمثنى، والمقصود جمع.', zh: 'هذان 是阳性双数，而这里指复数。' },
          d: { en: 'هذا is masculine singular.', ar: '"هذا" للمفرد المذكر.', zh: 'هذا 是阳性单数。' },
        },
      },
      {
        id: 'x3-pro-02',
        prompt: 'من يكتب رسائل إلى ..... دائما؟',
        options: [
          { id: 'a', text: 'أسرتِه' },
          { id: 'b', text: 'أسرتُه' },
          { id: 'c', text: 'أسرتَه' },
          { id: 'd', text: 'أسرتْه' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The noun أسرت before the pronoun suffix is majrūr by the preposition إلى, so it takes kasrah: أسرتِه. (The ت here is the feminine marker, not a case ending on its own; the kasrah is on the ت before the pronoun ه.)',
          ar: '"أسرتِه": التاء مكسورة لأن الاسم قبل الضمير مجرور بحرف الجر "إلى".',
          zh: 'أسرتِه：前面的介词 إلى 让名词变成属格，所以在 ت 上加齐齿符。',
        },
        whyWrong: {
          b: { en: 'أسرتُه has ḍammah — but a noun after إلى must be majrūr.', ar: 'الضم لا يصح بعد حرف الجر.', zh: 'إلى 后名词必须用属格，不能用主格。' },
          c: { en: 'أسرتَه has fatḥah — wrong case after إلى.', ar: 'الفتح لا يصح بعد حرف الجر.', zh: 'إلى 后不能用宾格。' },
          d: { en: 'أسرتْه has sukūn, which is not a valid case ending on a noun.', ar: 'السكون لا يكون علامة إعراب.', zh: '静符不是名词的格位符号。' },
        },
      },
      {
        id: 'x3-pro-03',
        prompt: 'هؤلاء هم الطلاب ......نجحوا في اختبار القبول بالجامعة هذا العام.',
        options: [
          { id: 'a', text: 'هو' },
          { id: 'b', text: 'هم' },
          { id: 'c', text: 'هما' },
          { id: 'd', text: 'إياهم' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The pronoun must agree with الطلاب (masculine plural) → هم. The first هم (after هؤلاء) is the mubtadaʾ; the second هم (before الطلاب) is the ḍamīr al-faṣl (separating pronoun).',
          ar: 'ضمير الجمع المذكر المناسب لـ"الطلاب" هو "هم". والأول ضمير فصل، والثاني بدل أو خبر.',
          zh: '代词要与 الطلاب（阳性复数）一致，用 هم。前一个 هم 是分离代词，后一个 هم 与 الطلاب 呼应。',
        },
        whyWrong: {
          a: { en: 'هو is masculine singular.', ar: '"هو" للمفرد المذكر.', zh: 'هو 是阳性单数。' },
          c: { en: 'هما is dual.', ar: '"هما" للمثنى.', zh: 'هما 是双数。' },
          d: { en: 'إياهم is a detached accusative pronoun ("them"), used after verbs or prepositions, not here.', ar: '"إياهم" ضمير نصب منفصل، لا يقع هنا.', zh: 'إياهم 是宾格分离代词，用于动词或介词后，此处不适用。' },
        },
      },
      {
        id: 'x3-pro-04',
        prompt: 'قابلت أول أمس رئيس الجامعة ......',
        options: [
          { id: 'a', text: 'كله' },
          { id: 'b', text: 'نفسُه' },
          { id: 'c', text: 'عينَه' },
          { id: 'd', text: 'جميعًا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'نفسُه is the "self" emphatic — "I met the university president himself". It is marfūʿ as a tawkīd (emphatic) or badal from رئيس الجامعة.',
          ar: '"نفسُه" توكيد معنوي، والمعنى: قابلت رئيس الجامعة نفسه.',
          zh: 'نفسُه 是强调“本人”的强调词：“我见到了大学校长本人”。',
        },
        whyWrong: {
          a: { en: 'كله would mean "all of him", which is not a standard emphatic for a person in this construction.', ar: '"كله" لا تصلح توكيدًا للشخص هنا.', zh: 'كله 意为“全部”，不适合强调人物。' },
          c: { en: 'عينَه means "his eye"; used colloquially as "himself" but not standard in MSA.', ar: '"عينه" بالمعنى العامي، ولا تصح فصحى هنا.', zh: 'عينه 是方言用法，书面语不用。' },
          d: { en: 'جميعًا is adverbial ("all together"), not a pronoun-based emphatic.', ar: '"جميعًا" حال، لا توكيدًا.', zh: 'جميعًا 是状语，不是强调代词。' },
        },
      },
      {
        id: 'x3-pro-06',
        prompt: 'يقول أحمد لأعدائه :ها أنا.....',
        options: [
          { id: 'a', text: 'ذا' },
          { id: 'b', text: 'ذي' },
          { id: 'c', text: 'ذان' },
          { id: 'd', text: 'ذو' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'ها أنا ذا = "here I am". ذا is the demonstrative agreeing with أنا (1st person singular masculine), and it is mabnī ʿalā al-sukūn in this fixed expression.',
          ar: '"ها أنا ذا" صيغة ثابتة بمعنى "ها أنا حاضر"، و"ذا" اسم إشارة مبني على السكون.',
          zh: 'ها أنا ذا 是固定说法，意为“我在这儿”。ذا 是指示代词，和 أنا（第一人称阳性单数）一致，用静符结尾。',
        },
        whyWrong: {
          b: { en: 'ذي is the genitive form; not used in this exclamation.', ar: '"ذي" صيغة جرّ، ولا تصلح هنا.', zh: 'ذي 是属格形式，不用于此感叹结构。' },
          c: { en: 'ذان is dual; أنا is singular.', ar: '"ذان" للمثنى، و"أنا" مفرد.', zh: 'ذان 是双数，أنا 是单数。' },
          d: { en: 'ذو is a possessive construct word ("of"), not a demonstrative.', ar: '"ذو" اسم ناقص بمعنى صاحب، لا اسم إشارة.', zh: 'ذو 表示“有……的”，不是指示代词。' },
        },
      },
      {
        id: 'x3-pro-07',
        prompt: '.....أحترمُ لما يقُمْنَ به من أعمال جليلة في خدمة المجتمع.',
        options: [
          { id: 'a', text: 'إيَّاه' },
          { id: 'b', text: 'إيَّاهم' },
          { id: 'c', text: 'إيَّاهنَّ' },
          { id: 'd', text: 'إيَّاها' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The verb يقُمْنَ carries the nūn of feminine plural, so the referents are feminine plural. The detached accusative pronoun must agree: إيَّاهنَّ (fronted for emphasis).',
          ar: 'الفعل "يقُمْنَ" فيه نون النسوة، فالمرجع جمع مؤنث. والضمير المنفصل المنصوب المطابق: "إيَّاهنَّ"، وقد قُدِّم للاختصاص.',
          zh: '动词 يقُمْنَ 带 نون النسوة，所以所指对象是阴性复数。宾格分离代词要用 إيَّاهنَّ，提前到动词前表示强调。',
        },
        whyWrong: {
          a: { en: 'إيَّاه is masculine singular.', ar: '"إيَّاه" للمفرد المذكر.', zh: 'إيَّاه 是阳性单数。' },
          b: { en: 'إيَّاهم is masculine plural.', ar: '"إيَّاهم" للجمع المذكر.', zh: 'إيَّاهم 是阳性复数。' },
          d: { en: 'إيَّاها is feminine singular.', ar: '"إيَّاها" للمفردة المؤنثة.', zh: 'إيَّاها 是阴性单数。' },
        },
      },
    ],
  },
    // ============================================================
  // 16. حروف العطف — Conjunctions (NEW lesson)
  // ============================================================
  {
    titleAr: 'حروف العطف',
    questions: [
      {
        id: 'new-atf-01',
        prompt: 'يستيقظ أحمد الساعة السابعة صباحا .... يتناول الفطور الساعة الثامنة.',
        options: [
          { id: 'a', text: 'أو' },
          { id: 'b', text: 'ثم' },
          { id: 'c', text: 'قد' },
          { id: 'd', text: 'لا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'ثم marks sequence with a gap in time: "he wakes at seven, then eats breakfast at eight". The hour between the two actions is the gap that ثم conveys.',
          ar: '"ثم" للترتيب مع التراخي، وهو المناسب هنا: يستيقظ في السابعة ثم يتناول الفطور في الثامنة.',
          zh: 'ثم 表“然后”，强调有时间间隔：“他七点起床，然后八点吃早饭”。中间一小时就是 ثم 所表达的间隔。',
        },
        whyWrong: {
          a: { en: 'أو marks choice, not sequence.', ar: '"أو" للتخيير.', zh: 'أو 表选择，不表顺序。' },
          c: { en: 'قد is a particle of emphasis or expectation, not a conjunction.', ar: '"قد" حرف تحقيق، لا عطف.', zh: 'قد 是强调虚词，不是连词。' },
          d: { en: 'لا is negation, not a conjunction here.', ar: '"لا" للنفي.', zh: 'لا 是否定虚词。' },
        },
      },
      {
        id: 'new-atf-02',
        prompt: 'نشترك أنا وإخوتي في كل شيء إلا الهوايات فأنا أحب الرسم أمّا أختي الصغيرة....تحب الموسيقى وكذلك أخي.',
        options: [
          { id: 'a', text: 'التي' },
          { id: 'b', text: 'فـ' },
          { id: 'c', text: 'أنّ' },
          { id: 'd', text: 'إنّ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After أمّا ("as for"), the response is introduced by فـ: أمّا أختي الصغيرة فـتحب الموسيقى.',
          ar: '"أمّا" يليها جوابها مقترنًا بالفاء: أمّا أختي الصغيرة فتحب الموسيقى.',
          zh: 'أمّا（至于）后面的答句要用 فـ 连接：أمّا أختي الصغيرة فتحب الموسيقى。',
        },
        whyWrong: {
          a: { en: 'التي is a relative pronoun; it does not connect the two clauses here.', ar: '"التي" اسم موصول، لا تصلح للربط هنا.', zh: 'التي 是关系代词，不能作此连接。' },
          c: { en: 'أنّ introduces a nominal complement, not a response clause after أمّا.', ar: '"أنّ" للتعليق الاسمي.', zh: 'أنّ 引出名词化从句。' },
          d: { en: 'إنّ does not fit the أمّا construction.', ar: '"إنّ" لا تصلح مع "أمّا".', zh: 'إنّ 不用于 أمّا 结构。' },
        },
      },
      {
        id: 'new-atf-03',
        prompt: 'هل نقول كسر الزجاج ..... انكسر؟',
        options: [
          { id: 'a', text: 'و' },
          { id: 'b', text: 'ثم' },
          { id: 'c', text: 'أم' },
          { id: 'd', text: 'أو' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'After a question with هل, the disjunctive أم separates two alternatives: "do we say the glass broke (actively) أم it broke (by itself)?" — أم is the interrogative "or".',
          ar: '"أم" المعادلة تأتي بعد همزة الاستفهام أو "هل" للتفريق بين أمرين: هل نقول كسر أم انكسر؟',
          zh: 'أم 是疑问性的“还是”，在 هل 之后用来区分两个选项：هل نقول كسر أم انكسر？',
        },
        whyWrong: {
          a: { en: 'و is plain "and", not a disjunctive after a question.', ar: '"و" للجمع، لا للتفريق.', zh: 'و 是“和”，不能用于疑问句中的“还是”。' },
          b: { en: 'ثم marks sequence, not a choice.', ar: '"ثم" للترتيب.', zh: 'ثم 表顺序，不表选择。' },
          d: { en: 'أو is disjunctive but for non-interrogative choice; after هل the standard is أم.', ar: '"أو" للتخيير غير الاستفهامي، والصواب هنا "أم".', zh: 'أو 用于非疑问的选择；هل 之后的标准用 أم。' },
        },
      },
    ],
  },

  // ============================================================
  // 17. الإضافة — Iḍāfah (NEW lesson)
  // ============================================================
  {
    titleAr: 'الإضافة',
    questions: [
      {
        id: 'new-idafa-01',
        prompt: 'هي أستاذة متخصصة في .........',
        options: [
          { id: 'a', text: 'علمُ النفسِ' },
          { id: 'b', text: 'علمِ النفسِ' },
          { id: 'c', text: 'علمُ النفسُ' },
          { id: 'd', text: 'علمِ النفسَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After في, the head of the iḍāfah (علم) is majrūr: علمِ. The مضاف إليه النفس is also majrūr: النفسِ.',
          ar: 'بعد حرف الجر "في" يكون المضاف مجرورًا: علمِ، والمضاف إليه مجرور أيضًا: النفسِ.',
          zh: '介词 في 后的正偏组合第一项（المضاف）用属格：علمِ；第二项（المضاف إليه）也用属格：النفسِ。',
        },
        whyWrong: {
          a: { en: 'علمُ is marfūʿ, but بعد في it must be majrūr.', ar: 'الرفع لا يصح بعد حرف الجر.', zh: 'في 后不能用主格。' },
          c: { en: 'Both words in rafʿ — wrong case.', ar: 'الرفع في الكلمتين خطأ.', zh: '两项都用主格，错。' },
          d: { en: 'النفسَ is manṣūb; the مضاف إليه must be majrūr.', ar: 'المضاف إليه مجرور، لا منصوب.', zh: '正偏组合第二项要用属格，不是宾格。' },
        },
      },
      {
        id: 'new-idafa-02',
        prompt: 'أخي أستاذ في الجامعة يعمل في قسم.......',
        options: [
          { id: 'a', text: 'الشرق أوسط' },
          { id: 'b', text: 'شرق الأوسط' },
          { id: 'c', text: 'شرق أوسط' },
          { id: 'd', text: 'الشرق الأوسط' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The idiomatic proper noun is شرق الأوسط ("the Middle East"), an iḍāfah where the مضاف is indefinite and the مضاف إليه is definite.',
          ar: 'الاسم الفصيح: "شرق الأوسط"، وهو مركّب إضافي فيه المضاف نكرة والمضاف إليه معرفة.',
          zh: '标准专有名词是 شرق الأوسط（中东），正偏组合中第一项不定、第二项确指。',
        },
        whyWrong: {
          a: { en: 'الشرق أوسط reverses which word gets ال — wrong construct.', ar: 'التعريف في غير موضعه.', zh: 'ال 位置颠倒，正偏组合错误。' },
          c: { en: 'شرق أوسط lacks the ال on أوسط — wrong form.', ar: 'ناقص "ال" في المضاف إليه.', zh: '第二项缺 ال，形式不对。' },
          d: { en: 'الشرق الأوسط puts ال on both words, breaking the iḍāfah convention.', ar: 'التعريف في المضاف خطأ.', zh: '第一项加 ال 破坏了正偏组合的规则。' },
        },
      },
      {
        id: 'new-idafa-03',
        prompt: 'من يكتب رسائل إلى ..... دائما؟',
        options: [
          { id: 'a', text: 'أسرتِه' },
          { id: 'b', text: 'أسرتُه' },
          { id: 'c', text: 'أسرتَه' },
          { id: 'd', text: 'أسرتْه' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After إلى, the noun is majrūr, so أسرتِه takes kasrah on the ت before the pronoun suffix ه.',
          ar: 'بعد حرف الجر "إلى" يكون الاسم مجرورًا، فتكسر التاء: أسرتِه.',
          zh: 'إلى 后名词用属格，所以 ت 上标齐齿符：أسرتِه。',
        },
        whyWrong: {
          b: { en: 'أسرتُه has ḍammah — wrong case after إلى.', ar: 'الضم لا يصح بعد حرف الجر.', zh: 'إلى 后不能用主格。' },
          c: { en: 'أسرتَه has fatḥah — wrong case.', ar: 'الفتح لا يصح بعد حرف الجر.', zh: 'إلى 后不能用宾格。' },
          d: { en: 'أسرتْه has sukūn on the ت — not a valid case ending.', ar: 'السكون لا يكون علامة إعراب.', zh: '静符不是格位符号。' },
        },
      },
    ],
  },

  // ============================================================
  // 18. المفعول لأجله والمفعول المطلق (NEW lesson)
  // ============================================================
  {
    titleAr: 'المفعول لأجله والمفعول المطلق',
    questions: [
      {
        id: 'new-maf-01',
        prompt: 'شكرتُ الموظف على مساعدته .......كبيرا.',
        options: [
          { id: 'a', text: 'الشكرُ' },
          { id: 'b', text: 'يشكرُ' },
          { id: 'c', text: 'شكرًا' },
          { id: 'd', text: 'شاكرًا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'شكرًا is a مفعول مطلق (absolute object): the maṣdar of the verb repeated to intensify it, in manṣūb. The adjective كبيرًا modifies it.',
          ar: '"شكرًا" مفعول مطلق منصوب مؤكِّد لفعله، و"كبيرًا" صفته.',
          zh: 'شكرًا 是“绝对宾语”（动词名词的重复强调），用宾格。形容词 كبيرًا 修饰它。',
        },
        whyWrong: {
          a: { en: 'الشكرُ is marfūʿ and definite — wrong case and definiteness for مفعول مطلق.', ar: 'الرفع والتعريف خطأ.', zh: '主格且确指，双重错误。' },
          b: { en: 'يشكرُ is a verb, cannot occupy this slot.', ar: 'الفعل لا يصلح هنا.', zh: '此处不能放动词。' },
          d: { en: 'شاكرًا is ḥāl for the speaker, but the sentence is thanking, not describing the speaker.', ar: '"شاكرًا" حال للمتكلم، والمعنى مختلف.', zh: 'شاكرًا 是说话者的状语，语义不符。' },
        },
      },
      {
        id: 'new-maf-02',
        prompt: 'أعمل كثيرا ......في النجاح.',
        options: [
          { id: 'a', text: 'أرغب' },
          { id: 'b', text: 'رغبةٌ' },
          { id: 'c', text: 'رغبةً' },
          { id: 'd', text: 'راغبٌ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'رغبةً is a مفعول لأجله (causative object): the maṣdar expressing the reason for working, in manṣūb without ال and without iḍāfah.',
          ar: '"رغبةً" مفعول لأجله منصوب، وهو مصدر يبين سبب العمل.',
          zh: 'رغبةً 是“原因宾语”，用宾格，说明“工作”的原因：因为想在成功方面有所成就。',
        },
        whyWrong: {
          a: { en: 'أرغب is a verb, cannot occupy this slot.', ar: 'الفعل لا يصلح هنا.', zh: '此处不能放动词。' },
          b: { en: 'رغبةٌ is marfūʿ — the مفعول لأجله is manṣūb.', ar: 'الرفع لا يصح.', zh: '原因宾语要用宾格。' },
          d: { en: 'راغبٌ is an active participle ("wishing"), not the maṣdar required here.', ar: 'اسم الفاعل لا يصلح.', zh: '主动分词不符合此处要求。' },
        },
      },
      {
        id: 'new-maf-03',
        prompt: 'انطلقت صافرة الإنذار........قويًّا.',
        options: [
          { id: 'a', text: 'منطلقٌ' },
          { id: 'b', text: 'انطلاقةً' },
          { id: 'c', text: 'انطلاقًا' },
          { id: 'd', text: 'انطلاقةٌ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'انطلاقًا is the مفعول مطلق (maṣdar of the verb انطلق, manṣūb), confirming the verb: "the siren went off — a strong going-off".',
          ar: '"انطلاقًا" مفعول مطلق منصوب مؤكِّد لفعله "انطلقت".',
          zh: 'انطلاقًا 是绝对宾语（动词 انطلق 的动词名词），用宾格，强调动词。',
        },
        whyWrong: {
          a: { en: 'منطلقٌ is a participle, not the maṣdar needed here.', ar: 'اسم الفاعل لا يصلح.', zh: '主动分词不符合要求。' },
          b: { en: 'انطلاقةً is a "single-instance" noun; the standard مفعول مطلق uses the maṣdar انطلاقًا.', ar: 'اسم المرة لا يصلح، والصواب المصدر.', zh: '单次名词不对，应用动词名词 انطلاقًا。' },
          d: { en: 'Marfūʿ with tanwīn — the مفعول مطلق must be manṣūb.', ar: 'الرفع لا يصح للمفعول المطلق.', zh: '绝对宾语要用宾格。' },
        },
      },
      {
        id: 'new-maf-04',
        prompt: 'حفظت الكلمات الجديدة.........',
        options: [
          { id: 'a', text: 'الحفظِ' },
          { id: 'b', text: 'حفظًا' },
          { id: 'c', text: 'حفظُ' },
          { id: 'd', text: 'الحفظَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'حفظًا is a مفعول مطلق confirming the verb حفظت: "I memorized the new words — memorizing them fully".',
          ar: '"حفظًا" مفعول مطلق منصوب مؤكِّد لفعله "حفظت".',
          zh: 'حفظًا 是绝对宾语，用宾格强调动词 حفظت。',
        },
        whyWrong: {
          a: { en: 'الحفظِ is definite and majrūr — wrong case and definiteness.', ar: 'الجرّ والتعريف خطأ.', zh: '属格且确指，双重错误。' },
          c: { en: 'حفظُ is marfūʿ without tanwīn — ungrammatical.', ar: 'الرفع بلا تنوين خطأ.', zh: '主格且缺鼻音。' },
          d: { en: 'الحفظَ is definite — the مفعول مطلق is normally indefinite.', ar: 'التعريف يخالف القاعدة.', zh: '绝对宾语通常不定。' },
        },
      },
    ],
  },

  // ============================================================
  // 19. الفعل والفاعل — Verb–subject agreement (NEW lesson)
  // ============================================================
  {
    titleAr: 'الفعل والفاعل',
    questions: [
      {
        id: 'new-fil-01',
        prompt: 'أنا.........الفتاة السيئة أمس.',
        options: [
          { id: 'a', text: 'ضربتْ' },
          { id: 'b', text: 'ضربتِ' },
          { id: 'c', text: 'ضربتَ' },
          { id: 'd', text: 'ضربتُ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'The subject is أنا (1st person singular), so the past verb takes the tāʾ of the speaker: ضربتُ.',
          ar: 'الفاعل ضمير المتكلم "أنا"، فالفعل الماضي يتصل بتاء الفاعل: ضربتُ.',
          zh: '主语是“我”，所以过去式动词加说话者的 ت：ضربتُ。',
        },
        whyWrong: {
          a: { en: 'ضربتْ is 3rd person feminine singular ("she hit").', ar: 'ضربتْ للغائبة.', zh: 'ضربتْ 是“她打了”。' },
          b: { en: 'ضربتِ is 2nd person feminine singular.', ar: 'ضربتِ للمخاطبة.', zh: 'ضربتِ 是“你（女）打了”。' },
          c: { en: 'ضربتَ is 2nd person masculine singular.', ar: 'ضربتَ للمخاطب.', zh: 'ضربتَ 是“你（男）打了”。' },
        },
      },
      {
        id: 'new-fil-02',
        prompt: 'كُتبت ......بخط عربي جميل، فأعجبت كل من رآها.',
        options: [
          { id: 'a', text: 'الرسائلُ' },
          { id: 'b', text: 'الرسائلَ' },
          { id: 'c', text: 'رسائلٌ' },
          { id: 'd', text: 'رسائلَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The verb كُتبت is passive feminine singular, agreeing with the non-human plural الرسائل, which is treated as feminine singular. The subject of a passive verb is marfūʿ (nāʾib fāʿil): الرسائلُ.',
          ar: 'الفعل "كُتبت" مبني للمجهول مؤنث، والفاعل (نائب الفاعل) مرفوع: الرسائلُ.',
          zh: '动词 كُتبت 是被动阴性形式，与非人类复数 الرسائل 一致（按阴性单数处理）。被动动词的主语（نائب فاعل）用主格：الرسائلُ。',
        },
        whyWrong: {
          b: { en: 'الرسائلَ is manṣūb — the nāʾib fāʿil must be marfūʿ.', ar: 'النصب لا يصح في نائب الفاعل.', zh: '被动主语要用主格。' },
          c: { en: 'رسائلٌ is indefinite; the referent here is definite.', ar: 'نكرة، والمراد معرفة.', zh: '不定，此处应为确指。' },
          d: { en: 'رسائلَ is indefinite and manṣūb — doubly wrong.', ar: 'نكرة ومنصوبة، خطأ مزدوج.', zh: '不定 + 宾格，双重错误。' },
        },
      },
      {
        id: 'new-fil-03',
        prompt: 'الولدان ...... مع بعض باللغة الفرنسية.',
        options: [
          { id: 'a', text: 'يتكلمون' },
          { id: 'b', text: 'يتكلمان' },
          { id: 'c', text: 'تتكلمان' },
          { id: 'd', text: 'تتكلمين' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'الولدان is masculine dual, so the present verb takes the dual alif: يتكلمان.',
          ar: '"الولدان" مثنى مذكر، فالفعل المضارع مرفوع بالألف: يتكلمان.',
          zh: 'الولدان 是阳性双数，所以现在时动词用 alif 表双数：يتكلمان。',
        },
        whyWrong: {
          a: { en: 'يتكلمون is masculine plural — wrong number.', ar: 'الجمع لا يصح، والفاعل مثنى.', zh: '阳性复数，双数才正确。' },
          c: { en: 'تتكلمان is 3rd person feminine dual — wrong gender.', ar: 'للمؤنث المثنى، والفاعل مذكر.', zh: '阴性双数，但主语是阳性。' },
          d: { en: 'تتكلمين is 2nd person feminine singular — wrong person, gender, and number.', ar: 'للمخاطبة المفردة، خطأ في الوجه والعدد.', zh: '人称、性、数都不符。' },
        },
      },
      {
        id: 'new-fil-04',
        prompt: 'الأولاد........أمس الساعة العاشرة مساء بعد كتابة الواجبات.',
        options: [
          { id: 'a', text: 'نام' },
          { id: 'b', text: 'ناموا' },
          { id: 'c', text: 'نامت' },
          { id: 'd', text: 'ناما' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'الأولاد is masculine human plural, so the past verb takes the wāw of the plural: ناموا.',
          ar: '"الأولاد" جمع مذكر عاقل، فالفعل الماضي يتصل بواو الجماعة: ناموا.',
          zh: 'الأولاد 是阳性人类复数，过去式动词加 واو الجماعة：ناموا。',
        },
        whyWrong: {
          a: { en: 'نام is 3rd person masculine singular.', ar: 'مفرد، والفاعل جمع.', zh: '单数，主语是复数。' },
          c: { en: 'نامت is 3rd person feminine singular.', ar: 'للمؤنث، والفاعل مذكر.', zh: '阴性单数，与阳性复数不符。' },
          d: { en: 'ناما is dual.', ar: 'مثنى، والفاعل جمع.', zh: '双数，主语是复数。' },
        },
      },
    ],
  },

  // ============================================================
  // 20. المنادى — Vocative (NEW lesson)
  // ============================================================
  {
    titleAr: 'المنادى',
    questions: [
      {
        id: 'new-mun-01',
        prompt: 'يا أيها......حسبك شرفًا أنك من ورثة الأنبياء.',
        options: [
          { id: 'a', text: 'المعلمُ' },
          { id: 'b', text: 'المعلمَ' },
          { id: 'c', text: 'المعلمْ' },
          { id: 'd', text: 'المعلمِ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After يا أيها, the noun is mabnī ʿalā al-ḍamm when it is a single definite noun without iḍāfah: المعلمُ.',
          ar: 'المنادى بعد "يا أيها" يكون مضمومًا إن كان مفردًا معرفة بلا إضافة: المعلمُ.',
          zh: 'يا أيها 后的呼语，如果是确指单数且无正偏组合，用主格符号：المعلمُ。',
        },
        whyWrong: {
          b: { en: 'المعلمَ is manṣūb — the munādā here takes ḍammah.', ar: 'النصب لا يصح في المنادى هنا.', zh: '呼语此处不能用宾格。' },
          c: { en: 'Sukūn is not a case ending.', ar: 'السكون لا يصح.', zh: '静符不是格位符号。' },
          d: { en: 'المعلمِ is majrūr — no preposition here.', ar: 'الجرّ لا يصح.', zh: '没有介词，不能用属格。' },
        },
      },
      {
        id: 'new-mun-02',
        prompt: 'يا أيها......استمع لما ينصحك به أستاذك فهو معلمك ومرشدك في رحلة النور.',
        options: [
          { id: 'a', text: 'الطالبْ' },
          { id: 'b', text: 'الطالبُ' },
          { id: 'c', text: 'الطالبَ' },
          { id: 'd', text: 'الطالبِ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Same rule as above: after يا أيها, a single definite munādā takes ḍammah: الطالبُ.',
          ar: 'المنادى بعد "يا أيها" مضموم: الطالبُ.',
          zh: 'يا أيها 后的呼语用主格：الطالبُ。',
        },
        whyWrong: {
          a: { en: 'Sukūn is not a case ending.', ar: 'السكون لا يصح.', zh: '静符不成立。' },
          c: { en: 'الطالبَ is manṣūb.', ar: 'النصب لا يصح.', zh: '宾格不对。' },
          d: { en: 'الطالبِ is majrūr.', ar: 'الجرّ لا يصح.', zh: '属格不对。' },
        },
      },
      {
        id: 'new-mun-03',
        prompt: 'يا بنت لا .............إلا الحقيقة.',
        options: [
          { id: 'a', text: 'قلْ' },
          { id: 'b', text: 'قولي' },
          { id: 'c', text: 'تقولين' },
          { id: 'd', text: 'تقولي' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The munādā is بنت (feminine singular), so the imperative must be feminine singular: قولي.',
          ar: 'المنادى "بنت" مؤنث مفرد، فالأمر بالمؤنث المفرد: قولي.',
          zh: '呼语 بنت 是阴性单数，所以命令式也用阴性单数：قولي。',
        },
        whyWrong: {
          a: { en: 'قلْ is masculine singular imperative — wrong gender.', ar: 'للمذكر، والمنادى مؤنث.', zh: '阳性单数，与阴性呼语不符。' },
          c: { en: 'تقولين is present tense, not imperative.', ar: 'المضارع لا يصلح.', zh: '现在时不是命令式。' },
          d: { en: 'تقولي is present-tense manṣūb, not imperative.', ar: 'المضارع المنصوب لا يصلح.', zh: '这是宾格现在时，不是命令式。' },
        },
      },
    ],
  },

  // ============================================================
  // 21. الظروف — Adverbs of time and place (NEW lesson)
  // ============================================================
  {
    titleAr: 'الظروف',
    questions: [
      {
        id: 'new-zarf-01',
        prompt: 'أقرأ القصص العاطفية......',
        options: [
          { id: 'a', text: 'ليلًا نهارًا' },
          { id: 'b', text: 'ليلُ نهارُ' },
          { id: 'c', text: 'ليلَ نهارَ' },
          { id: 'd', text: 'ليلٌ نهارٌ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'ليلًا نهارًا is a pair of accusative adverbs (ظرفا زمان) meaning "by night and by day": both take tanwīn manṣūb.',
          ar: '"ليلًا نهارًا" ظرفا زمان منصوبان بالتنوين.',
          zh: 'ليلًا نهارًا 是两个时间状语（宾格带鼻音）：“夜以继日”。',
        },
        whyWrong: {
          b: { en: 'ليلُ نهارُ is marfūʿ without tanwīn — ungrammatical.', ar: 'الرفع بلا تنوين خطأ.', zh: '主格且缺鼻音。' },
          c: { en: 'ليلَ نهارَ is manṣūb but missing tanwīn.', ar: 'النصب بلا تنوين خطأ.', zh: '宾格但缺鼻音。' },
          d: { en: 'ليلٌ نهارٌ is marfūʿ — wrong case for a ظرف.', ar: 'الرفع لا يصح للظرف.', zh: '状语不能用主格。' },
        },
      },
      {
        id: 'new-zarf-02',
        prompt: 'أستمع إلى الموسيقى ......',
        options: [
          { id: 'a', text: 'صباحُ' },
          { id: 'b', text: 'صباحًا' },
          { id: 'c', text: 'صباحِ' },
          { id: 'd', text: 'الصباحُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'صباحًا is a ظرف زمان (adverb of time) in manṣūb with tanwīn: "in the morning".',
          ar: '"صباحًا" ظرف زمان منصوب بالتنوين.',
          zh: 'صباحًا 是时间状语，用宾格带鼻音：“在早上”。',
        },
        whyWrong: {
          a: { en: 'صباحُ is marfūʿ without tanwīn.', ar: 'الرفع بلا تنوين خطأ.', zh: '主格且缺鼻音。' },
          c: { en: 'صباحِ is majrūr — no preposition here.', ar: 'الجرّ لا يصح.', zh: '没有介词，不能用属格。' },
          d: { en: 'الصباحُ is definite and marfūʿ — a ظرف is normally indefinite manṣūb.', ar: 'معرفة ومرفوعة، والظرف نكرة منصوبة.', zh: '确指主格，而状语通常是不定宾格。' },
        },
      },
      {
        id: 'new-zarf-03',
        prompt: 'مكثت في القاهرة ......واستمتعت كثيرًا.',
        options: [
          { id: 'a', text: 'بِضعةَ شهورٍ' },
          { id: 'b', text: 'بِضعَ شهورٍ' },
          { id: 'c', text: 'بِضْعُ شهورٍ' },
          { id: 'd', text: 'بِضعةُ شهرٍ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'بضع (3–9) is the first term of an iḍāfah. Since it is a ظرف زمان here (mudda, "for a period of"), it is manṣūb. Because شهور is a plural that acts like a feminine singular for numeral agreement, the number is feminine: بِضعةَ شهورٍ.',
          ar: '"بِضعةَ" ظرف زمان منصوب، مضاف إلى "شهورٍ" المجرور.',
          zh: 'بضع 是正偏组合第一项。这里作时间状语（表示持续的时间），用宾格。因为 شهور 是复数且按阴性单数处理，数词用阴性形式：بِضعةَ شهورٍ。',
        },
        whyWrong: {
          b: { en: 'بِضعَ is the masculine form — شهور needs the feminine بِضعةَ.', ar: 'المذكر لا يوافق "شهور".', zh: '阳性形式与 شهور 不符。' },
          c: { en: 'بِضْعُ is marfūʿ — but a ظرف is manṣūb.', ar: 'الرفع لا يصح للظرف.', zh: '状语要用宾格。' },
          d: { en: 'شهر should be plural (شهور) after بضع.', ar: 'المفرد لا يصلح بعد "بضع".', zh: 'بضع 后应用复数 شهور。' },
        },
      },
    ],
  },

  // ============================================================
  // 22. أسماء التفضيل — Comparatives and superlatives (NEW lesson)
  // ============================================================
  {
    titleAr: 'أسماء التفضيل',
    questions: [
      {
        id: 'new-tafdil-01',
        prompt: 'مدينتي ......مدينة في الصين.',
        options: [
          { id: 'a', text: 'الأكبر' },
          { id: 'b', text: 'أكبر' },
          { id: 'c', text: 'كبيرة' },
          { id: 'd', text: 'الكبرى' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'The superlative of كبير for a feminine noun is الكبرى (the feminine pattern فُعْلى). مدينتي is feminine, so الكبرى is the correct superlative: "my city is the biggest city in China".',
          ar: 'أفعل التفضيل في المؤنث يكون على "فُعْلى": الكبرى. و"مدينتي" مؤنثة، فالصواب: الكبرى.',
          zh: '阴性名词的最高级用 فُعْلى 形式。مدينتي 是阴性，所以用 الكبرى：“我的城市是中国最大的城市”。',
        },
        whyWrong: {
          a: { en: 'الأكبر is the masculine form; مدينتي is feminine.', ar: 'مذكر، والموصوف مؤنث.', zh: '阳性形式，被修饰的是阴性。' },
          b: { en: 'أكبر is indefinite masculine — no ال, no feminine marking.', ar: 'مذكر نكرة، لا يطابق.', zh: '阳性不定，与语境不符。' },
          c: { en: 'كبيرة is a plain adjective ("big"), not a superlative.', ar: 'صفة عادية، لا تفضيل فيها.', zh: '普通形容词，不是最高级。' },
        },
      },
      {
        id: 'new-tafdil-02',
        prompt: 'عندي إيمان بأن ما سأحققه هذا العام سيكون .......مما حققته من قبل.',
        options: [
          { id: 'a', text: 'الأعظم' },
          { id: 'b', text: 'عظيم' },
          { id: 'c', text: 'أعظم' },
          { id: 'd', text: 'من أعظم' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'Before مما, the comparative takes the indefinite form أعظم: سيكون أعظم مما حققته = "will be greater than what I achieved". It is marfūʿ as the khabar of يكون.',
          ar: '"أعظم" اسم تفضيل نكرة مرفوع خبرًا لـ"يكون"، ويليه "مما" للمقارنة.',
          zh: '比较级 أعظم 用不定形式，作 يكون 的谓语（主格）；后面的 مما 引出比较对象。',
        },
        whyWrong: {
          a: { en: 'الأعظم is definite superlative; the comparative before مما is indefinite.', ar: '"الأعظم" معرفة، والصواب النكرة.', zh: 'الأعظم 是确指最高级，接 مما 时应用不定比较级。' },
          b: { en: 'عظيم is a plain adjective ("great") — no comparison, so مما does not fit.', ar: '"عظيم" صفة عادية.', zh: 'عظيم 是普通形容词，不含比较之意。' },
          d: { en: 'من أعظم duplicates the comparative particle (من … من).', ar: '"من أعظم" تكرّر أداة المقارنة.', zh: 'من أعظم 重复了比较结构。' },
        },
      },
      {
        id: 'new-tafdil-03',
        prompt: 'رأينا الرجل ...........قامةً في العالم والذي دخل موسوعة جينيس العام الماضي.',
        options: [
          { id: 'a', text: 'أطول' },
          { id: 'b', text: 'الطويل' },
          { id: 'c', text: 'الأطول' },
          { id: 'd', text: 'طويل' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The superlative "the tallest" is الأطول, acting as a naʿt of الرجل (which is definite). The following قامةً is tamyīz, singular manṣūb.',
          ar: '"الأطول" اسم تفضيل معرّف، صفة لـ"الرجل"، و"قامةً" تمييز منصوب.',
          zh: '确指最高级 الأطول 作 الرجل 的形容词；后面的 قامةً 是区分语（宾格单数）。',
        },
        whyWrong: {
          a: { en: 'أطول is indefinite, but الرجل is definite.', ar: 'نكرة، والمنعوت معرفة.', zh: '不定，被修饰的名词却是确指。' },
          b: { en: 'الطويل is the positive adjective ("tall"), not a superlative.', ar: 'صفة عادية لا تفضيل فيها.', zh: '普通形容词，不含最高级。' },
          d: { en: 'طويل is indefinite and not a superlative.', ar: 'نكرة ولا تفضيل فيها.', zh: '不定且不是最高级。' },
        },
      },
      {
        id: 'new-tafdil-04',
        prompt: 'هاتان الأستاذتان هما ......على الإطلاق في تعليمنا اللغة العربية.',
        options: [
          { id: 'a', text: 'فضيلتان' },
          { id: 'b', text: 'فضليان' },
          { id: 'c', text: 'أفضلان' },
          { id: 'd', text: 'الأفضل' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'The exam key uses the fixed superlative الأفضل. Strictly, for a dual feminine subject هما the classical form would be الأفضلان or الفضليان, but neither appears in the option set. The item treats الأفضل as a fixed superlative form used regardless of the dual subject.',
          ar: 'الصيغة الفصيحة الدقيقة للمثنى المؤنث: "الأفضلان"، لكن الامتحان اعتمد "الأفضل" صيغةً ثابتة.',
          zh: '严格来说，阴性双数 هما 对应的最高级应是 الأفضلان，但选项里没有。本题按固定用法取 الأفضل。',
        },
        whyWrong: {
          a: { en: 'فضيلتان is a positive adjective ("virtuous") in the feminine dual, not a superlative.', ar: 'صفة عادية لا تفضيل فيها.', zh: '普通形容词“有美德的”，不是最高级。' },
          b: { en: 'فضليان is a nonstandard spelling of فضيلان.', ar: 'صيغة غير قياسية.', zh: '非标准拼写。' },
          c: { en: 'أفضلان is not the standard dual form of أفضل.', ar: 'صيغة غير قياسية.', zh: '非标准形式。' },
        },
      },
    ],
  },
]