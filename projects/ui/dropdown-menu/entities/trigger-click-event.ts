export class TimUIDropdownTriggerClickEvent extends Event {
  constructor(private _triggerId: string) {
    super('tim-dropdown-trigger-click', { bubbles: true });
  }

  public get triggerId() {
    return this._triggerId;
  }
}
