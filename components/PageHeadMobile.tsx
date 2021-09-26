import Head from "next/head";
import React, { useEffect } from "react";

interface Props {
  title: string;
  description?: string;
  keywords?: string;
  openGraph?: {
    image?: string[];
    description?: string;
    title?: string;
  };
  dir: "ltr" | "rtl";
  /**
   * the html element lang attr
   */
  lang?: string;
  /**
   * custom viewport string
   * @default "width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover"
   */
  viewport?: string;
}

// if support Webp，html will has 'webp' className
const __SCRIPT_SUPPORT_WEBP_CLASS = `if(!![].map &&typeof window !== "undefined" &&window.document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0){docCList.push('webp');}else{docCList.push('nowebp');}`;
const DEFAULT_VIEWPORT =
  "width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover";
/**
 * PageHead for mobile
 * 1. auto add ['webp','ltr','rtl'] classes to html element
 * 2. create open graph info
 * @param props
 * @returns
 */
const PageHeadMobile = (props: Props) => {
  const {
    title,
    description,
    keywords,
    openGraph = {},
    dir,
    lang,
    viewport = DEFAULT_VIEWPORT,
  } = props;

  const openGraphDesc = openGraph.description || description;
  const openGraphImageList = openGraph.image || [];
  if (openGraphImageList.length === 0) {
    openGraphImageList.push("/favicon.png");
  }
  useEffect(() => {
    if (lang) {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  return (
    <Head>
      <meta name="renderer" content="webkit" />
      <meta name="viewport" content={viewport}></meta>
      {keywords && <meta name="keywords" content={keywords} />}
      {description && <meta name="description" content={description} />}
      <meta name="format-detection" content="telephone=no, email=no" />
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content={openGraph.title || title} />
      {openGraphImageList &&
        openGraphImageList.map((imgSrc, idx) => {
          return <meta property="og:image" key={idx} content={imgSrc} />;
        })}
      {openGraphDesc && (
        <meta property="og:description" content={openGraphDesc} />
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: `;(function () {var docEl=document.documentElement;var docCList=[docEl.className];${__SCRIPT_SUPPORT_WEBP_CLASS}${
            dir ? `docCList.push('${dir}');` : ""
          }docEl.className+=docCList.join(' ')})();`,
        }}
      ></script>
    </Head>
  );
};

export default PageHeadMobile;
