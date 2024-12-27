import type { Component } from "solid-js";
import { Image, Source } from "@unpic/solid";
import { Image as BaseImage } from "@unpic/solid/base";
import "./art-direction.css";
import { transform } from "unpic/providers/imgix";

const App: Component = () => {
  return (
    <div>
      <BaseImage
        src="https://images.unsplash.com/photo-1617718295766-0f839c2853e7"
        layout="fullWidth"
        alt="fullWidth"
        aspectRatio={16 / 9}
        operations={{
          flip: "v",
        }}
        priority
        transformer={transform}
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
        operations={{
          bunny: {
            flop: true,
          },
        }}
      />
      <div style="height: 10000px"></div>
      <Image
        src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
        layout="constrained"
        width={600}
        height={800}
        alt="offscreen"
      />
      <picture class="hero">
        <Source
          src="https://images.unsplash.com/photo-1694406805270-f3a93e91f4b6"
          media="(min-width: 601px)"
          layout="fullWidth"
        />
        <Source
          src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
          media="(max-width: 600px)"
          width={600}
          height={600}
        />
        <Image
          src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
          width={600}
          height={600}
          alt="Aurora"
          unstyled
        />
      </picture>
    </div>
  );
};

export default App;
