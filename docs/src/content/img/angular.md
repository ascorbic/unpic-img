---
title: "@unpic/angular"
description: "High-performance, responsive Angular images"
githubRepo: "ascorbic/unpic-img"
includeApi: true
---

Angular directive for responsive, high-performance images. Generates a
responsive `<img>` tag that follows best practices, with the correct srcset,
sizes and styles. Detects image URLs from most image CDNs and CMSs and can
resize images with no build step.

## Installation and usage

```bash
npm install @unpic/angular
```

You can either import the directives individually or add the module.

Using the directives:

```typescript
import { UnpicImageDirective, UnpicSourceDirective } from "@unpic/angular";

@Component({
  // ...
  standalone: true,
  imports: [UnpicImageDirective, UnpicSourceDirective],
})

```

Using the module:

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

You can also use it with `<picture>` tags. Ensure you have added the Source
directive and add the `unpic` attribute to the `<source>` and `<img>` tags. See
[this guide](/img/learn/#art-direction) to learn more about using art direction
with Unpic.

```html
<picture class="hero">
  <!-- Large screens get a full-width hero image -->
  <source
    unpic
    src="https://images.unsplash.com/photo-1694406805270-f3a93e91f4b6"
    media="(min-width: 601px)"
    layout="fullWidth"
  />
  <!-- Small screens get a constrained square image -->
  <source
    unpic
    src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
    media="(max-width: 600px)"
    width="600"
    height="600"
  />
  <!-- Always include an Image as the final element -->
  <img
    unpic
    src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
    width="600"
    height="600"
    alt="Aurora"
    unstyled
  />
</picture>
```
