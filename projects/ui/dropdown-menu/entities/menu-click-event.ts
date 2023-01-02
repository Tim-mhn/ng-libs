export class TimUIDropdownMenuClickEvent extends Event {
  constructor(private _triggerId: string) {
    super('tim-dropdown-menu-click', { bubbles: true });
  }

  public get triggerId() {
    return this._triggerId;
  }
}
