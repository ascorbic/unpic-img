import { forwardRef } from "react";
import { ImageProps, Image as LegacyImage } from "./next-legacy";

let warned = false;

/**
 * @deprecated Please use `@unpic/react/nextjs` or `"@unpic/react/next-legacy` instead
 */

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {
    if (process.env.NODE_ENV !== "production" && !warned) {
      console.warn(
        `⚠️ Please update your import to "@unpic/react/nextjs" if using next@>=14, or "@unpic/react/next-legacy" if using next@<14`,
      );
      warned = true;
    }
    return <LegacyImage {...props} ref={ref} />;
  },
);
