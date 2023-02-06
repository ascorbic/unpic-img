import { Image } from "@unpic/react";

export function App() {
  return (
    <div>
      <Image
        src="https://images.unsplash.com/photo-1674255909399-9bcb2cab6489?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=996&q=80"
        layout="fullWidth"
        alt="Unsplash"
        height={400}
      />
      <Image
        src="https://cdn.shopify.com/static/sample-images/bath_grande_crop_center.jpeg"
        layout="fixed"
        width={300}
        height={300}
        alt="Shopify"
      />
      <Image
        src="https://bunnyoptimizerdemo.b-cdn.net/bunny7.jpg?width=300"
        width={800}
        height={600}
        layout="constrained"
        alt="Bunny.net"
      />
    </div>
  );
}
