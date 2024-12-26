<template>
  <img v-bind="imageProps" />
</template>

<script setup lang="ts" generic="TOperations extends Operations, TOptions">
import { transformBaseImageProps, type UnpicBaseImageProps, type Operations } from "@unpic/core/base";
import { ImgHTMLAttributes, computed, useAttrs } from "vue";
import type { StyleValue } from "vue";

type ImageAttrs = /* @vue-ignore */ ImgHTMLAttributes;

const props = defineProps<UnpicBaseImageProps<TOperations, TOptions, ImageAttrs>>();

const attrs: ImageAttrs = useAttrs();

const imageProps = computed(() =>
  transformBaseImageProps<TOperations, TOptions, ImageAttrs, StyleValue>({
    ...attrs,
    ...props,
  }),
);
</script>
