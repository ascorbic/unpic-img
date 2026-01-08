/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect } from "vitest";
import { transformBaseImageProps } from "../src/base";
import { transformProps } from "../src/auto";
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

  test("merges user styles with generated styles", () => {
    const props = transformBaseImageProps({
      src: "images/my-image",
      width: 800,
      height: 600,
      layout: "constrained",
      objectFit: "cover",
      style: { border: "1px solid red", opacity: "0.5" },
      transformer: (tUrl) => tUrl,
    });
    expect(props.style).toBeDefined();
    // Generated styles should be present
    expect(props.style?.["object-fit"]).toEqual("cover");
    expect(props.style?.["max-width"]).toEqual("800px");
    expect(props.style?.["width"]).toEqual("100%");
    // User styles should be present and override if needed
    expect(props.style?.["border"]).toEqual("1px solid red");
    expect(props.style?.["opacity"]).toEqual("0.5");
  });

  test("user styles override generated styles", () => {
    const props = transformBaseImageProps({
      src: "images/my-image",
      width: 800,
      height: 600,
      layout: "constrained",
      objectFit: "contain",
      style: { "object-fit": "fill", border: "2px solid blue" },
      transformer: (tUrl) => tUrl,
    });
    expect(props.style).toBeDefined();
    // User's object-fit should override generated one
    expect(props.style?.["object-fit"]).toEqual("fill");
    expect(props.style?.["border"]).toEqual("2px solid blue");
    // Other generated styles should still be present
    expect(props.style?.["max-width"]).toEqual("800px");
  });
});
