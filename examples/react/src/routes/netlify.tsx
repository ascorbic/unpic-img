import { Image } from "@unpic/react";
import { App } from "../App";

export default function Index() {
  return (
    <App title="Hello">
      <Image
        src="https://placekitten.com/1000/1000"
        width={800}
        height={600}
        alt="Kitten"
        cdn="netlify"
      />
      <Image
        src="/formentor.jpg"
        width={800}
        height={600}
        alt="Cap Formentor"
        cdn="netlify"
      />
    </App>
  );
}
