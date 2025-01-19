# Changelog

## 1.0.0

### Major Changes

- cd0fe95: Welcome to version 1.0.0 of Unpic! 🎉

  This is a major update, with changes to the API of all frameworks. This will
  not affect you if you are just using the components with default options, but
  if you are passing custom transformers or specifying the CDN then you will
  need to update your code.

  ## Breaking changes

  - The `cdnOptions` property has been removed. Use the new
    [`options` property](#provider-options) instead.
  - The `transformer` property has been removed from the default `Image`
    component. Import [the base component](#base-component) and specify the
    transformer there instead. The type signature for the transformer has also
    changed. See the `unpic` library documentation for more information.
  - The `cdn` property has been removed. Either use the new
    [`fallback` property](#fallback-providers) or import
    [the base component](#base-component) and pass a single provider to it.

  ## Changes

  Most of the changes are because of a new approach to handling individual image
  CDNs and providers in the base Unpic library. This is designed to make Unpic
  more flexible, efficient and modular. It also introduces support for type-safe
  custom operations and options for each provider.

  ### Provider operations

  _Supported frameworks: All except `webc` and `lit`._

  The new `operations` property allows you to specify custom operations for each
  provider. Many image CDNs support dozens of custom operations. Previously
  these were hard to use with Unpic. The new `operations` property gives
  type-safe support for all supported features of each provider. This works even
  if you have images from multiple providers in the same component, as you can
  specify options for each provider separately.

  ```tsx
  <Image
    src="https://example.com/image.jpg"
    operations={{ imgix: { flip: "h" }, bunny: { flop: true } }}
  />
  ```

  The operations are all type-safe, with JSDoc comments and TypeScript
  definitions for all supported operations. This means you can get
  autocompletion and type checking for all operations.

  ### Provider options

  _Supported frameworks: All except `webc` and `lit`._

  The new `options` property allows you to specify custom options for each
  provider. This is similar to the current `cdnOptions` property, but with
  type-safe support for all options of each provider. This allows you to specify
  options such as account IDs and domains for each provider.

  ### Fallback providers

  _Supported frameworks: All. The `astro` and `nextjs` frameworks default to the
  framework's image provider as fallback._

  The new `fallback` property allows you to specify a fallback provider for each
  image. This allows you to use auto-detection for image CDNs as now, but also
  specify a fallback provider for local images and images from unknown
  providers. This is useful if you have a mix of images from different sources,
  and want to ensure that all images are handled correctly. For example, you may
  have a Contentful blog hosted on Netlify, with images that are mostly hosted
  on Contentful (a supported CDN), but also some images from third-parties or
  your own server. You can specify Netlify as the fallback provider so that it
  uses the Netlify Image CDN for all images that are not from Contentful or
  another supported provider. This will be all handled automatically.

  ## Base component

  _Supported frameworks: All except `webc`, `lit` and `angular`._

  Previously, the `Image` and `Source` components always loaded support for
  every provider, even if you specified a single provider or custom transformer.
  This is fine if you are using auto-detection, but many people wanted to use
  the components in a more custom or modular way. The new base components allow
  you to use the Unpic component without any of the automatic detection and
  transform logic. You can provide your own transformer, or use a single,
  tree-shakable provider import. This is useful if you are using a single
  provider, or if you are building a custom component based on Unpic.

  ```tsx
  // Import from the `/base` subpath
  import { Image } from "@unpic/react/base";
  // Import the transformer for the provider you are using
  import { transform } from "unpic/providers/imgix";

  export const Hero = () => (
    <Image
      src="https://images.unsplash.com/photo-1734108039189-f6c123288381"
      transformer={transform}
      operations={{ sepia: 50 }}
    />
  );
  ```

  The `operations` and `options` properties are still type-safe and inferred
  from the transformer, and you don't need to specify the provider name in the
  `operations` object.

### Patch Changes

- Updated dependencies [cd0fe95]
  - @unpic/core@1.0.0

## 0.1.0

### Minor Changes

- 5080a40: Adds support for image cropping in Astro 5

### Patch Changes

- 5080a40: Fixes trailing slash support in Astro 5
- Updated dependencies [5080a40]
  - @unpic/core@0.1.0

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.8

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.9

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.10

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.11

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.12

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.13

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.14

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.15

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.16

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.17

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.18

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.19

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.20

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.21

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.22

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.23

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.24

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.25

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.26

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.27

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.28

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.29

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.30

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.33

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.34

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.36

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.37

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.38

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.39

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.40

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.41

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.45

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped from 0.0.45 to 0.0.46

## [0.0.47](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.46...astro-v0.0.47) (2024-09-17)

### Bug Fixes

- **astro:** support Astro 5
  ([#689](https://github.com/ascorbic/unpic-img/issues/689))
  ([6e43909](https://github.com/ascorbic/unpic-img/commit/6e43909308328b80e06d699ee1552d750b4662ec))

## [0.0.46](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.45...astro-v0.0.46) (2024-03-19)

### Bug Fixes

- **deps:** upgrade all dependencies
  ([#574](https://github.com/ascorbic/unpic-img/issues/574))
  ([52ca654](https://github.com/ascorbic/unpic-img/commit/52ca65444f376faf077deecbff6d9f588f1820c6))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.49

## [0.0.45](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.44...astro-v0.0.45) (2024-03-13)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped from 0.0.47 to 0.0.48

## [0.0.44](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.43...astro-v0.0.44) (2024-02-18)

### Bug Fixes

- update ([#504](https://github.com/ascorbic/unpic-img/issues/504))
  ([a3775fb](https://github.com/ascorbic/unpic-img/commit/a3775fbcf7e12234584cd6705689e6d9d16fdcbc))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.47

## [0.0.41](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.40...astro-v0.0.41) (2024-01-28)

### Bug Fixes

- updates to package.json
  ([#459](https://github.com/ascorbic/unpic-img/issues/459))
  ([3cefa3c](https://github.com/ascorbic/unpic-img/commit/3cefa3c23311b2f352db41665dc075b74247aa8c))

## [0.0.40](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.39...astro-v0.0.40) (2024-01-27)

### Features

- **astro:** add support for placeholders
  ([#452](https://github.com/ascorbic/unpic-img/issues/452))
  ([4dbff26](https://github.com/ascorbic/unpic-img/commit/4dbff2668a7aa5c6a861e08d6047d4af24de2e61))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.44

## [0.0.39](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.38...astro-v0.0.39) (2024-01-23)

### Features

- **astro:** add experimental image service
  ([#450](https://github.com/ascorbic/unpic-img/issues/450))
  ([552f258](https://github.com/ascorbic/unpic-img/commit/552f258d7f18150087caeeecc28a512d002184db))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.43

## [0.0.38](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.37...astro-v0.0.38) (2024-01-04)

### Bug Fixes

- ignore Astro types in index.ts
  ([#424](https://github.com/ascorbic/unpic-img/issues/424))
  ([a5afc56](https://github.com/ascorbic/unpic-img/commit/a5afc56156e4f2d11ce0a5ce6aff6acb13677743))

## [0.0.37](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.36...astro-v0.0.37) (2023-12-11)

### Features

- **astro:** support Astro 4
  ([#414](https://github.com/ascorbic/unpic-img/issues/414))
  ([7863e1f](https://github.com/ascorbic/unpic-img/commit/7863e1f7a173164cdedc4efa7d384671ee33d9ba))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.42

## [0.0.30](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.29...astro-v0.0.30) (2023-11-03)

### Features

- **svelte:** forward load listener on Svelte component
  ([86c01c5](https://github.com/ascorbic/unpic-img/commit/86c01c5288693de72f6bb65497b6413fdedb0bb0))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.35

## [0.0.27](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.26...astro-v0.0.27) (2023-10-25)

### Features

- add support for picture tag
  ([#328](https://github.com/ascorbic/unpic-img/issues/328))
  ([f94e508](https://github.com/ascorbic/unpic-img/commit/f94e508e80de04c250a0f3973b262760424f8e5d))
- **astro:** add Astro support
  ([#16](https://github.com/ascorbic/unpic-img/issues/16))
  ([eed3472](https://github.com/ascorbic/unpic-img/commit/eed3472b11bacaed558a6edacaac466123823ae5))
- **astro:** support astro 3
  ([#322](https://github.com/ascorbic/unpic-img/issues/322))
  ([de2d7f9](https://github.com/ascorbic/unpic-img/commit/de2d7f96865f380ccdc2cf3feaed98bcca745c0a))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.32

## [0.0.26](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.25...astro-v0.0.26) (2023-10-02)

### Features

- add support for `&lt;picture&gt;` tag
  ([#328](https://github.com/ascorbic/unpic-img/issues/328))
  ([d8b93bd](https://github.com/ascorbic/unpic-img/commit/d8b93bda7a48e4621eaeac81cf20a6bb898be595))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.31

## [0.0.24](https://github.com/ascorbic/unpic-img/compare/astro-v0.0.23...astro-v0.0.24) (2023-09-18)

### Features

- **astro:** support astro 3
  ([#322](https://github.com/ascorbic/unpic-img/issues/322))
  ([de2d7f9](https://github.com/ascorbic/unpic-img/commit/de2d7f96865f380ccdc2cf3feaed98bcca745c0a))

## 0.0.1 (2023-02-21)

### Features

- **astro:** add Astro support
  ([#16](https://github.com/ascorbic/unpic-img/issues/16))
  ([eed3472](https://github.com/ascorbic/unpic-img/commit/eed3472b11bacaed558a6edacaac466123823ae5))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.7
