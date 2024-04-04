import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class Notifications {

  constructor(
    private _ngZone: NgZone,
    private _snackBar: MatSnackBar) { }

  showSuccess(message: string) {
    this._displayMessage(message, 'success');
  }

  showError(message: string) {
    this._displayMessage(message, 'error');
  }

  private _displayMessage(message: string, panelClass: string) {
    this._ngZone.run(() => this._snackBar.open(message, 'OK', {
      duration: 500,
      panelClass: panelClass,
      horizontalPosition: 'end',
      verticalPosition: 'bottom'
    }));
  }

}
