<template>
  <source v-bind="sourceProps" />
</template>

<script setup lang="ts">
import { transformSourceProps, UnpicSourceProps } from "@unpic/core";
import { SourceHTMLAttributes, computed, useAttrs } from "vue";

export interface Props extends /* @vue-ignore */ SourceHTMLAttributes {
  src: string;
  width?: string | number;
  height?: string | number;
  layout?: "fixed" | "constrained" | "fullWidth";
  cdn?: string;
  fallback?: string;
  aspectRatio?: number;
}

const props = defineProps<Props>();

const attrs: SourceHTMLAttributes = useAttrs();

const sourceProps = computed(() =>
  transformSourceProps<SourceHTMLAttributes>({
    ...attrs,
    ...props,
  } as UnpicSourceProps),
);
</script>
