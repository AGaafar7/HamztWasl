// scripts/seed-letter-content.mjs
//
// Seeds letter_vocabulary and letter_expressions with beginner content.
// Run once:  node scripts/seed-letter-content.mjs
//
// Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.

import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import path from 'path'
import { config } from 'dotenv'

config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

// ---------------------------------------------------------------------------
// VOCABULARY — 10 words per letter. The letter is present somewhere in the
// word (not necessarily at the start).
// ---------------------------------------------------------------------------

const VOCAB = {
  alif: [
    { ar: 'أَسَد',    tr: 'asad',       en: 'Lion' },
    { ar: 'أُم',      tr: 'umm',        en: 'Mother' },
    { ar: 'أَرْنَب',  tr: 'arnab',      en: 'Rabbit' },
    { ar: 'بَاب',     tr: 'baab',       en: 'Door' },
    { ar: 'كِتَاب',   tr: 'kitaab',     en: 'Book' },
    { ar: 'مَاء',     tr: 'maa’',       en: 'Water' },
    { ar: 'سَمَاء',   tr: 'samaa’',     en: 'Sky' },
    { ar: 'قَلَم',    tr: 'qalam',      en: 'Pen' },
    { ar: 'وَلَد',    tr: 'walad',      en: 'Boy' },
    { ar: 'بِنْت',    tr: 'bint',       en: 'Girl' },
  ],
  baa: [
    { ar: 'بَاب',     tr: 'baab',       en: 'Door' },
    { ar: 'بَيْت',    tr: 'bayt',       en: 'House' },
    { ar: 'بَحْر',    tr: 'bahr',       en: 'Sea' },
    { ar: 'كِتَاب',   tr: 'kitaab',     en: 'Book' },
    { ar: 'أَب',      tr: 'ab',         en: 'Father' },
    { ar: 'قَلْب',    tr: 'qalb',       en: 'Heart' },
    { ar: 'طَالِب',   tr: 'taalib',     en: 'Student' },
    { ar: 'لَعِبَ',   tr: 'laʿiba',     en: 'He played' },
    { ar: 'شَرِبَ',   tr: 'shariba',    en: 'He drank' },
    { ar: 'كَبِير',   tr: 'kabeer',     en: 'Big' },
  ],
  taa: [
    { ar: 'تَمْر',    tr: 'tamr',       en: 'Date (fruit)' },
    { ar: 'تِين',     tr: 'teen',       en: 'Figs' },
    { ar: 'تَاج',     tr: 'taaj',       en: 'Crown' },
    { ar: 'بِنْت',    tr: 'bint',       en: 'Girl' },
    { ar: 'بَيْت',    tr: 'bayt',       en: 'House' },
    { ar: 'كِتَاب',   tr: 'kitaab',     en: 'Book' },
    { ar: 'وَقْت',    tr: 'waqt',       en: 'Time' },
    { ar: 'طَالِب',   tr: 'taalib',     en: 'Student' },
    { ar: 'مُعَلِّم',  tr: 'muʿallim',   en: 'Teacher' },
    { ar: 'سُوق',     tr: 'sooq',       en: 'Market' },
  ],
  thaa: [
    { ar: 'ثَلْج',    tr: 'thalj',      en: 'Snow' },
    { ar: 'ثَعْلَب',  tr: 'thaʿlab',    en: 'Fox' },
    { ar: 'ثَوْر',    tr: 'thawr',      en: 'Bull' },
    { ar: 'مَثَل',    tr: 'mathal',     en: 'Example' },
    { ar: 'حَدِيث',   tr: 'hadeeth',    en: 'Story / speech' },
    { ar: 'كَثِير',   tr: 'katheer',    en: 'Much / many' },
    { ar: 'ثَمَر',    tr: 'thamar',     en: 'Fruit' },
    { ar: 'ثَلَاثَة', tr: 'thalaatha',  en: 'Three' },
    { ar: 'مِثْل',    tr: 'mithl',      en: 'Like' },
    { ar: 'ثُمَّ',    tr: 'thumma',     en: 'Then' },
  ],
  jeem: [
    { ar: 'جَمَل',    tr: 'jamal',      en: 'Camel' },
    { ar: 'جَزَر',    tr: 'jazar',      en: 'Carrots' },
    { ar: 'جَبَل',    tr: 'jabal',      en: 'Mountain' },
    { ar: 'جَدِيد',   tr: 'jadeed',     en: 'New' },
    { ar: 'مَسْجِد',  tr: 'masjid',     en: 'Mosque' },
    { ar: 'رَجُل',    tr: 'rajul',      en: 'Man' },
    { ar: 'نَجْم',    tr: 'najm',       en: 'Star' },
    { ar: 'جَمِيل',   tr: 'jameel',     en: 'Beautiful' },
    { ar: 'جَامِعَة', tr: 'jaamiʿa',    en: 'University' },
    { ar: 'ثَلْج',    tr: 'thalj',      en: 'Snow' },
  ],
  haa: [
    { ar: 'حَبْل',    tr: 'habl',       en: 'Rope' },
    { ar: 'حِصَان',   tr: 'hisaan',     en: 'Horse' },
    { ar: 'حُبّ',     tr: 'hubb',       en: 'Love' },
    { ar: 'حَجَر',    tr: 'hajar',      en: 'Stone' },
    { ar: 'بَحْر',    tr: 'bahr',       en: 'Sea' },
    { ar: 'فَتْح',    tr: 'fath',       en: 'Opening' },
    { ar: 'حَدِيقَة', tr: 'hadeeqa',    en: 'Garden' },
    { ar: 'مِفْتَاح', tr: 'miftaah',    en: 'Key' },
    { ar: 'حَلِيب',   tr: 'haleeb',     en: 'Milk' },
    { ar: 'صَبَاح',   tr: 'sabaah',     en: 'Morning' },
  ],
  khaa: [
    { ar: 'خُبْز',    tr: 'khubz',      en: 'Bread' },
    { ar: 'خَيْر',    tr: 'khayr',      en: 'Goodness' },
    { ar: 'خَاتَم',   tr: 'khaatam',    en: 'Ring' },
    { ar: 'أَخ',      tr: 'akh',        en: 'Brother' },
    { ar: 'نَخْلَة',  tr: 'nakhla',     en: 'Palm tree' },
    { ar: 'خَرِيطَة', tr: 'khareeta',   en: 'Map' },
    { ar: 'مِخْبَز',  tr: 'mikhbaz',    en: 'Bakery' },
    { ar: 'خَلِيل',   tr: 'khaleel',    en: 'Friend' },
    { ar: 'شَخْص',    tr: 'shakhs',     en: 'Person' },
    { ar: 'خَمْسَة',  tr: 'khamsa',     en: 'Five' },
  ],
  daal: [
    { ar: 'دَرْس',    tr: 'dars',       en: 'Lesson' },
    { ar: 'دَم',      tr: 'dam',        en: 'Blood' },
    { ar: 'دِيك',     tr: 'deek',       en: 'Rooster' },
    { ar: 'وَلَد',    tr: 'walad',      en: 'Boy' },
    { ar: 'مَدْرَسَة', tr: 'madrasa',   en: 'School' },
    { ar: 'قَلَم',    tr: 'qalam',      en: 'Pen' },
    { ar: 'دَائِم',   tr: 'daa’im',     en: 'Always' },
    { ar: 'دَجَاجَة', tr: 'dajaaja',    en: 'Chicken' },
    { ar: 'دُبّ',     tr: 'dubb',       en: 'Bear' },
    { ar: 'دَقِيقَة', tr: 'daqeeqa',    en: 'Minute' },
  ],
  dhaal: [
    { ar: 'ذَهَب',    tr: 'dhahab',     en: 'Gold' },
    { ar: 'ذُبَاب',   tr: 'dhubaab',    en: 'Fly' },
    { ar: 'ذَكَر',    tr: 'dhakar',     en: 'Male' },
    { ar: 'أُسْتَاذ', tr: 'ustaadh',    en: 'Professor' },
    { ar: 'هَذَا',    tr: 'haadhaa',    en: 'This (m.)' },
    { ar: 'ذَهَبَ',   tr: 'dhahaba',    en: 'He went' },
    { ar: 'مَاذَا',   tr: 'maadhaa',    en: 'What' },
    { ar: 'ذَكِيّ',   tr: 'dhakiyy',    en: 'Clever' },
    { ar: 'ذِئْب',    tr: 'dhi’b',      en: 'Wolf' },
    { ar: 'تَذْكِرَة', tr: 'tadhkira',  en: 'Ticket' },
  ],
  raa: [
    { ar: 'رَجُل',    tr: 'rajul',      en: 'Man' },
    { ar: 'رِيشَة',   tr: 'reesha',     en: 'Feather' },
    { ar: 'رُمْح',    tr: 'rumh',       en: 'Spear' },
    { ar: 'بَحْر',    tr: 'bahr',       en: 'Sea' },
    { ar: 'كَبِير',   tr: 'kabeer',     en: 'Big' },
    { ar: 'مَدْرَسَة', tr: 'madrasa',   en: 'School' },
    { ar: 'رَأْس',    tr: 'ra’s',       en: 'Head' },
    { ar: 'رَغِيف',   tr: 'ragheef',    en: 'Loaf' },
    { ar: 'رُزّ',     tr: 'ruzz',       en: 'Rice' },
    { ar: 'دَرْس',    tr: 'dars',       en: 'Lesson' },
  ],
  zaay: [
    { ar: 'زَرَافَة', tr: 'zaraafa',    en: 'Giraffe' },
    { ar: 'زَيْت',    tr: 'zayt',       en: 'Oil' },
    { ar: 'زُجَاج',   tr: 'zujaaj',     en: 'Glass' },
    { ar: 'مِيزَان',  tr: 'meezaan',    en: 'Scale / balance' },
    { ar: 'جَزَر',    tr: 'jazar',      en: 'Carrots' },
    { ar: 'زَهْرَة',  tr: 'zahra',      en: 'Flower' },
    { ar: 'خُبْز',    tr: 'khubz',      en: 'Bread' },
    { ar: 'زَمَن',    tr: 'zaman',      en: 'Time / era' },
    { ar: 'مَزَاد',   tr: 'mazaad',     en: 'Auction' },
    { ar: 'عَزِيز',   tr: 'ʿazeez',     en: 'Dear' },
  ],
  seen: [
    { ar: 'سَمَك',    tr: 'samak',      en: 'Fish' },
    { ar: 'سُكَّر',   tr: 'sukkar',     en: 'Sugar' },
    { ar: 'سَيَّارَة', tr: 'sayyaara',  en: 'Car' },
    { ar: 'دَرْس',    tr: 'dars',       en: 'Lesson' },
    { ar: 'مَدْرَسَة', tr: 'madrasa',   en: 'School' },
    { ar: 'رَأْس',    tr: 'ra’s',       en: 'Head' },
    { ar: 'أُسْتَاذ', tr: 'ustaadh',    en: 'Professor' },
    { ar: 'سَاعَة',   tr: 'saaʿa',      en: 'Watch / hour' },
    { ar: 'سُوق',     tr: 'sooq',       en: 'Market' },
    { ar: 'خَمْسَة',  tr: 'khamsa',     en: 'Five' },
  ],
  sheen: [
    { ar: 'شَمْس',    tr: 'shams',      en: 'Sun' },
    { ar: 'شَجَرَة',  tr: 'shajara',    en: 'Tree' },
    { ar: 'شَاي',     tr: 'shaay',      en: 'Tea' },
    { ar: 'عَيْش',    tr: 'ʿaysh',      en: 'Bread / living' },
    { ar: 'مَشْرُوب', tr: 'mashroob',   en: 'Drink' },
    { ar: 'شُكْرًا',  tr: 'shukran',    en: 'Thanks' },
    { ar: 'شَهْر',    tr: 'shahr',      en: 'Month' },
    { ar: 'شَرِبَ',   tr: 'shariba',    en: 'He drank' },
    { ar: 'شَخْص',    tr: 'shakhs',     en: 'Person' },
    { ar: 'شَقَّة',   tr: 'shaqqa',     en: 'Apartment' },
  ],
  saad: [
    { ar: 'صَبْر',    tr: 'sabr',       en: 'Patience' },
    { ar: 'صَخْر',    tr: 'sakhr',      en: 'Rock' },
    { ar: 'صُوف',     tr: 'soof',       en: 'Wool' },
    { ar: 'مَصْر',    tr: 'misr',       en: 'Egypt' },
    { ar: 'أَصْفَر',  tr: 'asfar',      en: 'Yellow' },
    { ar: 'صَبَاح',   tr: 'sabaah',     en: 'Morning' },
    { ar: 'صَغِير',   tr: 'sagheer',    en: 'Small' },
    { ar: 'صَدِيق',   tr: 'sadeeq',     en: 'Friend' },
    { ar: 'صَلَاة',   tr: 'salaah',     en: 'Prayer' },
    { ar: 'قَصِير',   tr: 'qaseer',     en: 'Short' },
  ],
  daad: [
    { ar: 'ضِفْدَع',  tr: 'difdaʿ',     en: 'Frog' },
    { ar: 'ضَرْب',    tr: 'darb',       en: 'Strike' },
    { ar: 'ضَوْء',    tr: 'daw’',       en: 'Light' },
    { ar: 'أَرْض',    tr: 'ard',        en: 'Earth' },
    { ar: 'مَرِيض',   tr: 'mareed',     en: 'Sick' },
    { ar: 'بَيْض',    tr: 'bayd',       en: 'Eggs' },
    { ar: 'أَبْيَض',  tr: 'abyad',      en: 'White' },
    { ar: 'رِيَاضَة', tr: 'riyaada',    en: 'Sport' },
    { ar: 'قَاضِي',   tr: 'qaadee',     en: 'Judge' },
    { ar: 'فَضْل',    tr: 'fadl',       en: 'Favor' },
  ],
  'taa-emphatic': [
    { ar: 'طَيْر',    tr: 'tayr',       en: 'Bird' },
    { ar: 'طُوب',     tr: 'toob',       en: 'Brick' },
    { ar: 'طَالِب',   tr: 'taalib',     en: 'Student' },
    { ar: 'بَسِيط',   tr: 'baseet',     en: 'Simple' },
    { ar: 'قِطّ',     tr: 'qitt',       en: 'Cat' },
    { ar: 'بَطّ',     tr: 'batt',       en: 'Duck' },
    { ar: 'مَطْبَخ',  tr: 'matbakh',    en: 'Kitchen' },
    { ar: 'طَعَام',   tr: 'taʿaam',     en: 'Food' },
    { ar: 'طَبِيب',   tr: 'tabeeb',     en: 'Doctor' },
    { ar: 'بَطَاطِس', tr: 'bataatis',   en: 'Potatoes' },
  ],
  'thaa-emphatic': [
    { ar: 'ظِلّ',     tr: 'thill',      en: 'Shade' },
    { ar: 'ظَرْف',    tr: 'tharf',      en: 'Envelope' },
    { ar: 'ظَالِم',   tr: 'thaalim',    en: 'Oppressor' },
    { ar: 'مَظْهَر',  tr: 'mathhar',    en: 'Appearance' },
    { ar: 'ظُهْر',    tr: 'thuhr',      en: 'Noon' },
    { ar: 'حَظّ',     tr: 'hatt',       en: 'Luck' },
    { ar: 'نَظَر',    tr: 'nathar',     en: 'Sight / view' },
    { ar: 'ظَرِيف',   tr: 'thareef',    en: 'Nice / funny' },
    { ar: 'مُنْتَظِر', tr: 'muntathir', en: 'Waiting' },
    { ar: 'ظَاهِرَة', tr: 'thaahira',   en: 'Phenomenon' },
  ],
  ayn: [
    { ar: 'عَيْن',    tr: 'ʿayn',       en: 'Eye' },
    { ar: 'عَرَب',    tr: 'ʿarab',      en: 'Arabs' },
    { ar: 'عِلْم',    tr: 'ʿilm',       en: 'Knowledge' },
    { ar: 'مَعَ',     tr: 'maʿa',       en: 'With' },
    { ar: 'سَاعَة',   tr: 'saaʿa',      en: 'Hour / watch' },
    { ar: 'شَارِع',   tr: 'shaariʿ',    en: 'Street' },
    { ar: 'مَسْجِد',  tr: 'masjid',     en: 'Mosque' },
    { ar: 'بَعْض',    tr: 'baʿd',       en: 'Some' },
    { ar: 'عَسَل',    tr: 'ʿasal',      en: 'Honey' },
    { ar: 'أُسْبُوع', tr: 'usbooʿ',     en: 'Week' },
  ],
  ghayn: [
    { ar: 'غُرَاب',   tr: 'ghuraab',    en: 'Crow' },
    { ar: 'غَنَم',    tr: 'ghanam',     en: 'Sheep' },
    { ar: 'غَائِب',   tr: 'ghaa’ib',    en: 'Absent' },
    { ar: 'صَغِير',   tr: 'sagheer',    en: 'Small' },
    { ar: 'غَدَاء',   tr: 'ghadaa’',    en: 'Lunch' },
    { ar: 'غُرْفَة',  tr: 'ghurfa',     en: 'Room' },
    { ar: 'مَغْرِب',  tr: 'maghrib',    en: 'Sunset / Morocco' },
    { ar: 'بَلَاغَة', tr: 'balaagha',   en: 'Eloquence' },
    { ar: 'غَلَط',    tr: 'ghalat',     en: 'Mistake' },
    { ar: 'غَنِيّ',   tr: 'ghaniyy',    en: 'Rich' },
  ],
  faa: [
    { ar: 'فِيل',     tr: 'feel',       en: 'Elephant' },
    { ar: 'فَم',      tr: 'fam',        en: 'Mouth' },
    { ar: 'فَرَاشَة', tr: 'faraasha',   en: 'Butterfly' },
    { ar: 'مِفْتَاح', tr: 'miftaah',    en: 'Key' },
    { ar: 'غُرْفَة',  tr: 'ghurfa',     en: 'Room' },
    { ar: 'فَلْسَفَة', tr: 'falsafa',   en: 'Philosophy' },
    { ar: 'فَرِيق',   tr: 'fareeq',     en: 'Team' },
    { ar: 'فَتْح',    tr: 'fath',       en: 'Opening' },
    { ar: 'فَلَاح',   tr: 'fallaah',    en: 'Farmer' },
    { ar: 'خَفِيف',   tr: 'khafeef',    en: 'Light (weight)' },
  ],
  qaaf: [
    { ar: 'قَلَم',    tr: 'qalam',      en: 'Pen' },
    { ar: 'قَمَر',    tr: 'qamar',      en: 'Moon' },
    { ar: 'قُرْآن',   tr: 'qur’aan',    en: 'Quran' },
    { ar: 'طَبَق',    tr: 'tabaq',      en: 'Plate' },
    { ar: 'سُوق',     tr: 'sooq',       en: 'Market' },
    { ar: 'حَقِيقَة', tr: 'haqeeqa',    en: 'Truth' },
    { ar: 'قِطّ',     tr: 'qitt',       en: 'Cat' },
    { ar: 'قَلْب',    tr: 'qalb',       en: 'Heart' },
    { ar: 'قَدِيم',   tr: 'qadeem',     en: 'Old (thing)' },
    { ar: 'قَصِير',   tr: 'qaseer',     en: 'Short' },
  ],
  kaaf: [
    { ar: 'كِتَاب',   tr: 'kitaab',     en: 'Book' },
    { ar: 'كَلْب',    tr: 'kalb',       en: 'Dog' },
    { ar: 'كُرْسِيّ', tr: 'kursiyy',    en: 'Chair' },
    { ar: 'سُكَّر',   tr: 'sukkar',     en: 'Sugar' },
    { ar: 'مَكْتَب',  tr: 'maktab',     en: 'Office / desk' },
    { ar: 'دِيك',     tr: 'deek',       en: 'Rooster' },
    { ar: 'كَبِير',   tr: 'kabeer',     en: 'Big' },
    { ar: 'كَثِير',   tr: 'katheer',    en: 'Much' },
    { ar: 'كَلِمَة',  tr: 'kalima',     en: 'Word' },
    { ar: 'كُرَة',    tr: 'kura',       en: 'Ball' },
  ],
  laam: [
    { ar: 'لَيْل',    tr: 'layl',       en: 'Night' },
    { ar: 'لَحْم',    tr: 'lahm',       en: 'Meat' },
    { ar: 'لَبَن',    tr: 'laban',      en: 'Milk / yogurt' },
    { ar: 'قَلَم',    tr: 'qalam',      en: 'Pen' },
    { ar: 'مَدْرَسَة', tr: 'madrasa',   en: 'School' },
    { ar: 'كَلْب',    tr: 'kalb',       en: 'Dog' },
    { ar: 'لُغَة',    tr: 'lugha',      en: 'Language' },
    { ar: 'لَحْظَة',  tr: 'lahza',      en: 'Moment' },
    { ar: 'لَوْن',    tr: 'lawn',       en: 'Color' },
    { ar: 'جَمِيل',   tr: 'jameel',     en: 'Beautiful' },
  ],
  meem: [
    { ar: 'مَاء',     tr: 'maa’',       en: 'Water' },
    { ar: 'مَسْجِد',  tr: 'masjid',     en: 'Mosque' },
    { ar: 'مَلِك',    tr: 'malik',      en: 'King' },
    { ar: 'أُم',      tr: 'umm',        en: 'Mother' },
    { ar: 'قَمَر',    tr: 'qamar',      en: 'Moon' },
    { ar: 'مَدْرَسَة', tr: 'madrasa',   en: 'School' },
    { ar: 'مُعَلِّم',  tr: 'muʿallim',   en: 'Teacher' },
    { ar: 'مِفْتَاح', tr: 'miftaah',    en: 'Key' },
    { ar: 'مَطْبَخ',  tr: 'matbakh',    en: 'Kitchen' },
    { ar: 'سَمَاء',   tr: 'samaa’',     en: 'Sky' },
  ],
  noon: [
    { ar: 'نَجْم',    tr: 'najm',       en: 'Star' },
    { ar: 'نَار',     tr: 'naar',       en: 'Fire' },
    { ar: 'نُور',     tr: 'noor',       en: 'Light' },
    { ar: 'بِنْت',    tr: 'bint',       en: 'Girl' },
    { ar: 'مَدْرَسَة', tr: 'madrasa',   en: 'School' },
    { ar: 'لَبَن',    tr: 'laban',      en: 'Milk' },
    { ar: 'نَهْر',    tr: 'nahr',       en: 'River' },
    { ar: 'نَافِذَة', tr: 'naafitha',   en: 'Window' },
    { ar: 'نَظَّارَة', tr: 'naththaara', en: 'Glasses' },
    { ar: 'نَمِر',    tr: 'namir',      en: 'Tiger' },
  ],
  'haa-final': [
    { ar: 'هَدِيَّة', tr: 'hadiyya',    en: 'Gift' },
    { ar: 'هَذَا',    tr: 'haadhaa',    en: 'This (m.)' },
    { ar: 'هُوَ',     tr: 'huwa',       en: 'He' },
    { ar: 'هِيَ',     tr: 'hiya',       en: 'She' },
    { ar: 'هُمْ',     tr: 'hum',        en: 'They (m.)' },
    { ar: 'هَاتِف',   tr: 'haatif',     en: 'Phone' },
    { ar: 'هَوَاء',   tr: 'hawaa’',     en: 'Air' },
    { ar: 'هَادِئ',   tr: 'haadi’',     en: 'Calm' },
    { ar: 'هُنَا',    tr: 'hunaa',      en: 'Here' },
    { ar: 'شَهْر',    tr: 'shahr',      en: 'Month' },
  ],
  waaw: [
    { ar: 'وَرْد',    tr: 'ward',       en: 'Rose' },
    { ar: 'وَجْه',    tr: 'wajh',       en: 'Face' },
    { ar: 'وَقْت',    tr: 'waqt',       en: 'Time' },
    { ar: 'وَلَد',    tr: 'walad',      en: 'Boy' },
    { ar: 'هُوَ',     tr: 'huwa',       en: 'He' },
    { ar: 'أُسْبُوع', tr: 'usbooʿ',     en: 'Week' },
    { ar: 'سُوق',     tr: 'sooq',       en: 'Market' },
    { ar: 'وَالِد',   tr: 'waalid',     en: 'Father' },
    { ar: 'وَاحِد',   tr: 'waahid',     en: 'One' },
    { ar: 'وَسَط',    tr: 'wasat',      en: 'Middle' },
  ],
  yaa: [
    { ar: 'يَد',      tr: 'yad',        en: 'Hand' },
    { ar: 'يَوْم',    tr: 'yawm',       en: 'Day' },
    { ar: 'يَقِين',   tr: 'yaqeen',     en: 'Certainty' },
    { ar: 'بَيْت',    tr: 'bayt',       en: 'House' },
    { ar: 'كُرْسِيّ', tr: 'kursiyy',    en: 'Chair' },
    { ar: 'فِيل',     tr: 'feel',       en: 'Elephant' },
    { ar: 'يَابِس',   tr: 'yaabis',     en: 'Dry' },
    { ar: 'يَتِيم',   tr: 'yateem',     en: 'Orphan' },
    { ar: 'يَاسَمِين', tr: 'yaasameen', en: 'Jasmine' },
    { ar: 'شَاي',     tr: 'shaay',      en: 'Tea' },
  ],
}

// ---------------------------------------------------------------------------
// EXPRESSIONS — 5 beginner expressions per letter.
// ---------------------------------------------------------------------------

const EXPRESSIONS = {
  alif: [
    { ar: 'أَهْلًا وَسَهْلًا', tr: 'ahlan wa sahlan', en: 'Welcome' },
    { ar: 'أَنَا بِخَيْر',     tr: 'ana bikhayr',     en: 'I am fine' },
    { ar: 'أَحْبَبْتُ هَذَا',  tr: 'ahbabtu haadhaa', en: 'I liked this' },
    { ar: 'أَرَاكَ غَدًا',     tr: 'araaka ghadan',   en: 'See you tomorrow' },
    { ar: 'أَسْكُنُ هُنَا',    tr: 'askunu hunaa',    en: 'I live here' },
  ],
  baa: [
    { ar: 'بِسْمِ اللهِ',      tr: 'bismillah',       en: 'In the name of God' },
    { ar: 'بَارَكَ اللهُ فِيك', tr: 'baaraka allahu feek', en: 'God bless you' },
    { ar: 'بِكَمْ هَذَا؟',     tr: 'bikam haadhaa?',  en: 'How much is this?' },
    { ar: 'بَيْتِي قَرِيب',    tr: 'baytee qareeb',   en: 'My house is close' },
    { ar: 'بِالتَّوْفِيق',      tr: 'bit-tawfeeq',     en: 'Good luck' },
  ],
  taa: [
    { ar: 'تَشَرَّفْنَا',       tr: 'tasharrafnaa',    en: 'Nice to meet you' },
    { ar: 'تَعَالَ هُنَا',      tr: 'taʿaala hunaa',   en: 'Come here' },
    { ar: 'تَمَام',            tr: 'tamaam',          en: 'Perfect / okay' },
    { ar: 'تَحْيَا مِصْر',     tr: 'tahyaa misr',     en: 'Long live Egypt' },
    { ar: 'تَقْدِيرِي لَك',    tr: 'taqdeeree lak',   en: 'My appreciation to you' },
  ],
  thaa: [
    { ar: 'ثَلَاثَة أَيَّام',   tr: 'thalaathat ayyaam', en: 'Three days' },
    { ar: 'شُكْرًا جَزِيلًا',   tr: 'shukran jazeelan',  en: 'Thanks a lot' },
    { ar: 'كَثِيرًا جِدًّا',    tr: 'katheeran jiddan',  en: 'Very much' },
    { ar: 'ثُمَّ مَاذَا؟',      tr: 'thumma maadhaa?',   en: 'And then what?' },
    { ar: 'مِثْل هَذَا',       tr: 'mithl haadhaa',     en: 'Like this' },
  ],
  jeem: [
    { ar: 'جَزَاكَ اللهُ خَيْرًا', tr: 'jazaaka allahu khayran', en: 'May God reward you' },
    { ar: 'جَمِيل جِدًّا',       tr: 'jameel jiddan',         en: 'Very beautiful' },
    { ar: 'جَاهِز',              tr: 'jaahiz',                en: 'Ready' },
    { ar: 'مَعَ السَّلَامَة',    tr: 'maʿa as-salaama',       en: 'Goodbye' },
    { ar: 'نَجْتَمِعُ غَدًا',    tr: 'najtamiʿu ghadan',      en: 'We meet tomorrow' },
  ],
  haa: [
    { ar: 'الحَمْدُ لِله',     tr: 'alhamdulillah',   en: 'Praise be to God' },
    { ar: 'حَبِيبِي',         tr: 'habeebee',        en: 'My dear (m.)' },
    { ar: 'حَسَنًا',          tr: 'hasanan',         en: 'Okay / well' },
    { ar: 'حَيَّاكَ الله',    tr: 'hayyaaka Allah',  en: 'May God greet you' },
    { ar: 'هَذَا حَقًّا',      tr: 'haadhaa haqqan',  en: 'This is true' },
  ],
  khaa: [
    { ar: 'خَيْر إِنْ شَاءَ الله', tr: 'khayr in shaa Allah', en: 'It will be fine, God willing' },
    { ar: 'خَلَاص',                tr: 'khalaas',              en: 'Done / enough' },
    { ar: 'خُذْ هَذَا',            tr: 'khudh haadhaa',        en: 'Take this' },
    { ar: 'أَخِي الكَبِير',        tr: 'akhee al-kabeer',      en: 'My older brother' },
    { ar: 'خَمْسَة دَقَائِق',      tr: 'khamsa daqaa’iq',      en: 'Five minutes' },
  ],
  daal: [
    { ar: 'دَقِيقَة وَاحِدَة',   tr: 'daqeeqa waahida', en: 'One minute' },
    { ar: 'مَا عِنْدِي دَرْس',  tr: 'maa ʿindee dars',  en: 'I have no lesson' },
    { ar: 'أَنَا دَائِمًا هُنَا', tr: 'ana daa’iman hunaa', en: 'I am always here' },
    { ar: 'دَخَلَ البَيْت',     tr: 'dakhala al-bayt', en: 'He entered the house' },
    { ar: 'دُرْ يَمِينًا',      tr: 'dur yameenan',    en: 'Turn right' },
  ],
  dhaal: [
    { ar: 'هَذَا هُوَ',        tr: 'haadhaa huwa',     en: 'This is him' },
    { ar: 'مَاذَا تَقْصِد؟',   tr: 'maadhaa taqsid?',  en: 'What do you mean?' },
    { ar: 'ذَهَبْتُ هُنَاك',   tr: 'dhahabtu hunaak',  en: 'I went there' },
    { ar: 'أَنْتَ ذَكِيّ',     tr: 'anta dhakiyy',     en: 'You are clever' },
    { ar: 'فِي ذَلِك اليَوْم', tr: 'fee dhaalika al-yawm', en: 'On that day' },
  ],
  raa: [
    { ar: 'رَأْيِي صَحِيح',      tr: 'ra’yee saheeh',    en: 'My opinion is right' },
    { ar: 'أَرْجُوك',           tr: 'arjook',           en: 'Please (I beg you)' },
    { ar: 'رُبَّمَا',           tr: 'rubbamaa',         en: 'Perhaps' },
    { ar: 'أُرِيدُ هَذَا',      tr: 'ureedu haadhaa',   en: 'I want this' },
    { ar: 'مَرْحَبًا بِك',       tr: 'marhaban bik',     en: 'Welcome' },
  ],
  zaay: [
    { ar: 'زَيْن',             tr: 'zayn',             en: 'Beautiful / good' },
    { ar: 'مَزْبُوط',          tr: 'mazboot',          en: 'Precise / exactly' },
    { ar: 'زَمَن جَمِيل',      tr: 'zaman jameel',     en: 'Beautiful times' },
    { ar: 'مِيزَان عَدْل',     tr: 'meezaan ʿadl',     en: 'A just scale' },
    { ar: 'زِيَارَة سَعِيدَة', tr: 'ziyaara saʿeeda',  en: 'Happy visit' },
  ],
  seen: [
    { ar: 'سَبَاحَة سَعِيدَة',  tr: 'sabaaha saʿeeda',  en: 'Good morning' },
    { ar: 'سُوق الخُضَر',      tr: 'sooq al-khudar',   en: 'Vegetable market' },
    { ar: 'سَاعَة وَاحِدَة',   tr: 'saaʿa waahida',    en: 'One hour' },
    { ar: 'مُمْكِن سُؤَال؟',   tr: 'mumkin su’aal?',   en: 'Can I ask?' },
    { ar: 'سِرْ عَلَى طُول',   tr: 'sir ʿalaa tool',   en: 'Go straight' },
  ],
  sheen: [
    { ar: 'شُكْرًا جَزِيلًا',   tr: 'shukran jazeelan',  en: 'Thanks a lot' },
    { ar: 'شَهْر مُبَارَك',    tr: 'shahr mubaarak',    en: 'Blessed month' },
    { ar: 'شُرْب المَاء مُهِمّ', tr: 'shurb al-maa’ muhimm', en: 'Drinking water is important' },
    { ar: 'أُشَاهِد الفِيلْم',  tr: 'ushaahid al-film',  en: 'I watch the film' },
    { ar: 'شَخْص طَيِّب',      tr: 'shakhs tayyib',     en: 'A kind person' },
  ],
  saad: [
    { ar: 'صَبَاح الخَيْر',    tr: 'sabaah al-khayr',  en: 'Good morning' },
    { ar: 'صِفْر',            tr: 'sifr',             en: 'Zero' },
    { ar: 'صَدِيقِي العَزِيز', tr: 'sadeeqee al-ʿazeez', en: 'My dear friend' },
    { ar: 'صَلَاة الفَجْر',    tr: 'salaat al-fajr',   en: 'Dawn prayer' },
    { ar: 'بِعَقْل صَافِي',    tr: 'bi-ʿaql saafee',   en: 'With a clear mind' },
  ],
  daad: [
    { ar: 'أَرْض الوَطَن',      tr: 'ard al-watan',     en: 'The homeland' },
    { ar: 'ضَرْبَة وَاحِدَة',   tr: 'darba waahida',    en: 'One strike' },
    { ar: 'أَنَا مَرِيض قَلِيلًا', tr: 'ana mareed qaleelan', en: 'I am a little sick' },
    { ar: 'أَبْيَض وَأَسْوَد',   tr: 'abyad wa aswad',   en: 'White and black' },
    { ar: 'الرِّيَاضَة مُهِمَّة',  tr: 'ar-riyaada muhimma', en: 'Sport is important' },
  ],
  'taa-emphatic': [
    { ar: 'طَيِّب',             tr: 'tayyib',           en: 'Okay / good' },
    { ar: 'طَبْعًا',            tr: 'tabʿan',          en: 'Of course' },
    { ar: 'طَرِيق طَوِيل',      tr: 'tareeq taweel',    en: 'A long road' },
    { ar: 'طَعَام لَذِيذ',      tr: 'taʿaam ladheedh',  en: 'Delicious food' },
    { ar: 'طَابَ يَوْمُك',      tr: 'taaba yawmuk',     en: 'Have a nice day' },
  ],
  'thaa-emphatic': [
    { ar: 'ظِلّ الشَّجَرَة',     tr: 'thill ash-shajara', en: 'The shade of the tree' },
    { ar: 'بِالظَّبْط',          tr: 'bith-thabt',        en: 'Exactly' },
    { ar: 'ظَاهِر أَنَّك',       tr: 'thaahir annak',     en: 'It seems that you' },
    { ar: 'مُنْتَظِر رَدَّك',    tr: 'muntathir raddak',  en: 'Waiting for your reply' },
    { ar: 'ظَرْف صَغِير',       tr: 'tharf sagheer',     en: 'A small envelope' },
  ],
  ayn: [
    { ar: 'عَلَى الرَّحْب وَالسَّعَة', tr: 'ʿalaa ar-rahb was-saʿa', en: 'You are most welcome' },
    { ar: 'عِنْدِي سُؤَال',     tr: 'ʿindee su’aal',    en: 'I have a question' },
    { ar: 'مَعَ السَّلَامَة',    tr: 'maʿa as-salaama',  en: 'Goodbye' },
    { ar: 'عَسَل طَبِيعِي',     tr: 'ʿasal tabeeʿee',   en: 'Natural honey' },
    { ar: 'عِنْدَك وَقْت؟',     tr: 'ʿindak waqt?',     en: 'Do you have time?' },
  ],
  ghayn: [
    { ar: 'غَدًا بِإِذْنِ الله', tr: 'ghadan bi-idhni Allah', en: 'Tomorrow, God willing' },
    { ar: 'غُرْفَة نَوْم',      tr: 'ghurfat nawm',     en: 'Bedroom' },
    { ar: 'مَغْرِب جَمِيل',     tr: 'maghrib jameel',   en: 'Beautiful sunset' },
    { ar: 'غَلَط صَغِير',       tr: 'ghalat sagheer',   en: 'A small mistake' },
    { ar: 'غَنِيّ بِالحُبّ',    tr: 'ghaniyy bil-hubb', en: 'Rich in love' },
  ],
  faa: [
    { ar: 'فِي أَمَانِ الله',    tr: 'fee amaan Allah',  en: 'In God\'s protection' },
    { ar: 'فَرْق كَبِير',       tr: 'farq kabeer',      en: 'A big difference' },
    { ar: 'فَكِّر بِخَيْر',      tr: 'fakkir bikhayr',   en: 'Think positively' },
    { ar: 'فَاتَ الوَقْت',       tr: 'faata al-waqt',    en: 'The time passed' },
    { ar: 'فَضْلًا وَكَرَمًا',   tr: 'fadlan wa karama', en: 'Please' },
  ],
  qaaf: [
    { ar: 'قَبْلَ أَيَّام',      tr: 'qabla ayyaam',     en: 'A few days ago' },
    { ar: 'قَلْب طَيِّب',        tr: 'qalb tayyib',      en: 'A kind heart' },
    { ar: 'بِقَدْرِ الإِمْكَان',  tr: 'biqadr al-imkaan', en: 'As much as possible' },
    { ar: 'قَاعِدَة مُهِمَّة',   tr: 'qaaʿida muhimma',  en: 'An important rule' },
    { ar: 'قَرِيب جِدًّا',       tr: 'qareeb jiddan',    en: 'Very close' },
  ],
  kaaf: [
    { ar: 'كَيْفَ حَالُك؟',      tr: 'kayfa haaluk?',    en: 'How are you?' },
    { ar: 'كُلَّ يَوْم',         tr: 'kulla yawm',       en: 'Every day' },
    { ar: 'كَلِمَة وَاحِدَة',    tr: 'kalima waahida',   en: 'One word' },
    { ar: 'كَثِير الشُّكْر',     tr: 'katheer ash-shukr', en: 'Many thanks' },
    { ar: 'كُنْ بِخَيْر',        tr: 'kun bikhayr',      en: 'Be well' },
  ],
  laam: [
    { ar: 'لَا بَأْس',           tr: 'laa ba’s',         en: 'No problem' },
    { ar: 'لَيْلَة سَعِيدَة',   tr: 'layla saʿeeda',    en: 'Good night' },
    { ar: 'لَحْظَة وَاحِدَة',   tr: 'lahza waahida',    en: 'One moment' },
    { ar: 'لَعَلَّ ذَلِك',       tr: 'laʿalla dhaalik',  en: 'Perhaps that' },
    { ar: 'لُغَة جَمِيلَة',     tr: 'lugha jameela',    en: 'A beautiful language' },
  ],
  meem: [
    { ar: 'مَعَ السَّلَامَة',     tr: 'maʿa as-salaama',   en: 'Goodbye' },
    { ar: 'مَا شَاءَ الله',      tr: 'maa shaa Allah',   en: 'What God has willed' },
    { ar: 'مُمْكِن أُسَاعِدك؟',  tr: 'mumkin usaaʿidak?', en: 'Can I help you?' },
    { ar: 'مِنْ فَضْلِك',        tr: 'min fadlik',       en: 'Please' },
    { ar: 'مِنْ أَيْن أَنْتَ؟',   tr: 'min ayna anta?',   en: 'Where are you from?' },
  ],
  noon: [
    { ar: 'نَتَشَرَّف',            tr: 'natasharraf',      en: 'We are honored' },
    { ar: 'نَعَمْ شُكْرًا',        tr: 'naʿam shukran',    en: 'Yes, thank you' },
    { ar: 'نَظْرَة سَرِيعَة',     tr: 'nathra sareeʿa',   en: 'A quick look' },
    { ar: 'نَجْتَمِعُ لَاحِقًا',   tr: 'najtamiʿu laahiqan', en: 'We meet later' },
    { ar: 'نُصْف سَاعَة',         tr: 'nusf saaʿa',       en: 'Half an hour' },
  ],
  'haa-final': [
    { ar: 'هَذَا هُوَ',         tr: 'haadhaa huwa',    en: 'This is it' },
    { ar: 'هَلْ عِنْدَك وَقْت؟', tr: 'hal ʿindak waqt?', en: 'Do you have time?' },
    { ar: 'هَيَّا بِنَا',        tr: 'hayyaa binaa',    en: 'Let\'s go' },
    { ar: 'هُنَا وَهُنَاك',     tr: 'hunaa wa hunaak', en: 'Here and there' },
    { ar: 'هَدِيَّة صَغِيرَة',  tr: 'hadiyya sagheera', en: 'A small gift' },
  ],
  waaw: [
    { ar: 'وَاللهِ',            tr: 'wallahi',          en: 'By God' },
    { ar: 'وَاحِد اثْنَان',     tr: 'waahid ithnaan',   en: 'One, two' },
    { ar: 'وَقْت جَيِّد',       tr: 'waqt jayyid',      en: 'Good time' },
    { ar: 'وَعَلَيْكُم السَّلَام', tr: 'wa ʿalaykum as-salaam', en: 'And peace be upon you' },
    { ar: 'وَجْه السَّعَادَة',   tr: 'wajh as-saʿaada',  en: 'Face of happiness' },
  ],
  yaa: [
    { ar: 'يَا الله',           tr: 'yaa Allah',        en: 'O God' },
    { ar: 'يَوْم جَمِيل',       tr: 'yawm jameel',      en: 'A beautiful day' },
    { ar: 'يَدًا بِيَد',        tr: 'yadan bi-yad',     en: 'Hand in hand' },
    { ar: 'يَعْنِي',            tr: 'yaʿnee',           en: 'It means' },
    { ar: 'يَسَار وَيَمِين',    tr: 'yasaar wa yameen', en: 'Left and right' },
  ],
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function main() {
  console.log('Wiping existing letter_vocabulary / letter_expressions…')
  await supabase.from('letter_vocabulary').delete().neq('letter_id', '__none__')
  await supabase.from('letter_expressions').delete().neq('letter_id', '__none__')

  let vocabCount = 0
  let exprCount = 0

  for (const [letterId, items] of Object.entries(VOCAB)) {
    const rows = items.map((it, i) => ({
      letter_id: letterId,
      sort_order: i,
      arabic: it.ar,
      transliteration: it.tr,
      meaning: it.en,
    }))
    const { error } = await supabase.from('letter_vocabulary').insert(rows)
    if (error) {
      console.warn(`  ⚠ vocabulary ${letterId}: ${error.message}`)
    } else {
      vocabCount += rows.length
    }
  }

  for (const [letterId, items] of Object.entries(EXPRESSIONS)) {
    const rows = items.map((it, i) => ({
      letter_id: letterId,
      sort_order: i,
      arabic: it.ar,
      transliteration: it.tr,
      meaning: it.en,
    }))
    const { error } = await supabase.from('letter_expressions').insert(rows)
    if (error) {
      console.warn(`  ⚠ expressions ${letterId}: ${error.message}`)
    } else {
      exprCount += rows.length
    }
  }

  console.log(`✓ Seeded ${vocabCount} vocabulary words, ${exprCount} expressions.`)
}

main().catch((err) => {
  console.error('Seed failed:', err.message || err)
  process.exit(1)
})