import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import path from "path";
import { useEffect } from "react";
import { getFilesPathByExt } from "../libs/file";
import { getCurrentLangByClient } from "../libs/i18nhelper";
let langSubPath: string[][] = [];
// const langSubPath = [["index"], ["SetTrack"]];
export async function getStaticPaths() {
  //  traverse the files in [lang] folder
  const langDir = path.join(process.cwd(), "pages/[lang]/");
  langSubPath = await getFilesPathByExt(langDir, ".tsx");
  return {
    paths: langSubPath.map((p) => {
      const langPaths = [...p];
      if (langPaths[langPaths.length - 1] === "index") {
        langPaths.pop();

        // ["index"]-->"/index/index.html"
        // []  --> index.html
        // ["SetTrack"]--> /SetTrack.html
      }
      return { params: { langPaths } };
    }),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async () => {
  //  traverse the files in [lang] folder
  const langDir = path.join(process.cwd(), "pages/[lang]/");
  langSubPath = await getFilesPathByExt(langDir, ".tsx");
  return {
    props: {
      allLangSubPath: langSubPath.map((item) => {
        return "/" + item.join("/").toLowerCase();
      }), //["/index","/subfolder/abc"]
    },
  };
};

const IndexForLang = (props: { allLangSubPath: string[] }) => {
  const router = useRouter();
  const { allLangSubPath } = props;
  useEffect(() => {
    const { search, pathname } = location;
    // const { query, pathname } = router;
    const lang = getCurrentLangByClient();
    const toPath = getRedirectPath(lang, pathname);
    if (toPath) {
      router.push(`${toPath}${search}`);
    } else {
      router.push("/404");
    }
    function getRedirectPath(lang: string, pathname: string) {
      const lowerPathName = (pathname || "").toLowerCase(); // 替换/index
      for (let i = 0; i < allLangSubPath.length; i++) {
        const subPath = allLangSubPath[i]; // /index ,/subfolder/index ,/subfolder/abc
        if (lowerPathName === subPath) {
          return `/${lang}${pathname}`;
        }
        let path2 = (lowerPathName + "/index").replace("//", "/");
        if (path2 === subPath) {
          // remove last slash
          const newPath = `/${lang}${pathname}`;
          if (newPath[newPath.length - 1] === "/") {
            return newPath.substr(0, newPath.length - 1);
          }
          return newPath;
        }
      }
    }
  });

  return null;
};

export default IndexForLang;
