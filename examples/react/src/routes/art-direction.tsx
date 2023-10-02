import { Image, Source } from "@unpic/react";
import { App } from "../App";
import "./art-direction.css";
export default function Index() {
  return (
    <App title="Hello">
      <picture className="hero">
        {/* <!-- Large screens get a full-width hero image --> */}
        <Source
          src="https://images.unsplash.com/photo-1694406805270-f3a93e91f4b6"
          media="(min-width: 601px)"
          layout="fullWidth"
        />
        {/* <!-- Small screens get a constrained square image --> */}
        <Source
          src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
          media="(max-width: 600px)"
          width={600}
          height={600}
        />
        {/* <!-- Always include an Image as the final element --> */}
        <Image
          src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
          width={600}
          height={600}
          alt="Aurora"
          unstyled
        />
      </picture>
    </App>
  );
}
