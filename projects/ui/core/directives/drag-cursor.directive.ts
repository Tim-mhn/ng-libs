import { CdkDrag } from '@angular/cdk/drag-drop';
import { Directive } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[dragCursor]',
})
export class DragCursor {
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    // @Inject(WINDOW) private window: Window,
    private cdkDrag: CdkDrag
  ) {}

  public ngOnInit(): void {
    this.cdkDrag.started.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      window.document.body.style.cursor = 'grabbing';
    });

    this.cdkDrag.ended.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      window.document.body.style.cursor = 'auto';
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
