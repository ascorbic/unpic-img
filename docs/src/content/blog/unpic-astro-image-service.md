---
title: Automatically optimize your Astro images with the Unpic image service
description:
  "Make your Astro images responsive and performant with no code changes"
publishDate: 2024-01-28
image: https://images.unsplash.com/photo-1623194417728-adf641357d41?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
image_alt: Paraty
---

Unpic has offered a native image component for Astro for nearly a year now, but
I'm happy to announce that it now also offers an image service. This means you
can get the benefit of Unpic's responsive, high-performance images without
changing any code in your site. Your existing Astro images will be automatically
optimized - any that are hosted on a CDN that supports resizing will be resized
there, and if you are deploying to Netlify or Vercel local images will
automatically use those image CDNs. All other images will still work with the
default Astro image service. You can carry on using the default Astro image
component, and it will generate all the right `sizes` and `srcset` attributes
for you. If you want more control you can still use the Unpic image component
for Astro or any UI framework.

## How does it work?

Let's say you're using Astro for your Contentful blog. Your data includes the
URLs of your images, which are hosted on Contentful's CDN. Here's an example of
displaying a list of blog posts:

```astro
---
import { Image } from "astro:assets";
import { contentfulClient } from "../lib/contentful";

const entries = await contentfulClient.getEntries({
  content_type: "blogPost",
});
---

{
  entries.map((entry) => (
    <section>
      <Image
        src={entry.image.file.url}
        alt={entry.image.title}
        width={1024}
        height={768}
      />
      <h2>{entry.title}</h2>
    </section>
  ))
}
```

If you do this with the default Astro image component, it will generate
something like this:

```html
<img
  src="https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg"
  alt="Toy"
  width="1024"
  height="768"
  loading="lazy"
  decoding="async"
/>
```

This has the right lazy loading props, but it isn't responsive and uses the
full-size image URL which is probably far too large.

We now enable Unpic by adding the service to `astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import { imageService } from "@unpic/astro/service";
export default defineConfig({
  image: {
    service: imageService(),
  },
});
```

Now we can look at the generated HTML again. The component itself is unchanged,
but the generated HTML has been transformed to this:

```html
<img
  src="https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=1024&#38;h=768&#38;fit=fill"
  srcset="
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=640&#38;fit=fill   640w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=750&#38;fit=fill   750w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=828&#38;fit=fill   828w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=960&#38;fit=fill   960w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=1024&#38;fit=fill 1024w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=1080&#38;fit=fill 1080w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=1280&#38;fit=fill 1280w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=1668&#38;fit=fill 1668w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=1920&#38;fit=fill 1920w,
    https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg?w=2048&#38;fit=fill 2048w
  "
  alt="Toy"
  url="https://images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg"
  loading="lazy"
  decoding="async"
  sizes="(min-width: 1024px) 1024px, 100vw"
  style="object-fit:cover;max-width:1024px;max-height:768px;aspect-ratio:1.333;width:100%"
/>
```

It has done this by recognizing that the image is hosted on Contentful's CDN,
and generating the correct URL for each size. It defaults to the "constrained"
layout, though you can change this in the service config. The srcset and sizes
attributes are generated based on this, and styles are added to ensure it
resizes fluidly, avoids layout shift, and preserves aspect ratio.

## Placeholder images

While an image is loading, it's a good idea to show a placeholder. It avoids
having a page full of white rectangles while the images load, and can reduce
largest contentful paint times. Now on Astro, Unpic will automatically generate
placeholder images for you. There are three types of placeholder that it can
generate: dominant color, blurhash and low-res image. Have a look at the
[placeholder demo](https://unpic-astro.netlify.app/placeholders/) to see them in
action.

Take a look at [the docs](/img/astro) for more details on how to use the new
Astro image service.
