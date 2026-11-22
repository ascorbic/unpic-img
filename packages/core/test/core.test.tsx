/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect } from "vitest";
import { transformBaseImageProps, transformBaseSourceProps } from "../src/base";
import { transformProps } from "../src/auto";
import type { Operations } from "unpic";

const srcsetUrls = (srcset: unknown): Array<string> =>
  String(srcset ?? "")
    .split(",\n")
    .map((entry) => entry.split(" ")[0]);

describe("Core", () => {
  test("updates the src URL to include transformations", () => {
    const props = transformProps({
      src: "https://res.cloudinary.com/example/image/upload/images/my-image",
      width: 800,
      height: 600,
      layout: "constrained",
      objectFit: "cover",
    });
    expect(props.src).toEqual(
      "https://res.cloudinary.com/example/image/upload/w_800,h_600,f_auto,c_lfill/images/my-image",
    );
  });

  test("allows an image ID for src when using a custom transformer", () => {
    const id = "images/my-image";
    const width = 800;
    const height = 800;
    const props = transformBaseImageProps({
      src: id,
      width,
      height,
      layout: "constrained",
      objectFit: "cover",
      transformer: (tUrl, { width: tWidth, height: tHeight }) => {
        return `https://res.cloudinary.com/example/image/upload/w_${tWidth},h_${tHeight},c_lfill,f_auto/${tUrl}`;
      },
    });
    expect(props.src).toEqual(
      `https://res.cloudinary.com/example/image/upload/w_${width},h_${height},c_lfill,f_auto/${id}`,
    );
  });

  test("doesn't throw if props are empty", () => {
    const props = transformBaseImageProps({} as any);
    expect(props).toBeDefined();
    expect(props.src).toBeUndefined();
    expect(props.loading).toEqual("lazy");
  });

  test("doesn't throw if src is empty", () => {
    const props = transformBaseImageProps({ width: 100, height: 200 } as any);
    expect(props).toBeDefined();
    expect(props.src).toBeUndefined();
    expect(props.loading).toEqual("lazy");
    expect(props.width).toEqual(100);
    expect(props.height).toEqual(200);
  });

  test("keeps operations.format in every srcset entry", () => {
    const props = transformProps({
      src: "https://images.unsplash.com/photo-1617718295766-0f839c2853e7",
      width: 800,
      height: 600,
      layout: "constrained",
      operations: { imgix: { format: "webp" } },
    });
    const urls = srcsetUrls(props.srcset);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(new URL(url).searchParams.get("fm")).toEqual("webp");
    }
    expect(new URL(String(props.src)).searchParams.get("fm")).toEqual("webp");
  });

  test("source type takes precedence over operations.format in srcset", () => {
    const props = transformBaseSourceProps({
      src: "images/my-image",
      width: 800,
      height: 600,
      layout: "constrained",
      type: "image/avif",
      operations: { format: "webp" },
      transformer: (src: string | URL, { width, format }: Operations) =>
        `https://example.com/${src}?w=${width}&format=${format}`,
    });
    const urls = srcsetUrls(props.srcset);
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(new URL(url).searchParams.get("format")).toEqual("avif");
    }
  });
});
