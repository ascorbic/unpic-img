---
title: "@unpic/angular"
description: "High-performance, responsive Angular images"
githubRepo: "ascorbic/unpic-img"
includeApi: true
---

Angular directive for responsive, high-performance images.

## Installation and usage

```bash
npm install @unpic/angular
```

Add to app module:

```typescript
// ..
import { UnpicModule } from "@unpic/angular";

@NgModule({
  // ...
  imports: [BrowserModule, UnpicModule],
})
```

You can then use it by adding the `unpic` attribute to an `<img>` tag:

```html
<img
  unpic
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width="800"
  height="600"
  alt="A lovely bath"
/>
```

You can also use it with `<picture>` tags. Add the `unpic` attribute to the
`<source>` and `<img>` tags:

```html

```
