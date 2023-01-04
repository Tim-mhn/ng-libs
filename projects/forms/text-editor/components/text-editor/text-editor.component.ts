import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  BaseControlValueAccessor,
  handleFocusLost,
} from '@tim-mhn/ng-forms/core';
import { ErrorStateMatcher } from '@tim-mhn/ng-forms/core';
import { StateManageable } from '@tim-mhn/ng-forms/core';
import { StateManager } from '@tim-mhn/ng-forms/core';
import { stateManageableProvider } from '@tim-mhn/ng-forms/core';
import { DefaultStateManager } from '@tim-mhn/ng-forms/core';
import { TEXT_EDITOR_ACTIONS } from '../../constants/editor-actions.constant';
import { TextEditorAction } from '../../models/editor-action';
@Component({
  selector: 'iqair-text-editor',
  templateUrl: './text-editor.component.html',
  // eslint-disable-next-line no-use-before-define
  providers: [stateManageableProvider(TimUITextEditorComponent)],
})
export class TimUITextEditorComponent
  extends BaseControlValueAccessor<string>
  implements OnInit, StateManageable
{
  readonly TOOLBAR_ACTIONS = TEXT_EDITOR_ACTIONS.map((action) => ({
    ...action,
    active: false,
  }));

  @ViewChild('editor', { static: true }) editor: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(DOCUMENT) private _doc: Document,
    @Optional() public parent: FormGroupDirective,
    private errorStateMatcher: ErrorStateMatcher,
    @Optional() ngControl: NgControl
  ) {
    super(ngControl);
  }
  stateManager: StateManager;

  ngOnInit() {
    if (this.ngControl) this.setStateManager();
  }

  hasError$: Observable<boolean>;

  setStateManager() {
    this.stateManager = new DefaultStateManager(
      this.ngControl.control,
      this.parent,
      this.errorStateMatcher,
      {
        waitForFocusLostToShowError: true,
      }
    );
    this.hasError$ = this.stateManager.hasError$;
    this.stateManager.init();
  }

  onInputChange() {
    super.setValue(this.editorHtml);
    this._updateActionsActivity();
  }

  private _actionsActivityUpdateRef: number;
  private _updateActionsActivity() {
    const updateActionsActivityFn = () => {
      if (document.activeElement === this.editor.nativeElement) {
        this.TOOLBAR_ACTIONS.forEach(
          (action) =>
            // eslint-disable-next-line no-param-reassign
            (action.active = this._selectionIsInsideOfTag(action.tagName))
        );
      }
    };

    clearTimeout(this._actionsActivityUpdateRef);
    this._actionsActivityUpdateRef = setTimeout(() =>
      updateActionsActivityFn()
    );
  }

  private _selectionIsInsideOfTag(tagName: string) {
    let currentNode = window.getSelection().focusNode;

    while (currentNode && currentNode !== this.editor.nativeElement) {
      if ((currentNode as HTMLElement)?.tagName === tagName) return true;
      // Move up in the tree
      currentNode = currentNode.parentNode;
    }
    return false;
  }

  override writeValue(html: string): void {
    this.editor.nativeElement.innerHTML = html;
  }

  executeCommand(editorAction: TextEditorAction) {
    this._doc.execCommand(editorAction.commandId);
    if (editorAction.focusAfterExecution) this.editor.nativeElement.focus();
  }

  onFocusLost() {
    handleFocusLost(this.ngControl, this.stateManager);
  }

  private get editorHtml() {
    return this.editor.nativeElement.innerHTML;
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.stateManager?.destroy();
  }
}
