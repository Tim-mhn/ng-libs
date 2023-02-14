import {
  Component,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { TimHashtagOption } from '../../models/suggestion';

@Component({
  selector: 'tim-hashtag-option',
  templateUrl: './hashtag-option.component.html',
  host: {
    class: 'cursor-pointer ',
  },
})
export class TimHashtagOptionComponent implements OnInit, TimHashtagOption {
  constructor() {}

  @Input() value: string;
  @Input() new = false;
  @ViewChild(TemplateRef) template: TemplateRef<any>;

  private _clicked$ = new Subject<this>();
  public clicked$ = this._clicked$.asObservable();

  ngOnInit(): void {}

  click() {
    this._clicked$.next(this);
  }
}
