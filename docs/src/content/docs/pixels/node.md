---
title: "@unpic/pixels"
description: "Load and decode the pixels for a PNG or JPEG image"
githubRepo: "ascorbic/get-pixels"
---

**Load and decode the pixels for a PNG or JPEG image in Node**

This module will take the raw data or URL of a PNG or JPEG image and return the
decoded pixels and dimensions of the image.

## Installation

Install the module from npm.

```bash
npm install @unpic/pixels
```

## Usage

```ts
import { getPixels } from "@unpic/pixels";

// From a URL
const { width, height, data } = await getPixels(
  "http://placekitten.com/100/100"
);

// From a file

const file = await fs.readFile("kitten.png");

const { width, height, data } = await getPixels(file);
```

There is also a `getFormat` function that will return the format of the image
data. This is detected by the first magic bytes at the start of the data.

```ts
import { getFormat } from "@unpic/pixels";

const file = await fs.readFile("kitten.png");
const format = getFormat(file);
// format === "png"
```
