<script setup lang="ts">
import { Image, Source } from "@unpic/vue";
</script>

<template>
    <div>
      <Image
        src="https://images.unsplash.com/photo-1617718295766-0f839c2853e7"
        layout="fullWidth"
        alt="fullWidth"
        aspectRatio="1.77777"
        priority
      />
      <Image
        src="https://cdn.shopify.com/static/sample-images/garnished.jpeg"
        layout="constrained"
        width={800}
        height={600}
        alt="constrained"
      />
      <Image
        src="https://bunnyoptimizerdemo.b-cdn.net/bunny7.jpg"
        width={800}
        height={600}
        layout="fixed"
        alt="fixed"
      />
      <div style={{ height: 10000 }}></div>
      <Image
        src="https://cdn.shopify.com/static/sample-images/bath.jpeg"
        layout="constrained"
        width={600}
        height={800}
        alt="offscreen"
      />
    </div>
</template>

<style scoped>
/* Style for all layouts */
.hero img {
  object-fit: cover;
  width: 100%;
}

@media (min-width: 601px) {
  /* Style for full-width layout */
  .hero img {
    height: 600px;
  }
}
@media (max-width: 600px) {
  /* Style for constrained layout */
  .hero img {
    max-width: 600px;
    aspect-ratio: 1/1;
  }
}
</style>