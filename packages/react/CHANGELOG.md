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

## 0.1.15

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
    - @unpic/core bumped to 0.0.40

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.41

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.42

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.43

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.44

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.45

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped from 0.0.45 to 0.0.46

## [0.1.14](https://github.com/ascorbic/unpic-img/compare/react-v0.1.13...react-v0.1.14) (2024-04-28)

### Bug Fixes

- **react:** handle fetchpriority vs fetchPriority
  ([#644](https://github.com/ascorbic/unpic-img/issues/644))
  ([6b76808](https://github.com/ascorbic/unpic-img/commit/6b768085803a49882e7036e4358b52d1972ecc7c))
- **react:** support Next.js server component
  ([#646](https://github.com/ascorbic/unpic-img/issues/646))
  ([a2e58ea](https://github.com/ascorbic/unpic-img/commit/a2e58ea207d585e61bd6039876747e3e72e3d1ba))

## [0.1.13](https://github.com/ascorbic/unpic-img/compare/react-v0.1.12...react-v0.1.13) (2024-03-19)

### Bug Fixes

- **deps:** upgrade all dependencies
  ([#574](https://github.com/ascorbic/unpic-img/issues/574))
  ([52ca654](https://github.com/ascorbic/unpic-img/commit/52ca65444f376faf077deecbff6d9f588f1820c6))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.49

## [0.1.12](https://github.com/ascorbic/unpic-img/compare/react-v0.1.11...react-v0.1.12) (2024-03-13)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped from 0.0.47 to 0.0.48

## [0.1.11](https://github.com/ascorbic/unpic-img/compare/react-v0.1.10...react-v0.1.11) (2024-02-18)

### Bug Fixes

- update ([#504](https://github.com/ascorbic/unpic-img/issues/504))
  ([a3775fb](https://github.com/ascorbic/unpic-img/commit/a3775fbcf7e12234584cd6705689e6d9d16fdcbc))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.47

## [0.1.8](https://github.com/ascorbic/unpic-img/compare/react-v0.1.7...react-v0.1.8) (2024-01-28)

### Bug Fixes

- updates to package.json
  ([#459](https://github.com/ascorbic/unpic-img/issues/459))
  ([3cefa3c](https://github.com/ascorbic/unpic-img/commit/3cefa3c23311b2f352db41665dc075b74247aa8c))

## [0.1.3](https://github.com/ascorbic/unpic-img/compare/react-v0.1.2...react-v0.1.3) (2023-11-16)

### Bug Fixes

- Add 'fetchpriority' to fixedMap in camelize.ts
  ([#398](https://github.com/ascorbic/unpic-img/issues/398))
  ([9e304fc](https://github.com/ascorbic/unpic-img/commit/9e304fcd666e07ecad3a65fb05284c273b5af669))

## [0.1.1](https://github.com/ascorbic/unpic-img/compare/react-v0.1.0...react-v0.1.1) (2023-11-16)

### Bug Fixes

- **core:** add styles to images without transformers
  ([#390](https://github.com/ascorbic/unpic-img/issues/390))
  ([d5ae100](https://github.com/ascorbic/unpic-img/commit/d5ae1004e926b4f9c12e6604b054bb0506957ea6))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.39

## [0.1.0](https://github.com/ascorbic/unpic-img/compare/react-v0.0.42...react-v0.1.0) (2023-11-16)

### ⚠ BREAKING CHANGES

- **react:** support Next 14
  ([#389](https://github.com/ascorbic/unpic-img/issues/389))

### Features

- **react:** support Next 14
  ([#389](https://github.com/ascorbic/unpic-img/issues/389))
  ([fd85718](https://github.com/ascorbic/unpic-img/commit/fd857188d9d9517625bc0ba8aecec9f2a8966966)),
  closes [#355](https://github.com/ascorbic/unpic-img/issues/355)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.38

## [0.0.42](https://github.com/ascorbic/unpic-img/compare/react-v0.0.41...react-v0.0.42) (2023-11-13)

### Bug Fixes

- generate correct type declarations for ESM and CJS
  ([#371](https://github.com/ascorbic/unpic-img/issues/371))
  ([1738f4e](https://github.com/ascorbic/unpic-img/commit/1738f4eb8e33d612dc577d24f5fc4a00f9396ede))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.37

## [0.0.40](https://github.com/ascorbic/unpic-img/compare/react-v0.0.39...react-v0.0.40) (2023-11-03)

### Features

- **svelte:** forward load listener on Svelte component
  ([86c01c5](https://github.com/ascorbic/unpic-img/commit/86c01c5288693de72f6bb65497b6413fdedb0bb0))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.35

## [0.0.37](https://github.com/ascorbic/unpic-img/compare/react-v0.0.36...react-v0.0.37) (2023-10-25)

### Features

- add support for picture tag
  ([#328](https://github.com/ascorbic/unpic-img/issues/328))
  ([f94e508](https://github.com/ascorbic/unpic-img/commit/f94e508e80de04c250a0f3973b262760424f8e5d))
- add svelte and fix types
  ([7f9f428](https://github.com/ascorbic/unpic-img/commit/7f9f428bd66226ea9a3ddefc8f5908b58c2bb7ac))
- **angular:** add Angular support
  ([#146](https://github.com/ascorbic/unpic-img/issues/146))
  ([c1ef2e8](https://github.com/ascorbic/unpic-img/commit/c1ef2e8fcdf1cbd3efc8001da3b0e959658ee184))
- **preact,react,qwik,solid,vue:** export ImageProps type
  ([#231](https://github.com/ascorbic/unpic-img/issues/231))
  ([40779c5](https://github.com/ascorbic/unpic-img/commit/40779c52b96f8f36a2f33ad1f7acc62fd4950eeb))
- **react:** add Next.js component
  ([#91](https://github.com/ascorbic/unpic-img/issues/91))
  ([5ad1aa2](https://github.com/ascorbic/unpic-img/commit/5ad1aa2faca4836f68ce1307c5afe1f1682117e4))
- **react:** check Next.js component src against next.config rules
  ([#235](https://github.com/ascorbic/unpic-img/issues/235))
  ([0217a98](https://github.com/ascorbic/unpic-img/commit/0217a98c22471dc677ff9c88e299e27589a5aea3))

### Bug Fixes

- **core:** gracefully handle missing props
  ([#324](https://github.com/ascorbic/unpic-img/issues/324))
  ([6ca26b8](https://github.com/ascorbic/unpic-img/commit/6ca26b8a5a69caa912c23d5b5f874153fc23cbe5))
- **react:** add next type export
  ([#98](https://github.com/ascorbic/unpic-img/issues/98))
  ([2ad007e](https://github.com/ascorbic/unpic-img/commit/2ad007ebbfb169ab3ad76c4cc36081d470f05569))
- **react:** camelize `fetchPriority`
  ([#102](https://github.com/ascorbic/unpic-img/issues/102))
  ([a10863b](https://github.com/ascorbic/unpic-img/commit/a10863b92b49597473f23863829262d664d1a127))
- **react:** camelize props, allow passing ref
  ([#20](https://github.com/ascorbic/unpic-img/issues/20))
  ([66df2e8](https://github.com/ascorbic/unpic-img/commit/66df2e80dc7ffd019ae31af8e8ab4c963e65304a))
- **react:** correctly handle aria and data attributes
  ([#221](https://github.com/ascorbic/unpic-img/issues/221))
  ([0a7bb2f](https://github.com/ascorbic/unpic-img/commit/0a7bb2f723e09ce6a9add7e94f080152390c4a69))
- **react:** correctly handle CDN delegation in next
  ([#223](https://github.com/ascorbic/unpic-img/issues/223))
  ([8e87af3](https://github.com/ascorbic/unpic-img/commit/8e87af3db917784069592f0deaa96d016979fc17))
- **react:** fix next.js src type
  ([#100](https://github.com/ascorbic/unpic-img/issues/100))
  ([b8b02a1](https://github.com/ascorbic/unpic-img/commit/b8b02a155356b7bc826380a08ffc435ad8527017))
- **react:** use extension for next deep imports
  ([#252](https://github.com/ascorbic/unpic-img/issues/252))
  ([ebf8401](https://github.com/ascorbic/unpic-img/commit/ebf840106029a9539a20cbcff3c7c4c8ac135721)),
  closes [#118](https://github.com/ascorbic/unpic-img/issues/118)

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.32

## [0.0.36](https://github.com/ascorbic/unpic-img/compare/react-v0.0.35...react-v0.0.36) (2023-10-02)

### Features

- add support for `&lt;picture&gt;` tag
  ([#328](https://github.com/ascorbic/unpic-img/issues/328))
  ([d8b93bd](https://github.com/ascorbic/unpic-img/commit/d8b93bda7a48e4621eaeac81cf20a6bb898be595))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.31

## [0.0.35](https://github.com/ascorbic/unpic-img/compare/react-v0.0.34...react-v0.0.35) (2023-09-23)

### Bug Fixes

- **core:** gracefully handle missing props
  ([#324](https://github.com/ascorbic/unpic-img/issues/324))
  ([6ca26b8](https://github.com/ascorbic/unpic-img/commit/6ca26b8a5a69caa912c23d5b5f874153fc23cbe5))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.30

## [0.0.29](https://github.com/ascorbic/unpic-img/compare/react-v0.0.28...react-v0.0.29) (2023-06-19)

### Bug Fixes

- **react:** use extension for next deep imports
  ([#252](https://github.com/ascorbic/unpic-img/issues/252))
  ([ebf8401](https://github.com/ascorbic/unpic-img/commit/ebf840106029a9539a20cbcff3c7c4c8ac135721)),
  closes [#118](https://github.com/ascorbic/unpic-img/issues/118)

## [0.0.28](https://github.com/ascorbic/unpic-img/compare/react-v0.0.27...react-v0.0.28) (2023-05-24)

### Features

- **react:** check Next.js component src against next.config rules
  ([#235](https://github.com/ascorbic/unpic-img/issues/235))
  ([0217a98](https://github.com/ascorbic/unpic-img/commit/0217a98c22471dc677ff9c88e299e27589a5aea3))

## [0.0.27](https://github.com/ascorbic/unpic-img/compare/react-v0.0.26...react-v0.0.27) (2023-05-16)

### Features

- **preact,react,qwik,solid,vue:** export ImageProps type
  ([#231](https://github.com/ascorbic/unpic-img/issues/231))
  ([40779c5](https://github.com/ascorbic/unpic-img/commit/40779c52b96f8f36a2f33ad1f7acc62fd4950eeb))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.24

## [0.0.26](https://github.com/ascorbic/unpic-img/compare/react-v0.0.25...react-v0.0.26) (2023-05-16)

### Bug Fixes

- **react:** correctly handle aria and data attributes
  ([#221](https://github.com/ascorbic/unpic-img/issues/221))
  ([0a7bb2f](https://github.com/ascorbic/unpic-img/commit/0a7bb2f723e09ce6a9add7e94f080152390c4a69))
- **react:** correctly handle CDN delegation in next
  ([#223](https://github.com/ascorbic/unpic-img/issues/223))
  ([8e87af3](https://github.com/ascorbic/unpic-img/commit/8e87af3db917784069592f0deaa96d016979fc17))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.23

## [0.0.18](https://github.com/ascorbic/unpic-img/compare/react-v0.0.17...react-v0.0.18) (2023-03-20)

### Features

- **angular:** add Angular support
  ([#146](https://github.com/ascorbic/unpic-img/issues/146))
  ([c1ef2e8](https://github.com/ascorbic/unpic-img/commit/c1ef2e8fcdf1cbd3efc8001da3b0e959658ee184))

## [0.0.17](https://github.com/ascorbic/unpic-img/compare/react-v0.0.16...react-v0.0.17) (2023-03-12)

### Bug Fixes

- **react:** camelize `fetchPriority`
  ([#102](https://github.com/ascorbic/unpic-img/issues/102))
  ([a10863b](https://github.com/ascorbic/unpic-img/commit/a10863b92b49597473f23863829262d664d1a127))

## [0.0.16](https://github.com/ascorbic/unpic-img/compare/react-v0.0.15...react-v0.0.16) (2023-03-12)

### Bug Fixes

- **react:** add next type export
  ([#98](https://github.com/ascorbic/unpic-img/issues/98))
  ([2ad007e](https://github.com/ascorbic/unpic-img/commit/2ad007ebbfb169ab3ad76c4cc36081d470f05569))
- **react:** fix next.js src type
  ([#100](https://github.com/ascorbic/unpic-img/issues/100))
  ([b8b02a1](https://github.com/ascorbic/unpic-img/commit/b8b02a155356b7bc826380a08ffc435ad8527017))

## [0.0.15](https://github.com/ascorbic/unpic-img/compare/react-v0.0.14...react-v0.0.15) (2023-03-11)

### Features

- **react:** add Next.js component
  ([#91](https://github.com/ascorbic/unpic-img/issues/91))
  ([5ad1aa2](https://github.com/ascorbic/unpic-img/commit/5ad1aa2faca4836f68ce1307c5afe1f1682117e4))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.15

## [0.0.7](https://github.com/ascorbic/unpic-img/compare/react-v0.0.6...react-v0.0.7) (2023-02-21)

### Features

- add svelte and fix types
  ([7f9f428](https://github.com/ascorbic/unpic-img/commit/7f9f428bd66226ea9a3ddefc8f5908b58c2bb7ac))

### Bug Fixes

- **react:** camelize props, allow passing ref
  ([#20](https://github.com/ascorbic/unpic-img/issues/20))
  ([66df2e8](https://github.com/ascorbic/unpic-img/commit/66df2e80dc7ffd019ae31af8e8ab4c963e65304a))

### Dependencies

- The following workspace dependencies were updated
  - dependencies
    - @unpic/core bumped to 0.0.7
