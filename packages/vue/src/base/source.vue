<template>
  <source v-bind="sourceProps" />
</template>

<script setup lang="ts" generic="TOperations extends Operations, TOptions">
import { transformBaseSourceProps, type UnpicBaseSourceProps, type Operations } from "@unpic/core/base";
import { SourceHTMLAttributes, computed, useAttrs } from "vue";

type SourceAttrs = /* @vue-ignore */ SourceHTMLAttributes;

const props = defineProps<UnpicBaseSourceProps<TOperations, TOptions>>();

const attrs: SourceAttrs = useAttrs();

const sourceProps = computed(() =>
  transformBaseSourceProps<SourceAttrs, TOperations, TOptions>({
    ...attrs,
    ...props,
  }),
);
</script>
