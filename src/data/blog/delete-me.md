---
author: "4GeeksAcademy"
date: "2019-03-20T05:29:14+00:00"
excerpt: "According to Payscale, a Web Developer in Miami earns an average of $64k per year, and an entry-level developer earns an average of $51k in the same period."
slug: "example-delete-me"
template: "landing_post" # post or landing_post
title: "Delete me"
wordcount: 0
image: "https://storage.googleapis.com/4geeks-academy-website/blog/2019/03/MAIN-BLOG-1024x270.jpg"
image_alt: ""
cluster: "career-growth"
status: "draft"
visibility: "hidden"
featured: true # featured must be a boolean value
translations: 
    es: ""
    us: ""

---

# This is my dakladsdas


```js
Copycopy code to clipboard
import { Script } from "gatsby"

// `process.env.GTAG` is your Google Analytics 4 identifier defined in your `.env.production` and `.env.development` files

<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG}`}
  strategy="off-main-thread"
/>
<Script id="gtag-config" strategy="off-main-thread" forward={[`gtag`]}>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments)};
    gtag('js', new Date());
    gtag('config', ${process.env.GTAG}, { page_path: location ? location.pathname + location.search + location.hash : undefined })
  `}
</Script>
```
