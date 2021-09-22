# Next.js i18n starter for static generator pages

> 背景: Next.js的`Internationalized Routing`功能不支持静态编译。该仓库主要解决静态生成方案下的多语言路由

模板的Next.js 版本为11.1.2,使用最新的`create-nextjs-app`生成。

## Features

+ 支持多语言的ltr/rtl排版(`componetns/PageHeadMobile`组件会自动添加ltr/rtl的className)
+ 支持webp优化(`componetns/PageHeadMobile`组件会自动添加webp的className)
+ 支持多语言图片(可参考`pages/[lang]/index.tsx`中的图片写法)
+ 支持多语言路由
  + `pages/[lang]/**/x.tsx` 注册多语言子路由
  + `pages/[[...langPaths]].tsx` 自动注册不带多语言子路由的路由,将根据浏览器的navigator.language自动跳转

> 注： 当前模板未使用多语言库，如需引入，可根据需要自行引入，并在页面中根据props.langs自行注册多语言数据

## Build Script

``` bash
# use npm / yarn
npm install
npm run gen
```

当前示例生成的静态文件为:

+ `index.html` 将自动跳转到`/en`或 `/fa`
+ `Page2.html` 将自动跳转到对应多语言目录 `/en/Page2` / `fa/Page2`
+ `subfolder`
+ `subfolder`
  + `Page3.html` 将自动跳转到对应多语言目录 `/en/subfolder/Page3` / `fa/subfolder/Page3`
+ `en.html`
+ `fa.html`
+ `en`
  + `subfolder/Page3.html`
  + `Page2.html`
+ `fa`
  + `subfolder/Page3.html`
  + `Page2.html`
