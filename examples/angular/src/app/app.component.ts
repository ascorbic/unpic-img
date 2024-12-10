import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'angular';
  imageForm = new FormGroup({
    width: new FormControl(),
    height: new FormControl(),
  });

  get width() {
    return this.imageForm.get('width')?.value || 800;
  }

  get height() {
    return this.imageForm.get('height')?.value || 600;
  }
}
