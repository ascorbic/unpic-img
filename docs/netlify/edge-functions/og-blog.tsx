/* @jsxImportSource https://esm.sh/react */
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.6/mod.ts";
import { Config } from "https://edge.netlify.com/";

const font = fetch(
  "https://fonts.gstatic.com/s/firasans/v16/va9E4kDNxMZdWfMOD5VfkA.ttf",
).then((res) => res.arrayBuffer());

const boldFont = fetch(
  "https://fonts.gstatic.com/s/firasans/v16/va9B4kDNxMZdWfMOD5VnSKzuQQ.ttf",
).then((res) => res.arrayBuffer());

export default async function handler(req: Request) {
  const [normal, bold] = await Promise.all([font, boldFont]);
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "";
  const img = searchParams.get("img") || "";
  const logo = new URL("/tree.png", req.url);

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: "Fira Sans",
          color: "white",
          backgroundImage: `url(${img})`,
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            background: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            padding: "50px",
            justifyContent: "flex-end",
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
            <img src={logo.toString()} width={100} height={100} />
            <span style={{ width: 30 }} />
            Unpic
          </h1>
          <p
            style={{
              fontSize: 50,
            }}
          >
            {title}
          </p>
        </div>
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
    },
  );
}

export const config: Config = {
  path: "/og-blog.png",
};
