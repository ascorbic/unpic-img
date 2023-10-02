import { NgModule } from '@angular/core';
import { UnpicImageDirective } from './unpic-image.directive';
import { UnpicSourceDirective } from './unpic-source.directive';

@NgModule({
  declarations: [UnpicImageDirective, UnpicSourceDirective],
  exports: [UnpicImageDirective, UnpicSourceDirective],
})
export class UnpicModule {}

/**
 * @deprecated Use `UnpicModule` instead.
 */
export class UnpicDirective extends UnpicModule {}
