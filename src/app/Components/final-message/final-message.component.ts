import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-final-message',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Message</h2>
    <mat-dialog-content>
      {{ message }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" (click)="close()">OK</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./final-message.component.css']
})
export class FinalMessageComponent {
  message: string = '';

  constructor(
    public dialogRef: MatDialogRef<FinalMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data?.message || 'No message provided.';
  }

  close(): void {
    this.dialogRef.close();
  }
}
