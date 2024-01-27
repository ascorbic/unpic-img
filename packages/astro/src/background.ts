import type { UnpicImageProps } from "@unpic/core";
import {
  getCanonicalCdnForUrl,
  transformUrl,
  type UrlTransformerOptions,
} from "unpic";
import { getPixels } from "@unpic/pixels";

const specialBackgrounds = ["blurhash", "dominantColor", "lqip"];

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export async function getBackground(
  props: UnpicImageProps<astroHTML.JSX.ImgHTMLAttributes>,
) {
  if (props.background === "none") {
    return;
  }

  if (!specialBackgrounds.includes(props.background ?? "")) {
    return props.background;
  }

  let aspectRatio = props.aspectRatio;

  if (!aspectRatio) {
    if (props.width && props.height) {
      aspectRatio = props.height / props.width;
    } else {
      aspectRatio = 1;
    }
  }

  const cdn = getCanonicalCdnForUrl(props.src, props.cdn);

  if (!cdn) {
    return;
  }

  const bgImgProps: UrlTransformerOptions = {
    ...props,
    url: props.src,
    width: 12,
    height: 12 * aspectRatio,
    cdn: cdn.cdn,
  };

  if (!cdn) {
    return;
  }

  if (props.background === "lqip") {
    const lowUrl = transformUrl(bgImgProps)?.toString();

    if (!lowUrl) {
      return;
    }

    if (!isValidUrl(lowUrl)) {
      return;
    }

    const response = await fetch(lowUrl, {
      headers: {
        Accept: "image/webp,*/*",
      },
    });
    const contentType = response.headers.get("Content-Type");
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    return "data:" + contentType + ";base64," + buffer.toString("base64");
  }

  const lowUrl = transformUrl({
    ...bgImgProps,
    width: 100,
    height: 100 * aspectRatio,
  })?.toString();

  if (!lowUrl) {
    return;
  }

  if (!isValidUrl(lowUrl)) {
    return;
  }

  const pixels = await getPixels(lowUrl);

  if (!pixels) {
    return;
  }
  const data = Uint8ClampedArray.from(pixels.data);

  const { blurhashToDataUri, rgbColorToCssString, getDominantColor } =
    await import("@unpic/placeholder");

  if (props.background === "blurhash") {
    const { encode } = await import("blurhash");
    const blurhash = encode(data, pixels.width, pixels.height, 4, 3);
    return blurhashToDataUri(blurhash);
  }

  if (props.background === "dominantColor") {
    return rgbColorToCssString(getDominantColor(data));
  }
}
