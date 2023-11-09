import { NgModule } from '@angular/core';
import { UnpicImageDirective } from './unpic-image.directive';
import { UnpicSourceDirective } from './unpic-source.directive';

@NgModule({
  imports: [UnpicImageDirective, UnpicSourceDirective],
  exports: [UnpicImageDirective, UnpicSourceDirective],
})
export class UnpicModule {}

/**
 * @deprecated Use `UnpicImageDirective` instead.
 */
export class UnpicDirective extends UnpicImageDirective {}
