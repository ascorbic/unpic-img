import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnChanges,
} from '@angular/core';
import { transformSourceProps, UnpicSourceProps } from '@unpic/core';
type Props = UnpicSourceProps;

@Directive({
  selector: 'source[unpic]',
  standalone: true,
})
export class UnpicSourceDirective implements OnChanges {
  @Input() layout: 'constrained' | 'fullWidth' | 'fixed' = 'constrained';
  @Input() width?: number | string;
  @Input() height?: number | string;
  @Input() aspectRatio?: Props['aspectRatio'];
  @Input() src!: Props['src'];
  @Input() breakpoints?: Props['breakpoints'];
  @Input() cdn?: Props['cdn'];
  @Input() media?: Props['media'];
  @Input() type?: Props['type'];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges() {
    const {
      layout,
      width,
      height,
      aspectRatio,
      src,
      breakpoints,
      cdn,
      type,
      media,
    } = this;

    const props = transformSourceProps({
      layout,
      width: Number(width),
      height: Number(height),
      aspectRatio,
      src,
      breakpoints,
      cdn,
      type,
      media,
    } as Props);

    for (const prop in props) {
      if (Object.prototype.hasOwnProperty.call(props, prop)) {
        const propValue = props[prop as keyof typeof props];
        if (propValue === undefined) {
          this.renderer.removeAttribute(this.el.nativeElement, prop);
          continue;
        }
        this.renderer.setAttribute(
          this.el.nativeElement,
          prop,
          String(propValue),
        );
      }
    }
  }
}
