# @unpic/11ty

This package provides an Eleventy shortcode for embedding responsive images using the unpic-img library, making it easier to include optimized images in your Eleventy projects.

## Installation

To use the `@unpic/11ty` package in your Eleventy project, install it via npm:

```bash
npm install @unpic/11ty
```

## Usage

After installation, you can use the `unpic` shortcode in your Eleventy templates to embed responsive images. Here's an example:

```njk
{% unpic src="https://example.com/image.jpg", alt="A description of the image", width="600", height="400" %}
```

This shortcode will generate an `<img>` tag with the appropriate `srcset` and `sizes` attributes for responsive images, following best practices for performance and accessibility.

For more detailed usage instructions and examples, refer to the documentation for the `@unpic/webc` package, as the shortcode provided by `@unpic/11ty` is designed to offer similar functionality within Eleventy projects.
