import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tim-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  host: {
    class: 'absolute bottom-0 left-0 right-0',
  },
})
export class TimUIDialogFooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
