import type { Component } from "solid-js";
import { Image, Source } from "@unpic/solid";
import "./art-direction.css";

const App: Component = () => {
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-1617718295766-0f839c2853e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTczfHxyYWluZm9yZXN0JTIwYmVhY2h8ZW58MHx8MHx8&auto=format&fit=crop&w=900&q=60"
        layout="fullWidth"
        alt=""
        priority
        height={400}
        background="auto"
      />
      <Image
        src="https://cdn.shopify.com/static/sample-images/garnished.jpeg"
        layout="constrained"
        width={800}
        height={600}
        alt="Shopify"
      />
      <Image
        src="https://bunnyoptimizerdemo.b-cdn.net/bunny7.jpg?width=300"
        width={400}
        height={300}
        layout="fixed"
        alt="Bunny.net"
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
