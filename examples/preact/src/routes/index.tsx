import { Image } from "@unpic/preact";
import { Image as BaseImage } from "@unpic/preact/base";
import { App } from "../App";
import { transform } from "unpic/providers/imgix";

export default function Index() {
  return (
    <App title="Test">
      <BaseImage
        src="https://images.unsplash.com/photo-1617718295766-0f839c2853e7"
        layout="fullWidth"
        alt="fullWidth"
        aspectRatio={16 / 9}
        priority
        operations={{
          flip: "v",
        }}
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
      />
      <div style={{ height: 10000 }} />
      <Image
        src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
        layout="constrained"
        width={600}
        height={800}
        alt="offscreen"
      />
    </App>
  );
}
