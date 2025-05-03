import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-confirm',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Logout Confirmation</h2>
    <mat-dialog-content>
      Are you sure you want to logout?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="warn" (click)="confirmLogout()">Logout</button>
    </mat-dialog-actions>
  `,
  styles: ``
})
export class LogoutConfirmComponent {
  constructor(public dialogRef: MatDialogRef<LogoutConfirmComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmLogout(): void {
    this.dialogRef.close(true);
  }
}
