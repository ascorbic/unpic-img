---
title: "Contributing to Unpic"
description: "How to contribute to the Unpic library"
---

You can find the code in [the unpic repo](https://github.com/ascorbic/unpic). To
test the library, you will need to install [Deno](https://deno.land/).

To add new domains or subdomains to an existing CDN, add them to `domains.json`
or `subdomains.json` respectively.

To add a new CDN, add the following:

- a new source file in `src/transformers`. This should export a `transform`
  function that implements the `UrlTransformer` interface, a `parse` function
  that implements the `UrlParser` interface and optionally a `generate` function
  that implements the `UrlGenerator` interface.
- a new test file in `src/transformers`. This should test all of the exported
  API functions.
- at least one entry in `domains.json`, `subdomains.json` or `paths.json` to
  detect the CDN
- add the new CDN to the types in `src/types.ts`, and import the new source file
  in `src/transform.ts`
- add a sample image to `examples.json` in the demo site
- ensure tests pass by running `deno test src`
