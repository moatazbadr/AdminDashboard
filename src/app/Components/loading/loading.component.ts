import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-loading',
  imports: [MatProgressSpinnerModule],
  styleUrl: './loading.component.css',
  template:  `
    <div style="display: flex; flex-direction: column; align-items: center; padding: 20px;">
      <mat-spinner diameter="40"></mat-spinner>
      <p style="margin-top: 10px;">Uploading...</p>
    </div>
  `
})
export class LoadingComponent {

}
