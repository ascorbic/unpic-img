# Changelog

## 1.0.0

### Major Changes

- cd0fe95: Welcome to version 1.0.0 of Unpic! 🎉

  This is a major update, with changes to the API of all frameworks. This will not
  affect you if you are just using the components with default options, but if you
  are passing custom transformers or specifying the CDN then you will need to
  update your code.

  ## Breaking changes

  - The `cdnOptions` property has been removed. Use the new [`options` property](#provider-options)
    instead.
  - The `transformer` property has been removed from the default `Image` component. Import [the base component](#base-component) and specify the transformer there instead. The type signature for the transformer has also changed. See the `unpic` library documentation for more information.
  - The `cdn` property has been removed. Either use the new [`fallback` property](#fallback-providers) or import [the base component](#base-component) and pass a single provider to it.

  ## Changes

  Most of the changes are because of a new approach to handling individual image
  CDNs and providers in the base Unpic library. This is designed to make Unpic
  more flexible, efficient and modular. It also introduces support for
  type-safe custom operations and options for each provider.

  ### Provider operations

  _Supported frameworks: All except `webc` and `lit`._

  The new `operations` property allows you to specify custom operations for each
  provider. Many image CDNs support dozens of custom operations. Previously these
  were hard to use with Unpic. The new `operations` property gives type-safe
  support for all supported features of each provider. This works even if you have
  images from multiple providers in the same component, as you can specify options
  for each provider separately.

  ```tsx
  <Image
    src="https://example.com/image.jpg"
    operations={{ imgix: { flip: "h" }, bunny: { flop: true } }}
  />
  ```

  The operations are all type-safe, with JSDoc comments and TypeScript definitions
  for all supported operations. This means you can get autocompletion and type
  checking for all operations.

  ### Provider options

  _Supported frameworks: All except `webc` and `lit`._

  The new `options` property allows you to specify custom options for each
  provider. This is similar to the current `cdnOptions` property, but with
  type-safe support for all options of each provider. This allows you to specify
  options such as account IDs and domains for each provider.

  ### Fallback providers

  _Supported frameworks: All. The `astro` and `nextjs` frameworks default to
  the framework's image provider as fallback._

  The new `fallback` property allows you to specify a fallback provider for each
  image. This allows you to use auto-detection for image CDNs as now, but also
  specify a fallback provider for local images and images from unknown providers.
  This is useful if you have a mix of images from different sources, and want to
  ensure that all images are handled correctly. For example, you may have a
  Contentful blog hosted on Netlify, with images that are mostly hosted on
  Contentful (a supported CDN), but also some images from third-parties or your
  own server. You can specify Netlify as the fallback provider so that it uses the
  Netlify Image CDN for all images that are not from Contentful or another
  supported provider. This will be all handled automatically.

  ## Base component

  _Supported frameworks: All except `webc`, `lit` and `angular`._

  Previously, the `Image` and `Source` components always loaded support for every
  provider, even if you specified a single provider or custom transformer. This is
  fine if you are using auto-detection, but many people wanted to use the
  components in a more custom or modular way. The new base components allow you to
  use the Unpic component without any of the automatic detection and transform
  logic. You can provide your own transformer, or use a single, tree-shakable
  provider import. This is useful if you are using a single provider, or if you
  are building a custom component based on Unpic.

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

  The `operations` and `options` properties are still type-safe and inferred from
  the transformer, and you don't need to specify the provider name in the
  `operations` object.

- cd0fe95: Update to use Svelte 5 Runes syntax

### Patch Changes

- Updated dependencies [cd0fe95]
  - @unpic/core@1.0.0

## 0.0.58

### Patch Changes

- 2139c6b: Adds default export

## 0.0.57

### Patch Changes

- Updated dependencies [5080a40]
  - @unpic/core@0.1.0

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.8

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
    - @unpic/core bumped to 0.0.26

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.30

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.37

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.39

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.43

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.44

## [0.0.53](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.52...svelte-v0.0.53) (2024-03-19)

### Bug Fixes

- **deps:** upgrade all dependencies ([#574](https://github.com/ascorbic/unpic-img/issues/574)) ([52ca654](https://github.com/ascorbic/unpic-img/commit/52ca65444f376faf077deecbff6d9f588f1820c6))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.49

## [0.0.52](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.51...svelte-v0.0.52) (2024-03-13)

### Bug Fixes

- **deps:** update dependency unpic to ^3.18.0 ([#519](https://github.com/ascorbic/unpic-img/issues/519)) ([3cd205c](https://github.com/ascorbic/unpic-img/commit/3cd205c7fbfc19e52b42f666835cf0ce7a59b4e0))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped from 0.0.47 to 0.0.48

## [0.0.51](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.50...svelte-v0.0.51) (2024-02-18)

### Bug Fixes

- update ([#504](https://github.com/ascorbic/unpic-img/issues/504)) ([a3775fb](https://github.com/ascorbic/unpic-img/commit/a3775fbcf7e12234584cd6705689e6d9d16fdcbc))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.47

## [0.0.50](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.49...svelte-v0.0.50) (2024-02-08)

### Bug Fixes

- **deps:** update dependency unpic to ^3.17.0 ([#493](https://github.com/ascorbic/unpic-img/issues/493)) ([22b6fd6](https://github.com/ascorbic/unpic-img/commit/22b6fd63292cb717973cf3070657106e7e09b466))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped from 0.0.45 to 0.0.46

## [0.0.49](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.48...svelte-v0.0.49) (2024-02-07)

### Bug Fixes

- **deps:** update dependency unpic to ^3.16.1 ([#491](https://github.com/ascorbic/unpic-img/issues/491)) ([00a4da2](https://github.com/ascorbic/unpic-img/commit/00a4da2b45c439d397637f74e95b6b4828d26f89))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.45

## [0.0.48](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.47...svelte-v0.0.48) (2024-02-06)

### Features

- Added support for on:error to unpic Image component ([#488](https://github.com/ascorbic/unpic-img/issues/488)) ([72d188f](https://github.com/ascorbic/unpic-img/commit/72d188ffffd9ab15d4ccef99b124383212de7b61))

## [0.0.47](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.46...svelte-v0.0.47) (2024-02-04)

### Bug Fixes

- **svelte:** correct lazy loading ([#485](https://github.com/ascorbic/unpic-img/issues/485)) ([c44fad7](https://github.com/ascorbic/unpic-img/commit/c44fad7b9bd2fa119564630c561e59f95b53c7ce))

## [0.0.46](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.45...svelte-v0.0.46) (2024-01-28)

### Bug Fixes

- updates to package.json ([#459](https://github.com/ascorbic/unpic-img/issues/459)) ([3cefa3c](https://github.com/ascorbic/unpic-img/commit/3cefa3c23311b2f352db41665dc075b74247aa8c))

## [0.0.43](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.42...svelte-v0.0.43) (2023-12-11)

### Bug Fixes

- **deps:** update dependency style-object-to-css-string to v1.1.3 ([#419](https://github.com/ascorbic/unpic-img/issues/419)) ([bdaae48](https://github.com/ascorbic/unpic-img/commit/bdaae48f8a974a5625b10116dc1572f27f799f30))
- **deps:** update dependency unpic to ^3.16.0 ([#413](https://github.com/ascorbic/unpic-img/issues/413)) ([c41e8cd](https://github.com/ascorbic/unpic-img/commit/c41e8cd2c3251906e627b711820afe30d25dd7a3))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.42

## [0.0.42](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.41...svelte-v0.0.42) (2023-12-05)

### Bug Fixes

- **deps:** update dependency unpic to ^3.15.0 ([#410](https://github.com/ascorbic/unpic-img/issues/410)) ([26ad5b2](https://github.com/ascorbic/unpic-img/commit/26ad5b28cb3297a78999174d51ce6502d2811c06))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.41

## [0.0.41](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.40...svelte-v0.0.41) (2023-11-16)

### Bug Fixes

- **deps:** update dependency unpic to ^3.14.1 ([#395](https://github.com/ascorbic/unpic-img/issues/395)) ([9f9db47](https://github.com/ascorbic/unpic-img/commit/9f9db47655f187bc47c4f606ca249269659beb07))
- **svelte:** pin style-object-to-css-string ([#397](https://github.com/ascorbic/unpic-img/issues/397)) ([216e65f](https://github.com/ascorbic/unpic-img/commit/216e65fb240a92876978106f89b15e67d668e3a3))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.40

## [0.0.39](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.38...svelte-v0.0.39) (2023-11-16)

### Bug Fixes

- **deps:** update dependency unpic to ^3.14.0 ([#387](https://github.com/ascorbic/unpic-img/issues/387)) ([85e542a](https://github.com/ascorbic/unpic-img/commit/85e542a17b77ac331282c4d80e1d3ea692b80239))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.38

## [0.0.37](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.36...svelte-v0.0.37) (2023-11-07)

### Bug Fixes

- **deps:** update dependency unpic to ^3.13.0 ([#361](https://github.com/ascorbic/unpic-img/issues/361)) ([eb5ce93](https://github.com/ascorbic/unpic-img/commit/eb5ce93506289f877760227341ed1683fe482351))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.36

## [0.0.36](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.35...svelte-v0.0.36) (2023-11-03)

### Features

- **svelte:** forward load listener on Svelte component ([86c01c5](https://github.com/ascorbic/unpic-img/commit/86c01c5288693de72f6bb65497b6413fdedb0bb0))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.35

## [0.0.35](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.34...svelte-v0.0.35) (2023-10-31)

### Bug Fixes

- **deps:** update dependency unpic to ^3.12.0 ([#352](https://github.com/ascorbic/unpic-img/issues/352)) ([9285f94](https://github.com/ascorbic/unpic-img/commit/9285f9441afd1d15a7db033b6de3b1ff82261a59))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.34

## [0.0.34](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.33...svelte-v0.0.34) (2023-10-29)

### Bug Fixes

- **deps:** update dependency unpic to ^3.11.0 ([#350](https://github.com/ascorbic/unpic-img/issues/350)) ([96c6113](https://github.com/ascorbic/unpic-img/commit/96c611382dc8f14a65b4ae4fbb34d366193879b6))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.33

## [0.0.33](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.32...svelte-v0.0.33) (2023-10-25)

### Features

- add support for picture tag ([#328](https://github.com/ascorbic/unpic-img/issues/328)) ([f94e508](https://github.com/ascorbic/unpic-img/commit/f94e508e80de04c250a0f3973b262760424f8e5d))
- add svelte and fix types ([7f9f428](https://github.com/ascorbic/unpic-img/commit/7f9f428bd66226ea9a3ddefc8f5908b58c2bb7ac))
- **angular:** add Angular support ([#146](https://github.com/ascorbic/unpic-img/issues/146)) ([c1ef2e8](https://github.com/ascorbic/unpic-img/commit/c1ef2e8fcdf1cbd3efc8001da3b0e959658ee184))
- **webc:** add WebC/11ty support ([#49](https://github.com/ascorbic/unpic-img/issues/49)) ([be3056f](https://github.com/ascorbic/unpic-img/commit/be3056fdf3e87b382fb86ade74b0d1d3247072bd))

### Bug Fixes

- **deps:** update dependency unpic to ^3.10.0 ([#306](https://github.com/ascorbic/unpic-img/issues/306)) ([df2a589](https://github.com/ascorbic/unpic-img/commit/df2a5893ccd7a4c77005cebcf208ba84e37d93a8))
- **deps:** update dependency unpic to ^3.7.0 ([#284](https://github.com/ascorbic/unpic-img/issues/284)) ([1f90451](https://github.com/ascorbic/unpic-img/commit/1f90451c5ef77db47ee28fe70f5d36890c261f3f))
- **deps:** update dependency unpic to ^3.8.0 ([#286](https://github.com/ascorbic/unpic-img/issues/286)) ([ee9b9ff](https://github.com/ascorbic/unpic-img/commit/ee9b9ff26abeb5163ce053471fd15a70362a3b28))
- **deps:** update dependency unpic to ^3.8.1 ([#289](https://github.com/ascorbic/unpic-img/issues/289)) ([abc4e76](https://github.com/ascorbic/unpic-img/commit/abc4e76e328c6c2b8c20d44237fe56eb92e807e7))
- **deps:** update dependency unpic to ^3.9.0 ([#300](https://github.com/ascorbic/unpic-img/issues/300)) ([30c40a7](https://github.com/ascorbic/unpic-img/commit/30c40a778865e69527523be48cb8affe8295afb4))
- make svelte component reactive ([#84](https://github.com/ascorbic/unpic-img/issues/84)) ([632ce83](https://github.com/ascorbic/unpic-img/commit/632ce83de01fbed586a82d917dfa15fff3051e2c))
- **svelte:** generate types for svelte component ([#245](https://github.com/ascorbic/unpic-img/issues/245)) ([d3db8d2](https://github.com/ascorbic/unpic-img/commit/d3db8d29d8b4fcd7ce848e9ceb378c72d5b6df40))
- **svelte:** remove obsolete typesVersions ([#43](https://github.com/ascorbic/unpic-img/issues/43)) ([a55f9d1](https://github.com/ascorbic/unpic-img/commit/a55f9d15a455989f0b28b40e55367f98e9a10f0e))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.32

## [0.0.32](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.31...svelte-v0.0.32) (2023-10-02)

### Features

- add support for `&lt;picture&gt;` tag ([#328](https://github.com/ascorbic/unpic-img/issues/328)) ([d8b93bd](https://github.com/ascorbic/unpic-img/commit/d8b93bda7a48e4621eaeac81cf20a6bb898be595))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.31

## [0.0.30](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.29...svelte-v0.0.30) (2023-08-01)

### Bug Fixes

- **deps:** update dependency unpic to ^3.10.0 ([#306](https://github.com/ascorbic/unpic-img/issues/306)) ([df2a589](https://github.com/ascorbic/unpic-img/commit/df2a5893ccd7a4c77005cebcf208ba84e37d93a8))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.29

## [0.0.29](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.28...svelte-v0.0.29) (2023-07-20)

### Bug Fixes

- **deps:** update dependency unpic to ^3.9.0 ([#300](https://github.com/ascorbic/unpic-img/issues/300)) ([30c40a7](https://github.com/ascorbic/unpic-img/commit/30c40a778865e69527523be48cb8affe8295afb4))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.28

## [0.0.28](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.27...svelte-v0.0.28) (2023-07-05)

### Bug Fixes

- **deps:** update dependency unpic to ^3.8.1 ([#289](https://github.com/ascorbic/unpic-img/issues/289)) ([abc4e76](https://github.com/ascorbic/unpic-img/commit/abc4e76e328c6c2b8c20d44237fe56eb92e807e7))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.27

## [0.0.26](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.25...svelte-v0.0.26) (2023-07-04)

### Bug Fixes

- **deps:** update dependency unpic to ^3.7.0 ([#284](https://github.com/ascorbic/unpic-img/issues/284)) ([1f90451](https://github.com/ascorbic/unpic-img/commit/1f90451c5ef77db47ee28fe70f5d36890c261f3f))
- **deps:** update dependency unpic to ^3.8.0 ([#286](https://github.com/ascorbic/unpic-img/issues/286)) ([ee9b9ff](https://github.com/ascorbic/unpic-img/commit/ee9b9ff26abeb5163ce053471fd15a70362a3b28))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.25

## [0.0.25](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.24...svelte-v0.0.25) (2023-06-10)

### Bug Fixes

- **svelte:** generate types for svelte component ([#245](https://github.com/ascorbic/unpic-img/issues/245)) ([d3db8d2](https://github.com/ascorbic/unpic-img/commit/d3db8d29d8b4fcd7ce848e9ceb378c72d5b6df40))

## [0.0.15](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.14...svelte-v0.0.15) (2023-03-20)

### Features

- **angular:** add Angular support ([#146](https://github.com/ascorbic/unpic-img/issues/146)) ([c1ef2e8](https://github.com/ascorbic/unpic-img/commit/c1ef2e8fcdf1cbd3efc8001da3b0e959658ee184))

## [0.0.13](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.12...svelte-v0.0.13) (2023-03-10)

### Bug Fixes

- make svelte component reactive ([#84](https://github.com/ascorbic/unpic-img/issues/84)) ([632ce83](https://github.com/ascorbic/unpic-img/commit/632ce83de01fbed586a82d917dfa15fff3051e2c))

## [0.0.7](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.6...svelte-v0.0.7) (2023-02-25)

### Features

- **webc:** add WebC/11ty support ([#49](https://github.com/ascorbic/unpic-img/issues/49)) ([be3056f](https://github.com/ascorbic/unpic-img/commit/be3056fdf3e87b382fb86ade74b0d1d3247072bd))

### Bug Fixes

- **svelte:** remove obsolete typesVersions ([#43](https://github.com/ascorbic/unpic-img/issues/43)) ([a55f9d1](https://github.com/ascorbic/unpic-img/commit/a55f9d15a455989f0b28b40e55367f98e9a10f0e))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.9

## [0.0.5](https://github.com/ascorbic/unpic-img/compare/svelte-v0.0.4...svelte-v0.0.5) (2023-02-21)

### Features

- add svelte and fix types ([7f9f428](https://github.com/ascorbic/unpic-img/commit/7f9f428bd66226ea9a3ddefc8f5908b58c2bb7ac))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.7
