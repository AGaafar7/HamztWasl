// data/arabic-rules-lessons.js
//
// Content for the "Arabic Rules" course lessons, extracted from
// Chinese national Arabic-major exams (专四) and Alexandria University
// Chinese-program grammar quizzes. Each lesson is a `multiplechoice`
// course_lessons row with content { title, questions }.
//
// Question shape (matches LessonRenderer + MultipleChoiceLessonForm):
//   {
//     id: 'q1',
//     prompt: '……',                 // Arabic sentence with ___ for the blank
//     options: [{ id: 'a', text: '…' }, …],
//     correctOptionId: 'a',
//     whyCorrect: { en, ar, zh },
//     whyWrong: { a: { en, ar, zh }, … }
//   }
//
// Ambiguous items (where two answers were grammatically defensible)
// have been deliberately omitted.

export const arabicRulesLessons = [
  // ============================================================
  // 1. حروف الجرّ — Prepositions
  // ============================================================
  {
    title: {
      en: 'Prepositions — Ḥurūf al-Jarr',
      ar: 'حروف الجرّ',
      zh: '介词',
    },
    questions: [
      {
        id: 'hj-01',
        prompt: 'تختلِف التقاليد العربية ____ التقاليد الصينية.',
        options: [
          { id: 'a', text: 'في' },
          { id: 'b', text: 'بـ' },
          { id: 'c', text: 'عن' },
          { id: 'd', text: 'من' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The verb اختلَف takes the preposition عن: يختلف عن = "to differ from". It is a fixed collocation.',
          ar: 'الفعل "اختلف" يتعدّى بحرف الجرّ "عن": يختلف عن، وهي علاقة لازمة بين الفعل وحرفه.',
          zh: '动词 اختلَف 固定搭配介词 عن：يختلف عن 表示“与……不同”。',
        },
        whyWrong: {
          a: { en: '"في" marks location, not the object of difference.', ar: '"في" للظرفية، لا تصلح هنا.', zh: 'في 表示地点，不适用于此。' },
          b: { en: '"بـ" marks instrument or means.', ar: '"بـ" للاستعانة أو السببية.', zh: 'بـ 表示工具或手段。' },
          d: { en: '"من" marks origin, not difference.', ar: '"من" للابتداء، لا تفيد الاختلاف.', zh: 'من 表示来源，不表示“不同”。' },
        },
      },
      {
        id: 'hj-02',
        prompt: 'يعمل والدي مترجمًا ____ اللغة العربية والفرنسية والصينية.',
        options: [
          { id: 'a', text: 'من وإلى' },
          { id: 'b', text: 'إلى ومن' },
          { id: 'c', text: 'في وإلى' },
          { id: 'd', text: 'بين وإلى' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'A translator works from one language to another: من … وإلى …, the standard construction.',
          ar: 'المترجم ينقل من لغة إلى أخرى، فالصواب: "من … وإلى …".',
          zh: '翻译是“从”一种语言“到”另一种语言，用 من … وإلى。',
        },
        whyWrong: {
          b: { en: 'Reversing the order breaks the fixed pair.', ar: 'العكس يخالف الترتيب المألوف.', zh: '颠倒顺序不成立。' },
          c: { en: '"في" does not fit a translator\'s pair of languages.', ar: '"في" لا تصلح للدلالة على زوج اللغات.', zh: 'في 不用于表示翻译的语言对。' },
          d: { en: '"بين" alone would be OK, but بين…وإلى is not a valid pair.', ar: '"بين…وإلى" ليست صيغة صحيحة.', zh: 'بين…وإلى 不是正确搭配。' },
        },
      },
      {
        id: 'hj-03',
        prompt: 'الدول العربية من الدول التي تستخدم البترول ____ معظم الصناعات.',
        options: [
          { id: 'a', text: 'إلى' },
          { id: 'b', text: 'على' },
          { id: 'c', text: 'في' },
          { id: 'd', text: 'عن' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: '"يستخدم … في …" = "uses … in …". في marks the domain in which the using takes place.',
          ar: '"يستخدم … في …" هي الصيغة الصحيحة، فـ"في" للظرفية المجازية.',
          zh: 'يستخدم…في 表示“在……中使用”，في 引出领域。',
        },
        whyWrong: {
          a: { en: '"إلى" marks destination, not domain.', ar: '"إلى" للغاية، لا للظرفية.', zh: 'إلى 表示方向，不表示领域。' },
          b: { en: '"على" would change the verb\'s meaning.', ar: '"على" تغيّر معنى الفعل.', zh: 'على 会改变动词含义。' },
          d: { en: '"عن" marks topic or separation.', ar: '"عن" للمجاوزة أو الموضوع.', zh: 'عن 表示话题或离开。' },
        },
      },
      {
        id: 'hj-04',
        prompt: 'انتقلتُ مع أسرتي ____ نعيش في بلد أجنبي جديد.',
        options: [
          { id: 'a', text: 'إلى' },
          { id: 'b', text: 'لـِ' },
          { id: 'c', text: 'في' },
          { id: 'd', text: 'من' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لام التعليل (لـِ) introduces the purpose: "we moved in order to live in a new country".',
          ar: '"لـِ" للتعليل، والمعنى: انتقلنا لكي نعيش في بلد جديد.',
          zh: 'لام التعليل 引出目的：“我们搬去是为了在新国家生活”。',
        },
        whyWrong: {
          a: { en: '"إلى" would mean the destination is the verb نعيش, not a place.', ar: '"إلى" تجعل "نعيش" غاية، وهو غير صحيح.', zh: 'إلى 会把“生活”当作目的地，不通。' },
          c: { en: '"في" marks location only.', ar: '"في" للظرفية المكانية فقط.', zh: 'في 仅表示地点。' },
          d: { en: '"من" marks origin.', ar: '"من" للابتداء.', zh: 'من 表示起点。' },
        },
      },
      {
        id: 'hj-05',
        prompt: 'كثير من الحاصلين على الماجستير في جامعتي التحقوا ____ الدكتوراه لإكمال الدراسات العليا.',
        options: [
          { id: 'a', text: 'في' },
          { id: 'b', text: 'بِـــ' },
          { id: 'c', text: 'إلى' },
          { id: 'd', text: 'على' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'التحق بـ is the fixed collocation: "enrolled in / joined". التحق بالدكتوراه = "enrolled in the doctoral programme".',
          ar: '"التحق" يتعدّى بالباء: التحق بالدكتوراه.',
          zh: 'التحق 固定搭配 بـ：التحق بالدكتوراه。',
        },
        whyWrong: {
          a: { en: '"في" does not collocate with التحق.', ar: '"في" لا تصلح مع "التحق".', zh: 'في 不与 التحق 搭配。' },
          c: { en: '"إلى" would suggest motion toward, not enrolment.', ar: '"إلى" للغاية المكانية، لا للالتحاق.', zh: 'إلى 表示朝向，不表示入学。' },
          d: { en: '"على" does not fit.', ar: '"على" لا تصلح.', zh: 'على 不适用。' },
        },
      },
      {
        id: 'hj-06',
        prompt: 'أتمنى ____ أعود إلى أسرتي بعد التخرّج ____ الجامعة.',
        options: [
          { id: 'a', text: 'أنّ، في' },
          { id: 'b', text: 'أنْ، عن' },
          { id: 'c', text: 'إنْ، في' },
          { id: 'd', text: 'أنْ، في' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'أنْ introduces the verbal complement after أتمنى; and التخرج takes في: التخرّج في الجامعة.',
          ar: '"أنْ" المصدرية بعد "أتمنى"، و"في" مع "التخرّج": التخرّج في الجامعة.',
          zh: 'أتمنى 后用 أنْ 引出动词补语；التخرّج 搭配 في。',
        },
        whyWrong: {
          a: { en: 'أنّ must be followed by a noun, not a verb.', ar: '"أنّ" يليها اسم لا فعل.', zh: 'أنّ 后接名词。' },
          b: { en: 'عن does not collocate with التخرّج.', ar: '"عن" لا تصلح مع "التخرّج".', zh: 'عن 不与 التخرّج 搭配。' },
          c: { en: 'إنْ is a conditional particle, wrong context.', ar: '"إنْ" شرطية، لا تصلح.', zh: 'إنْ 是条件虚词，不适用。' },
        },
      },
      {
        id: 'hj-07',
        prompt: 'قلتُ ____ الرجلِ إنّ العلم نورٌ والجهل ظلامٌ.',
        options: [
          { id: 'a', text: 'إلى' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'من' },
          { id: 'd', text: 'لـِ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'قال لـ = "said to". The لام marks the addressee: قلتُ للرجل.',
          ar: 'الفعل "قال" يتعدّى باللام للمخاطب: قلتُ للرجل.',
          zh: 'قال 用 لـ 引出听话人：قلتُ للرجل。',
        },
        whyWrong: {
          a: { en: '"إلى" also means "to" but قال is not used with إلى in this sense.', ar: '"إلى" لا تصلح مع "قال".', zh: 'قال 不与 إلى 搭配。' },
          b: { en: '"في" marks location.', ar: '"في" للظرفية.', zh: 'في 表示地点。' },
          c: { en: '"من" marks origin.', ar: '"من" للابتداء.', zh: 'من 表示起点。' },
        },
      },
      {
        id: 'hj-08',
        prompt: 'يحتفل المسلمون كل عام ____ شهر رمضان ويستعدّون ____ ـه جيدًا.',
        options: [
          { id: 'a', text: 'لـ، بـ' },
          { id: 'b', text: 'في، في' },
          { id: 'c', text: 'لـ، لـ' },
          { id: 'd', text: 'بـ، لـ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'يحتفل بـ is one collocation, but the sentence uses احتفل with في for the time period: يحتفل في شهر رمضان. And استعدّ لـ is the fixed collocation: يستعدّ له.',
          ar: '"في" للظرف الزمني مع "يحتفل"، و"لـ" مع "يستعدّ": يستعدّ له.',
          zh: 'يحتفل 用 في 引出时间；يستعدّ 用 لـ 引出对象。',
        },
        whyWrong: {
          a: { en: 'First blank: لـ would give "for Ramadan", but the celebration is during it.', ar: '"لـ" في الفراغ الأول تفيد التعليل، لا الزمن.', zh: '第一空用 لـ 表原因，而非时间。' },
          c: { en: 'Second blank: استعدّ لـ is correct, but first blank لـ is wrong.', ar: 'الفراغ الأول لا يصحّ فيه "لـ".', zh: '第一空不能用 لـ。' },
          d: { en: '"بـ" does not fit the time expression.', ar: '"بـ" لا تصلح مع الظرف الزمني.', zh: 'بـ 不适用于时间状语。' },
        },
      },
      {
        id: 'hj-09',
        prompt: '____ يمارس هذا الشاب الرياضة، لذلك هو مريض دائمًا.',
        options: [
          { id: 'a', text: 'لم' },
          { id: 'b', text: 'لن' },
          { id: 'c', text: 'لا' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لا النافية negates the present tense without affecting the mood. Matches the present-consequence "لذلك".',
          ar: '"لا" النافية تنفي المضارع دون تغييره، وتناسب السياق الحاضر.',
          zh: 'لا 否定现在时而不改变动词格，与现在时语境一致。',
        },
        whyWrong: {
          a: { en: 'لم negates past and makes the verb jussive: لم يمارسْ.', ar: '"لم" تجزم وتنفي الماضي.', zh: 'لم 否定过去并加静符。' },
          b: { en: 'لن negates future with naṣb.', ar: '"لن" تنفي المستقبل وتنصب.', zh: 'لن 否定将来并带宾格。' },
          d: { en: 'ما negates past or nominal sentences.', ar: '"ما" تنفي الماضي أو الجملة الاسمية.', zh: 'ما 否定过去或名词句。' },
        },
      },
      {
        id: 'hj-10',
        prompt: 'لا أحبّ البيتزا ____ أحبّ الشاورما السورية.',
        options: [
          { id: 'a', text: 'ثم' },
          { id: 'b', text: 'فـ' },
          { id: 'c', text: 'لكن' },
          { id: 'd', text: 'أو' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لكن marks contrast: "I do not like pizza, but I like Syrian shawarma".',
          ar: '"لكن" للاستدراك، وهو المعنى المطلوب.',
          zh: 'لكن 表转折：“我不喜欢披萨，但我喜欢叙利亚沙威玛”。',
        },
        whyWrong: {
          a: { en: 'ثم marks sequence, not contrast.', ar: '"ثم" للترتيب، لا للاستدراك.', zh: 'ثم 表顺序，不表转折。' },
          b: { en: 'فـ marks immediate sequence or reason.', ar: '"فـ" للتعقيب أو السبب.', zh: 'فـ 表紧接着或因果。' },
          d: { en: 'أو marks choice.', ar: '"أو" للتخيير.', zh: 'أو 表选择。' },
        },
      },
      {
        id: 'hj-11',
        prompt: 'لديهم ____ لكل أسبوع ويعرفون ماذا يجب أن يفعلوا كل يوم.',
        options: [
          { id: 'a', text: 'خطة' },
          { id: 'b', text: 'خطأ' },
          { id: 'c', text: 'الخطة' },
          { id: 'd', text: 'الخطط' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Indefinite noun after possessive لديهم (which contains a pronoun): خطة. Definite would clash with the possessive.',
          ar: '"خطة" نكرة منصوبة لأن "لديهم" بمعنى "عندهم"، والإضافة بالضمير تمنع التعريف بـ"ال".',
          zh: 'لديهم 后接不定名词 خطة；因已含代词所有格，不能再加 ال。',
        },
        whyWrong: {
          b: { en: 'خطأ means "mistake".', ar: '"خطأ" بمعنى الغلط.', zh: 'خطأ 意为“错误”。' },
          c: { en: 'Definite would be redundant after a possessive.', ar: 'التعريف بـ"ال" بعد الضمير لا يصح.', zh: '代词所有格后再加 ال 不通。' },
          d: { en: 'Plural definite does not fit the singular sense.', ar: '"الخطط" جمع معرفة، لا يلائم المعنى.', zh: 'الخطط 是确指复数，与语境不符。' },
        },
      },
      {
        id: 'hj-12',
        prompt: 'سيستمر العمل في هذا المكان مدة يومين و____ يستمر أكثر من ذلك.',
        options: [
          { id: 'a', text: 'لا' },
          { id: 'b', text: 'لن' },
          { id: 'c', text: 'لم' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The continuation is future: "it will not continue beyond that". لن negates the future and assigns naṣb: لن يستمرَّ.',
          ar: '"لن" تنفي المستقبل، والسياق مستقبلي: لن يستمرّ.',
          zh: '语境是将来，لن 否定将来并带宾格。',
        },
        whyWrong: {
          a: { en: 'لا negates the present.', ar: '"لا" تنفي المضارع الحاضر.', zh: 'لا 否定现在。' },
          c: { en: 'لم negates the past and makes jussive.', ar: '"لم" تنفي الماضي وتجزم.', zh: 'لم 否定过去并加静符。' },
          d: { en: 'ما negates past or nominal sentences.', ar: '"ما" تنفي الماضي أو الجملة الاسمية.', zh: 'ما 否定过去或名词句。' },
        },
      },
      {
        id: 'hj-13',
        prompt: 'الرجال ____ بتربية أولادهم وتعليمهم استعدادًا للمستقبل.',
        options: [
          { id: 'a', text: 'يهتمون' },
          { id: 'b', text: 'يهتموا' },
          { id: 'c', text: 'يهتم' },
          { id: 'd', text: 'يهتمونَ بـ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'اهتمّ بـ is the fixed collocation. الرجال is masculine plural, so the verb is يهتمّونَ — but the بـ already appears later in the sentence (بتربية), so the blank only needs the verb: يهتمون.',
          ar: '"الرجال" جمع مذكر، والفعل "يهتمّ" مرفوع بالواو: يهتمون. والباء موجودة في "بتربية".',
          zh: 'الرجال 是阳性复数，动词用主格 يهتمون；后面的 بـ 已在 بتربية 中。',
        },
        whyWrong: {
          b: { en: 'يهتموا is manṣūb — no naṣb particle here.', ar: '"يهتموا" منصوب بلا ناصب.', zh: 'يهتموا 是宾格，但此处无宾格虚词。' },
          c: { en: 'يهتم is singular — wrong number agreement.', ar: '"يهتم" مفرد، لا يوافق "الرجال".', zh: 'يهتم 是单数，与 الرجال 不一致。' },
          d: { en: 'يهتمون بـ would duplicate the بـ already present.', ar: '"يهتمون بـ" يكرّر الباء الموجودة.', zh: 'يهتمون بـ 会重复句中已有的 بـ。' },
        },
      },
      {
        id: 'hj-14',
        prompt: '____ البنتان هما اللتان ____ المفردات كلها بدون خطأ.',
        options: [
          { id: 'a', text: 'هذان / كتبت' },
          { id: 'b', text: 'هاتين / كتبتا' },
          { id: 'c', text: 'هاتان / كتبتا' },
          { id: 'd', text: 'هذين / كتبت' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'البنتان is feminine dual → هاتان (marfūʿ mubtadaʾ). The verb agreeing with dual feminine is كتبتا (alif for the dual).',
          ar: '"البنتان" مثنى مؤنث: اسم الإشارة "هاتان" (مبتدأ)، والفعل "كتبتا" (ألف الاثنين).',
          zh: 'البنتان 是阴性双数，指示代词用主格 هاتان，动词用双数形式 كتبتا。',
        },
        whyWrong: {
          a: { en: 'هذان is masculine dual; كتبت is singular feminine.', ar: '"هذان" للمذكر، و"كتبت" مفردة.', zh: 'هذان 是阳性双数，كتبت 是阴性单数。' },
          b: { en: 'هاتين is majrūr or manṣūb dual; here the mubtadaʾ needs rafʿ.', ar: '"هاتين" مجرورة أو منصوبة، والمبتدأ مرفوع.', zh: 'هاتين 是属格或宾格，此处主语需主格。' },
          d: { en: 'هذين is masculine dual majrūr/manṣūb; كتبت is singular.', ar: '"هذين" للمذكر المجرور/المنصوب.', zh: 'هذين 是阳性双数属格/宾格，动词也不对。' },
        },
      },
      {
        id: 'hj-15',
        prompt: 'لا ____ الطلاب اللغةَ كلَّ المواد، بل ما يحبونها فقط.',
        options: [
          { id: 'a', text: 'يحبون' },
          { id: 'b', text: 'يحبوا' },
          { id: 'c', text: 'يحب' },
          { id: 'd', text: 'يحبونَ اللغةَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لا النافية does not change the verb\'s mood; الطلاب is masculine plural, so the verb stays marfūʿ: يحبون.',
          ar: '"لا" النافية لا تغيّر إعراب الفعل، و"الطلاب" جمع مذكر فيكون الفعل مرفوعًا: يحبون.',
          zh: 'لا النافية 不改变动词格，الطلاب 是阳性复数，动词用主格 يحبون。',
        },
        whyWrong: {
          b: { en: 'يحبوا is manṣūb — no naṣb particle here.', ar: '"يحبوا" منصوب بلا ناصب.', zh: 'يحبوا 是宾格，此处无宾格虚词。' },
          c: { en: 'يحب is singular, wrong agreement.', ar: '"يحب" مفرد، لا يوافق الجمع.', zh: 'يحب 是单数，与复数不符。' },
          d: { en: 'Duplicates اللغة which is already later in the sentence.', ar: '"اللغة" مذكورة بعده، فلا نكرّرها.', zh: 'اللغة 已在后面出现，不需重复。' },
        },
      },
      {
        id: 'hj-16',
        prompt: 'الإنترنت يساعد ____ في دراستهم.',
        options: [
          { id: 'a', text: 'الطلبةَ' },
          { id: 'b', text: 'الطلبةُ' },
          { id: 'c', text: 'الطلبةِ' },
          { id: 'd', text: 'طُلَّابًا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'ساعد takes a direct object in manṣūb: ساعد الطلبةَ. The plural is الطلبة.',
          ar: '"ساعد" ينصب المفعول به: الطلبةَ منصوب بالفتحة.',
          zh: 'ساعد 后直接宾语用宾格：الطلبةَ。',
        },
        whyWrong: {
          b: { en: 'Marfūʿ is for the subject, not the object.', ar: 'الرفع للفاعل لا للمفعول.', zh: '主格用于主语，宾语不用主格。' },
          c: { en: 'Majrūr is for the genitive after prepositions.', ar: 'الجرّ بعد حرف الجر.', zh: '属格用于介词后。' },
          d: { en: 'طُلَّابًا is a different plural form; the article is missing.', ar: '"طُلَّابًا" بلا "ال" وهو جمع آخر.', zh: 'طُلَّابًا 是另一种复数形式，且缺少冠词。' },
        },
      },
      {
        id: 'hj-17',
        prompt: 'وصل الركابُ إلى القطار ____ لأنهم استيقظوا متأخرين.',
        options: [
          { id: 'a', text: 'مسرعون' },
          { id: 'b', text: 'أسرعوا' },
          { id: 'c', text: 'مسرعين' },
          { id: 'd', text: 'سارعين' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'Ḥāl (circumstantial accusative) is manṣūb: مسرعين describes the state of الركاب when they arrived.',
          ar: 'الحال منصوب دائمًا، والصواب "مسرعين".',
          zh: '状语必须用宾格，故选 مسرعين。',
        },
        whyWrong: {
          a: { en: 'مسرعون is marfūʿ — wrong for ḥāl.', ar: '"مسرعون" مرفوع، والحال منصوب.', zh: 'مسرعون 是主格，状语必须宾格。' },
          b: { en: 'أسرعوا is a past verb, not a ḥāl.', ar: '"أسرعوا" فعل ماضٍ، لا حال.', zh: 'أسرعوا 是动词，不是状语。' },
          d: { en: 'سارعين means "walking fast", but مسرعين fits better.', ar: '"سارعين" بمعنى الماشي بسرعة، والأليق "مسرعين".', zh: 'سارعين 强调走，语义不如 مسرعين 贴切。' },
        },
      },
      {
        id: 'hj-18',
        prompt: 'من أسباب سعادتي ____ على أعلى الشهادات العلمية.',
        options: [
          { id: 'a', text: 'حصولي' },
          { id: 'b', text: 'حصلت' },
          { id: 'c', text: 'حاصل' },
          { id: 'd', text: 'حصل' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After من أسباب (a nominal phrase), the second term is majrūr. حصول is a maṣdar and it attaches to ي (my): حصولي.',
          ar: '"من أسباب" يقتضي اسمًا مجرورًا، والمصدر "حصول" مضاف إلى ياء المتكلم: حصولي.',
          zh: 'من أسباب 后接属格名词；حصول 是动词名词，加 ي 变成 حصولي。',
        },
        whyWrong: {
          b: { en: 'حصلت is a verb, not a noun.', ar: '"حصلت" فعل، لا اسم.', zh: 'حصلت 是动词。' },
          c: { en: 'حاصل is a participle; the maṣdar fits better after أسباب.', ar: '"حاصل" اسم فاعل، والأليق "حصول".', zh: 'حاصل 是主动分词，此处宜用动词名词。' },
          d: { en: 'حصل is past tense; would need أنْ to be a complement.', ar: '"حصل" ماضٍ، يحتاج "أنْ" ليكون مصدرًا.', zh: 'حصل 是过去式，需 أنْ 才能作名词化补语。' },
        },
      },
      {
        id: 'hj-19',
        prompt: 'حصل هذا العالم على جائزة نوبل ____ أعماله العلمية.',
        options: [
          { id: 'a', text: 'لأنّ' },
          { id: 'b', text: 'بسبب' },
          { id: 'c', text: 'كي' },
          { id: 'd', text: 'حتى' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'بسبب + noun (or noun phrase) = "because of". The phrase أعماله العلمية is a noun, so بسبب fits.',
          ar: '"بسبب" يليها اسم، وهو المناسب: بسبب أعماله.',
          zh: 'بسبب 后接名词：بسبب أعماله。',
        },
        whyWrong: {
          a: { en: 'لأنّ must be followed by a full nominal sentence (اسم + خبر).', ar: '"لأنّ" يليها جملة اسمية كاملة.', zh: 'لأنّ 后接完整名词句。' },
          c: { en: 'كي introduces a purpose clause with a verb.', ar: '"كي" تنصب الفعل المضارع.', zh: 'كي 引出目的从句，后接动词。' },
          d: { en: 'حتى introduces a purpose or extent clause.', ar: '"حتى" للغاية أو التعليل بفعل.', zh: 'حتى 引出目的或程度从句。' },
        },
      },
      {
        id: 'hj-20',
        prompt: 'لقد ____ الرئيسان الصيني والمصري صباح هذا اليوم لمناقشة المستقبل التجاري.',
        options: [
          { id: 'a', text: 'لقى' },
          { id: 'b', text: 'ألقى' },
          { id: 'c', text: 'التقى' },
          { id: 'd', text: 'التقيا' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'التقى is a defective verb with dual subject: الرئيسان → التقيا (alif for the dual).',
          ar: '"التقى" فعل ناقص، والفاعل مثنى: "الرئيسان" → التقيا.',
          zh: 'التقى 是缺陷动词，主语是双数，动词用 التقيا。',
        },
        whyWrong: {
          a: { en: 'لقى alone is not the standard verb for "met".', ar: '"لقى" وحدها ليست الصيغة الفصيحة للاجتماع.', zh: 'لقى 单用不是标准“会面”动词。' },
          b: { en: 'ألقى means "delivered (a speech)".', ar: '"ألقى" بمعنى طرح.', zh: 'ألقى 意为“发表（演说）”。' },
          c: { en: 'التقى is singular; needs dual agreement.', ar: '"التقى" مفرد، والصواب "التقيا".', zh: 'التقى 是单数，需用双数 التقيا。' },
        },
      },
      {
        id: 'hj-21',
        prompt: 'أعطيتُ الفقراء ____ الشتاء لأن الجو بارد وليس معهم نقود.',
        options: [
          { id: 'a', text: 'الملابسُ' },
          { id: 'b', text: 'ملابسُ' },
          { id: 'c', text: 'ملابسًا' },
          { id: 'd', text: 'ملابسٍ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'أعطى takes two objects: الفقراء (first) and ملابس (second, manṣūb): ملابسًا.',
          ar: '"أعطى" تنصب مفعولين: "الفقراء" و"ملابسًا".',
          zh: 'أعطى 后接双宾语，第二宾语用宾格 ملابسًا。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ does not fit the object position.', ar: 'الرفع لا يصلح للمفعول.', zh: '主格不能作宾语。' },
          b: { en: 'Without tanwīn and without the article, it is not a valid indefinite accusative.', ar: 'بدون تنوين وبدون "ال" لا يستقيم.', zh: '无鼻音也无冠词，不成立。' },
          d: { en: 'Majrūr needs a preposition.', ar: 'الجرّ يحتاج حرف جر.', zh: '属格需介词引出。' },
        },
      },
      {
        id: 'hj-22',
        prompt: 'شكرتُ الموظفَ على مساعدته ____ كبيرًا.',
        options: [
          { id: 'a', text: 'الشكرُ' },
          { id: 'b', text: 'يشكرُ' },
          { id: 'c', text: 'شكرًا' },
          { id: 'd', text: 'شاكرًا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'شكرًا functions as a maṣdar in the accusative, emphasizing the thanks: "thanking him greatly".',
          ar: '"شكرًا" مصدر منصوب يفيد التوكيد: شكرًا كبيرًا.',
          zh: 'شكرًا 是宾格动词名词，加强感谢语气。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ as mubtadaʾ would need a predicate.', ar: '"الشكر" مرفوع ولا يتم به المعنى.', zh: '主格 الشكر 缺谓语。' },
          b: { en: 'A verb does not fit after على مساعدته.', ar: 'الفعل لا يستقيم في هذا الموضع.', zh: '此处不能放动词。' },
          d: { en: 'شاكرًا is ḥāl for the speaker, but the sentence thanks a person.', ar: '"شاكرًا" حال للمتكلم، والسياق للشكر على المساعدة.', zh: 'شاكرًا 是说话者的状语，与句意不合。' },
        },
      },
      {
        id: 'hj-23',
        prompt: 'تقع مدينة القاهرة في ____ .',
        options: [
          { id: 'a', text: 'مصرَ' },
          { id: 'b', text: 'مصرِ' },
          { id: 'c', text: 'مصرُ' },
          { id: 'd', text: 'مصرًا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'مصر is a diptote (feminine proper noun of non-Arabic origin); after في it takes fatḥah: في مصرَ.',
          ar: '"مصر" ممنوعة من الصرف، فتُجرّ بالفتحة: في مصرَ.',
          zh: 'مصر 是禁止变尾名词，在 في 后用开口符。',
        },
        whyWrong: {
          b: { en: 'Majrūr with kasrah is for triptotes, not diptotes.', ar: 'الجرّ بالكسرة للمنصرف، لا للممنوع من الصرف.', zh: '齐齿符属于变尾名词，不用于禁止变尾名词。' },
          c: { en: 'Marfūʿ is for the subject position.', ar: 'الرفع للمبتدأ أو الفاعل.', zh: '主格用于主语。' },
          d: { en: 'Manṣūb with alif is for accusative positions.', ar: 'النصب للمفعول أو الحال.', zh: '宾格用于宾语或状语。' },
        },
      },
      {
        id: 'hj-24',
        prompt: 'أحبّ أن أزور جدتي كل أسبوع في بيتها، و____ معها كثيرًا عمّا أفعله طوال الأسبوع.',
        options: [
          { id: 'a', text: 'تتكلّمَ' },
          { id: 'b', text: 'أتكلّمُ' },
          { id: 'c', text: 'نتكلّمْ' },
          { id: 'd', text: 'تكلّمتُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'The verb is coordinated with أزور (in the أنْ clause): أن أزور … و[أن] أتكلّم. In rafʿ form: أتكلّمُ.',
          ar: 'الفعل معطوف على "أزور" داخل "أنْ"؛ والتقدير: وأن أتكلّم، فهو مرفوع.',
          zh: '动词与 أزور 并列，同属 أنْ 从句，用主格 أتكلّمُ。',
        },
        whyWrong: {
          a: { en: 'تتكلّم is 3rd person feminine — wrong subject.', ar: '"تتكلّم" للغائبة، لا للمتكلم.', zh: 'تتكلّم 是第三人称阴性。' },
          c: { en: 'نتكلّم is 1st person plural — wrong subject.', ar: '"نتكلّم" للجمع.', zh: 'نتكلّم 是复数第一人称。' },
          d: { en: 'تكلّمتُ is past tense.', ar: '"تكلّمتُ" ماضٍ.', zh: 'تكلّمتُ 是过去式。' },
        },
      },
      {
        id: 'hj-25',
        prompt: 'وصل الفريقُ إلى قمة ____ فخورين بإنجازهم.',
        options: [
          { id: 'a', text: 'جبلًا' },
          { id: 'b', text: 'جبل' },
          { id: 'c', text: 'الجبل' },
          { id: 'd', text: 'الجبلِ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'قمة is in iḍāfah with جبل: قمة جبل. The second term of the iḍāfah is majrūr — but جبل is a diptote? No, it is a triptote, so it should be مجرور with kasrah: قمة جبلٍ.',
          ar: '"قمة" مضافة إلى "جبل"، والمضاف إليه مجرور: قمة جبلٍ.',
          zh: 'قمة 与 جبل 构成正偏组合，后者用属格。',
        },
        whyWrong: {
          a: { en: 'Manṣūb does not fit the iḍāfah second term.', ar: 'النصب لا يصلح للمضاف إليه.', zh: '宾格不用于正偏组合第二项。' },
          c: { en: 'Definite would require a specific mountain.', ar: '"ال" تجعله معرفة، والسياق لا يقتضي.', zh: '加冠词表示确指，不合语境。' },
          d: { en: 'Majrūr with kasrah — but the option lacks tanwīn and reads as definite.', ar: '"الجبلِ" بالجرّ لكنه معرفة.', zh: 'الجبلِ 是确指属格，不匹配。' },
        },
      },
    ],
  },
    // ============================================================
  // 3. إنّ وأخواتها — Inna and its sisters
  // ============================================================
  {
    title: {
      en: 'Inna and its sisters',
      ar: 'إنّ وأخواتها',
      zh: 'إن及其姊妹词',
    },
    questions: [
      {
        id: 'in-01',
        prompt: 'قالت المعلمة ____ نا: يجب أن تكتبوا الواجبات وتستعدّوا قبل الصف.',
        options: [
          { id: 'a', text: 'على' },
          { id: 'b', text: 'في' },
          { id: 'c', text: 'لـَ' },
          { id: 'd', text: 'كـَ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'قال لـ = "said to". The verb قال takes the preposition لام before the addressee.',
          ar: 'الفعل "قال" يتعدّى باللام: قال لنا.',
          zh: 'قال 用 لـ 引出听话对象：قال لنا。',
        },
        whyWrong: {
          a: { en: '"على" means "on" and does not fit here.', ar: '"على" للاستعلاء، لا تصلح.', zh: 'على 表示“在……上”，此处不适用。' },
          b: { en: '"في" marks location.', ar: '"في" للظرفية.', zh: 'في 表示地点。' },
          d: { en: '"كـ" marks comparison.', ar: '"كـ" للتشبيه.', zh: 'كـ 表示比喻。' },
        },
      },
      {
        id: 'in-02',
        prompt: 'لا أريد ____ أترك هذه الجامعة، فأنا تعلّمت فيها الكثير.',
        options: [
          { id: 'a', text: 'إنْ' },
          { id: 'b', text: 'أنْ' },
          { id: 'c', text: 'إنّ' },
          { id: 'd', text: 'أنّ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After verbs of will/wish, the complement is introduced by أنْ + manṣūb verb: لا أريد أن أتركَ.',
          ar: 'بعد أفعال الإرادة تأتي "أنْ" المصدرية الناصبة: لا أريد أن أتركَ.',
          zh: '意愿动词后用 أنْ + 动词宾格形式。',
        },
        whyWrong: {
          a: { en: 'إنْ is a conditional particle, not a complementizer.', ar: '"إنْ" شرطية، لا مصدرية.', zh: 'إنْ 是条件虚词，不引导补语。' },
          c: { en: 'إنّ introduces a nominal sentence, not a verbal complement.', ar: '"إنّ" لا تقع بعد "أريد".', zh: 'إنّ 不用于意愿动词后。' },
          d: { en: 'أنّ must be followed by a noun, not a verb.', ar: '"أنّ" يليها اسم لا فعل.', zh: 'أنّ 后接名词而非动词。' },
        },
      },
      {
        id: 'in-03',
        prompt: 'أحمد شابٌ نشيطٌ ____ أنه سيحقق حلمه.',
        options: [
          { id: 'a', text: 'أنْ' },
          { id: 'b', text: 'أنّ' },
          { id: 'c', text: 'إنْ' },
          { id: 'd', text: 'إنّ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After a nominal sentence, أنّ introduces a substantival clause: وأنّه سيحقق is the complement.',
          ar: '"أنّ" المصدرية تأتي بعد الجملة الاسمية لتعطى معنى المصدر.',
          zh: 'أنّ 在名词句后引导名词化从句。',
        },
        whyWrong: {
          a: { en: 'أنْ must be followed by a verb, not a noun + predicate.', ar: '"أنْ" يليها فعل لا اسم وخبر.', zh: 'أنْ 后接动词，非名词短语。' },
          c: { en: 'إنْ is conditional.', ar: '"إنْ" شرطية.', zh: 'إنْ 是条件虚词。' },
          d: { en: 'إنّ (with kasrah) is used after قال / in emphasis, not here.', ar: '"إنّ" بالكسر تكون في مقام التوكيد أو بعد "قال".', zh: 'إنّ（带齐齿符）用于强调或 قال 之后。' },
        },
      },
      {
        id: 'in-04',
        prompt: '____ الجوَّ باردًا، فلبسنا معاطف ثقيلة.',
        options: [
          { id: 'a', text: 'كانَ' },
          { id: 'b', text: 'لعلَّ' },
          { id: 'c', text: 'إنَّ' },
          { id: 'd', text: 'ليتَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'كان makes its subject marfūʿ and its predicate manṣūb: كان الجوُّ باردًا.',
          ar: '"كان" ترفع الاسم وتنصب الخبر: كان الجوُّ باردًا.',
          zh: 'كان 使主语变主格，谓语变宾格。',
        },
        whyWrong: {
          b: { en: 'لعلّ gives the predicate manṣūb, but the meaning "perhaps" does not fit — the sentence reports a fact.', ar: '"لعلّ" للترجّي، والمعنى هنا تقريري.', zh: 'لعلّ 表“也许”，句意不符。' },
          c: { en: 'إنّ would give manṣūb, but the meaning "indeed" changes the register.', ar: '"إنّ" للتوكيد، لا تصلح لسياق السرد.', zh: 'إنّ 表强调，不合语境。' },
          d: { en: 'ليتَ means "I wish" — wrong meaning.', ar: '"ليتَ" للتمنّي.', zh: 'ليتَ 表愿望。' },
        },
      },
      {
        id: 'in-05',
        prompt: 'قال المديرُ: ____ العملَ متعبًا، لكنني أحبه.',
        options: [
          { id: 'a', text: 'أنَّ' },
          { id: 'b', text: 'إنَّ' },
          { id: 'c', text: 'أنْ' },
          { id: 'd', text: 'إنْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After قال, the complement clause normally takes أنّ (with fatḥah) if the قال means "stated that": قال إنّ is possible in direct speech, but the standard for reported speech is أنّ.',
          ar: 'بعد "قال" في الكلام المنقول يأتي "أنّ" بالفتح: قال المدير أنّ العمل متعب.',
          zh: 'قال 转述内容时用 أنّ（开口符）。',
        },
        whyWrong: {
          b: { en: 'إنّ (kasrah) fits direct speech (قال: إنّ...), but the sentence uses reported style.', ar: '"إنّ" بالكسر للمقول المباشر.', zh: 'إنّ 用于直接引语。' },
          c: { en: 'أنْ must be followed by a verb.', ar: '"أنْ" يليها فعل.', zh: 'أنْ 后接动词。' },
          d: { en: 'إنْ is conditional.', ar: '"إنْ" شرطية.', zh: 'إنْ 是条件虚词。' },
        },
      },
      {
        id: 'in-06',
        prompt: '____ الطالبَ في الصف مجتهدًا.',
        options: [
          { id: 'a', text: 'علِمَ' },
          { id: 'b', text: 'علَّمَ' },
          { id: 'c', text: 'تعلَّمَ' },
          { id: 'd', text: 'أعلمَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'عَلِمَ is a verb of the heart (أفعال القلوب), taking two objects: الطالبَ (first) and مجتهدًا (second).',
          ar: '"عَلِمَ" من أفعال القلوب، تنصب مفعولين: الطالبَ، مجتهدًا.',
          zh: 'علِمَ 是心灵动词，后接两个宾语。',
        },
        whyWrong: {
          b: { en: 'علَّمَ means "taught" (doubled verb, different meaning).', ar: '"علَّمَ" بمعنى درّس.', zh: 'علَّمَ 意为“教”。' },
          c: { en: 'تعلَّمَ means "learned", not "knew".', ar: '"تعلَّمَ" بمعنى تلقّى العلم.', zh: 'تعلَّمَ 意为“学习”。' },
          d: { en: 'أعلمَ means "informed"; different verb.', ar: '"أعلمَ" بمعنى أخبر.', zh: 'أعلمَ 意为“告知”。' },
        },
      },
      {
        id: 'in-07',
        prompt: '____ أنّك نجحت في الاختبار!',
        options: [
          { id: 'a', text: 'علمتُ' },
          { id: 'b', text: 'سمعتُ' },
          { id: 'c', text: 'فرحتُ' },
          { id: 'd', text: 'قلتُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After علمتُ, أنّ introduces the substantival complement: علمتُ أنّك نجحت = "I knew that you succeeded".',
          ar: '"علمتُ" من أفعال القلوب، وبعدها "أنّ" مع معموليها.',
          zh: 'علمتُ 后接 أنّ 从句作宾语。',
        },
        whyWrong: {
          b: { en: 'سمعتُ takes أنْ (verbal) more often, but سماع + أنّ is also possible — the exclamation marks make علمتُ fit better.', ar: '"سمعتُ" أقل ملاءمة للسياق التعجبي.', zh: 'سمعتُ 与感叹语气不如 علمتُ 贴切。' },
          c: { en: 'فرحتُ requires بـ or من, not أنّ directly.', ar: '"فرحتُ" تحتاج "بـ" أو "من".', zh: 'فرحتُ 需接 بـ 或 من。' },
          d: { en: 'قلتُ + أنّ is possible but less natural here.', ar: '"قلتُ" أقل ملاءمة.', zh: 'قلتُ 此处不够自然。' },
        },
      },
      {
        id: 'in-08',
        prompt: 'قال الأبُ لابنه: يا بُنيّ، ____ الحياةَ مليئةٌ بالصعاب، فلا تخف.',
        options: [
          { id: 'a', text: 'إنّ' },
          { id: 'b', text: 'أنّ' },
          { id: 'c', text: 'أنْ' },
          { id: 'd', text: 'إنْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Direct speech after a colon takes إنّ for emphasis: "Life is full of hardship, so do not fear."',
          ar: 'المقول المباشر بعد النقطتين يأتي بـ"إنّ" للتوكيد.',
          zh: '冒号后的直接引语用 إنّ 表强调。',
        },
        whyWrong: {
          b: { en: 'أنّ is for reported speech, not direct address.', ar: '"أنّ" للكلام المنقول، لا للمباشر.', zh: 'أنّ 用于间接引语。' },
          c: { en: 'أنْ must be followed by a verb.', ar: '"أنْ" يليها فعل.', zh: 'أنْ 后接动词。' },
          d: { en: 'إنْ is conditional.', ar: '"إنْ" شرطية.', zh: 'إنْ 是条件虚词。' },
        },
      },
      {
        id: 'in-09',
        prompt: '____ الطلابَ جميعًا ناجحين في الامتحان!',
        options: [
          { id: 'a', text: 'ليتَ' },
          { id: 'b', text: 'لعلَّ' },
          { id: 'c', text: 'إنَّ' },
          { id: 'd', text: 'كأنَّ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'The exclamation mark signals an emphatic statement of fact: إنّ is the emphatic particle.',
          ar: '"إنّ" للتوكيد، وتناسب سياق التقرير المؤكَّد.',
          zh: '感叹号表强调陈述，用 إنّ。',
        },
        whyWrong: {
          a: { en: 'ليتَ expresses a wish, not a fact.', ar: '"ليتَ" للتمنّي.', zh: 'ليتَ 表愿望。' },
          b: { en: 'لعلّ expresses hope or probability.', ar: '"لعلّ" للترجّي أو الاحتمال.', zh: 'لعلّ 表希望或推测。' },
          d: { en: 'كأنّ expresses similarity, not assertion.', ar: '"كأنّ" للتشبيه.', zh: 'كأنّ 表比拟。' },
        },
      },
      {
        id: 'in-10',
        prompt: 'قالت الفتاة: ____ أنني أحب القراءة كثيرًا.',
        options: [
          { id: 'a', text: 'أعترفُ' },
          { id: 'b', text: 'أعترفَ' },
          { id: 'c', text: 'اعترفتُ' },
          { id: 'd', text: 'أعترفْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Present-tense first person indicative after قالت: أعترفُ (marfūʿ).',
          ar: 'المضارع المرفوع مع المتكلم: أعترفُ.',
          zh: '第一人称现在时用主格 أعترفُ。',
        },
        whyWrong: {
          b: { en: 'Manṣūb form needs a naṣb particle.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需宾格虚词。' },
          c: { en: 'Past tense would change the register.', ar: 'الماضي يخالف السياق الحاضر.', zh: '过去式不合语境。' },
          d: { en: 'Jussive form needs a jussive particle.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
        },
      },
    ],
  },
    // ============================================================
  // 4. الأسماء الموصولة — Relative pronouns
  // ============================================================
  {
    title: {
      en: 'Relative pronouns',
      ar: 'الأسماء الموصولة',
      zh: '关系代词',
    },
    questions: [
      {
        id: 'rel-01',
        prompt: 'هؤلاء هم الشباب ____ اشتركوا في المسابقة الدولية وفازوا بها.',
        options: [
          { id: 'a', text: 'ما' },
          { id: 'b', text: 'التي' },
          { id: 'c', text: 'الذين' },
          { id: 'd', text: 'اللائي' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: '"الشباب" is masculine plural, so the relative pronoun is الذين.',
          ar: '"الشباب" جمع مذكر، فالموصول "الذين".',
          zh: 'الشباب 是阳性复数，关系代词用 الذين。',
        },
        whyWrong: {
          a: { en: '"ما" is for non-human / indefinite referents.', ar: '"ما" لغير العاقل.', zh: 'ما 用于非人类或不确指。' },
          b: { en: '"التي" is feminine singular.', ar: '"التي" للمفردة المؤنثة.', zh: 'التي 是阴性单数。' },
          d: { en: '"اللائي" is feminine plural.', ar: '"اللائي" لجمع المؤنث.', zh: 'اللائي 是阴性复数。' },
        },
      },
      {
        id: 'rel-02',
        prompt: '____ يعملْ خيرًا يجدْ جزاءه.',
        options: [
          { id: 'a', text: 'الذي' },
          { id: 'b', text: 'الذين' },
          { id: 'c', text: 'مَن' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'مَن is the general relative pronoun for "whoever", used with a singular verb even when the meaning is plural.',
          ar: '"مَن" اسم موصول عام، وتأتي مع فعل مفرد وإن كان المعنى جمعًا.',
          zh: 'مَن 表示“无论谁”，后接单数动词。',
        },
        whyWrong: {
          a: { en: '"الذي" refers to a specific known person, not "whoever".', ar: '"الذي" لمعيَّن، لا للعام.', zh: 'الذي 指特定的人。' },
          b: { en: '"الذين" is masculine plural definite, not general.', ar: '"الذين" للجمع المعيَّن.', zh: 'الذين 是确指阳性复数。' },
          d: { en: '"ما" refers to things, not people.', ar: '"ما" لغير العاقل.', zh: 'ما 指物，不指人。' },
        },
      },
      {
        id: 'rel-03',
        prompt: 'هذه هي الميدالية الذهبية ____ ستحصل عليها الفائزة ____ في المسابقة.',
        options: [
          { id: 'a', text: 'أول' },
          { id: 'b', text: 'أولى' },
          { id: 'c', text: 'الأول' },
          { id: 'd', text: 'الأولى' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'الفائزة is feminine singular → الأولى (feminine of الأول, "the first").',
          ar: '"الفائزة" مؤنثة مفردة، فالصفة "الأولى".',
          zh: 'الفائزة 是阴性单数，用 الأولى。',
        },
        whyWrong: {
          a: { en: 'أول is masculine and indefinite.', ar: '"أول" مذكر نكرة.', zh: 'أول 是阳性不定。' },
          b: { en: 'أولى is feminine but indefinite; here the adjective is definite.', ar: '"أولى" مؤنثة نكرة، والنعت هنا معرفة.', zh: 'أولى 是阴性不定，此处形容词需确指。' },
          c: { en: 'الأول is masculine definite.', ar: '"الأول" مذكر معرفة.', zh: 'الأول 是阳性确指。' },
        },
      },
      {
        id: 'rel-04',
        prompt: 'أعرف الشخصَ ____ زارنا أمس.',
        options: [
          { id: 'a', text: 'التي' },
          { id: 'b', text: 'الذي' },
          { id: 'c', text: 'الذين' },
          { id: 'd', text: 'اللائي' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'الشخص is masculine singular → الذي.',
          ar: '"الشخص" مذكر مفرد، فالموصول "الذي".',
          zh: 'الشخص 是阳性单数，用 الذي。',
        },
        whyWrong: {
          a: { en: '"التي" is feminine.', ar: '"التي" للمؤنث.', zh: 'التي 是阴性。' },
          c: { en: '"الذين" is masculine plural.', ar: '"الذين" للجمع.', zh: 'الذين 是复数。' },
          d: { en: '"اللائي" is feminine plural.', ar: '"اللائي" لجمع المؤنث.', zh: 'اللائي 是阴性复数。' },
        },
      },
      {
        id: 'rel-05',
        prompt: 'ما جاءني اليوم في المحاضرة ____ خالدٌ.',
        options: [
          { id: 'a', text: 'إلا' },
          { id: 'b', text: 'غير' },
          { id: 'c', text: 'سوى' },
          { id: 'd', text: 'الذي' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The negative sentence uses إلا to restrict: "none came except Khalid".',
          ar: '"إلا" للاستثناء بعد النفي: ما جاءني إلا خالد.',
          zh: '否定句用 إلا 表例外：“只有哈立德来了”。',
        },
        whyWrong: {
          b: { en: '"غير" works but requires the following noun in the genitive and a different structure.', ar: '"غير" تحتاج المضاف إليه مجرورًا.', zh: 'غير 需后接属格名词。' },
          c: { en: '"سوى" also works but the sentence already carries إلا-style negation.', ar: '"سوى" تحتاج ترتيبًا مخالفًا.', zh: 'سوى 需调整语序。' },
          d: { en: '"الذي" is a relative pronoun; wrong function.', ar: '"الذي" اسم موصول، لا يصلح هنا.', zh: 'الذي 是关系代词，不适用。' },
        },
      },
      {
        id: 'rel-06',
        prompt: 'يعجبني الكتابُ ____ قرأته أمس.',
        options: [
          { id: 'a', text: 'الذي' },
          { id: 'b', text: 'التي' },
          { id: 'c', text: 'الذين' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'الكتاب is masculine singular → الذي.',
          ar: '"الكتاب" مذكر مفرد، فالموصول "الذي".',
          zh: 'الكتاب 是阳性单数，用 الذي。',
        },
        whyWrong: {
          b: { en: '"التي" is feminine.', ar: '"التي" للمؤنث.', zh: 'التي 是阴性。' },
          c: { en: '"الذين" is masculine plural.', ar: '"الذين" للجمع.', zh: 'الذين 是复数。' },
          d: { en: '"ما" refers to indefinite things.', ar: '"ما" لغير العاقل النكرة.', zh: 'ما 指不定之物。' },
        },
      },
      {
        id: 'rel-07',
        prompt: 'قرأتُ الكتبَ ____ اشتريتها من المعرض.',
        options: [
          { id: 'a', text: 'الذي' },
          { id: 'b', text: 'التي' },
          { id: 'c', text: 'الذين' },
          { id: 'd', text: 'اللواتي' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'الكتب is non-human plural → treated as feminine singular for relative pronouns: التي.',
          ar: '"الكتب" جمع غير عاقل، ويُعامَل معاملة المفردة المؤنثة: التي.',
          zh: 'الكتب 是非人类复数，按阴性单数处理：التي。',
        },
        whyWrong: {
          a: { en: '"الذي" is masculine singular.', ar: '"الذي" للمذكر المفرد.', zh: 'الذي 是阳性单数。' },
          c: { en: '"الذين" is for human masculine plural.', ar: '"الذين" للعقلاء.', zh: 'الذين 用于人类复数。' },
          d: { en: '"اللواتي" is for human feminine plural.', ar: '"اللواتي" للنساء.', zh: 'اللواتي 用于女性复数。' },
        },
      },
      {
        id: 'rel-08',
        prompt: 'جاءت الطالباتُ ____ نجحن في الامتحان.',
        options: [
          { id: 'a', text: 'الذي' },
          { id: 'b', text: 'التي' },
          { id: 'c', text: 'الذين' },
          { id: 'd', text: 'اللواتي' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'الطالبات is feminine human plural → اللواتي (or اللائي).',
          ar: '"الطالبات" جمع مؤنث عاقل، فالموصول "اللواتي" أو "اللائي".',
          zh: 'الطالبات 是阴性人类复数，用 اللواتي。',
        },
        whyWrong: {
          a: { en: '"الذي" is masculine singular.', ar: '"الذي" للمذكر المفرد.', zh: 'الذي 是阳性单数。' },
          b: { en: '"التي" is feminine singular, not plural.', ar: '"التي" للمفردة.', zh: 'التي 是阴性单数。' },
          c: { en: '"الذين" is masculine human plural.', ar: '"الذين" للذكور.', zh: 'الذين 是阳性人类复数。' },
        },
      },
    ],
  },
    // ============================================================
  // 5. الأعداد والمعدود — Numbers and counted nouns
  // ============================================================
  {
    title: {
      en: 'Numbers and counted nouns',
      ar: 'الأعداد والمعدود',
      zh: '数词与所数名词',
    },
    questions: [
      {
        id: 'num-01',
        prompt: 'في الغرفة ____ طلاب.',
        options: [
          { id: 'a', text: 'تسعُ' },
          { id: 'b', text: 'تسعةٌ' },
          { id: 'c', text: 'تسعةُ' },
          { id: 'd', text: 'تسعٌ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'Numbers 3–10 take the opposite gender of the counted noun. طلاب is masculine, so the number is feminine: تسعةُ طلاب. The number is mubtadaʾ muʾakhkhar (or نائب فاعل in some parsings), hence ḍammah without tanwīn because it is in iḍāfah with what follows.',
          ar: 'الأعداد من ٣ إلى ١٠ تخالف المعدود؛ "طلاب" مذكر فيكون العدد مؤنثًا: "تسعةُ طلاب".',
          zh: '3–10 的数词与所数名词性别相反：طلاب 是阳性，故用阴性 تسعةُ。',
        },
        whyWrong: {
          a: { en: 'تسعُ without tāʾ marbūṭah is masculine; wrong gender.', ar: '"تسعُ" مذكر، والمعدود مذكر فيجب التأنيث.', zh: 'تسعُ 是阳性，性别不符。' },
          b: { en: 'تسعةٌ with tanwīn cannot be first term of iḍāfah with طلاب.', ar: '"تسعةٌ" بالتنوين لا تصحّ مع الإضافة إلى "طلاب".', zh: 'تسعةٌ 带鼻音，无法与后面的名词构成正偏组合。' },
          d: { en: 'تسعٌ is masculine; wrong gender.', ar: '"تسعٌ" مذكر.', zh: 'تسعٌ 是阳性。' },
        },
      },
      {
        id: 'num-02',
        prompt: 'حصل أخي في المسابقة على ____ .',
        options: [
          { id: 'a', text: 'مائة مائة' },
          { id: 'b', text: 'مائة على مائة' },
          { id: 'c', text: 'مائة في المائة' },
          { id: 'd', text: 'المائة في مائة' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: '"مائة في المائة" is the fixed expression for "100 percent".',
          ar: '"مائة في المائة" هي الصيغة الثابتة للنسبة المئوية.',
          zh: '“百分之百”的固定说法是 مائة في المائة。',
        },
        whyWrong: {
          a: { en: 'Repeating مائة without في does not express a percentage.', ar: 'تكرار "مائة" بدون "في" لا يفيد النسبة.', zh: '重复 مائة 不加 في 不能表百分比。' },
          b: { en: '"على" changes the meaning to "against" or "on".', ar: '"على" تفيد الاستعلاء.', zh: 'على 表“在……上”。' },
          d: { en: 'Word order is reversed and the second مائة lacks the article.', ar: 'الترتيب مقلوب والثانية بلا "ال".', zh: '语序颠倒，第二个 مائة 缺冠词。' },
        },
      },
      {
        id: 'num-03',
        prompt: 'هذه الشركة تنتج ما يقرب من ____ سيارة في السنة.',
        options: [
          { id: 'a', text: 'ألفي' },
          { id: 'b', text: 'ألفين' },
          { id: 'c', text: 'ألفا' },
          { id: 'd', text: 'ألف' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'For 1000, the counted noun is genitive singular. ألف alone is the simplest and correct form: ألف سيارة = "a thousand cars".',
          ar: '"ألف" مفرد، والمعدود بعده مجرور مفرد: ألف سيارة.',
          zh: 'ألف 单数，所数名词用属格单数：ألف سيارة。',
        },
        whyWrong: {
          a: { en: 'ألفي is dual construct; needs a specific context.', ar: '"ألفي" مثنى مضاف.', zh: 'ألفي 是双数结构。' },
          b: { en: 'ألفين is dual in naṣb/jarr; not the plain form here.', ar: '"ألفين" منصوب أو مجرور.', zh: 'ألفين 是宾格/属格双数。' },
          c: { en: 'ألفا is dual construct in rafʿ; not needed here.', ar: '"ألفا" مثنى في الرفع.', zh: 'ألفا 是主格双数结构。' },
        },
      },
      {
        id: 'num-04',
        prompt: 'حضر إلى قريتنا ____ يحملان معهما الخير.',
        options: [
          { id: 'a', text: 'صالحين' },
          { id: 'b', text: 'صالحان' },
          { id: 'c', text: 'صالحون' },
          { id: 'd', text: 'صالحينَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'رجلان (understood as the counted noun) is dual nominative; the adjective صالحان agrees: "two good men came".',
          ar: '"صالحان" خبر مرفوع مثنى، يوافق الفاعل المثنى.',
          zh: '主语是双数，谓语形容词用主格 صالحان。',
        },
        whyWrong: {
          a: { en: 'صالحين is plural in naṣb/jarr.', ar: '"صالحين" جمع منصوب أو مجرور.', zh: 'صالحين 是宾格/属格复数。' },
          c: { en: 'صالحون is plural nominative.', ar: '"صالحون" جمع مرفوع بالواو.', zh: 'صالحون 是主格阳性复数。' },
          d: { en: 'صالحينَ with fatḥah ending is dual in naṣb/jarr.', ar: '"صالحينَ" مثنى منصوب.', zh: 'صالحينَ 是宾格双数。' },
        },
      },
      {
        id: 'num-05',
        prompt: 'نصف سكان العالم ____ تقريبًا.',
        options: [
          { id: 'a', text: 'ثلث مليار' },
          { id: 'b', text: 'ثلاثة مليار' },
          { id: 'c', text: 'ثلاثة مليارات' },
          { id: 'd', text: 'ثلاث مليارات' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'مليار is a masculine noun used as a singular noun; نصف + مليار + counted noun: نصف مليار (a half billion).',
          ar: '"مليار" مفرد، ويُضاف إلى المعدود: نصف مليار.',
          zh: 'مليار 单数使用，前加 نصف 构成“半十亿”。',
        },
        whyWrong: {
          b: { en: 'ثلاثة milliard requires the plural (مليارات) but "ثلاثة" + plural يخالف القاعدة.', ar: '"ثلاثة" مع "مليار" لا يصح.', zh: 'ثلاثة 与单数 مليار 搭配不当。' },
          c: { en: 'ثلاثة مليارات is a valid form but not what the sentence says.', ar: 'الصيغة سليمة لكن ليست المطلوبة.', zh: '三个十亿 语法上可行，但非本句所需。' },
          d: { en: 'ثلاث مليارات is also possible, but the sentence uses نصف not ثلاث.', ar: '"ثلاث" ليست الكلمة المطلوبة.', zh: 'ثلاث 不是本句词。' },
        },
      },
      {
        id: 'num-06',
        prompt: 'حصل والدي على فرصة عمل ممتازة، فتقدم للوظيفة ____ من المتقدمين.',
        options: [
          { id: 'a', text: 'واحدٌ' },
          { id: 'b', text: 'واحدًا' },
          { id: 'c', text: 'واحدةٌ' },
          { id: 'd', text: 'واحدٍ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'واحد is marfūʿ as the subject of the understood noun: "one of the applicants".',
          ar: '"واحدٌ" مرفوع لأنه فاعل أو خبر لمبتدأ محذوف.',
          zh: 'واحدٌ 用主格，作省略主语的表语。',
        },
        whyWrong: {
          b: { en: 'واحدًا is manṣūb.', ar: '"واحدًا" منصوب.', zh: 'واحدًا 是宾格。' },
          c: { en: 'واحدةٌ is feminine; المتقدمين is masculine.', ar: '"واحدةٌ" مؤنث.', zh: 'واحدةٌ 是阴性。' },
          d: { en: 'واحدٍ is majrūr.', ar: '"واحدٍ" مجرور.', zh: 'واحدٍ 是属格。' },
        },
      },
      {
        id: 'num-07',
        prompt: 'مكثت في القاهرة ____ واستمتعت كثيرًا.',
        options: [
          { id: 'a', text: 'بِضعةَ شهورٍ' },
          { id: 'b', text: 'بِضعَ شهورٍ' },
          { id: 'c', text: 'بِضْعُ شهورٍ' },
          { id: 'd', text: 'بِضعةُ شهرٍ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'بضع is followed by a plural counted noun (شهور). Because بضع here is manṣūb (adverbial زمان), it is بِضعةَ (feminine) agreeing with the plural non-human.',
          ar: '"بِضعة" تخالف المعدود، وهي هنا منصوبة على الظرفية: بِضعةَ شهورٍ.',
          zh: 'بضع 与所数名词性别相反；此处作时间状语用宾格 بِضعةَ，后接复数 شهورٍ。',
        },
        whyWrong: {
          b: { en: 'بِضعَ with a plural would require a masculine counted noun.', ar: '"بِضعَ" مذكر، ولا يوافق "شهور".', zh: 'بِضعَ 是阳性，与 شهور 不符。' },
          c: { en: 'بِضْعُ is rafʿ, not the needed manṣūb.', ar: '"بِضْعُ" مرفوع.', zh: 'بِضْعُ 是主格。' },
          d: { en: 'شهر should be plural here.', ar: '"شهر" مفرد والصواب جمعه.', zh: 'شهر 应为复数。' },
        },
      },
      {
        id: 'num-08',
        prompt: 'تُوفي طه حسين سنة ____ ميلاديًا.',
        options: [
          { id: 'a', text: 'ثلاثة وسبعين وتسعمائة وألف' },
          { id: 'b', text: 'ألف وتسعمائة وثلاثة وسبعين' },
          { id: 'c', text: 'ألف وتسعمائة وثلاث وسبعين' },
          { id: 'd', text: 'تسعة عشر وثلاثة وسبعون' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Standard order: ألف وتسعمائة وثلاثة وسبعين (1973), with masculine forms because سنة is feminine so the counted noun is feminine and the number is masculine.',
          ar: 'الترتيب: ألف وتسعمائة وثلاثة وسبعين.',
          zh: '标准顺序：1973 = ألف وتسعمائة وثلاثة وسبعين。',
        },
        whyWrong: {
          a: { en: 'Order reversed.', ar: 'الترتيب مقلوب.', zh: '顺序颠倒。' },
          c: { en: 'ثلاث without tāʾ marbūṭah is wrong for وسبعين phrase.', ar: '"ثلاث" بدون تاء لا تصح.', zh: 'ثلاث 缺 ة，形式不对。' },
          d: { en: 'Wrong numbers.', ar: 'أرقام خاطئة.', zh: '数字不对。' },
        },
      },
      {
        id: 'num-09',
        prompt: 'تبلغ مساحة الصحراء الغربية نسبة ____ من مساحة مصر.',
        options: [
          { id: 'a', text: 'سبع وستون بالمائة' },
          { id: 'b', text: 'ستة وسبعون بالمائة' },
          { id: 'c', text: 'سبعًا وستين بالمائة' },
          { id: 'd', text: 'سبعة وستون بالمائة' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The compound 67 uses masculine form سبع وستون because the counted noun (بالمائة) is treated as masculine.',
          ar: 'العدد ٦٧ يأتي بالمذكر: سبع وستون، لأن المعدود مذكر.',
          zh: '67 用阳性形式 سبع وستون。',
        },
        whyWrong: {
          b: { en: 'Order reversed (76).', ar: 'الترتيب مقلوب.', zh: '顺序颠倒。' },
          c: { en: 'Manṣūb ending does not fit the subject-adjunct position here.', ar: 'الصيغة المنصوبة لا تصلح.', zh: '宾格形式不适用。' },
          d: { en: 'سبعة is the wrong gender here.', ar: '"سبعة" بتاء مذكر.', zh: 'سبعة 性别错误。' },
        },
      },
      {
        id: 'num-10',
        prompt: 'قرأتُ هذا العام ____ في اللغة والتاريخ.',
        options: [
          { id: 'a', text: 'سبعة عشر كتيبًا' },
          { id: 'b', text: 'سبع عشرة كتابًا' },
          { id: 'c', text: 'سبعة عشر كتابًا' },
          { id: 'd', text: 'سبعة عشر كتبًا' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'كتب is masculine plural, so 17 uses masculine form: سبعة عشر. The counted noun is manṣūb: كتابًا.',
          ar: '"كتاب" مذكر، فالعدد "سبعة عشر"، والمعدود منصوب: كتابًا.',
          zh: 'كتاب 是阳性，用 سبعة عشر；所数名词宾格 كتابًا。',
        },
        whyWrong: {
          a: { en: 'كتيبًا is a different word (booklet).', ar: '"كتيبًا" تصغير، لا يلائم السياق.', zh: 'كتيبًا 是小册子。' },
          b: { en: 'سبع عشرة is used before feminine nouns.', ar: '"سبع عشرة" قبل المؤنث.', zh: 'سبع عشرة 用于阴性名词前。' },
          d: { en: 'كتب is plural and does not fit after a numeral 11–99.', ar: '"كتبًا" جمع لا يصلح بعد العدد.', zh: 'كتبًا 是复数，不用于 11–99 之后。' },
        },
      },
    ],
  },
    // ============================================================
  // 6. أدوات النفي والنهي — Negation and prohibition particles
  // ============================================================
  {
    title: {
      en: 'Negation and prohibition particles',
      ar: 'أدوات النفي والنهي',
      zh: '否定与禁止虚词',
    },
    questions: [
      {
        id: 'neg-01',
        prompt: 'يا عليّ، ____ تأخذ تلك الأشياء فهي ____ لك.',
        options: [
          { id: 'a', text: 'ليست، ما' },
          { id: 'b', text: 'لم، لم' },
          { id: 'c', text: 'لا، ليست' },
          { id: 'd', text: 'لا، لن' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'First blank: لا الناهية + jussive → لا تأخذْ. Second: ليست is the negated kāna for nominal sentences.',
          ar: 'الأول: "لا" الناهية + فعل مجزوم. الثاني: "ليست" نفي باسم.',
          zh: '第一空用 لا 表禁止 + 动词切格；第二空用 ليست 否定名词句。',
        },
        whyWrong: {
          a: { en: 'ليست does not fit the prohibition sense.', ar: '"ليست" لا تفيد النهي.', zh: 'ليست 不表禁止。' },
          b: { en: 'لم is past negation and both blanks lose their sense.', ar: '"لم" لا تصلح في الفراغين.', zh: '两个空用 لم 都不通。' },
          d: { en: 'لن is future negation, not appropriate for the second clause.', ar: '"لن" للمستقبل، لا تصلح في الفراغ الثاني.', zh: '第二空用 لن 语义不符。' },
        },
      },
      {
        id: 'neg-02',
        prompt: '____ يمارس هذا الشاب الرياضة، لذلك هو مريض دائمًا.',
        options: [
          { id: 'a', text: 'لم' },
          { id: 'b', text: 'لن' },
          { id: 'c', text: 'لا' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لا النافية negates the present tense and matches the present consequence "لذلك".',
          ar: '"لا" النافية تنفي المضارع وتناسب السياق الحاضر.',
          zh: 'لا 否定现在时，与现在时结果“لذلك”一致。',
        },
        whyWrong: {
          a: { en: 'لم negates past and makes the verb jussive: لم يمارسْ.', ar: '"لم" تنفي الماضي وتجزم.', zh: 'لم 否定过去并加静符。' },
          b: { en: 'لن negates future with naṣb.', ar: '"لن" تنفي المستقبل وتنصب.', zh: 'لن 否定将来并带宾格。' },
          d: { en: 'ما negates past or nominal sentences.', ar: '"ما" تنفي الماضي أو الجملة الاسمية.', zh: 'ما 否定过去或名词句。' },
        },
      },
      {
        id: 'neg-03',
        prompt: 'لمْ ____ المسؤولُ الحقيقةَ كاملةً.',
        options: [
          { id: 'a', text: 'يَقُلْ' },
          { id: 'b', text: 'يَقُلُ' },
          { id: 'c', text: 'يَقُولْ' },
          { id: 'd', text: 'يَقُولُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After لم, the verb is jussive: يَقُلْ (the defective verb قال drops its long vowel).',
          ar: 'بعد "لم" يُجزم الفعل: يَقُلْ (حذف حرف العلة).',
          zh: 'لم 后动词切格，缺陷动词省略长元音：يَقُلْ。',
        },
        whyWrong: {
          b: { en: 'يَقُلُ is marfūʿ.', ar: '"يَقُلُ" مرفوع.', zh: 'يَقُلُ 是主格。' },
          c: { en: 'يَقُولْ is not standard jussive for this defective verb.', ar: '"يَقُولْ" غير فصيحة.', zh: 'يَقُولْ 不是标准的切格形式。' },
          d: { en: 'يَقُولُ is marfūʿ.', ar: '"يَقُولُ" مرفوع.', zh: 'يَقُولُ 是主格。' },
        },
      },
      {
        id: 'neg-04',
        prompt: '____ تفشلْ في الامتحان إن شاء الله.',
        options: [
          { id: 'a', text: 'لن' },
          { id: 'b', text: 'لم' },
          { id: 'c', text: 'لا' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لن negates the future and assigns naṣb: لن تفشلَ = "you will not fail".',
          ar: '"لن" تنفي المستقبل وتنصب: لن تفشلَ.',
          zh: 'لن 否定将来并带宾格。',
        },
        whyWrong: {
          b: { en: 'لم negates past.', ar: '"لم" للماضي.', zh: 'لم 否定过去。' },
          c: { en: 'لا would negate present.', ar: '"لا" للمضارع الحاضر.', zh: 'لا 否定现在。' },
          d: { en: 'ما does not negate future verbs.', ar: '"ما" لا تنفي المستقبل.', zh: 'ما 不否定将来。' },
        },
      },
      {
        id: 'neg-05',
        prompt: 'الطالب لمْ ____ اللغةَ العربية جيدًا.',
        options: [
          { id: 'a', text: 'يتعلمْ' },
          { id: 'b', text: 'يتعلمُ' },
          { id: 'c', text: 'يتعلمَ' },
          { id: 'd', text: 'تعلمْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لم + jussive = يتعلمْ (with sukūn).',
          ar: '"لم" تجزم الفعل: يتعلمْ.',
          zh: 'لم 后动词用切格 يتعلمْ。',
        },
        whyWrong: {
          b: { en: 'Marfūʿ after لم is wrong.', ar: 'الرفع بعد "لم" خطأ.', zh: 'لم 后不能用主格。' },
          c: { en: 'Manṣūb after لم is wrong.', ar: 'النصب بعد "لم" خطأ.', zh: 'لم 后不能用宾格。' },
          d: { en: 'Different verb form.', ar: 'صيغة فعل مختلفة.', zh: '动词形式不同。' },
        },
      },
      {
        id: 'neg-06',
        prompt: 'لا ____ أخاك الصغير يعبث بهذه الأشياء أثناء غيبتنا يا ليلى.',
        options: [
          { id: 'a', text: 'أتركي' },
          { id: 'b', text: 'تتركي' },
          { id: 'c', text: 'تتركْ' },
          { id: 'd', text: 'تتركين' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After لا الناهية with a feminine addressee (يا ليلى), the verb is jussive: تتركي (drops the nūn from تتركين).',
          ar: 'بعد "لا" الناهية مع المخاطبة: "تتركي" (حذف النون).',
          zh: 'لا 表禁止 + 阴性被呼唤者：去掉 نون 后成为 تتركي。',
        },
        whyWrong: {
          a: { en: 'أتركي is the imperative of the speaker, wrong person.', ar: '"أتركي" صيغة المتكلم.', zh: 'أتركي 是命令式第一人称。' },
          c: { en: 'تتركْ is masculine singular jussive.', ar: '"تتركْ" للمذكر.', zh: 'تتركْ 是阳性单数。' },
          d: { en: 'تتركين is marfūʿ; jussive drops the nūn.', ar: '"تتركين" مرفوع.', zh: 'تتركين 是主格。' },
        },
      },
      {
        id: 'neg-07',
        prompt: 'أنا ____ أمارس الرياضة في الشتاء.',
        options: [
          { id: 'a', text: 'لا' },
          { id: 'b', text: 'لم' },
          { id: 'c', text: 'لن' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لا negates the habitual present: "I don\'t (usually) exercise in winter".',
          ar: '"لا" تنفي المضارع العادي.',
          zh: 'لا 否定习惯性现在。',
        },
        whyWrong: {
          b: { en: 'لم negates past.', ar: '"لم" للماضي.', zh: 'لم 否定过去。' },
          c: { en: 'لن negates future.', ar: '"لن" للمستقبل.', zh: 'لن 否定将来。' },
          d: { en: 'ما would be unusual for a habitual present.', ar: '"ما" للماضي.', zh: 'ما 用于过去。' },
        },
      },
      {
        id: 'neg-08',
        prompt: 'قال المدير للطلاب: يا شباب، ____ تتأخروا عن الحضور.',
        options: [
          { id: 'a', text: 'لم' },
          { id: 'b', text: 'لا' },
          { id: 'c', text: 'لن' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لا الناهية before a jussive verb with dropped nūn: لا تتأخروا.',
          ar: '"لا" الناهية + فعل مجزوم بحذف النون.',
          zh: 'لا 表禁止 + 去掉 نون 的切格动词。',
        },
        whyWrong: {
          a: { en: 'لم is past negation.', ar: '"لم" للماضي.', zh: 'لم 否定过去。' },
          c: { en: 'لن is future negation.', ar: '"لن" للمستقبل.', zh: 'لن 否定将来。' },
          d: { en: 'ما is past negation.', ar: '"ما" للماضي.', zh: 'ما 否定过去。' },
        },
      },
      {
        id: 'neg-09',
        prompt: 'ليس ____ حاجة إلى مثل هذا الكلام.',
        options: [
          { id: 'a', text: 'هناك' },
          { id: 'b', text: 'هنا' },
          { id: 'c', text: 'هذه' },
          { id: 'd', text: 'هذا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'هناك is the existential "there": ليس هناك حاجة = "there is no need".',
          ar: '"هناك" للوجود، وهي المناسبة.',
          zh: 'هناك 表存在：“没有必要”。',
        },
        whyWrong: {
          b: { en: 'هنا means "here", not existential.', ar: '"هنا" للمكان.', zh: 'هنا 表“这里”。' },
          c: { en: 'هذه is demonstrative, wrong here.', ar: '"هذه" اسم إشارة.', zh: 'هذه 是指示词。' },
          d: { en: 'هذا is demonstrative.', ar: '"هذا" اسم إشارة.', zh: 'هذا 是指示词。' },
        },
      },
      {
        id: 'neg-10',
        prompt: '____ يزال عمر طفلًا صغيرًا عاجزًا عن إدراك الأمور.',
        options: [
          { id: 'a', text: 'ما' },
          { id: 'b', text: 'لم' },
          { id: 'c', text: 'لن' },
          { id: 'd', text: 'لا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'ما زال is the fixed negative construction meaning "still / has not ceased to be".',
          ar: '"ما زال" صيغة ثابتة بمعنى "لا زال".',
          zh: 'ما زال 是固定搭配，意为“仍然”。',
        },
        whyWrong: {
          b: { en: 'لم يزل is also possible but with different meaning.', ar: '"لم يزل" صحيحة لغويًا لكن السياق يقتضي "ما زال".', zh: 'لم يزل 语法可行但语义稍有不同。' },
          c: { en: 'لن يزال is not idiomatic.', ar: '"لن يزال" غير فصيحة.', zh: 'لن يزال 不合习惯。' },
          d: { en: 'لا يزال is also correct, but "ما زال" is what the source uses.', ar: '"لا يزال" صحيحة أيضًا، لكن المصدر يستخدم "ما".', zh: 'لا يزال 也可，但原文用 ما。' },
        },
      },
      {
        id: 'neg-11',
        prompt: '____ أنسى ما فعلته من أجلي يا صديقي.',
        options: [
          { id: 'a', text: 'لن' },
          { id: 'b', text: 'لم' },
          { id: 'c', text: 'لا' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لن + naṣb for future: لن أنسى = "I will not forget".',
          ar: '"لن" للمستقبل: لن أنسى.',
          zh: 'لن 否定将来：لن أنسى。',
        },
        whyWrong: {
          b: { en: 'لم negates past.', ar: '"لم" للماضي.', zh: 'لم 否定过去。' },
          c: { en: 'لا negates present.', ar: '"لا" للمضارع.', zh: 'لا 否定现在。' },
          d: { en: 'ما negates past.', ar: '"ما" للماضي.', zh: 'ما 否定过去。' },
        },
      },
      {
        id: 'neg-12',
        prompt: '____ يخرجْ من البيت بدون إذن.',
        options: [
          { id: 'a', text: 'لا' },
          { id: 'b', text: 'لم' },
          { id: 'c', text: 'لن' },
          { id: 'd', text: 'ما' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لا الناهية + jussive: لا يخرجْ = "let him not go out".',
          ar: '"لا" الناهية + فعل مجزوم: لا يخرجْ.',
          zh: 'لا 表禁止 + 切格动词。',
        },
        whyWrong: {
          b: { en: 'لم is past negation.', ar: '"لم" للماضي.', zh: 'لم 否定过去。' },
          c: { en: 'لن is future negation with naṣb, not jussive.', ar: '"لن" تنصب.', zh: 'لن 带宾格。' },
          d: { en: 'ما is past negation.', ar: '"ما" للماضي.', zh: 'ما 否定过去。' },
        },
      },
    ],
  },
    // ============================================================
  // 7. النواصب والجوازم — Subjunctive and jussive triggers
  // ============================================================
  {
    title: {
      en: 'Subjunctive and jussive triggers',
      ar: 'النواصب والجوازم',
      zh: '虚拟式与切格虚词',
    },
    questions: [
      {
        id: 'nasb-01',
        prompt: 'عليك أن تسلّم واجباتك في الموعد المحدد لئلّا ____ درجاتك كاملة.',
        options: [
          { id: 'a', text: 'تخسرُ' },
          { id: 'b', text: 'تخسرْ' },
          { id: 'c', text: 'تخسرَ' },
          { id: 'd', text: 'خسرتَ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لئلّا = لِ + أنْ + لا, and أنْ is a naṣb particle → the verb is manṣūb: تخسرَ.',
          ar: '"لئلّا" أصلها "لأنْ لا"، و"أنْ" ناصبة، فالفعل منصوب: تخسرَ.',
          zh: 'لئلّا 相当于 لأن لا，أنْ 是宾格虚词，故动词为宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ after أنْ is wrong.', ar: 'الرفع بعد "أنْ" خطأ.', zh: 'أنْ 后不能用主格。' },
          b: { en: 'Majzūm needs a jussive particle, not أنْ.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
          d: { en: 'Past tense, wrong meaning.', ar: 'الماضي يخالف السياق.', zh: '过去式语义不符。' },
        },
      },
      {
        id: 'nasb-02',
        prompt: 'مَن يَحترمْ الناسَ ____ .',
        options: [
          { id: 'a', text: 'يَحترِمُ' },
          { id: 'b', text: 'يُحترَمُ' },
          { id: 'c', text: 'يُحترَمْ' },
          { id: 'd', text: 'يَحترِمْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Conditional مَن → first verb jussive. The answer clause with a meaning of possibility takes the passive marfūʿ form يُحترَمُ.',
          ar: '"مَن" شرطية، والفعل الأول مجزوم. والجواب هنا يُحترَمُ مرفوع مبني للمجهول.',
          zh: 'مَن 条件句，第一动词切格；答句用被动主格 يُحترَمُ。',
        },
        whyWrong: {
          a: { en: 'يَحترِمُ loses the passive meaning.', ar: 'المعنى بالمجهول لا بالمعلوم.', zh: '此处应用被动，非主动。' },
          c: { en: 'يُحترَمْ would be a jussive reading, which is also permissible in some parsing — but standard reading is marfūʿ.', ar: '"يُحترَمْ" ممكن إعرابيًا لكن الأفصح الرفع.', zh: '切格形式在部分解中可行，但标准读法为主格。' },
          d: { en: 'يَحترِمْ is jussive active — wrong voice.', ar: '"يَحترِمْ" جزم مبني للمعلوم.', zh: 'يَحترِمْ 是切格主动，语态错误。' },
        },
      },
      {
        id: 'nasb-03',
        prompt: 'أتمنى ____ تنجحَ في الامتحان.',
        options: [
          { id: 'a', text: 'أنّ' },
          { id: 'b', text: 'أنْ' },
          { id: 'c', text: 'إنّ' },
          { id: 'd', text: 'إنْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After أتمنى, the complement is أنْ + manṣūb verb: أنْ تنجحَ.',
          ar: 'بعد "أتمنى" تأتي "أنْ" المصدرية الناصبة.',
          zh: 'أتمنى 后用 أنْ 引出宾格动词。',
        },
        whyWrong: {
          a: { en: 'أنّ requires a nominal clause (اسم + خبر).', ar: '"أنّ" يليها اسم وخبر.', zh: 'أنّ 后接名词句。' },
          c: { en: 'إنّ does not fit here.', ar: '"إنّ" لا تصلح.', zh: 'إنّ 不适用。' },
          d: { en: 'إنْ is conditional.', ar: '"إنْ" شرطية.', zh: 'إنْ 是条件虚词。' },
        },
      },
      {
        id: 'nasb-04',
        prompt: 'أسافر إلى القاهرة ____ أزورَ الأهرامات.',
        options: [
          { id: 'a', text: 'لأنَّ' },
          { id: 'b', text: 'لكي' },
          { id: 'c', text: 'لكنْ' },
          { id: 'd', text: 'لأنْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'كي (لِكي) is a naṣb particle introducing the purpose: لكي أزورَ.',
          ar: '"كي" ناصبة للتعليل: لكي أزورَ.',
          zh: 'كي 是宾格虚词，引出目的：لكي أزورَ。',
        },
        whyWrong: {
          a: { en: 'لأنّ requires a nominal clause.', ar: '"لأنّ" تحتاج اسمًا وخبرًا.', zh: 'لأنّ 后接名词句。' },
          c: { en: 'لكنْ is a conjunction meaning "but".', ar: '"لكنْ" للاستدراك.', zh: 'لكنْ 表转折。' },
          d: { en: 'لأنْ is unusual; أنْ alone is possible but not with لام التعليل this way.', ar: '"لأنْ" غير فصيحة.', zh: 'لأنْ 不合习惯。' },
        },
      },
      {
        id: 'nasb-05',
        prompt: 'ادرسْ بجدٍّ ____ تنجحَ.',
        options: [
          { id: 'a', text: 'حتى' },
          { id: 'b', text: 'ثم' },
          { id: 'c', text: 'لكنْ' },
          { id: 'd', text: 'بل' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'حتى can function as a naṣb particle expressing purpose or extent: حتى تنجحَ = "so that you succeed".',
          ar: '"حتى" الناصبة تفيد الغاية: حتى تنجحَ.',
          zh: 'حتى 可作宾格虚词表目的：直到你成功。',
        },
        whyWrong: {
          b: { en: 'ثم is a sequencing conjunction.', ar: '"ثم" للترتيب.', zh: 'ثم 表顺序。' },
          c: { en: 'لكنْ is for contrast.', ar: '"لكنْ" للاستدراك.', zh: 'لكنْ 表转折。' },
          d: { en: 'بل is for correction / escalation.', ar: '"بل" للإضراب.', zh: 'بل 表纠正。' },
        },
      },
      {
        id: 'nasb-06',
        prompt: 'لمْ ____ في هذه الشركة إلا سنة واحدة.',
        options: [
          { id: 'a', text: 'أعملْ' },
          { id: 'b', text: 'أعملُ' },
          { id: 'c', text: 'أعملَ' },
          { id: 'd', text: 'عملتُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لم + jussive: أعملْ.',
          ar: '"لم" تجزم الفعل: أعملْ.',
          zh: 'لم 后动词切格：أعملْ。',
        },
        whyWrong: {
          b: { en: 'Marfūʿ is wrong after لم.', ar: 'الرفع بعد "لم" خطأ.', zh: 'لم 后不能用主格。' },
          c: { en: 'Manṣūb is wrong after لم.', ar: 'النصب بعد "لم" خطأ.', zh: 'لم 后不能用宾格。' },
          d: { en: 'Past tense would clash with لم.', ar: 'الماضي لا يجتمع مع "لم".', zh: '过去式与 لم 冲突。' },
        },
      },
      {
        id: 'nasb-07',
        prompt: 'أريد أن ____ اللغةَ العربية بطلاقة.',
        options: [
          { id: 'a', text: 'أتكلّمُ' },
          { id: 'b', text: 'أتكلّمَ' },
          { id: 'c', text: 'أتكلّمْ' },
          { id: 'd', text: 'تكلّمتُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After أنْ, the verb is manṣūb: أن أتكلّمَ.',
          ar: 'بعد "أنْ" يكون الفعل منصوبًا: أتكلّمَ.',
          zh: 'أنْ 后动词用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ after أنْ is wrong.', ar: 'الرفع بعد "أنْ" خطأ.', zh: 'أنْ 后不能用主格。' },
          c: { en: 'Majzūm needs a jussive particle.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
          d: { en: 'Past tense, wrong meaning.', ar: 'الماضي يخالف السياق.', zh: '过去式不合语境。' },
        },
      },
      {
        id: 'nasb-08',
        prompt: 'قال الأب لابنه: لا ____ في الشارع فإنه خطر.',
        options: [
          { id: 'a', text: 'تلعبُ' },
          { id: 'b', text: 'تلعبَ' },
          { id: 'c', text: 'تلعبْ' },
          { id: 'd', text: 'لعبتَ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'لا الناهية + jussive: لا تلعبْ.',
          ar: '"لا" الناهية تجزم: لا تلعبْ.',
          zh: 'لا 表禁止 + 切格动词。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ is wrong after لا الناهية.', ar: 'الرفع بعد "لا" الناهية خطأ.', zh: 'لا الناهية 后不能用主格。' },
          b: { en: 'Manṣūb is wrong after لا الناهية.', ar: 'النصب بعد "لا" الناهية خطأ.', zh: 'لا الناهية 后不能用宾格。' },
          d: { en: 'Past tense, wrong.', ar: 'الماضي خطأ.', zh: '过去式不对。' },
        },
      },
      {
        id: 'nasb-09',
        prompt: 'إنْ ____ جيدًا تنجحْ في الامتحان.',
        options: [
          { id: 'a', text: 'تدرسْ' },
          { id: 'b', text: 'تدرسُ' },
          { id: 'c', text: 'تدرسَ' },
          { id: 'd', text: 'درستَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'إنْ الشرطية + jussive: تدرسْ. The response clause also jussive: تنجحْ.',
          ar: '"إنْ" الشرطية تجزم الفعلين: تدرسْ … تنجحْ.',
          zh: 'إنْ 条件句使两动词都用切格。',
        },
        whyWrong: {
          b: { en: 'Marfūʿ after إنْ الشرطية is wrong.', ar: 'الرفع بعد "إنْ" الشرطية خطأ.', zh: '条件句后不能用主格。' },
          c: { en: 'Manṣūb is wrong after إنْ الشرطية.', ar: 'النصب بعد "إنْ" الشرطية خطأ.', zh: '条件句后不能用宾格。' },
          d: { en: 'Past tense, and the response uses present jussive — mismatch.', ar: 'الماضي لا يناسب جوابًا مضارعًا.', zh: '过去式与现在时答句不匹配。' },
        },
      },
      {
        id: 'nasb-10',
        prompt: 'لمّا ____ الفيلمُ حتى بكى الحضور.',
        options: [
          { id: 'a', text: 'انتهى' },
          { id: 'b', text: 'ينتهِ' },
          { id: 'c', text: 'ينتهي' },
          { id: 'd', text: 'تنتهي' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لمّا (the "when no sooner" particle) governs a jussive verb: لمّا ينتهِ = "when the film ended".',
          ar: '"لمّا" تجزم: لمّا ينتهِ.',
          zh: 'لمّا 后接切格动词：لمّا ينتهِ。',
        },
        whyWrong: {
          a: { en: 'Past tense after لمّا is wrong.', ar: 'الماضي بعد "لمّا" خطأ.', zh: 'لمّا 后不能用过去式。' },
          c: { en: 'Marfūʿ is wrong after لمّا.', ar: 'الرفع بعد "لمّا" خطأ.', zh: 'لمّا 后不能用主格。' },
          d: { en: 'Wrong gender — الفيلم is masculine.', ar: '"الفيلم" مذكر.', zh: 'الفيلم 是阳性。' },
        },
      },
      {
        id: 'nasb-11',
        prompt: 'يا أستاذي، ____ لي أن أُجيبَ عن هذا السؤال.',
        options: [
          { id: 'a', text: 'دعني' },
          { id: 'b', text: 'دعني' },
          { id: 'c', text: 'دعني' },
          { id: 'd', text: 'دعني' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'دعني is a fixed imperative with the pronoun, and the following أن أُجيبَ is manṣūb.',
          ar: '"دعني" فعل أمر + ياء المتكلم، والفعل بعد "أنْ" منصوب.',
          zh: 'دعني 是命令式 + 代词；后接 أنْ 引出宾格动词。',
        },
        whyWrong: {
          b: { en: 'Identical option; only one correct.', ar: 'خيار مكرر.', zh: '重复选项。' },
          c: { en: 'Identical option.', ar: 'خيار مكرر.', zh: '重复选项。' },
          d: { en: 'Identical option.', ar: 'خيار مكرر.', zh: '重复选项。' },
        },
      },
      {
        id: 'nasb-12',
        prompt: 'لنْ ____ في هذا المشروع أكثر من ذلك.',
        options: [
          { id: 'a', text: 'أشاركُ' },
          { id: 'b', text: 'أشاركَ' },
          { id: 'c', text: 'أشاركْ' },
          { id: 'd', text: 'شاركتُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لن negates the future and makes the verb naṣb: لن أشاركَ.',
          ar: '"لن" تنصب الفعل: لن أشاركَ.',
          zh: 'لن 后动词用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ after لن is wrong.', ar: 'الرفع بعد "لن" خطأ.', zh: 'لن 后不能用主格。' },
          c: { en: 'Majzūm after لن is wrong.', ar: 'الجزم بعد "لن" خطأ.', zh: 'لن 后不能用切格。' },
          d: { en: 'Past tense, wrong.', ar: 'الماضي خطأ.', zh: '过去式不对。' },
        },
      },
      {
        id: 'nasb-13',
        prompt: 'أذاكرُ دروسي كي ____ في الامتحان.',
        options: [
          { id: 'a', text: 'أنجحُ' },
          { id: 'b', text: 'أنجحَ' },
          { id: 'c', text: 'أنجحْ' },
          { id: 'd', text: 'نجحتُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'كي is a naṣb particle: أنجحَ.',
          ar: '"كي" ناصبة: أنجحَ.',
          zh: 'كي 后动词用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ after كي is wrong.', ar: 'الرفع بعد "كي" خطأ.', zh: 'كي 后不能用主格。' },
          c: { en: 'Majzūm is wrong after كي.', ar: 'الجزم بعد "كي" خطأ.', zh: 'كي 后不能用切格。' },
          d: { en: 'Past tense, wrong.', ar: 'الماضي خطأ.', zh: '过去式不对。' },
        },
      },
      {
        id: 'nasb-14',
        prompt: 'متى ____ إلى مصر يا أحمد؟',
        options: [
          { id: 'a', text: 'تسافرُ' },
          { id: 'b', text: 'تسافرَ' },
          { id: 'c', text: 'تسافرْ' },
          { id: 'd', text: 'سافرت' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'No naṣb or jazm particle — the verb stays marfūʿ: تسافرُ.',
          ar: 'لا ناصب ولا جازم، فالفعل مرفوع: تسافرُ.',
          zh: '无宾格/切格虚词，动词用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb needs a naṣb particle.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需宾格虚词。' },
          c: { en: 'Majzūm needs a jussive particle.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
          d: { en: 'Past tense mismatches متى here.', ar: 'الماضي لا يناسب "متى" هنا.', zh: '过去式与 متى 语义不符。' },
        },
      },
      {
        id: 'nasb-15',
        prompt: 'ماذا ____ أن تفعلَ غدًا؟',
        options: [
          { id: 'a', text: 'تريدُ' },
          { id: 'b', text: 'تريدَ' },
          { id: 'c', text: 'تريدْ' },
          { id: 'd', text: 'أردتَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The verb تريد is marfūʿ because no naṣb/jazm particle precedes it; the following أنْ makes only تفعل naṣb.',
          ar: '"تريد" مرفوع لعدم وجود ناصب أو جازم، والفعل "تفعل" منصوب بـ"أنْ".',
          zh: 'تريد 无宾格/切格虚词故用主格；后面的 أنْ 使 تفعل 用宾格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb is wrong — no naṣb particle before تريد.', ar: 'النصب خطأ.', zh: '宾格不对。' },
          c: { en: 'Majzūm is wrong.', ar: 'الجزم خطأ.', zh: '切格不对。' },
          d: { en: 'Past tense, wrong.', ar: 'الماضي خطأ.', zh: '过去式不对。' },
        },
      },
    ],
  },
    // ============================================================
  // 8. الممنوع من الصرف — Diptotes
  // ============================================================
  {
    title: {
      en: 'Diptotes — nouns that do not take tanwīn',
      ar: 'الممنوع من الصرف',
      zh: '禁止变尾名词',
    },
    questions: [
      {
        id: 'dip-01',
        prompt: 'تقع مدينة القاهرة في ____ .',
        options: [
          { id: 'a', text: 'مصرَ' },
          { id: 'b', text: 'مصرِ' },
          { id: 'c', text: 'مصرُ' },
          { id: 'd', text: 'مصرًا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'مصر is a diptote (feminine proper noun of non-Arabic origin); after في it takes fatḥah: في مصرَ.',
          ar: '"مصر" ممنوعة من الصرف، فتُجرّ بالفتحة: في مصرَ.',
          zh: 'مصر 是禁止变尾名词，在 في 后用开口符。',
        },
        whyWrong: {
          b: { en: 'Kasrah is for triptotes.', ar: 'الكسرة للمنصرف.', zh: '齐齿符属于变尾名词。' },
          c: { en: 'Marfūʿ does not fit after في.', ar: 'الرفع لا يصلح بعد حرف الجر.', zh: '介词后不能用主格。' },
          d: { en: 'Manṣūb also does not fit.', ar: 'النصب لا يصلح.', zh: '宾格不适用。' },
        },
      },
      {
        id: 'dip-02',
        prompt: 'سافرتُ إلى ____ في الصيف الماضي.',
        options: [
          { id: 'a', text: 'دمشقَ' },
          { id: 'b', text: 'دمشقِ' },
          { id: 'c', text: 'دمشقُ' },
          { id: 'd', text: 'دمشقًا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'دمشق is a diptote proper noun → in the genitive it takes fatḥah: إلى دمشقَ.',
          ar: '"دمشق" ممنوعة من الصرف، فتُجرّ بالفتحة: إلى دمشقَ.',
          zh: 'دمشق 是禁止变尾名词，属格用开口符。',
        },
        whyWrong: {
          b: { en: 'Kasrah would be for triptotes.', ar: 'الكسرة للمنصرف.', zh: '齐齿符属变尾名词。' },
          c: { en: 'Marfūʿ does not fit after إلى.', ar: 'الرفع لا يصلح.', zh: '主格不适用。' },
          d: { en: 'Manṣūb does not fit.', ar: 'النصب لا يصلح.', zh: '宾格不适用。' },
        },
      },
      {
        id: 'dip-03',
        prompt: 'زرتُ ____ من أجمل المدن العربية.',
        options: [
          { id: 'a', text: 'بغدادَ' },
          { id: 'b', text: 'بغدادِ' },
          { id: 'c', text: 'بغدادُ' },
          { id: 'd', text: 'بغدادًا' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'بغداد is a diptote (feminine proper noun, foreign origin); as direct object it takes fatḥah without tanwīn: بغدادَ.',
          ar: '"بغداد" ممنوعة من الصرف، فالنصب بالفتحة بلا تنوين: بغدادَ.',
          zh: 'بغداد 是禁止变尾名词，宾格用开口符、不带鼻音。',
        },
        whyWrong: {
          b: { en: 'Majrūr does not fit as object.', ar: 'الجرّ لا يصلح للمفعول.', zh: '宾语不能用属格。' },
          c: { en: 'Marfūʿ does not fit.', ar: 'الرفع لا يصلح.', zh: '主格不适用。' },
          d: { en: 'Tanwīn cannot attach to a diptote.', ar: 'التنوين لا يلحق الممنوع من الصرف.', zh: '禁止变尾名词不带鼻音。' },
        },
      },
      {
        id: 'dip-04',
        prompt: 'قرأتُ عن ____ في كتابٍ قديم.',
        options: [
          { id: 'a', text: 'أحمدَ' },
          { id: 'b', text: 'أحمدِ' },
          { id: 'c', text: 'أحمدُ' },
          { id: 'd', text: 'أحمدٍ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'أحمد is a diptote proper noun (pattern أَفْعَل) → genitive with fatḥah: عن أحمدَ.',
          ar: '"أحمد" ممنوع من الصرف (على وزن أَفْعَل)، فيُجرّ بالفتحة.',
          zh: 'أحمد 是禁止变尾名词（أَفْعَل 词型），属格用开口符。',
        },
        whyWrong: {
          b: { en: 'Kasrah is for triptotes.', ar: 'الكسرة للمنصرف.', zh: '齐齿符属变尾名词。' },
          c: { en: 'Marfūʿ does not fit after عن.', ar: 'الرفع لا يصلح.', zh: '主格不适用。' },
          d: { en: 'Tanwīn cannot attach.', ar: 'التنوين لا يلحق.', zh: '不带鼻音。' },
        },
      },
      {
        id: 'dip-05',
        prompt: 'قدمتُ هديةً لـ ____ .',
        options: [
          { id: 'a', text: 'فاطمةَ' },
          { id: 'b', text: 'فاطمةِ' },
          { id: 'c', text: 'فاطمةُ' },
          { id: 'd', text: 'فاطمةٍ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'فاطمة is a diptote proper feminine noun; after لـ it takes fatḥah.',
          ar: '"فاطمة" ممنوعة من الصرف (علمية مؤنثة)، فتُجرّ بالفتحة.',
          zh: 'فاطمة 是禁止变尾名词（阴性专有名词），属格用开口符。',
        },
        whyWrong: {
          b: { en: 'Kasrah is for triptotes.', ar: 'الكسرة للمنصرف.', zh: '齐齿符属变尾名词。' },
          c: { en: 'Marfūʿ does not fit after لـ.', ar: 'الرفع لا يصلح.', zh: '主格不适用。' },
          d: { en: 'Tanwīn cannot attach.', ar: 'التنوين لا يلحق.', zh: '不带鼻音。' },
        },
      },
      {
        id: 'dip-06',
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
          b: { en: 'Majrūr does not fit.', ar: 'الجرّ لا يصلح.', zh: '属格不适用。' },
          c: { en: 'Marfūʿ does not fit.', ar: 'الرفع لا يصلح.', zh: '主格不适用。' },
          d: { en: 'Tanwīn cannot attach.', ar: 'التنوين لا يلحق.', zh: '不带鼻音。' },
        },
      },
    ],
  },
    // ============================================================
  // 9. التمييز والحال — Tamyīz and Ḥāl
  // ============================================================
  {
    title: {
      en: 'Tamyīz and Ḥāl',
      ar: 'التمييز والحال',
      zh: '区分语与状语',
    },
    questions: [
      {
        id: 'thal-01',
        prompt: 'وصل الركابُ إلى القطار ____ لأنهم استيقظوا متأخرين.',
        options: [
          { id: 'a', text: 'مسرعون' },
          { id: 'b', text: 'أسرعوا' },
          { id: 'c', text: 'مسرعين' },
          { id: 'd', text: 'سارعين' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'Ḥāl is always manṣūb: مسرعين describes the state of الركاب when they arrived.',
          ar: 'الحال منصوب دائمًا، والصواب "مسرعين".',
          zh: '状语必须用宾格，故选 مسرعين。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ is wrong for ḥāl.', ar: 'الرفع لا يصحّ للحال.', zh: '状语不能用主格。' },
          b: { en: 'A past verb is not a ḥāl.', ar: 'الفعل الماضي ليس حالًا.', zh: '过去式动词不是状语。' },
          d: { en: 'سارعين means "walking fast"; مسرعين is more precise.', ar: '"سارعين" للماشي بسرعة، والأليق "مسرعين".', zh: 'سارعين 强调步行，语义不如 مسرعين 贴切。' },
        },
      },
      {
        id: 'thal-02',
        prompt: 'عاد الجنديُّ من المعركة ____ .',
        options: [
          { id: 'a', text: 'منتصرٌ' },
          { id: 'b', text: 'منتصرًا' },
          { id: 'c', text: 'منتصرْ' },
          { id: 'd', text: 'منتصرٍ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Ḥāl describes the state at the time of the verb: "he returned victorious". Manṣūb: منتصرًا.',
          ar: 'الحال تصف هيئة صاحبها عند وقوع الفعل، وهي منصوبة: منتصرًا.',
          zh: '状语描述动作发生时的状态，用宾格：منتصرًا。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ cannot be ḥāl.', ar: 'الرفع لا يصحّ للحال.', zh: '主格不能作状语。' },
          c: { en: 'Sukūn is not a valid ending for a singular noun.', ar: 'السكون لا يصحّ لاسم مفرد.', zh: '单数名词不能用静符结尾。' },
          d: { en: 'Majrūr needs a preposition.', ar: 'الجرّ يحتاج حرفًا.', zh: '属格需介词。' },
        },
      },
      {
        id: 'thal-03',
        prompt: 'زرع الفلاحون الأرضَ ____ .',
        options: [
          { id: 'a', text: 'فرحون' },
          { id: 'b', text: 'فرحين' },
          { id: 'c', text: 'فرحٌ' },
          { id: 'd', text: 'فرحًا' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Ḥāl for masculine plural: فرحين (manṣūb with yāʾ).',
          ar: 'الحال جمع مذكر سالم منصوب بالياء: فرحين.',
          zh: '阳性复数状语用 ي 结尾的宾格：فرحين。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ with wāw is wrong for ḥāl.', ar: 'الرفع بالواو خطأ للحال.', zh: '状语不能用主格。' },
          c: { en: 'This is not a valid ḥāl form.', ar: 'ليست صيغة حال صحيحة.', zh: '不是正确的状语形式。' },
          d: { en: 'فرحًا is singular.', ar: '"فرحًا" مفرد.', zh: 'فرحًا 是单数。' },
        },
      },
      {
        id: 'thal-04',
        prompt: 'اشتريتُ ____ تفاحًا.',
        options: [
          { id: 'a', text: 'كيلو' },
          { id: 'b', text: 'كيلوغرامًا' },
          { id: 'c', text: 'كيلوغرامَ' },
          { id: 'd', text: 'كيلوغرامٍ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'Tamyīz after a measure noun is manṣūb with tanwīn: كيلوغرامًا. But the counted noun تفاحًا is also manṣūb (tamyīz of kilo).',
          ar: 'التمييز منصوب: كيلوغرامًا.',
          zh: '数量名词后的区分语用宾格带鼻音。',
        },
        whyWrong: {
          a: { en: 'Without tanwīn it looks like a construct form, but kilo alone is not standard.', ar: '"كيلو" وحدها غير فصيحة.', zh: 'كيلو 单用不规范。' },
          c: { en: 'Without tanwīn but with fatḥah, it looks like the construct state; needs tanwīn here.', ar: 'يحتاج التنوين.', zh: '需要鼻音。' },
          d: { en: 'Majrūr is wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
        },
      },
      {
        id: 'thal-05',
        prompt: 'في الفصل ____ طالبًا.',
        options: [
          { id: 'a', text: 'عشرون' },
          { id: 'b', text: 'عشرين' },
          { id: 'c', text: 'عشرونَ' },
          { id: 'd', text: 'عشرينَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The subject عشرون is marfūʿ with wāw; the tamyīz طالبًا is manṣūb.',
          ar: '"عشرون" مرفوع بالواو لأنه مبتدأ مؤخر، و"طالبًا" تمييز منصوب.',
          zh: 'عشرون 用主格（واو），طالبًا 是宾格区分语。',
        },
        whyWrong: {
          b: { en: 'عشرين is naṣb/jarr form, wrong for the subject.', ar: '"عشرين" منصوب أو مجرور.', zh: 'عشرين 是宾格/属格。' },
          c: { en: 'عشرونَ without wāw is not the standard rafʿ form.', ar: 'الرفع بالواو.', zh: '主格需带 واو。' },
          d: { en: 'عشرينَ is manṣūb.', ar: 'منصوب.', zh: '宾格。' },
        },
      },
      {
        id: 'thal-06',
        prompt: 'هذا الكتابُ أكثرُ ____ .',
        options: [
          { id: 'a', text: 'فائدةً' },
          { id: 'b', text: 'فائدةٍ' },
          { id: 'c', text: 'فائدةٌ' },
          { id: 'd', text: 'فائدة' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Tamyīz after the comparative أفعل is manṣūb: أكثر فائدةً.',
          ar: 'التمييز بعد اسم التفضيل منصوب: أكثر فائدةً.',
          zh: '比较级后的区分语用宾格。',
        },
        whyWrong: {
          b: { en: 'Majrūr is wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          c: { en: 'Marfūʿ is wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          d: { en: 'Without tanwīn it is incomplete.', ar: 'يحتاج تنوينًا.', zh: '需带鼻音。' },
        },
      },
      {
        id: 'thal-07',
        prompt: 'حسنٌ ____ أن تتعلّم اللغةَ العربية.',
        options: [
          { id: 'a', text: 'لك' },
          { id: 'b', text: 'بك' },
          { id: 'c', text: 'عليك' },
          { id: 'd', text: 'فيك' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'حسن لك is the standard construction: "it is good for you".',
          ar: '"حسن لك" هي الصيغة الثابتة.',
          zh: '固定说法为 حسن لك。',
        },
        whyWrong: {
          b: { en: 'بك does not collocate with حسن.', ar: '"بك" لا تصلح مع "حسن".', zh: 'بك 不与 حسن 搭配。' },
          c: { en: 'عليك would mean "on you", wrong here.', ar: '"عليك" للاستعلاء.', zh: 'عليك 表“在……上”。' },
          d: { en: 'فيك is not a valid construction here.', ar: '"فيك" لا تصلح.', zh: 'فيك 不适用。' },
        },
      },
      {
        id: 'thal-08',
        prompt: 'طاب ____ نهارُك.',
        options: [
          { id: 'a', text: 'لك' },
          { id: 'b', text: 'منك' },
          { id: 'c', text: 'بك' },
          { id: 'd', text: 'عليك' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'طاب لك نهارك is the standard greeting: "may your day be pleasant for you".',
          ar: '"طاب لك نهارك" تحية ثابتة.',
          zh: '固定问候语：طاب لك نهارك。',
        },
        whyWrong: {
          b: { en: '"منك" changes the meaning.', ar: '"منك" تغيّر المعنى.', zh: 'منك 改变句意。' },
          c: { en: '"بك" does not collocate.', ar: '"بك" لا تصلح.', zh: 'بك 不搭配。' },
          d: { en: '"عليك" is wrong.', ar: '"عليك" خطأ.', zh: 'عليك 不对。' },
        },
      },
    ],
  },
    // ============================================================
  // 10. المبتدأ والخبر — Subject and predicate of a nominal sentence
  // ============================================================
  {
    title: {
      en: 'Subject and predicate of a nominal sentence',
      ar: 'المبتدأ والخبر',
      zh: '名词句的主语与谓语',
    },
    questions: [
      {
        id: 'mub-01',
        prompt: 'هذه الفتاة جميلة، ____ القمر في السماء.',
        options: [
          { id: 'a', text: 'لـ' },
          { id: 'b', text: 'بـ' },
          { id: 'c', text: 'كـ' },
          { id: 'd', text: 'من' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'كـ marks comparison: "as beautiful as the moon". The full sentence would be: جميلة كالقمر.',
          ar: '"الكاف" للتشبيه: جميلة كالقمر.',
          zh: 'كـ 表示比喻：“像月亮一样美”。',
        },
        whyWrong: {
          a: { en: 'لام التعليل does not fit a simile.', ar: 'اللام للتعليل، لا للتشبيه.', zh: 'لام 表目的，不用作比喻。' },
          b: { en: 'بـ is for instrument or means.', ar: '"بـ" للاستعانة.', zh: 'بـ 表工具。' },
          d: { en: 'من is for origin.', ar: '"من" للابتداء.', zh: 'من 表来源。' },
        },
      },
      {
        id: 'mub-02',
        prompt: 'محمدٌ ____ .',
        options: [
          { id: 'a', text: 'طالبٌ مجتهدٌ' },
          { id: 'b', text: 'طالبًا مجتهدًا' },
          { id: 'c', text: 'طالبٍ مجتهدٍ' },
          { id: 'd', text: 'طالبْ مجتهدْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Mubtadaʾ and khabar are both marfūʿ: محمدٌ طالبٌ مجتهدٌ.',
          ar: 'المبتدأ والخبر مرفوعان: محمدٌ طالبٌ مجتهدٌ.',
          zh: '主语和谓语都用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb would be for kāna or inna clauses.', ar: 'النصب يخصّ خبر كان أو اسم إنّ.', zh: '宾格用于 كان/إنّ 结构。' },
          c: { en: 'Majrūr is wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn is not a valid ending.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'mub-03',
        prompt: '____ في الفصلِ طلابٌ كثيرون.',
        options: [
          { id: 'a', text: 'يوجدُ' },
          { id: 'b', text: 'يوجدَ' },
          { id: 'c', text: 'يوجدْ' },
          { id: 'd', text: 'وُجِدَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Fronted khabar: يوجد (marfūʿ) precedes the delayed subject طلاب.',
          ar: 'الخبر مقدم مرفوع: يوجد، والمبتدأ مؤخر.',
          zh: '谓语前置，用主格 يوجد；主语后置。',
        },
        whyWrong: {
          b: { en: 'Manṣūb needs a naṣb particle.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需宾格虚词。' },
          c: { en: 'Majzūm needs a jussive particle.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
          d: { en: 'Past tense mismatches the descriptive sense.', ar: 'الماضي يخالف السياق.', zh: '过去式不合语境。' },
        },
      },
      {
        id: 'mub-04',
        prompt: 'الطقسُ اليومَ ____ .',
        options: [
          { id: 'a', text: 'جميلٌ' },
          { id: 'b', text: 'جميلًا' },
          { id: 'c', text: 'جميلٍ' },
          { id: 'd', text: 'جميلْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Khabar of a plain nominal sentence is marfūʿ: الطقسُ جميلٌ.',
          ar: 'الخبر مرفوع: جميلٌ.',
          zh: '名词句谓语用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb only after كان or إنّ.', ar: 'النصب بعد كان أو إنّ.', zh: '宾格只用于 كان/إنّ 后。' },
          c: { en: 'Majrūr is wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn is not a valid ending.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'mub-05',
        prompt: 'في المدينة ____ أثريةٌ جميلة.',
        options: [
          { id: 'a', text: 'أماكنُ' },
          { id: 'b', text: 'أماكنَ' },
          { id: 'c', text: 'أماكنِ' },
          { id: 'd', text: 'أماكنْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Delayed subject after fronted khabar (في المدينة): أماكنُ marfūʿ with ḍammah.',
          ar: 'المبتدأ مؤخر مرفوع: أماكنُ.',
          zh: '主语后置，用主格 أماكنُ。',
        },
        whyWrong: {
          b: { en: 'Manṣūb would be for the object.', ar: 'النصب للمفعول.', zh: '宾格用于宾语。' },
          c: { en: 'Majrūr is wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn is wrong.', ar: 'السكون خطأ.', zh: '静符不对。' },
        },
      },
      {
        id: 'mub-06',
        prompt: 'اللغةُ العربية ____ من أصعب اللغات.',
        options: [
          { id: 'a', text: 'تُعدُّ' },
          { id: 'b', text: 'تُعدَّ' },
          { id: 'c', text: 'تُعدِّ' },
          { id: 'd', text: 'تَعُدْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The verb تُعدُّ is marfūʿ as the khabar: اللغةُ تُعدُّ = "the language is considered".',
          ar: '"تُعدُّ" فعل مضارع مرفوع، وهو الخبر.',
          zh: 'تُعدُّ 是主格动词，作谓语。',
        },
        whyWrong: {
          b: { en: 'Manṣūb needs a naṣb particle.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需宾格虚词。' },
          c: { en: 'Different vowel pattern.', ar: 'ضبط مختلف.', zh: '音标不同。' },
          d: { en: 'Jussive form and wrong meaning.', ar: 'صيغة جزم ومعنى مختلف.', zh: '切格形式且语义不符。' },
        },
      },
      {
        id: 'mub-07',
        prompt: 'أنا ____ في هذا البيت منذ سنتين.',
        options: [
          { id: 'a', text: 'أسكنُ' },
          { id: 'b', text: 'أسكنَ' },
          { id: 'c', text: 'أسكنْ' },
          { id: 'd', text: 'سكنتُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The present verb أسكن is marfūʿ because no naṣb/jazm particle precedes it.',
          ar: '"أسكنُ" مرفوع لعدم وجود ناصب أو جازم.',
          zh: '无宾格/切格虚词，动词用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb needs a naṣb particle.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需宾格虚词。' },
          c: { en: 'Majzūm needs a jussive particle.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
          d: { en: 'Past tense clashes with منذ سنتين (still ongoing).', ar: 'الماضي يخالف "منذ سنتين".', zh: '过去式与“自两年前起”语义冲突。' },
        },
      },
      {
        id: 'mub-08',
        prompt: 'الأمهاتُ ____ مسؤولياتٍ كبيرة في تربية الأبناء.',
        options: [
          { id: 'a', text: 'يتحمّلن' },
          { id: 'b', text: 'يتحمّلون' },
          { id: 'c', text: 'تتحمّلن' },
          { id: 'd', text: 'يتحمّل' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'الأمهات is feminine plural; the verb takes the nūn of feminine plural: يتحمّلن.',
          ar: '"الأمهات" جمع مؤنث، والفعل "يتحمّلن" بنون النسوة.',
          zh: 'الأمهات 是阴性复数，动词用 نون النسوة 形式 يتحمّلن。',
        },
        whyWrong: {
          b: { en: 'يتحمّلون is masculine plural.', ar: '"يتحمّلون" للجمع المذكر.', zh: 'يتحمّلون 是阳性复数。' },
          c: { en: 'تتحمّلن changes the person.', ar: '"تتحمّلن" للمخاطبات.', zh: 'تتحمّلن 是第二人称。' },
          d: { en: 'Singular, wrong agreement.', ar: 'مفرد، لا يوافق.', zh: '单数，不匹配。' },
        },
      },
      {
        id: 'mub-09',
        prompt: 'الكتابُ الذي قرأتُه ____ .',
        options: [
          { id: 'a', text: 'ممتعٌ' },
          { id: 'b', text: 'ممتعًا' },
          { id: 'c', text: 'ممتعٍ' },
          { id: 'd', text: 'ممتعْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Khabar marfūʿ: الكتابُ … ممتعٌ.',
          ar: 'الخبر مرفوع: ممتعٌ.',
          zh: '谓语用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb only after كان/إنّ.', ar: 'النصب بعد كان أو إنّ.', zh: '宾格只用于 كان/إنّ 后。' },
          c: { en: 'Majrūr is wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn is not valid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'mub-10',
        prompt: 'الفنادقُ في هذه المدينة ____ .',
        options: [
          { id: 'a', text: 'غاليةٌ' },
          { id: 'b', text: 'غاليةً' },
          { id: 'c', text: 'غاليةٍ' },
          { id: 'd', text: 'غاليةْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Khabar marfūʿ: الفنادقُ … غاليةٌ.',
          ar: 'الخبر مرفوع: غاليةٌ.',
          zh: '谓语用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb only after كان/إنّ.', ar: 'النصب بعد كان أو إنّ.', zh: '宾格只用于 كان/إنّ 后。' },
          c: { en: 'Majrūr is wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn is not valid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
    ],
  },
    // ============================================================
  // 11. إعراب الفعل المضارع — Iʿrāb of the present-tense verb
  // ============================================================
  {
    title: {
      en: 'Iʿrāb of the present-tense verb',
      ar: 'إعراب الفعل المضارع',
      zh: '现在时动词的格',
    },
    questions: [
      {
        id: 'mud-01',
        prompt: 'الطلاب يدرسون بجدٍّ ____ ينجحوا.',
        options: [
          { id: 'a', text: 'لكي' },
          { id: 'b', text: 'لكنّ' },
          { id: 'c', text: 'حتى لا' },
          { id: 'd', text: 'ثم' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'لكي is a naṣb particle: ينجحوا is manṣūb with dropped nūn.',
          ar: '"لكي" ناصبة، فيُحذف النون من "ينجحوا".',
          zh: 'لكي 是宾格虚词，动词去 نون 后为 ينجحوا。',
        },
        whyWrong: {
          b: { en: 'لكنّ introduces contrast, not purpose.', ar: '"لكنّ" للاستدراك.', zh: 'لكنّ 表转折。' },
          c: { en: 'حتى لا would negate the purpose.', ar: '"حتى لا" تنفي الغاية.', zh: 'حتى لا 否定目的。' },
          d: { en: 'ثم marks sequence.', ar: '"ثم" للترتيب.', zh: 'ثم 表顺序。' },
        },
      },
      {
        id: 'mud-02',
        prompt: 'الأمهات ____ مسؤولياتٍ كبيرةً.',
        options: [
          { id: 'a', text: 'يتحمّلون' },
          { id: 'b', text: 'يتحمّلن' },
          { id: 'c', text: 'تتحمّلن' },
          { id: 'd', text: 'يتحمّلان' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'الأمهات is feminine plural → نون النسوة: يتحمّلن (mabnī ʿalā al-sukūn).',
          ar: '"الأمهات" جمع مؤنث، والفعل مبني على السكون مع نون النسوة: يتحمّلن.',
          zh: '阴性复数主语 → 动词带 نون النسوة 且为静符。',
        },
        whyWrong: {
          a: { en: 'Masculine plural.', ar: 'جمع مذكر.', zh: '阳性复数。' },
          c: { en: 'Second-person feminine.', ar: 'خطاب للنساء.', zh: '第二人称阴性。' },
          d: { en: 'Dual form.', ar: 'مثنى.', zh: '双数。' },
        },
      },
      {
        id: 'mud-03',
        prompt: 'لن ____ إلى المدرسة اليوم لأنني مريض.',
        options: [
          { id: 'a', text: 'أذهبُ' },
          { id: 'b', text: 'أذهبَ' },
          { id: 'c', text: 'أذهبْ' },
          { id: 'd', text: 'ذهبتُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لن is a naṣb particle: أذهبَ.',
          ar: '"لن" ناصبة: أذهبَ.',
          zh: 'لن 后动词用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ is wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majzūm is wrong.', ar: 'الجزم خطأ.', zh: '切格不对。' },
          d: { en: 'Past tense does not follow لن.', ar: 'الماضي لا يلي "لن".', zh: 'لم 后不接过去式。' },
        },
      },
      {
        id: 'mud-04',
        prompt: 'متى ____ إلى القاهرة؟',
        options: [
          { id: 'a', text: 'تسافرُ' },
          { id: 'b', text: 'تسافرَ' },
          { id: 'c', text: 'تسافرْ' },
          { id: 'd', text: 'سافرت' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'No naṣb or jazm particle → the verb stays marfūʿ: تسافرُ.',
          ar: 'لا ناصب ولا جازم، فالفعل مرفوع: تسافرُ.',
          zh: '无宾格/切格虚词，动词用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb needs a naṣb particle.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需宾格虚词。' },
          c: { en: 'Majzūm needs a jussive particle.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
          d: { en: 'Past tense mismatches متى here.', ar: 'الماضي لا يناسب "متى".', zh: '过去式与 متى 不符。' },
        },
      },
      {
        id: 'mud-05',
        prompt: 'يا فاطمة، لا ____ قبل أن تنتهي من واجباتك.',
        options: [
          { id: 'a', text: 'تخرجين' },
          { id: 'b', text: 'تخرجي' },
          { id: 'c', text: 'تخرجْ' },
          { id: 'd', text: 'تخرجُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'لا الناهية + jussive feminine singular: تخرجي (drops the nūn from تخرجين).',
          ar: '"لا" الناهية + المؤنثة المفردة: تخرجي (حذف النون).',
          zh: 'لا الناهية 后阴性单数动词去 نون 为 تخرجي。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ: nūn is present, so it is not jussive.', ar: 'الرفع يقتضي وجود النون.', zh: '主格时保留 نون。' },
          c: { en: 'Masculine singular jussive, wrong gender.', ar: 'للمذكر.', zh: '阳性单数。' },
          d: { en: 'Marfūʿ, wrong.', ar: 'مرفوع.', zh: '主格错误。' },
        },
      },
      {
        id: 'mud-06',
        prompt: 'لمْ ____ أحدًا في البيت.',
        options: [
          { id: 'a', text: 'أرى' },
          { id: 'b', text: 'أرَ' },
          { id: 'c', text: 'أرِ' },
          { id: 'd', text: 'رأيتُ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'After لم, the defective verb رأى takes the jussive with alif dropped: أرَ.',
          ar: 'بعد "لم" يُجزم الفعل الناقص "أرى" بحذف الألف: أرَ.',
          zh: 'لم 后缺陷动词省略 alif 为 أرَ。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ with alif.', ar: 'مرفوع بالألف.', zh: '主格带 alif。' },
          c: { en: 'Not a valid form.', ar: 'صيغة غير فصيحة.', zh: '形式不规范。' },
          d: { en: 'Past tense after لم is wrong.', ar: 'الماضي لا يجتمع مع "لم".', zh: 'لم 后不接过去式。' },
        },
      },
      {
        id: 'mud-07',
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
          c: { en: 'Wrong form.', ar: 'صيغة غير فصيحة.', zh: '形式错误。' },
          d: { en: 'Past tense clashes with أنْ.', ar: 'الماضي لا يلي "أنْ".', zh: 'أنْ 后不接过去式。' },
        },
      },
      {
        id: 'mud-08',
        prompt: 'سوف ____ إلى بكين الأسبوع المقبل.',
        options: [
          { id: 'a', text: 'أسافرُ' },
          { id: 'b', text: 'أسافرَ' },
          { id: 'c', text: 'أسافرْ' },
          { id: 'd', text: 'سافرت' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'سوف is a future marker but does not govern naṣb: أسافرُ stays marfūʿ.',
          ar: '"سوف" حرف استقبال لا ناصب، فالفعل مرفوع: أسافرُ.',
          zh: 'سوف 表将来但不改变动词格，动词用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb needs a naṣb particle.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需宾格虚词。' },
          c: { en: 'Majzūm needs a jussive particle.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
          d: { en: 'Past tense mismatches سوف.', ar: 'الماضي يخالف "سوف".', zh: '过去式与 سوف 不符。' },
        },
      },
      {
        id: 'mud-09',
        prompt: 'ماذا ____ أن تفعلَ غدًا؟',
        options: [
          { id: 'a', text: 'تريدُ' },
          { id: 'b', text: 'تريدَ' },
          { id: 'c', text: 'تريدْ' },
          { id: 'd', text: 'أردتَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'تريد is marfūʿ because no naṣb/jazm particle precedes it; only the following تفعل is manṣūb via أنْ.',
          ar: '"تريد" مرفوع لعدم وجود ناصب، و"تفعل" منصوب بـ"أنْ".',
          zh: 'تريد 无宾格虚词故用主格；后面的 تفعل 因 أنْ 用宾格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb wrong.', ar: 'النصب خطأ.', zh: '宾格不对。' },
          c: { en: 'Majzūm wrong.', ar: 'الجزم خطأ.', zh: '切格不对。' },
          d: { en: 'Past tense wrong.', ar: 'الماضي خطأ.', zh: '过去式不对。' },
        },
      },
      {
        id: 'mud-10',
        prompt: 'أنا ____ الرياضة كل صباح.',
        options: [
          { id: 'a', text: 'أمارسُ' },
          { id: 'b', text: 'أمارسَ' },
          { id: 'c', text: 'أمارسْ' },
          { id: 'd', text: 'مارستُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'No naṣb/jazm particle → marfūʿ: أمارسُ.',
          ar: 'لا ناصب ولا جازم، فالفعل مرفوع: أمارسُ.',
          zh: '无宾格/切格虚词，用主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb needs a naṣb particle.', ar: 'النصب يحتاج ناصبًا.', zh: '宾格需宾格虚词。' },
          c: { en: 'Majzūm needs a jussive particle.', ar: 'الجزم يحتاج جازمًا.', zh: '切格需切格虚词。' },
          d: { en: 'Past tense clashes with كل صباح.', ar: 'الماضي يخالف "كل صباح".', zh: '过去式与“每天早上”不符。' },
        },
      },
      {
        id: 'mud-11',
        prompt: 'إنْ ____ بجدٍّ تنجحْ.',
        options: [
          { id: 'a', text: 'تدرسْ' },
          { id: 'b', text: 'تدرسُ' },
          { id: 'c', text: 'تدرسَ' },
          { id: 'd', text: 'درستَ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Conditional إنْ makes both verbs jussive: تدرسْ … تنجحْ.',
          ar: '"إنْ" الشرطية تجزم الفعلين: تدرسْ … تنجحْ.',
          zh: 'إنْ 条件句使两动词都用切格。',
        },
        whyWrong: {
          b: { en: 'Marfūʿ after إنْ is wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Manṣūb after إنْ is wrong.', ar: 'النصب خطأ.', zh: '宾格不对。' },
          d: { en: 'Past tense mismatches the response clause.', ar: 'الماضي لا يوافق جوابًا مضارعًا.', zh: '过去式与现在时答句不符。' },
        },
      },
      {
        id: 'mud-12',
        prompt: 'كاد الطالب ____ في الامتحان.',
        options: [
          { id: 'a', text: 'يفشلُ' },
          { id: 'b', text: 'يفشلَ' },
          { id: 'c', text: 'يفشلْ' },
          { id: 'd', text: 'فشلَ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'كاد is one of the أخوات كان; its khabar is a present verb in naṣb: يفشلَ.',
          ar: '"كاد" من أخوات "كان"، وخبرها فعل مضارع منصوب: يفشلَ.',
          zh: 'كاد 属 كان的姊妹词，其谓语是宾格现在时动词。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ is wrong after كاد.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majzūm is wrong.', ar: 'الجزم خطأ.', zh: '切格不对。' },
          d: { en: 'Past tense is wrong after كاد.', ar: 'الماضي خطأ.', zh: '过去式不对。' },
        },
      },
    ],
  },
    // ============================================================
  // 12. النعت والمنعوت — Adjective-noun agreement
  // ============================================================
  {
    title: {
      en: 'Adjective-noun agreement',
      ar: 'النعت والمنعوت',
      zh: '形容词与名词的搭配',
    },
    questions: [
      {
        id: 'naat-01',
        prompt: 'زارنا أمس صديق والدي، وهو شابٌ وسيمٌ ____ أسمرُ البشرة.',
        options: [
          { id: 'a', text: 'طويلُ القامةِ' },
          { id: 'b', text: 'طويلَ القامةَ' },
          { id: 'c', text: 'طويلُ القامةُ' },
          { id: 'd', text: 'طويلٌ القامةُ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'طويل is a naʿt of وسيم (marfūʿ); so طويل is marfūʿ with ḍammah; and its muḍāf ilayh القامة is majrūr: طويلُ القامةِ.',
          ar: '"طويل" نعت لـ"وسيم" المرفوع، فيكون مرفوعًا، والمضاف إليه "القامة" مجرور.',
          zh: 'طويل 是 وسيم 的形容词，用主格；其正偏组合的第二项 القامة 用属格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb would be for ḥāl, not naʿt.', ar: 'النصب للحال لا للنعت.', zh: '宾格用于状语，不用于形容词。' },
          c: { en: 'القامة must be majrūr as muḍāf ilayh.', ar: 'المضاف إليه مجرور.', zh: '正偏组合第二项需用属格。' },
          d: { en: 'Tanwīn on طويل contradicts the iḍāfah.', ar: 'التنوين ينافي الإضافة.', zh: '正偏组合中不能带鼻音。' },
        },
      },
      {
        id: 'naat-02',
        prompt: 'قرأتُ كتابًا ____ .',
        options: [
          { id: 'a', text: 'ممتعٌ' },
          { id: 'b', text: 'ممتعًا' },
          { id: 'c', text: 'ممتعٍ' },
          { id: 'd', text: 'ممتعْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'كتابًا is manṣūb, so its naʿt is also manṣūb: ممتعًا.',
          ar: '"كتابًا" منصوب، فنعته منصوب: ممتعًا.',
          zh: 'كتابًا 是宾格，形容词也用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ mismatches the manʿūt.', ar: 'الرفع يخالف المنعوت.', zh: '主格与所修饰词不符。' },
          c: { en: 'Majrūr mismatches.', ar: 'الجرّ يخالف.', zh: '属格不符。' },
          d: { en: 'Sukūn is not valid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'naat-03',
        prompt: 'سكنتُ في بيتٍ ____ .',
        options: [
          { id: 'a', text: 'كبيرٌ' },
          { id: 'b', text: 'كبيرًا' },
          { id: 'c', text: 'كبيرٍ' },
          { id: 'd', text: 'كبيرْ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'بيتٍ is majrūr, so the naʿt is majrūr: كبيرٍ.',
          ar: '"بيتٍ" مجرور، فنعته مجرور: كبيرٍ.',
          zh: 'بيتٍ 是属格，形容词也用属格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ mismatches.', ar: 'الرفع يخالف.', zh: '主格不符。' },
          b: { en: 'Manṣūb mismatches.', ar: 'النصب يخالف.', zh: '宾格不符。' },
          d: { en: 'Sukūn is not valid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'naat-04',
        prompt: 'قابلتُ طالبةً ____ .',
        options: [
          { id: 'a', text: 'ممتازةٌ' },
          { id: 'b', text: 'ممتازةً' },
          { id: 'c', text: 'ممتازةٍ' },
          { id: 'd', text: 'ممتازةْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'طالبةً is feminine singular manṣūb, so the naʿt is ممتازةً.',
          ar: '"طالبةً" منصوبة، فنعتها منصوب: ممتازةً.',
          zh: 'طالبةً 是阴性单数宾格，形容词同用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ mismatches.', ar: 'الرفع يخالف.', zh: '主格不符。' },
          c: { en: 'Majrūr mismatches.', ar: 'الجرّ يخالف.', zh: '属格不符。' },
          d: { en: 'Sukūn is not valid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'naat-05',
        prompt: 'هاتان طالبتان ____ .',
        options: [
          { id: 'a', text: 'مجتهدتان' },
          { id: 'b', text: 'مجتهدون' },
          { id: 'c', text: 'مجتهدات' },
          { id: 'd', text: 'مجتهدين' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The naʿt agrees with the manʿūt in gender, number, case, and definiteness: طالبتان (feminine dual marfūʿ) → مجتهدتان.',
          ar: 'النعت يطابق المنعوت في أربعة: طالبتان مثنى مؤنث مرفوع → مجتهدتان.',
          zh: '形容词与所修饰名词在性、数、格、确指性上一致：مجتهدتان。',
        },
        whyWrong: {
          b: { en: 'Masculine plural mismatches.', ar: 'جمع مذكر يخالف.', zh: '阳性复数不符。' },
          c: { en: 'Plural mismatches dual.', ar: 'الجمع يخالف المثنى.', zh: '复数与双数不符。' },
          d: { en: 'Masculine plural in naṣb/jarr.', ar: 'جمع مذكر منصوب/مجرور.', zh: '阳性复数宾/属格。' },
        },
      },
      {
        id: 'naat-06',
        prompt: 'هذا هو الكتابُ ____ .',
        options: [
          { id: 'a', text: 'المفيدُ' },
          { id: 'b', text: 'المفيدَ' },
          { id: 'c', text: 'المفيدِ' },
          { id: 'd', text: 'مفيدٌ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'الكتاب is definite marfūʿ, so its naʿt is definite marfūʿ: المفيدُ.',
          ar: '"الكتاب" معرفة مرفوع، فنعته معرفة مرفوع: المفيدُ.',
          zh: 'الكتاب 是确指主格，形容词也需确指主格。',
        },
        whyWrong: {
          b: { en: 'Manṣūb mismatches.', ar: 'النصب يخالف.', zh: '宾格不符。' },
          c: { en: 'Majrūr mismatches.', ar: 'الجرّ يخالف.', zh: '属格不符。' },
          d: { en: 'Indefinite mismatches the definite manʿūt.', ar: 'النكرة تخالف المعرفة.', zh: '不定与确指不符。' },
        },
      },
    ],
  },
    // ============================================================
  // 13. الضمائر والأسماء الإشارية — Pronouns and demonstratives
  // ============================================================
  {
    title: {
      en: 'Pronouns and demonstratives',
      ar: 'الضمائر والأسماء الإشارية',
      zh: '代词与指示词',
    },
    questions: [
      {
        id: 'pro-01',
        prompt: '____ البنتان هما اللتان كتبتا المفردات كلها بدون خطأ.',
        options: [
          { id: 'a', text: 'هذان' },
          { id: 'b', text: 'هاتين' },
          { id: 'c', text: 'هاتان' },
          { id: 'd', text: 'هذين' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'البنتان is feminine dual nominative, so the demonstrative is هاتان.',
          ar: '"البنتان" مثنى مؤنث مرفوع، فاسم الإشارة "هاتان".',
          zh: 'البنتان 是阴性双数主格，指示代词用 هاتان。',
        },
        whyWrong: {
          a: { en: 'Masculine dual.', ar: 'مثنى مذكر.', zh: '阳性双数。' },
          b: { en: 'Feminine dual but in naṣb/jarr.', ar: 'مثنى مؤنث منصوب/مجرور.', zh: '阴性双数宾/属格。' },
          d: { en: 'Masculine dual in naṣb/jarr.', ar: 'مثنى مذكر منصوب/مجرور.', zh: '阳性双数宾/属格。' },
        },
      },
      {
        id: 'pro-02',
        prompt: '____ هم الطلاب الذين نجحوا في الامتحان.',
        options: [
          { id: 'a', text: 'هذا' },
          { id: 'b', text: 'هذه' },
          { id: 'c', text: 'هؤلاء' },
          { id: 'd', text: 'هذان' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'Masculine plural human referent → هؤلاء.',
          ar: '"هم الطلاب" جمع مذكر عاقل، فالإشارة "هؤلاء".',
          zh: '阳性复数人 → 指示代词 هؤلاء。',
        },
        whyWrong: {
          a: { en: 'Masculine singular.', ar: 'مفرد مذكر.', zh: '阳性单数。' },
          b: { en: 'Feminine singular.', ar: 'مفردة مؤنثة.', zh: '阴性单数。' },
          d: { en: 'Masculine dual.', ar: 'مثنى مذكر.', zh: '阳性双数。' },
        },
      },
      {
        id: 'pro-03',
        prompt: 'هذه ____ جميلة وكبيرة تقع على شاطئ البحر.',
        options: [
          { id: 'a', text: 'مدينةٍ' },
          { id: 'b', text: 'المدينتين' },
          { id: 'c', text: 'المدينتان' },
          { id: 'd', text: 'المدينةُ' },
        ],
        correctOptionId: 'd',
        whyCorrect: {
          en: 'هذه + definite feminine singular noun → المدينةُ (mubtadaʾ marfūʿ).',
          ar: '"هذه" + اسم معرفة مفرد مؤنث: المدينةُ (مبتدأ مرفوع).',
          zh: 'هذه + 阴性单数确指名词 → المدينةُ（主格主语）。',
        },
        whyWrong: {
          a: { en: 'Indefinite does not follow a demonstrative directly.', ar: 'النكرة لا تلي اسم الإشارة مباشرة.', zh: '不定名词不能直接跟在指示词后。' },
          b: { en: 'Dual in naṣb/jarr.', ar: 'مثنى منصوب/مجرور.', zh: '双数宾/属格。' },
          c: { en: 'Dual, wrong number.', ar: 'مثنى، والعدد مطلوب مفرد.', zh: '双数不符。' },
        },
      },
      {
        id: 'pro-04',
        prompt: 'كتابي جديدٌ، و____ أيضًا جديد.',
        options: [
          { id: 'a', text: 'كتابك' },
          { id: 'b', text: 'كتابهُ' },
          { id: 'c', text: 'كتابهما' },
          { id: 'd', text: 'كتابهم' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The sentence is addressed to the listener (contrast with كتابي): كتابك (your book).',
          ar: 'الخطاب مع المتكلم يقابله المخاطب: "كتابك".',
          zh: '与“我的书”相对，需用第二人称：كتابك。',
        },
        whyWrong: {
          b: { en: 'Third-person singular, wrong person.', ar: 'غائب مفرد.', zh: '第三人称单数。' },
          c: { en: 'Dual, wrong number.', ar: 'مثنى.', zh: '双数。' },
          d: { en: 'Third-person plural.', ar: 'غائب جمع.', zh: '第三人称复数。' },
        },
      },
      {
        id: 'pro-05',
        prompt: 'هاتان هما ____ اللتان ساعدتاني.',
        options: [
          { id: 'a', text: 'الصديقتان' },
          { id: 'b', text: 'الصديقتين' },
          { id: 'c', text: 'الصديقات' },
          { id: 'd', text: 'صديقتان' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'After هما, the noun is definite marfūʿ dual feminine: الصديقتان.',
          ar: 'بعد "هما" يأتي الاسم معرفة مرفوعًا مثنى: الصديقتان.',
          zh: 'هما 后接确指主格阴性双数名词：الصديقتان。',
        },
        whyWrong: {
          b: { en: 'Dual in naṣb/jarr.', ar: 'مثنى منصوب/مجرور.', zh: '双数宾/属格。' },
          c: { en: 'Plural, wrong number.', ar: 'جمع، والعدد مطلوب مثنى.', zh: '复数不符。' },
          d: { en: 'Indefinite.', ar: 'نكرة.', zh: '不定。' },
        },
      },
      {
        id: 'pro-06',
        prompt: 'قال الأستاذ للطلاب: إنّ ____ مجتهدون.',
        options: [
          { id: 'a', text: 'أنتم' },
          { id: 'b', text: 'هم' },
          { id: 'c', text: 'نحن' },
          { id: 'd', text: 'أنت' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'The teacher addresses the students: أنتم (you, masculine plural).',
          ar: 'خطاب الطلاب: أنتم.',
          zh: '老师对学生们说：أنتم。',
        },
        whyWrong: {
          b: { en: 'Third-person plural, wrong person.', ar: 'غائب جمع.', zh: '第三人称复数。' },
          c: { en: 'First-person plural, wrong person.', ar: 'متكلم جمع.', zh: '第一人称复数。' },
          d: { en: 'Singular, wrong number.', ar: 'مفرد.', zh: '单数。' },
        },
      },
    ],
  },

    // ============================================================
  // 14. تعدّي الفعل ومفعولاته — Verb transitivity and objects
  // ============================================================
  {
    title: {
      en: 'Verb transitivity and objects',
      ar: 'تعدّي الفعل ومفعولاته',
      zh: '动词的及物性与宾语',
    },
    questions: [
      {
        id: 'trans-01',
        prompt: 'أعطيتُ الفقراء ____ الشتاء لأن الجو بارد.',
        options: [
          { id: 'a', text: 'الملابسُ' },
          { id: 'b', text: 'ملابسُ' },
          { id: 'c', text: 'ملابسًا' },
          { id: 'd', text: 'ملابسٍ' },
        ],
        correctOptionId: 'c',
        whyCorrect: {
          en: 'أعطى takes two objects: الفقراء (first) and ملابسًا (second, manṣūb).',
          ar: '"أعطى" تنصب مفعولين: الفقراء، ملابسًا.',
          zh: 'أعطى 后接双宾语，第二宾语用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ wrong for object.', ar: 'الرفع لا يصلح.', zh: '主格不能作宾语。' },
          b: { en: 'Without tanwīn it is not a valid indefinite accusative.', ar: 'بدون تنوين لا يستقيم.', zh: '无鼻音不成立。' },
          d: { en: 'Majrūr needs a preposition.', ar: 'الجرّ يحتاج حرفًا.', zh: '属格需介词。' },
        },
      },
      {
        id: 'trans-02',
        prompt: 'أهديتُ صديقي ____ .',
        options: [
          { id: 'a', text: 'كتابٌ' },
          { id: 'b', text: 'كتابًا' },
          { id: 'c', text: 'كتابٍ' },
          { id: 'd', text: 'كتابْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'أهدى takes two objects: صديقي (first) and كتابًا (second, manṣūb).',
          ar: '"أهدى" تنصب مفعولين: صديقي، كتابًا.',
          zh: 'أهدى 后接双宾语，第二宾语用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'trans-03',
        prompt: 'ظننتُ الجوَّ ____ .',
        options: [
          { id: 'a', text: 'باردٌ' },
          { id: 'b', text: 'باردًا' },
          { id: 'c', text: 'باردٍ' },
          { id: 'd', text: 'باردْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'ظنّ is a verb of the heart (أفعال القلوب) taking two objects: الجوَّ and باردًا.',
          ar: '"ظنّ" من أفعال القلوب تنصب مفعولين: الجوَّ، باردًا.',
          zh: 'ظنّ 是心灵动词，后接两个宾语：الجوَّ、باردًا。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ wrong for the second object.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'trans-04',
        prompt: 'أعلمتُ زميلي ____ .',
        options: [
          { id: 'a', text: 'الخبرُ' },
          { id: 'b', text: 'الخبرَ' },
          { id: 'c', text: 'الخبرِ' },
          { id: 'd', text: 'خبرٌ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'أعلم takes three objects: زميلي (first), الخبرَ (second). Definite manṣūb.',
          ar: '"أعلم" تنصب ثلاثة مفاعيل، والثاني هنا "الخبرَ" منصوب.',
          zh: 'أعلم 可接三个宾语，此处第二个用宾格确指。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Indefinite clashes with the article.', ar: 'النكرة تخالف "ال".', zh: '不定与冠词不符。' },
        },
      },
      {
        id: 'trans-05',
        prompt: 'منح المديرُ الموظفَ ____ .',
        options: [
          { id: 'a', text: 'مكافأةً' },
          { id: 'b', text: 'مكافأةٌ' },
          { id: 'c', text: 'مكافأةٍ' },
          { id: 'd', text: 'مكافأةْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'منح takes two objects: الموظفَ (first) and مكافأةً (second, manṣūb).',
          ar: '"منح" تنصب مفعولين: الموظفَ، مكافأةً.',
          zh: 'منح 后接双宾语，第二宾语用宾格。',
        },
        whyWrong: {
          b: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'trans-06',
        prompt: 'جعل اللهُ الماءَ ____ .',
        options: [
          { id: 'a', text: 'حياةٌ' },
          { id: 'b', text: 'حياةً' },
          { id: 'c', text: 'حياةٍ' },
          { id: 'd', text: 'حياةْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'جعل takes two objects: الماءَ (first) and حياةً (second, manṣūb).',
          ar: '"جعل" تنصب مفعولين: الماءَ، حياةً.',
          zh: 'جعل 后接双宾语，第二宾语用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'trans-07',
        prompt: 'علّمتُ الطالبَ ____ .',
        options: [
          { id: 'a', text: 'القراءةُ' },
          { id: 'b', text: 'القراءةَ' },
          { id: 'c', text: 'القراءةِ' },
          { id: 'd', text: 'قراءةٌ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'علّم takes two objects: الطالبَ (first) and القراءةَ (second, manṣūb).',
          ar: '"علّم" تنصب مفعولين: الطالبَ، القراءةَ.',
          zh: 'علّم 后接双宾语，第二宾语用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Indefinite clashes with the article.', ar: 'النكرة تخالف "ال".', zh: '不定与冠词不符。' },
        },
      },
      {
        id: 'trans-08',
        prompt: 'وجدتُ الكتابَ ____ .',
        options: [
          { id: 'a', text: 'ممتعٌ' },
          { id: 'b', text: 'ممتعًا' },
          { id: 'c', text: 'ممتعٍ' },
          { id: 'd', text: 'ممتعْ' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'وجد (of the heart) takes two objects: الكتابَ and ممتعًا (manṣūb).',
          ar: '"وجد" القلبية تنصب مفعولين: الكتابَ، ممتعًا.',
          zh: 'وجد 后接双宾语，第二宾语用宾格。',
        },
        whyWrong: {
          a: { en: 'Marfūʿ wrong for the second object.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
    ],
  },
    // ============================================================
  // 15. الاستثناء والأعداد المركّبة — Exception and compound numbers
  // ============================================================
  {
    title: {
      en: 'Exception and compound numbers',
      ar: 'الاستثناء والأعداد المركّبة',
      zh: '例外与合成数词',
    },
    questions: [
      {
        id: 'excp-01',
        prompt: 'حضر الطلابُ ____ خالدًا.',
        options: [
          { id: 'a', text: 'إلا' },
          { id: 'b', text: 'غير' },
          { id: 'c', text: 'سوى' },
          { id: 'd', text: 'بل' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'إلا introduces the exception. In an affirmative complete sentence, the mustathnā is manṣūb: خالدًا.',
          ar: '"إلا" للاستثناء، والمستثنى منصوب في الكلام التام الموجب: خالدًا.',
          zh: 'إلا 引出例外；肯定完整句中例外词用宾格。',
        },
        whyWrong: {
          b: { en: 'غير works but requires a different structure (خالدٍ).', ar: '"غير" تحتاج المضاف إليه مجرورًا.', zh: 'غير 需后接属格名词。' },
          c: { en: 'سوى works similarly but the blank pattern is إلا.', ar: '"سوى" صحيحة لكن الصيغة مع "إلا".', zh: 'سوى 也可，但搭配应是 إلا。' },
          d: { en: 'بل is for correction.', ar: '"بل" للإضراب.', zh: 'بل 表纠正。' },
        },
      },
      {
        id: 'excp-02',
        prompt: 'ما نجح ____ محمدٌ.',
        options: [
          { id: 'a', text: 'إلا' },
          { id: 'b', text: 'غير' },
          { id: 'c', text: 'سوى' },
          { id: 'd', text: 'لكن' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'In a negative sentence with إلا, the mustathnā may be marfūʿ as badal: ما نجح إلا محمدٌ.',
          ar: 'في الكلام المنفي مع "إلا" يجوز رفع المستثنى على البدلية: محمدٌ.',
          zh: '否定句中 إلا 后例外词可用主格（بدل）：محمدٌ。',
        },
        whyWrong: {
          b: { en: 'غير changes the structure and case.', ar: '"غير" تغيّر البنية والإعراب.', zh: 'غير 改变结构和格。' },
          c: { en: 'سوى similar issue.', ar: '"سوى" كذلك.', zh: 'سوى 同理。' },
          d: { en: 'لكن is for contrast.', ar: '"لكن" للاستدراك.', zh: 'لكن 表转折。' },
        },
      },
      {
        id: 'excp-03',
        prompt: 'جاء الطلابُ ____ خالدٍ.',
        options: [
          { id: 'a', text: 'إلا' },
          { id: 'b', text: 'غير' },
          { id: 'c', text: 'بل' },
          { id: 'd', text: 'أو' },
        ],
        correctOptionId: 'b',
        whyCorrect: {
          en: 'غير is a noun used for exception; the mustathnā minhu becomes muḍāf ilayh and the mustathnā takes the same case as the noun before غير.',
          ar: '"غير" اسم للاستثناء، وما بعدها مجرور بالإضافة.',
          zh: 'غير 作名词表例外，后接属格名词。',
        },
        whyWrong: {
          a: { en: 'إلا would require خالدًا in the accusative.', ar: '"إلا" تحتاج "خالدًا".', zh: 'إلا 需后接宾格 خالدًا。' },
          c: { en: 'بل wrong function.', ar: '"بل" للإضراب.', zh: 'بل 功能不符。' },
          d: { en: 'أو for choice.', ar: '"أو" للتخيير.', zh: 'أو 表选择。' },
        },
      },
      {
        id: 'excp-04',
        prompt: 'حضر أحدَ عشرَ ____ .',
        options: [
          { id: 'a', text: 'طالبًا' },
          { id: 'b', text: 'طالبٌ' },
          { id: 'c', text: 'طالبٍ' },
          { id: 'd', text: 'طالبْ' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Tamyīz after 11–99 is manṣūb singular: أحد عشر طالبًا.',
          ar: 'التمييز بعد الأعداد ١١–٩٩ منصوب مفرد: أحد عشر طالبًا.',
          zh: '11–99 后的区分语用宾格单数。',
        },
        whyWrong: {
          b: { en: 'Marfūʿ wrong.', ar: 'الرفع خطأ.', zh: '主格不对。' },
          c: { en: 'Majrūr wrong.', ar: 'الجرّ خطأ.', zh: '属格不对。' },
          d: { en: 'Sukūn invalid.', ar: 'السكون لا يصحّ.', zh: '静符不对。' },
        },
      },
      {
        id: 'excp-05',
        prompt: 'سافر ____ طالبًا إلى بكين.',
        options: [
          { id: 'a', text: 'خمسةَ عشرَ' },
          { id: 'b', text: 'خمسةَ عشرةَ' },
          { id: 'c', text: 'خمسَ عشرةَ' },
          { id: 'd', text: 'خمس عشر' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'طالبًا is masculine singular, so 15 uses the masculine form خمسة عشر.',
          ar: '"طالبًا" مذكر مفرد، فالعدد "خمسة عشر" بالمذكر.',
          zh: 'طالبًا 是阳性单数，用阳性形式 خمسة عشر。',
        },
        whyWrong: {
          b: { en: 'خمسة عشرة is not used before masculine counted nouns.', ar: '"خمسة عشرة" غير مستعملة قبل المذكر.', zh: 'خمسة عشرة 不用于阳性所数名词前。' },
          c: { en: 'خمس عشرة is feminine form.', ar: '"خمس عشرة" للمؤنث.', zh: 'خمس عشرة 是阴性形式。' },
          d: { en: 'Without tāʾ is wrong.', ar: 'بدون التاء لا تصح.', zh: '缺 ة 不成立。' },
        },
      },
      {
        id: 'excp-06',
        prompt: 'في الصف ____ طالبةً.',
        options: [
          { id: 'a', text: 'عشرونَ' },
          { id: 'b', text: 'عشرينَ' },
          { id: 'c', text: 'عشرون' },
          { id: 'd', text: 'عشرين' },
        ],
        correctOptionId: 'a',
        whyCorrect: {
          en: 'Mubtadaʾ muʾakhkhar (delayed subject) is marfūʿ with wāw: عشرونَ. The tamyīz طالبةً is manṣūb.',
          ar: '"عشرون" مرفوع بالواو، و"طالبةً" تمييز منصوب.',
          zh: '主语后置用主格 عشرونَ；区分语 طالبةً 用宾格。',
        },
        whyWrong: {
          b: { en: 'عشرين is naṣb/jarr.', ar: '"عشرين" منصوب/مجرور.', zh: 'عشرين 是宾/属格。' },
          c: { en: 'Missing the fatḥah on the nūn of rafʿ.', ar: 'الفتحة على النون للرفع.', zh: '主格时需在 نون 上带开口符。' },
          d: { en: 'عشرين is naṣb/jarr.', ar: 'منصوب/مجرور.', zh: '宾/属格。' },
        },
      },
    ],
  },

]

export function getLessonCount() {
  return arabicRulesLessons.length
}