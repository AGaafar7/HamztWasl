// scripts/restructure-i18n.mjs
//
// One-shot restructure: moves all public pages under app/(public)/[locale]/
// and all private pages under app/(app)/, converts climbing relative
// imports to @/ aliases, writes the two route-group layout files, and
// deletes app/layout.jsx.
//
// Idempotent-ish: if a file is already in its new location, it skips the
// move for that file but still rewrites its imports.
//
// Run from the project root:  node scripts/restructure-i18n.mjs

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { dirname, join, relative, resolve, sep } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
process.chdir(ROOT)

function sh(cmd) {
  execSync(cmd, { stdio: 'inherit' })
}

function tryMkdir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true })
}

function gitMv(from, to) {
  if (!existsSync(from)) {
    console.log(`  (skip — ${from} does not exist)`)
    return
  }
  tryMkdir(dirname(to))
  sh(`git mv "${from}" "${to}"`)
  console.log(`  ${from} → ${to}`)
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

// ─────────────────────────────────────────────────────────────
// 1. Move public pages
// ─────────────────────────────────────────────────────────────
console.log('\n[1/5] Moving public pages into app/(public)/[locale]/ …')
tryMkdir('app/(public)/[locale]/terms')
tryMkdir('app/(public)/[locale]/privacy')

gitMv('app/page.jsx',                 'app/(public)/[locale]/page.jsx')
gitMv('app/terms/page.jsx',           'app/(public)/[locale]/terms/page.jsx')
gitMv('app/privacy/page.jsx',         'app/(public)/[locale]/privacy/page.jsx')
// Remove now-empty folders
try { sh('rmdir app/terms app/privacy 2>/dev/null || true') } catch {}

// ─────────────────────────────────────────────────────────────
// 2. Move private pages
// ─────────────────────────────────────────────────────────────
console.log('\n[2/5] Moving private pages into app/(app)/ …')
tryMkdir('app/(app)')

gitMv('app/portal',       'app/(app)/portal')
gitMv('app/instructor',   'app/(app)/instructor')
gitMv('app/login',        'app/(app)/login')
gitMv('app/register',     'app/(app)/register')
gitMv('app/auth',         'app/(app)/auth')

// ─────────────────────────────────────────────────────────────
// 3. Rewrite climbing relative imports to @/ aliases in moved files
// ─────────────────────────────────────────────────────────────
console.log('\n[3/5] Rewriting imports in moved files …')

const MOVED_DIRS = ['app/(public)', 'app/(app)']

const IMPORT_RE = /(from\s+['"])((?:\.\.\/)+)([^'"]+)(['"])/g

function rewriteImportsIn(file) {
  const original = readFileSync(file, 'utf8')
  const fileDir = dirname(file)

  const rewritten = original.replace(IMPORT_RE, (full, pre, dots, rest, post) => {
    // Resolve the target on disk from the file's current location.
    const target = resolve(fileDir, dots + rest)
    // If it resolves inside app/(public) or app/(app), leave it relative —
    // intra-tree imports are fine and don't benefit from aliasing.
    const rel = relative(ROOT, target).split(sep).join('/')
    const insideAppGroup =
      rel.startsWith('app/(public)/') || rel.startsWith('app/(app)/')

    if (insideAppGroup) return full

    // Everything else (lib/, components/, data/, i18n/, context/, utils/,
    // app/actions/, app/api/) gets a @/ alias so it's depth-independent.
    return `${pre}@/${rest}${post}`
  })

  if (rewritten !== original) {
    writeFileSync(file, rewritten)
    return true
  }
  return false
}

let rewrittenCount = 0
for (const dir of MOVED_DIRS) {
  for (const file of walk(dir)) {
    if (!/\.(jsx?|mjs)$/.test(file)) continue
    if (rewriteImportsIn(file)) {
      console.log(`  ✎ ${relative(ROOT, file)}`)
      rewrittenCount++
    }
  }
}
console.log(`  (${rewrittenCount} files rewritten)`)

// ─────────────────────────────────────────────────────────────
// 4. Write the two route-group layouts, delete old root layout
// ─────────────────────────────────────────────────────────────
console.log('\n[4/5] Writing route-group layouts …')

const FONTS_BLOCK = `import { Manrope, Inter, Cairo } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
})`

const PUBLIC_LAYOUT = `import '../globals.css'
${FONTS_BLOCK}
import Providers from '@/components/Providers.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'

export const metadata = {
  metadataBase: new URL('https://hamztwasl.app'),
  title: {
    default: 'Hamzat Wasl — Learn Arabic, Letter by Letter',
    template: '%s | Hamzat Wasl',
  },
  description:
    "Hamzat Wasl helps learners everywhere learn Arabic from the alphabet up, with native instructors, real video lessons, and structured courses.",
  openGraph: {
    title: 'Hamzat Wasl — Learn Arabic, Letter by Letter',
    description:
      "Real instructors, structured letter-by-letter courses, and a learning path that shows exactly how far you've come.",
    type: 'website',
  },
}

// Locale → BCP-47 / dir mapping. Add new locales here and in
// middleware.js's LOCALES array; nothing else needs to change.
const LOCALE_META = {
  en: { htmlLang: 'en', dir: 'ltr' },
  ar: { htmlLang: 'ar', dir: 'rtl' },
  zh: { htmlLang: 'zh', dir: 'ltr' },
}

export function generateStaticParams() {
  return Object.keys(LOCALE_META).map((locale) => ({ locale }))
}

export default async function PublicLayout({ children, params }) {
  const { locale } = await params
  const meta = LOCALE_META[locale] || LOCALE_META.en

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      className={\`\${manrope.variable} \${inter.variable} \${cairo.variable}\`}
    >
      <body>
        <Providers initialLocale={locale}>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
`

const APP_LAYOUT = `import '../globals.css'
${FONTS_BLOCK}
import Providers from '@/components/Providers.jsx'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/Footer.jsx'

export default function AppLayout({ children }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={\`\${manrope.variable} \${inter.variable} \${cairo.variable}\`}
    >
      <body>
        <Providers initialLocale="en">
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
`

writeFileSync('app/(public)/[locale]/layout.jsx', PUBLIC_LAYOUT)
console.log("  ✓ wrote app/(public)/[locale]/layout.jsx")

writeFileSync('app/(app)/layout.jsx', APP_LAYOUT)
console.log("  ✓ wrote app/(app)/layout.jsx")

if (existsSync('app/layout.jsx')) {
  sh('git rm app/layout.jsx')
  console.log("  ✓ deleted app/layout.jsx")
}

// ─────────────────────────────────────────────────────────────
// 5. Done
// ─────────────────────────────────────────────────────────────
console.log('\n[5/5] Done.')
console.log('\nNext steps:')
console.log('  1. Run `npm run build` — fix any import errors it reports.')
console.log('  2. See the conversation for the remaining files to edit by hand:')
console.log('     - i18n/metadata.js (new)')
console.log('     - i18n/LanguageContext.jsx (edit)')
console.log('     - components/Navbar.jsx (edit LanguageSwitcher to navigate)')
console.log('     - middleware.js (add rewrite for / → /en)')
console.log('     - app/sitemap.js (new)')