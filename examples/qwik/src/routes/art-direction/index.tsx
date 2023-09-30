import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Image, Source } from "@unpic/qwik";
import "./art-direction.css";
export default component$(() => {
  return (
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
