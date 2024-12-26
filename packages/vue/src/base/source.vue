<template>
  <source v-bind="sourceProps" />
</template>

<script setup lang="ts" generic="TOperations extends Operations, TOptions">
import { transformBaseSourceProps, type UnpicBaseSourceProps, type Operations } from "@unpic/core/base";
import { TransformerFunction } from "unpic";
import { SourceHTMLAttributes, computed, useAttrs } from "vue";

export interface Props<TOperations extends Operations, TOptions> extends /* @vue-ignore */ SourceHTMLAttributes {
  src: string;
  width?: string | number;
  height?: string | number;
  layout?: "fixed" | "constrained" | "fullWidth";
  cdn?: string;
  fallback?: string;
  aspectRatio?: number;
  transformer: TransformerFunction<TOperations, TOptions>;
  operations?: TOperations;
  options?: TOptions;
}

const props = defineProps<Props<TOperations, TOptions>>();

const attrs: SourceHTMLAttributes = useAttrs();

const sourceProps = computed(() =>
  transformBaseSourceProps<SourceHTMLAttributes, TOperations, TOptions>({
    ...attrs,
    ...props,
  } as UnpicBaseSourceProps<TOperations, TOptions>),
);
</script>
