<template>
  <img v-bind="imageProps" />
</template>

<script lang="ts">
import {
  transformProps,
  UnpicImageProps,
} from "@unpic/core";
import { defineComponent, ImgHTMLAttributes } from "vue";

export default defineComponent({
  name: "image",
  props: {
    layout: {
      type: String,
      required: false,
    },
    background: {
      type: String,
      required: false,
    },
    priority: {
      type: Boolean,
      required: false,
    },
    cdn: {
      type: String,
      required: false,
    },
  },
  computed: {
    imageProps() {
      return transformProps({
        ...this.$props,
        ...this.$attrs,
      } as UnpicImageProps<ImgHTMLAttributes>);
    },
  },
});
</script>
