import { ElementRef, Injectable } from '@angular/core';

@Injectable()
export class ComponentDismisser {
  constructor() {}

  dismiss(host: ElementRef<HTMLElement>) {
    (host.nativeElement as any).removeAllListeners();
    (host.nativeElement as any).remove();
  }
}
