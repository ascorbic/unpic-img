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
  name: "unpic-image",
  props: {
    src: {
      type: String,
      required: true,
    },
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
    width: {
      type: Number,
      required: false,
    },
    height: {
      type: Number,
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
