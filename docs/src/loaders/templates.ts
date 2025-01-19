import { SupportedProviders, type ImageCdn } from "unpic";
import type { DocEntry } from "./jsdoc";

export function typeToMarkdown({ name, documentation, type }: DocEntry) {
  return `
#### \`${name}\`

Type: \`${type}\`

${documentation}
    `;
}

const getSampleCode = (slug: ImageCdn) => `

Unpic can transform images with ${SupportedProviders[slug]} using the \`${slug}\` provider. It can be 
used with Unpic framework components, or you can use the base \`unpic\` libary to generate 
image URLs directly.

You can import the \`${slug}\` provider from the \`unpic\` package using a subpath import:

\`\`\`js
import { transform } from 'unpic/providers/${slug}';
\`\`\`

If using an Unpic component, you can optionally pass custom operations and options to the 
component using an object with a \`${slug}\` key. This is lets you use extra features supported 
by ${SupportedProviders[slug]}, or set custom configuration options.

This example uses \`@unpic/astro\`, but the same applies to any Unpic component:


\`\`\`jsx
---
import { Image } from '@unpic/astro';
---
<Image
  src="image.jpg"
  width={800}
  height={600}
  options={{
      ${JSON.stringify(slug)}: {
      // ${slug} options here
      }
  }}
  operations={{
      ${JSON.stringify(slug)}: {
      // ${slug} operations here
      }
  }}
/>
\`\`\`

In supported frameworks you can also import the [base component](/img/base) and pass the
transformer to it directly. This lets you create a custom component that doesn't need to include
and other transformer code.

\`\`\`jsx
---
import { Image } from '@unpic/astro/base';
import { transform } from 'unpic/providers/${slug}';
---
<Image
  src="image.jpg"
  width={800}
  height={600}
  transformer={transformer}
/>

\`\`\`

`;

export const getMarkdown = (
  provider: ImageCdn,
  options: DocEntry[],
  operations: DocEntry[],
) => `
  
${getSampleCode(provider)}

## Types

The \`${provider}\` provider supports the following arguments:

### Options
${
  options.length
    ? options.map(typeToMarkdown).join("\n")
    : `The \`${provider}\` provider does not support any extra configuration options.`
}

### Operations

${
  operations.length
    ? operations.map(typeToMarkdown).join("\n")
    : `The \`${provider}\` provider does not support any extra operations.`
}
  `;
