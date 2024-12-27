<template>
  <img v-bind="imageProps" />
</template>

<script setup lang="ts">
import { transformProps, UnpicImageProps } from "@unpic/core";
import { ImgHTMLAttributes, computed, useAttrs } from "vue";

export interface Props extends /* @vue-ignore */ ImgHTMLAttributes {
  src: string;
  width?: string | number;
  height?: string | number;
  layout?: "fixed" | "constrained" | "fullWidth";
  cdn?: string;
  priority?: boolean;
  background?: string;
  aspectRatio?: number;
  objectFit?:
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down"
  | "inherit"
  | "initial";
  unstyled?: boolean;
}

const props = defineProps<Props>();

const attrs: ImgHTMLAttributes = useAttrs();

const imageProps = computed(() =>
  transformProps({ ...attrs, ...props } as UnpicImageProps<ImgHTMLAttributes>),
);
</script>
