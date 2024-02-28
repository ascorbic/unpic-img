import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StyleInfo, styleMap } from "lit/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import {
  BaseImageProps,
  CoreImageAttributes,
  Layout,
  UnpicImageProps,
  transformProps,
} from "@unpic/core";
import { ImageCdn } from "unpic";

@customElement("unpic-img")
export class UnpicImg
  extends LitElement
  implements BaseImageProps<Partial<HTMLImageElement>, CSSStyleDeclaration>
{
  @property({ type: String }) src = "";
  @property({ type: String }) alt = "";
  @property({ type: Number }) height?: number;

  @property({ type: Number }) width?: number;
  @property({ type: Boolean }) priority?: boolean;
  @property({ type: String }) fetchpriority?: "high" | "low";
  @property({ type: String }) loading?: "eager" | "lazy";
  @property({ type: String }) decoding?: "sync" | "async" | "auto";

  @property({ type: String }) background?: string;
  @property({ type: String }) objectFit?:
    | "contain"
    | "cover"
    | "fill"
    | "none"
    | "scale-down"
    | "inherit"
    | "initial";
  @property({ type: Number }) aspectRatio?: number;
  @property({ type: String }) layout?: Layout;
  @property({ type: Array }) breakpoints?: number[];
  @property({ type: String }) cdn?: ImageCdn;

  override render() {
    const inputProps = {
      src: this.src,
      width: this.width,
      height: this.height,
      alt: this.alt,
      loading: this.loading,
      decoding: this.decoding,
      role: this.role,
      sizes: this.sizes,
      fetchpriority: this.fetchpriority,
      background: this.background,
      objectFit: this.objectFit,
      aspectRatio: this.aspectRatio,
      layout: this.layout as Layout,
      breakpoints: this.breakpoints,
      cdn: this.cdn,
    } as UnpicImageProps<CoreImageAttributes<StyleInfo>>;

    const transformedProps = transformProps<
      CoreImageAttributes<StyleInfo>,
      StyleInfo
    >(inputProps);

    return html`
      <img
        part="image"
        src="${transformedProps.src}"
        alt="${transformedProps.alt}"
        width="${transformedProps.width}"
        height="${transformedProps.height}"
        style="${styleMap(transformedProps.style ?? {})}"
        srcset="${transformedProps.srcset}"
        role="${ifDefined(transformedProps.role)}"
        sizes="${transformedProps.sizes}"
        loading="${transformedProps.loading}"
        fetchpriority="${ifDefined(transformedProps.fetchpriority)}"
        decoding="${ifDefined(transformedProps.decoding)}"
        crossorigin="${ifDefined(this.crossOrigin)}"
        ismap="${ifDefined(this.isMap)}"
        name="${ifDefined(this.name)}"
        referrerpolicy="${ifDefined(this.referrerPolicy)}"
        usemap="${ifDefined(this.useMap)}"
        @error="${(event: Event) =>
          this.dispatchEvent(new ErrorEvent(event.type, event))}"
        @load="${(event: Event) =>
          this.dispatchEvent(new Event(event.type, event))}"
        @abort="${(event: Event) =>
          this.dispatchEvent(new Event(event.type, event))}"
      />
    `;
  }
  @property({ type: String }) crossOrigin?: string;
  @property({ type: Boolean }) isMap?: boolean;
  @property({ type: String }) name?: string;
  @property({ type: String }) referrerPolicy?: string;
  @property({ type: String }) sizes?: string;
  @property({ type: String }) useMap?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "unpic-img": UnpicImg;
  }
}
