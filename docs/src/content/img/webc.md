---
title: "@unpic/webc"
description: "High-performance, responsive WebC image component"
---

A high-performance, responsive image component for
[WebC](https://github.com/11ty/webc).

## Installation and usage

```bash
npm install @unpic/webc
```

The requires `@11ty/webc` version 0.9.0 or later, because it uses the new
`webc.attributes` feature.

If you are using this with Eleventy, there are a number of ways of defining WebC
components. In the example we're using `webc:import`, but
[check out the docs](https://www.11ty.dev/docs/languages/webc/#defining-components)
for other options that handle imports automatically. You can then use the
component in your templates:

```html
<unpic-img
  webc:import="npm:@unpic/webc"
  src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
  layout="constrained"
  width="800"
  height="600"
  alt="A lovely bath"
></unpic-img>
```
