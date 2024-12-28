import { component$ } from "@builder.io/qwik";
import { transformProps } from "@unpic/core";
import type { QwikIntrinsicElements } from "@builder.io/qwik";
import type { UnpicImageProps } from "@unpic/core";
export type ImageProps = UnpicImageProps<QwikIntrinsicElements["img"]>;

export const Image = component$((props: ImageProps) => {
  return <img {...transformProps<QwikIntrinsicElements["img"]>(props)} />;
});
