import { GetStaticProps } from "next";
import React from "react";
import PageHeadMobile from "../../components/PageHeadMobile";
import { classNameCombine } from "../../libs/className";
import {
  getLangAndDirByContext,
  getStaticPathsForLang,
  ILangStaticProps,
} from "../../libs/i18nhelper";
import LANGS_EN, { LangInfoPage2 } from "../../locales/page2/en";
import LANGS_FA from "../../locales/page2/fa";
import styles from "../../styles/page2.module.css";
export const getStaticPaths = getStaticPathsForLang;

type Prop = ILangStaticProps<LangInfoPage2>;
export const getStaticProps: GetStaticProps = async (context) => {
  const linfo = getLangAndDirByContext(context);
  let langsInfo: LangInfoPage2;
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
        description={langs.desc}
      ></PageHeadMobile>
      <h3>{langs.title}</h3>
      <p>{langs.desc}</p>
    </div>
  );
};

export default Home;
