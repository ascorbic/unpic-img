import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UnpicDirective } from '@unpic/angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UnpicDirective, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
