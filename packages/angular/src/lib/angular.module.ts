import { NgModule } from '@angular/core';
import { AngularComponent } from './angular.component';
import { ImageComponent } from './image/image.component';



@NgModule({
  declarations: [
    AngularComponent,
    ImageComponent
  ],
  imports: [
  ],
  exports: [
    AngularComponent
  ]
})
export class AngularModule { }
