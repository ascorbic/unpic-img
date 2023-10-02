<script lang="ts">
  import { Image, Source } from "@unpic/svelte";
</script>

<picture class="hero">
  <!-- Large screens get a full-width hero image -->
  <Source
    src="https://images.unsplash.com/photo-1694406805270-f3a93e91f4b6"
    media="(min-width: 601px)"
    layout="fullWidth"
  />
  <!-- Small screens get a constrained square image -->
  <Source
    src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
    media="(max-width: 600px)"
    width={600}
    height={600}
  />
  <!-- Always include an Image as the final element -->
  <Image
    src="https://images.unsplash.com/photo-1693711942336-f4f9963bd364"
    width={600}
    height={600}
    alt="Aurora"
    unstyled
  />
</picture>


<style>
  /* Style for all layouts */
  .hero :global(img) {
    object-fit: cover;
    width: 100%;
  }

  @media (min-width: 601px) {
    /* Style for full-width layout */
    .hero :global(img) {
      height: 600px;
    }
  }
  @media (max-width: 600px) {
    /* Style for constrained layout */
    .hero :global(img) {
      max-width: 600px;
      aspect-ratio: 1/1;
    }
  }
</style>
