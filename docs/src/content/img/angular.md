---
title: "@unpic/angular"
description: "High-performance, responsive Angular images"
---

Angular directive for responsive, high-performance images.

## Installation and usage

```bash
npm install @unpic/angular
```

Add to app module:

```typescript
// ..
import { UnpicDirective } from "@unpic/angular";

@NgModule({
  // ...
  imports: [BrowserModule, UnpicDirective],
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
