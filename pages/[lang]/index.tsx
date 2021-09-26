import { GetStaticProps } from "next";
import React from "react";
import PageHeadMobile from "../../components/PageHeadMobile";
import { classNameCombine } from "../../libs/className";
import {
  getLangAndDirByContext,
  getStaticPathsForLang,
  ILangStaticProps,
} from "../../libs/i18nhelper";
import LANGS_EN, { LangInfoHome } from "../../locales/home/en";
import LANGS_FA from "../../locales/home/fa";
import styles from "../../styles/Home.module.css";
export const getStaticPaths = getStaticPathsForLang;

type Prop = ILangStaticProps<LangInfoHome>;
export const getStaticProps: GetStaticProps = async (context) => {
  const linfo = getLangAndDirByContext(context);
  let langsInfo: LangInfoHome;
  switch (linfo.language) {
    case "fa":
      langsInfo = LANGS_FA;
      break;
    default:
      langsInfo = LANGS_EN;
      break;
  }
  return {
    props: {
      ...linfo,
      langs: langsInfo,
    },
  };
};

const Home = (props: Prop) => {
  const langs = props.langs;
  let nLocale = props.language;
  return (
    <div className={classNameCombine([styles.container, styles[nLocale]])}>
      <PageHeadMobile
        title={langs.title}
        dir={props.langDir}
        lang={props.language}
        description={langs.desc}
      ></PageHeadMobile>
      <h3>{langs.title}</h3>
      <p>{langs.desc}</p>
      <p>Support i18n images(default png):</p>
      <div className={styles.img}></div>
      <p className={styles.supportWebp}>I Support webp</p>
      <p className={styles.notSupportWebp}>I does not support webp</p>
      <p> Prefer use Webp format image,if support:</p>
      <div
        className={classNameCombine([styles.img, styles.imgPreferWebp])}
      ></div>
    </div>
  );
};

export default Home;
