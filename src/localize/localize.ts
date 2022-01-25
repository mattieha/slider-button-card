import * as en from './languages/en.json';
import * as es from './languages/es.json';
import * as de from './languages/de.json';
import * as fr from './languages/fr.json';
import * as he from './languages/he.json';
import * as nl from './languages/nl.json';
import * as pl from './languages/pl.json';
import * as pt from './languages/pt.json';
import * as ru from './languages/ru.json';
import * as ko from './languages/ko.json';



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const languages: any = {
  en: en,
  es: es,
  de: de,
  fr: fr,
  he: he,
  nl: nl,
  pl: pl,
  pt: pt,
  ru: ru,
  ko: ko,
};

export function localize(string: string, search = '', replace = ''): string {
  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/['"]+/g, '').replace('-', '_');

  let translated: string;

  try {
    translated = string.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = string.split('.').reduce((o, i) => o[i], languages['en']);
  }

  if (translated === undefined) translated = string.split('.').reduce((o, i) => o[i], languages['en']);

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }
  return translated;
}
