import type { Component } from "solid-js";
import { Image, Source } from "@unpic/solid";
import "./art-direction.css";

const App: Component = () => {
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-1617718295766-0f839c2853e7"
        layout="fullWidth"
        alt="fullWidth"
        aspectRatio={16 / 9}
        priority
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
      <div style="height: 10000px"></div>
      <Image
        src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
        layout="constrained"
        width={600}
        height={800}
        alt="offscreen"
      />
      <picture class="hero">
        {/* Large screens get a full-width hero image */}
        <Source
          src="https://images.unsplash.com/photo-1694406805270-f3a93e91f4b6"
          media="(min-width: 601px)"
          layout="fullWidth"
        />
        {/* Small screens get a constrained square image */}
        <Source
          src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
          media="(max-width: 600px)"
          width={600}
          height={600}
        />
        {/* Always include an Image as the final element */}
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
