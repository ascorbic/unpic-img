---
title: "@unpic/lit"
description: "High-performance, responsive Lit image component"
githubRepo: "ascorbic/unpic-img"
includeApi: true
---

A high-performance, responsive image component for [Lit](https://lit.dev/).
Generates a responsive `<img>` tag that follows best practices, with the correct
srcset, sizes and styles. Detects image URLs from most image CDNs and CMSs and
can resize images with no build step.

## Installation and usage

If using with a bundler, install the package:

```bash
npm install @unpic/lit
```

...then import the component:

```js
import "@unpic/lit";
```

You can then use the component in your HTML:

```html
<unpic-img
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width="800"
  height="600"
  alt="A lovely bath"
></unpic-img>
```

## Styling

If you need to style the `img` element, you can use the
[`::part` pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/::part):

```css
unpic-img::part(image) {
  border-radius: 4px;
}
```
