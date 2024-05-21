---
title: Unpic 11ty Demo
layout: base.njk
---

<h1>Unpic 11ty Demo</h1>

<p>This is a demo page showcasing the Unpic 11ty shortcode for embedding responsive images.</p>

<h2>Responsive Image Example</h2>
{% unpic src="https://images.unsplash.com/photo-1617718295766-0f839c2853e7", alt="A beautiful landscape", width="600", height="400" %}
{% unpic src="https://cdn.shopify.com/static/sample-images/garnished.jpeg", alt="A delicious dish", width="800", height="600" %}
{% unpic src="https://bunnyoptimizerdemo.b-cdn.net/bunny7.jpg", alt="A cute bunny", width="800", height="600" %}
