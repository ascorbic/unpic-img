/* @jsxImportSource https://esm.sh/react */
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.6/mod.ts";
import { Config } from "https://edge.netlify.com/";

const font = fetch(
  "https://fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5VfkA.ttf"
).then((res) => res.arrayBuffer());

const boldFont = fetch(
  "https://fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnSKzuQQ.ttf"
).then((res) => res.arrayBuffer());

export default async function handler(req: Request) {
  const [normal, bold] = await Promise.all([font, boldFont]);
  const img = new URL("/tree.png", req.url);
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "";
  const description =
    searchParams.get("description") || "The best image handling on the web";
  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "Fira Sans",
          color: "white",
          background: "linear-gradient(to top, #24243e, #302b63, #0f0c29)",
          width: "100%",
          height: "100%",
          padding: "50px",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: 100,
            display: "flex",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          <img src={img.toString()} width={100} height={100} />
          <span style={{ width: 30 }} />
          Unpic
        </h1>
        <p
          style={{
            fontSize: 60,
            fontWeight: 700,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: 50,
          }}
        >
          {description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // Supported options: 'twemoji', 'blobmoji', 'noto', 'openmoji', 'fluent', 'fluentFlat'
      // Default to 'twemoji'
      fonts: [
        {
          name: "Fira Sans",
          data: normal,
          weight: 400,
        },
        {
          name: "Fira Sans",
          data: bold,
          weight: 700,
        },
      ],
    }
  );
}

export const config: Config = {
  path: "/og.png",
  cache: "manual",
};
