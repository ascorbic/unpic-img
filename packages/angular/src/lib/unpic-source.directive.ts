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
})
export class UnpicSourceDirective implements OnChanges {
  @Input() layout: 'constrained' | 'fullWidth' | 'fixed' = 'constrained';
  @Input() width?: number | string;
  @Input() height?: number | string;
  @Input() aspectRatio?: Props['aspectRatio'];
  @Input() src!: Props['src'];
  @Input() breakpoints?: Props['breakpoints'];
  @Input() transformer?: Props['transformer'];
  @Input() cdn?: Props['cdn'];
  @Input() media?: Props['media'];
  @Input() type?: Props['type'];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    console.log('source');
  }

  ngOnChanges() {
    const {
      layout,
      width,
      height,
      aspectRatio,
      src,
      breakpoints,
      transformer,
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
      transformer,
      cdn,
      type,
      media,
    } as Props);

    for (const prop in props) {
      console.log('source', prop);
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
