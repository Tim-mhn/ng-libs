import { Component, OnInit } from '@angular/core';
import { TimUIDialogService } from '@tim-mhn/ng-ui/dialog';

@Component({
  selector: 'demo-dialog-component',
  template: `<span>this is a demo component for the dialog</span>`,
})
export class DemoDialogComponent {}

@Component({
  selector: 'demo-dialogs',
  templateUrl: './dialogs.component.html',
})
export class DialogsComponent implements OnInit {
  constructor(private _dialog: TimUIDialogService) {}

  ngOnInit(): void {}

  openDefaultDialog() {
    this._dialog.open(DemoDialogComponent, null);
  }

  openFullScreenDialog() {
    this._dialog.open(DemoDialogComponent, null, { fullScreen: true });
  }
}
