import { Image } from "@unpic/react";

export function App() {
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
        width={300}
        height={600}
        layout="fixed"
        alt="Bunny.net"
      />
    </div>
  );
}
