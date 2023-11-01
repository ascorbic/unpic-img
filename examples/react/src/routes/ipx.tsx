import { Image } from "@unpic/react";
import { App } from "../App";

export default function Index() {
  return (
    <App title="Hello">
      <p>Hi</p>
      <Image
        src="https://placekitten.com/1000/1000"
        width={800}
        height={600}
        alt="Kitten"
        cdn="ipx"
      />
    </App>
  );
}
