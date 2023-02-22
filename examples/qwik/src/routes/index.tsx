import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";

export default component$(() => {
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-1674255909399-9bcb2cab6489?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=996&q=80"
        layout="fullWidth"
        alt=""
        priority
        height={400}
        background="auto"
      />
      <Image
        src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
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
