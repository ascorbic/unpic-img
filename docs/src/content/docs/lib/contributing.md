---
title: "Contributing to Unpic"
description: "How to add an image provider to Unpic"
githubRepo: "ascorbic/unpic"
---

This guide will help you add new image CDN providers to Unpic. It covers
implementation details, utility functions, and best practices.

## Overview

Each provider consists of:

1. A TypeScript file containing the implementation
   (`src/providers/[provider].ts`) and types for provider-specific operations
   and options.
2. A test file (`src/providers/[provider].test.ts`)
3. Example URLs in `src/demo/examples.json`
4. Detection domains or paths in `data` if appropriate
5. Adding to the types and exports in:
   - `src/providers/types.ts`
   - `src/types.ts`
   - `src/extract.ts`
   - `src/transform.ts`

## Core Concepts and Utilities

### URL Manipulation

The library provides several utilities for URL handling:

```typescript
// Convert strings or URLs to URL objects (handles relative URLs)
const url = toUrl("https://example.com/image.jpg");

// Convert back to string, preserving relativeness
const urlString = toCanonicalUrlString(url);

// Path manipulation
const cleanPath = stripLeadingSlash("/path/to/image.jpg");
const formattedPath = addTrailingSlash("path/to/image");
```

### Operations Handlers

The most important utility is `createOperationsHandlers`, which creates
standardized parser and generator functions:

```typescript
const { operationsGenerator, operationsParser } =
  createOperationsHandlers<ExampleCdnOperations>({
    // Map standard operation names to provider-specific names
    keyMap: {
      width: "w",
      height: "h",
      quality: "q",
      format: "fmt",
    },
    // Set default values
    defaults: {
      quality: 80,
      format: "auto",
    },
    // Normalize format names
    formatMap: {
      jpg: "jpeg",
    },
    // Define parameter formatting
    kvSeparator: "=", // key=value
    paramSeparator: "&", // param1&param2
  });
```

## Step-by-Step Implementation

Let's create a complete example provider "example-cdn":

### 1. Define Operations Interface

```typescript
// example-cdn.ts
import type {
  Operations,
  URLExtractor,
  URLGenerator,
  URLTransformer,
} from "../types.ts";
import {
  createExtractAndGenerate,
  createOperationsHandlers,
  toCanonicalUrlString,
  toUrl,
} from "../utils.ts";

// Only add NEW operations specific to your provider
export interface ExampleCdnOperations extends Operations {
  // Provider-specific operations
  specialCrop?: "smart" | "center";
  blur?: number;

  // DON'T include these - they're in base Operations
  // width?: number;      ❌
  // height?: number;     ❌
  // quality?: number;    ❌
  // format?: string;     ❌
}

// Optional provider-specific options
export interface ExampleCdnOptions {
  baseUrl?: string;
}
```

### 2. Configure Operations Handlers

```typescript
// Different parameter formatting styles:

// Query parameters: ?width=100&height=200
const queryStyle = createOperationsHandlers<ExampleCdnOperations>({
  keyMap: {
    width: "w",
    height: "h",
    quality: "q",
    format: "fmt",
  },
  defaults: {
    quality: 80,
  },
  kvSeparator: "=",
  paramSeparator: "&",
});

// Path segments: /w_100/h_200/q_80
const pathStyle = createOperationsHandlers<ExampleCdnOperations>({
  keyMap: {
    width: "w",
    height: "h",
    quality: "q",
    format: "fmt",
  },
  defaults: {
    quality: 80,
  },
  kvSeparator: "_",
  paramSeparator: "/",
});

// You can also disable parameters:
const noHeightStyle = createOperationsHandlers<ExampleCdnOperations>({
  keyMap: {
    width: "w",
    height: false, // Height parameter will be removed
    quality: "q",
  },
});
```

### 3. Implement Core Functions

```typescript
// Extract operations from existing URL
export const extract: URLExtractor<"example-cdn"> = (url) => {
  const parsedUrl = toUrl(url);
  const operations = operationsParser(parsedUrl);
  parsedUrl.search = "";

  return {
    src: toCanonicalUrlString(parsedUrl),
    operations,
    options: {
      baseUrl: parsedUrl.origin,
    },
  };
};

// Generate new URL with operations
export const generate: URLGenerator<"example-cdn"> = (
  src,
  operations,
  options = {},
) => {
  const url = toUrl(src, options.baseUrl);
  url.search = operationsGenerator(operations);
  return toCanonicalUrlString(url);
};

// Transform existing URL with new operations
export const transform: URLTransformer<"example-cdn"> =
  createExtractAndGenerate(extract, generate);
```

### 4. Add Comprehensive Tests

```typescript
// example-cdn.test.ts
import { assertEquals } from "jsr:@std/assert";
import { extract, generate, transform } from "./example-cdn.ts";
import { assertEqualIgnoringQueryOrder } from "../test-utils.ts";

const img = "https://example-cdn.com/image.jpg";

Deno.test("Example CDN", async (t) => {
  // Test extraction
  await t.step("should extract operations from URL", () => {
    const url = `${img}?w=300&h=200&q=80&fmt=webp&specialCrop=smart`;
    const result = extract(url);
    assertEquals(result, {
      src: img,
      operations: {
        width: 300,
        height: 200,
        quality: 80,
        format: "webp",
        specialCrop: "smart",
      },
      options: {
        baseUrl: "https://example-cdn.com",
      },
    });
  });

  // Test URL generation
  await t.step("should generate URL with operations", () => {
    const result = generate(img, {
      width: 400,
      height: 300,
      quality: 90,
      specialCrop: "center",
    });
    assertEqualIgnoringQueryOrder(
      result,
      `${img}?w=400&h=300&q=90&specialCrop=center`,
    );
  });

  // Test transformation
  await t.step("should transform existing URL", () => {
    const url = `${img}?w=300&h=200`;
    const result = transform(url, {
      width: 500,
      blur: 5,
    });
    assertEqualIgnoringQueryOrder(result, `${img}?w=500&h=200&blur=5`);
  });

  // Test error cases
  await t.step("should handle invalid URLs", () => {
    const result = extract("invalid-url");
    assertEquals(result, null);
  });

  // Test relative URLs
  await t.step("should handle relative URLs", () => {
    const result = generate("/image.jpg", { width: 300 });
    assertEqualIgnoringQueryOrder(result, "/image.jpg?w=300");
  });
});
```

### 5. Update Types and Add Examples

```typescript
// types.ts
export interface ProviderOperations {
  "example-cdn": ExampleCdnOperations;
  // ...
}

export interface ProviderOptions {
  "example-cdn": ExampleCdnOptions;
  // ...
}
```

```json
// examples.json
{
  "example-cdn": ["Example CDN", "https://example-cdn.com/demo-image.jpg"]
}
```

## Parameter Handling Patterns

### Query Parameters vs Path Segments

Providers use different URL patterns for operations:

```typescript
// Standard query parameters
// https://example.com/image.jpg?width=100&height=200
{
  kvSeparator: "=",
  paramSeparator: "&"
}

// Path segments
// https://example.com/image/w_100/h_200/image.jpg
{
  kvSeparator: "_",
  paramSeparator: "/"
}

// Custom separators
// https://example.com/image:w=100,h=200/image.jpg
{
  kvSeparator: "=",
  paramSeparator: ","
}
```

## Best Practices

### When to Use Utilities

Use the provided utilities when:

- You need standard parameter mapping
- Your provider follows common URL patterns
- You want automatic parameter normalization

### When to Create Custom Solutions

Create custom handlers when:

- Your provider has unique URL structures
- Parameters have complex interdependencies
- You need special encoding or encryption
- The provider requires custom protocols

### Error Handling

Always handle:

- Invalid URLs
- Missing parameters
- Malformed parameters
- Unsupported formats
- Edge cases

### Type Safety

- Define clear interfaces extending `Operations`
- Only add provider-specific operations
- Use proper TypeScript generics
- Document supported operations

## Testing Requirements

1. Basic Operations

   - Width/height resizing
   - Format conversion
   - Quality settings
   - Provider-specific features

2. URL Handling

   - Absolute URLs
   - Relative URLs
   - URL with existing parameters
   - Invalid URLs

3. Parameter Edge Cases

   - Missing parameters
   - Invalid values
   - Parameter combinations
   - Default values

4. Common Scenarios
   - Standard transformations
   - Format conversion
   - Quality adjustment
   - Size constraints

## Final Checklist

Before submitting:

- [ ] Implementation complete with proper types
- [ ] Comprehensive tests covering all features
- [ ] Types updated in all files listed above
- [ ] Example added to examples.json
- [ ] Detection domains or paths added if needed
- [ ] All tests passing, including unit tests and E2E tests

## Development Environment

### Deno Setup

This project uses Deno for development. If you haven't already, install Deno
from https://deno.com.

Basic commands:

```bash
# Run tests
deno test

# Run tests with watch mode
deno test --watch

# Type checking
deno check

# Format code
deno fmt
```

### Running Tests

Tests are written using Deno's built-in test framework. Run them from the
project root:

```bash
# Run all tests
deno test

# Run tests for a specific provider
deno test src/providers/example-cdn.test.ts

# Run E2E tests. These need network access.
deno test --allow-net e2e.test.ts
```

## Image Defaults

When implementing a provider, follow these default behaviors for consistency
across CDNs. If the provider does not support a feature then it can be omitted,
but these are the defaults to aim for so that users have a consistent
experience.

### Format Handling

- Enable auto format detection/content negotiation when supported
- When supported, priority order for formats should be. For services that
  generate images locally, it is ok to prefer WebP over AVIF for performance
  reasons.
  1. AVIF
  2. WebP
  3. Original format

### Image Fitting

Default to `fit=cover` behavior (equivalent to CSS `object-fit: cover`). This
means:

- Image should fill requested dimensions
- Maintain aspect ratio
- Crop if necessary
- Avoid distortion

### Size Handling

- _Never_ upscale images beyond their original dimensions
- Return largest available size when requested size is too large
- Maintain requested aspect ratio even when size is constrained

### Local Development Server

The project includes a playground application in the `demo` directory for
testing providers visually:

1. Start the development server:

```bash
cd demo
pnpm install
pnpm dev
```

2. Open http://localhost:1234

The playground is crucial for testing as it:

- Provides real-world testing with actual CDN endpoints
- Allows visual verification of image operations
- Tests responsive image behavior
- Verifies URL generation patterns

When adding a new provider:

1. Add an example URL to `demo/src/examples.json`
   - Ideally use a public sample image from the CDN's documentation
   - If unavailable, use any publicly-accessible image on that CDN
   - **Do not skip this** - no provider can be added without an example URL,
     because otherwise it cannot be tested
2. Test comprehensively:
   - Verify resizing behavior
   - Check that defaults are properly applied
   - Test format conversion
   - Verify responsive behavior
   - Ensure upscaling limits work
   - Check aspect ratio handling

### End-to-End Testing

The E2E tests in `e2e.test.ts` verify that providers work with real CDN
endpoints. They use the images from `examples.json` to test real operations:

```bash
deno test --allow-net e2e.test.ts
```

## Getting Help

If you need help:

1. Review existing provider implementations
2. Check test files for patterns
3. Open an issue for discussion
4. Ask questions in pull requests

Remember that clear, well-tested code is more important than clever solutions.
Take time to write comprehensive tests and documentation.
