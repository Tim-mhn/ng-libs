import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
// eslint-disable-next-line import/no-unresolved
import { randomString } from '@tim-mhn/common/strings';

@Component({
  selector: 'tim-tab',
  templateUrl: './tab.component.html',
  host: {
    class: 'max-h-full overflow-hidden',
  },
})
export class TimUITabComponent<T extends string = string> implements OnInit {
  @Input() label: string;
  @Input() key: T = <T>randomString();
  @ViewChild(TemplateRef, { static: true })
  content: TemplateRef<any>;

  isSelected: boolean;

  markAsSelected() {
    this.isSelected = true;
  }

  markAsUnselected() {
    this.isSelected = false;
  }
  constructor() {}

  ngOnInit() {}
}
