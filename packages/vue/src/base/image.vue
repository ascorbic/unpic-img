<template>
  <img v-bind="imageProps" />
</template>

<script setup lang="ts" generic="TOperations extends Operations, TOptions">
import { transformBaseImageProps, type UnpicBaseImageProps, type Operations } from "@unpic/core/base";
import { TransformerFunction } from "unpic";
import { type ImgHTMLAttributes, type StyleValue, computed, useAttrs } from "vue";

export interface Props<TOperations extends Operations, TOptions> extends /* @vue-ignore */ ImgHTMLAttributes {
  src: string;
  width?: string | number;
  height?: string | number;
  layout?: "fixed" | "constrained" | "fullWidth";
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
  transformer: TransformerFunction<TOperations, TOptions>;
  operations?: TOperations;
  options?: TOptions;
}
const props = defineProps<Props<TOperations, TOptions>>();

const attrs: ImgHTMLAttributes = useAttrs();

const imageProps = computed(() =>
  transformBaseImageProps<TOperations, TOptions, ImgHTMLAttributes, StyleValue>({
    ...attrs,
    ...props,
  } as UnpicBaseImageProps<TOperations, TOptions, ImgHTMLAttributes>),
);
</script>
