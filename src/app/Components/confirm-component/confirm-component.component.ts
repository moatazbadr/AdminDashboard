import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-Component-confirm',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirmation</h2>
    <mat-dialog-content>
  {{message}}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="warn" (click)="confirmLogout()">Confirm</button>
    </mat-dialog-actions>
  `,
  styles: ``
})
export class ConfirmComponentComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.message = data?.message || 'Are you sure?';
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmLogout(): void {
    this.dialogRef.close(true);
  }
  message :string="";
}
