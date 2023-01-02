export class TimUIDropdownTriggerCloseEvent extends Event {
  constructor(private _triggerId: string) {
    super('tim-dropdown-trigger-close', { bubbles: true });
  }

  public get triggerId() {
    return this._triggerId;
  }
}
