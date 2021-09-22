import { GetStaticPropsContext } from 'next';
import { i18n as i18nConfig, RTL_LANGS } from '../config/index';
export async function getStaticPathsForLang() {
  const paths = i18nConfig.locales.map(lang => {
    return { params: { lang } }
  });
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticPathsForLangIndex() {
  const paths = i18nConfig.locales.map(lang => {
    return { params: { lang } }
  });
  return {
    paths,
    fallback: false,
  };
}

function isLangSupport(lang?: string) {
  const locales = i18nConfig.locales;
  let nlang = ((lang || '') + '').substr(0, 2).toLocaleLowerCase();
  for (let i = 0; i < locales.length; i++) {
    if (nlang === locales[i]) {
      return nlang;
    }
  }
  return false;
}

export function getCurrentLangByClient() {
  const lang = isLangSupport(navigator.language) || i18nConfig.defaultLocale
  return lang;
}


export type LocaleKey = "fa" | "en";
export function getLangDirection(lang: LocaleKey) {
  if (RTL_LANGS.indexOf(lang) > -1) {
    return 'rtl'
  }
  return 'ltr'
}
function getLanguageByContext(context: GetStaticPropsContext) {
  const paramLang = context.params?.lang

  const language = paramLang || i18nConfig.defaultLocale;
  return language as LocaleKey
}

export function getLangAndDirByContext(context: GetStaticPropsContext) {
  const language = getLanguageByContext(context);
  const langDir = getLangDirection(language);
  return {
    language,
    langDir
  }
}

export interface ILangStaticProps<T> {
  language: string;
  langDir: 'ltr' | 'rtl';
  langs: T
}