import { Component, OnInit } from '@angular/core';
import { TimUISnackbar, TimUISnackBarOptions } from '@tim-mhn/ng-ui/snackbar';

@Component({
  selector: 'demo-snackbars',
  templateUrl: './snackbars.component.html',
})
export class SnackbarsComponent implements OnInit {
  constructor(private _snackbar: TimUISnackbar) {}

  ngOnInit(): void {}

  openSnackbar(message: string, options?: TimUISnackBarOptions) {
    this._snackbar.open(message, options);
  }

  logUndo = () => console.log('Undo !');
}
