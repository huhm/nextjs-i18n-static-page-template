import { GetStaticProps } from "next";
import React from "react";
import PageHeadMobile from "../../../components/PageHeadMobile";
import { classNameCombine } from "../../../libs/className";
import {
  getLangAndDirByContext,
  getStaticPathsForLang,
  ILangStaticProps,
} from "../../../libs/i18nhelper";
import LANGS_EN, { LangInfoPage3 } from "../../../locales/page3/en";
import LANGS_FA from "../../../locales/page3/fa";
import styles from "../../../styles/page3.module.css";

export const getStaticPaths = getStaticPathsForLang;

type Prop = ILangStaticProps<LangInfoPage3>;
export const getStaticProps: GetStaticProps = async (context) => {
  const linfo = getLangAndDirByContext(context);
  let langsInfo: LangInfoPage3;
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

const Page3 = (props: Prop) => {
  const langs = props.langs;
  let nLocale = props.language;
  return (
    <div className={classNameCombine([styles.container, styles[nLocale]])}>
      <PageHeadMobile
        lang={props.language}
        title={langs.title}
        dir={props.langDir}
        description={langs.desc}
      ></PageHeadMobile>
      <h3>{langs.title}</h3>
      <p>{langs.desc}</p>
    </div>
  );
};

export default Page3;
