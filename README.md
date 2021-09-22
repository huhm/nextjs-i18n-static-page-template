
# Next.js i18n starter for static generator pages

> Background: The Next.js `Internationalized Routing` does not support for static generation. so this solution is to suppport internationalized Routing for static generation.

## Features

+ Support ltr/rtl direction for language (`componetns/PageHeadMobile`--ltr/rtl className)
+ Support webp class(`componetns/PageHeadMobile`--webp className)
+ support multi language support for images
+ support Internationalized Routing
  + Register  Internationalized Routing `pages/[lang]/**/x.tsx`
  + Auto Register Routing to redirect to Internationalized Routing  `pages/[[...langPaths]].tsx`

> Note: This project does not use any i18n library. If you need  you can import it yourself according to your needs, and register the i18n data in the page according to props.langs.

## Build Script

``` bash
# use npm / yarn
npm install
npm run gen
```

This demo will generator pages:

+ `index.html` will auto redirect to `/en` or `fa`
+ `Page2.html`  will auto redirect to `/en/Page2` or `fa/Page2`
+ `subfolder`
  + `Page3.html`  will auto redirect to `/en/subfolder/Page3` or `fa/subfolder/Page3`
+ `en.html`
+ `fa.html`
+ `en`
  + `subfolder/Page3.html`
  + `Page2.html`
+ `fa`
  + `subfolder/Page3.html`
  + `Page2.html`
