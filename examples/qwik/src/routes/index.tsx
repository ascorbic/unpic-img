import { $, component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import { Image as BaseImage } from "@unpic/qwik/base";
import { transform } from "unpic/providers/imgix";

export default component$(() => {
  return (
    <div>
      <BaseImage
        src="https://images.unsplash.com/photo-1617718295766-0f839c2853e7"
        layout="fullWidth"
        alt="fullWidth"
        aspectRatio={16 / 9}
        priority
        transformer$={$(transform)}
        operations={{
          flip: "v",
        }}
      />
      <Image
        src="https://cdn.shopify.com/static/sample-images/garnished.jpeg"
        layout="constrained"
        width={800}
        height={600}
        alt="constrained"
      />
      <Image
        src="https://bunnyoptimizerdemo.b-cdn.net/bunny7.jpg"
        width={800}
        height={600}
        layout="fixed"
        alt="fixed"
      />
      <div style={{ height: 10000 }}></div>
      <Image
        src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
        layout="constrained"
        width={600}
        height={800}
        alt="offscreen"
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
