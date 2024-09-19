/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, test, expect } from "vitest";
import { transformProps } from "../src/core";

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
      "https://res.cloudinary.com/example/image/upload/w_800,h_600,c_lfill,f_auto/images/my-image",
    );
  });

  test("allows an image ID for src when using a custom transformer", () => {
    const id = "images/my-image";
    const width = 800;
    const height = 800;
    const props = transformProps({
      src: id,
      width,
      height,
      layout: "constrained",
      objectFit: "cover",
      transformer: ({ url: tUrl, width: tWidth, height: tHeight }) => {
        return `https://res.cloudinary.com/example/image/upload/w_${tWidth},h_${tHeight},c_lfill,f_auto/${tUrl}`;
      },
    });
    expect(props.src).toEqual(
      `https://res.cloudinary.com/example/image/upload/w_${width},h_${height},c_lfill,f_auto/${id}`,
    );
  });

  test("doesn't throw if props are empty", () => {
    const props = transformProps({} as any);
    expect(props).toBeDefined();
    expect(props.src).toBeUndefined();
    expect(props.loading).toEqual("lazy");
  });

  test("doesn't throw if src is empty", () => {
    const props = transformProps({ width: 100, height: 200 } as any);
    expect(props).toBeDefined();
    expect(props.src).toBeUndefined();
    expect(props.loading).toEqual("lazy");
    expect(props.width).toEqual(100);
    expect(props.height).toEqual(200);
  });
});
