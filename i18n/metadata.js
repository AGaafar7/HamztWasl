// i18n/metadata.js
//
// Per-locale SEO strings. Kept separate from translations.js because
// these are for crawlers, not the UI.
//
// `alternates.languages` tells Google which URL serves which locale for
// the same content, so /, /ar, and /zh are understood as the same page
// in three languages rather than three duplicate pages.

export const SITE_URL = 'https://hamztwasl.vercel.app'

export const LOCALES = ['en', 'ar', 'zh']
export const DEFAULT_LOCALE = 'en'

const TITLES = {
  en: {
    home: 'Hamzat Wasl — Learn Arabic, Letter by Letter',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    contact: 'Contact Us',
  },
  ar: {
    home: 'همزة وصل — تعلّم العربية حرفًا حرفًا',
    terms: 'شروط الخدمة',
    privacy: 'سياسة الخصوصية',
    contact: 'اتصل بنا',
  },
  zh: {
    home: 'Hamzat Wasl — 一个字母一个字母地学阿拉伯语',
    terms: '服务条款',
    privacy: '隐私政策',
    contact: '联系我们',
  },
}

const DESCRIPTIONS = {
  en: {
    home: 'Hamzat Wasl helps learners everywhere learn Arabic from the alphabet up, with native instructors, real video lessons, and structured courses.',
    terms: 'Terms of service for the Hamzat Wasl Arabic learning platform.',
    privacy: 'Privacy policy for the Hamzat Wasl Arabic learning platform.',
    contact: 'Get in touch with the Hamzat Wasl team — email or phone.',
  },
  ar: {
    home: 'همزة وصل تساعد المتعلمين في كل مكان على تعلّم العربية من الأبجدية، مع مدرّسين أصليين ودروس فيديو حقيقية ودورات منظمة.',
    terms: 'شروط استخدام منصة همزة وصل لتعلم اللغة العربية.',
    privacy: 'سياسة الخصوصية لمنصة همزة وصل لتعلم اللغة العربية.',
    contact: 'تواصل مع فريق همزة وصل — بالبريد الإلكتروني أو الهاتف.',
  },
  zh: {
    home: 'Hamzat Wasl 帮助世界各地的学习者从字母表开始学习阿拉伯语，配有母语导师、真实视频课程和系统化学习路径。',
    terms: 'Hamzat Wasl 阿拉伯语学习平台的服务条款。',
    privacy: 'Hamzat Wasl 阿拉伯语学习平台的隐私政策。',
    contact: '通过电子邮件或电话联系 Hamzat Wasl 团队。',
  },
}

/**
 * Build a Metadata object for one page in one locale.
 * `page` is 'home' | 'terms' | 'privacy'.
 * `pathFor` is a function (locale) => path for this page in that locale.
 *  - For home: (l) => l === 'en' ? '/' : `/${l}`
 *  - For terms/privacy: (l) => l === 'en' ? '/terms' : `/${l}/terms`
 */
export function metadataFor(page, locale, pathFor) {
  const title = TITLES[locale][page]
  const description = DESCRIPTIONS[locale][page]
  const path = pathFor(locale)

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: Object.fromEntries([
        ...LOCALES.map((l) => [l, pathFor(l)]),
        ['x-default', pathFor(DEFAULT_LOCALE)],
      ]),
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Hamzat Wasl',
      locale:
        locale === 'ar' ? 'ar_SA' : locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
    },
  }
}

/** Path helper for the home page in a given locale. */
export const homePath = (locale) =>
  locale === DEFAULT_LOCALE ? '/' : `/${locale}`

/** Path helper for terms. */
export const termsPath = (locale) =>
  locale === DEFAULT_LOCALE ? '/terms' : `/${locale}/terms`

/** Path helper for privacy. */
export const privacyPath = (locale) =>
  locale === DEFAULT_LOCALE ? '/privacy' : `/${locale}/privacy`

/** Path helper for contact. */
export const contactPath = (locale) =>
  locale === DEFAULT_LOCALE ? '/contact' : `/${locale}/contact`