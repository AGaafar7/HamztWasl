// lib/arabicForms.js
//
// The set of contextual forms each Arabic letter can take.
// Forms: 'isolated' | 'initial' | 'medial' | 'final'
//
// Non-connecting letters (ا د ذ ر ز و) only have isolated + final — they
// never connect to the following letter, so initial and medial forms
// don't exist for them.

export const LETTER_FORMS = {
  alif:             { arabic: 'ا', name: 'Alif',           forms: ['isolated', 'final'], isNonConnecting: true },
  baa:              { arabic: 'ب', name: 'Baa',            forms: ['isolated', 'initial', 'medial', 'final'] },
  taa:              { arabic: 'ت', name: 'Taa',            forms: ['isolated', 'initial', 'medial', 'final'] },
  thaa:             { arabic: 'ث', name: 'Thaa',           forms: ['isolated', 'initial', 'medial', 'final'] },
  jeem:             { arabic: 'ج', name: 'Jeem',           forms: ['isolated', 'initial', 'medial', 'final'] },
  haa:              { arabic: 'ح', name: 'Haa',            forms: ['isolated', 'initial', 'medial', 'final'] },
  khaa:             { arabic: 'خ', name: 'Khaa',           forms: ['isolated', 'initial', 'medial', 'final'] },
  daal:             { arabic: 'د', name: 'Daal',           forms: ['isolated', 'final'], isNonConnecting: true },
  dhaal:            { arabic: 'ذ', name: 'Dhaal',          forms: ['isolated', 'final'], isNonConnecting: true },
  raa:              { arabic: 'ر', name: 'Raa',            forms: ['isolated', 'final'], isNonConnecting: true },
  zaay:             { arabic: 'ز', name: 'Zaay',           forms: ['isolated', 'final'], isNonConnecting: true },
  seen:             { arabic: 'س', name: 'Seen',           forms: ['isolated', 'initial', 'medial', 'final'] },
  sheen:            { arabic: 'ش', name: 'Sheen',          forms: ['isolated', 'initial', 'medial', 'final'] },
  saad:             { arabic: 'ص', name: 'Saad',           forms: ['isolated', 'initial', 'medial', 'final'] },
  daad:             { arabic: 'ض', name: 'Daad',           forms: ['isolated', 'initial', 'medial', 'final'] },
  'taa-emphatic':   { arabic: 'ط', name: 'Taa (emphatic)', forms: ['isolated', 'initial', 'medial', 'final'] },
  'thaa-emphatic':  { arabic: 'ظ', name: 'Thaa (emphatic)',forms: ['isolated', 'initial', 'medial', 'final'] },
  ayn:              { arabic: 'ع', name: 'Ayn',            forms: ['isolated', 'initial', 'medial', 'final'] },
  ghayn:            { arabic: 'غ', name: 'Ghayn',          forms: ['isolated', 'initial', 'medial', 'final'] },
  faa:              { arabic: 'ف', name: 'Faa',            forms: ['isolated', 'initial', 'medial', 'final'] },
  qaaf:             { arabic: 'ق', name: 'Qaaf',           forms: ['isolated', 'initial', 'medial', 'final'] },
  kaaf:             { arabic: 'ك', name: 'Kaaf',           forms: ['isolated', 'initial', 'medial', 'final'] },
  laam:             { arabic: 'ل', name: 'Laam',           forms: ['isolated', 'initial', 'medial', 'final'] },
  meem:             { arabic: 'م', name: 'Meem',           forms: ['isolated', 'initial', 'medial', 'final'] },
  noon:             { arabic: 'ن', name: 'Noon',           forms: ['isolated', 'initial', 'medial', 'final'] },
  'haa-final':      { arabic: 'ه', name: 'Haa (final)',    forms: ['isolated', 'initial', 'medial', 'final'] },
  waaw:             { arabic: 'و', name: 'Waaw',           forms: ['isolated', 'final'], isNonConnecting: true },
  yaa:              { arabic: 'ي', name: 'Yaa',            forms: ['isolated', 'initial', 'medial', 'final'] },
}

export const FORM_ORDER = ['isolated', 'initial', 'medial', 'final']

export const FORM_LABELS = {
  isolated: 'Isolated (alone)',
  initial: 'Initial (start of word)',
  medial: 'Medial (middle of word)',
  final: 'Final (end of word)',
}