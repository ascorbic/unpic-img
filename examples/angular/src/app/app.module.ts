import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UnpicDirective } from '@unpic/angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UnpicDirective],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
