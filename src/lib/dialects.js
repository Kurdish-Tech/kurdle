// Dialect config for Kurdle. Alphabet orders and per-dialect metadata are
// taken directly from kurdish-tech.github.io's src/lib/kurdishAlphabet.js
// (true Kurmancî/Zazakî Hawar-Latin order and the commonly-taught Soranî
// order) rather than re-derived here, so Kurdle and Ferheng agree on what
// "the alphabet" is.

const KURMANCI_ALPHABET = [
  'a', 'b', 'c', 'ç', 'd', 'e', 'ê', 'f', 'g', 'h', 'i', 'î', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r', 's', 'ş', 't', 'u', 'û', 'v', 'w', 'x', 'y', 'z',
];

const SORANI_ALPHABET = [
  'ئ', 'ا', 'ب', 'پ', 'ت', 'ج', 'چ', 'ح', 'خ', 'د', 'ر', 'ڕ', 'ز', 'ژ', 'س',
  'ش', 'ع', 'غ', 'ف', 'ڤ', 'ق', 'ک', 'گ', 'ل', 'ڵ', 'م', 'ن', 'ه', 'و',
  'ۆ', 'ی', 'ێ', 'ە',
];

const ZAZAKI_ALPHABET = [
  'a', 'b', 'c', 'ç', 'd', 'e', 'ê', 'f', 'g', 'ğ', 'h', 'i', 'î', 'j', 'k',
  'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'ş', 't', 'u', 'ü', 'v', 'w', 'x', 'y', 'z',
];

// On-screen keyboard rows -- alphabet split into three roughly-even rows,
// QWERTY-style row count but Kurdish letter order (not a Latin-QWERTY
// layout remap, which would put diacritic letters in strange places).
function threeRows(alphabet) {
  const n = alphabet.length;
  const third = Math.ceil(n / 3);
  return [
    alphabet.slice(0, third),
    alphabet.slice(third, third * 2),
    alphabet.slice(third * 2),
  ];
}

export const DIALECTS = {
  kmr: {
    key: 'kmr',
    label: 'Kurmancî',
    nativeLabel: 'Kurmancî',
    dir: 'ltr',
    fontClass: 'font-display',
    alphabet: KURMANCI_ALPHABET,
    keyboardRows: threeRows(KURMANCI_ALPHABET),
    wordListUrl: 'words/kmr.json',
  },
  ckb: {
    key: 'ckb',
    label: 'Soranî',
    nativeLabel: 'سۆرانی',
    dir: 'rtl',
    fontClass: 'font-arabic',
    alphabet: SORANI_ALPHABET,
    keyboardRows: threeRows(SORANI_ALPHABET),
    wordListUrl: 'words/ckb.json',
  },
  zza: {
    key: 'zza',
    label: 'Zazakî',
    nativeLabel: 'Zazakî',
    dir: 'ltr',
    fontClass: 'font-display',
    alphabet: ZAZAKI_ALPHABET,
    keyboardRows: threeRows(ZAZAKI_ALPHABET),
    wordListUrl: 'words/zza.json',
  },
};

export const DIALECT_ORDER = ['kmr', 'ckb', 'zza'];
export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;
