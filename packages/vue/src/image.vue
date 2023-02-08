<template>
  <img v-bind="imageProps" />
</template>

<script lang="ts">
import {
  CoreImageAttributes,
  transformProps,
  UnpicImageProps,
  getStyle,
} from "@unpic/core";

export default {
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
      } as UnpicImageProps<CoreImageAttributes>);
    },
  },
};
</script>
