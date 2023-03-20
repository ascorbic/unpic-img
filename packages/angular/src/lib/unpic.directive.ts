import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { transformProps, UnpicImageProps } from '@unpic/core';
type Props = UnpicImageProps<HTMLImageElement>;

@Directive({
  selector: 'img[unpic]',
  standalone: true,
})
export class UnpicDirective {
  @Input() layout: 'constrained' | 'fullWidth' | 'fixed' = 'constrained';
  @Input() width?: number | string;
  @Input() height?: number | string;
  @Input() aspectRatio?: Props['aspectRatio'];
  @Input() src!: Props['src'];
  @Input() breakpoints?: Props['breakpoints'];
  @Input() transformer?: Props['transformer'];
  @Input() cdn?: Props['cdn'];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const {
      layout,
      width,
      height,
      aspectRatio,
      src,
      breakpoints,
      transformer,
      cdn,
    } = this;

    const { style, ...props } = transformProps({
      layout,
      width: Number(width),
      height: Number(height),
      aspectRatio,
      src,
      breakpoints,
      transformer,
      cdn,
    } as Props);

    for (const name in style) {
      if (Object.prototype.hasOwnProperty.call(style, name)) {
        this.renderer.setStyle(
          this.el.nativeElement,
          name,
          style[name as keyof CSSStyleDeclaration]
        );
      }
    }

    for (const prop in props) {
      if (Object.prototype.hasOwnProperty.call(props, prop)) {
        this.renderer.setAttribute(
          this.el.nativeElement,
          prop,
          String(props[prop as keyof typeof props])
        );
      }
    }
  }
}
