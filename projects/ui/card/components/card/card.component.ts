import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tim-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() padding: string = 'p-4';
  @Input() cardClass: string;
  constructor() {}

  ngOnInit() {}
}
