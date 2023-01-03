export interface TextEditorAction {
  commandId: string;
  icon: string;
  focusAfterExecution?: boolean;
  commandArgument?: string;
  tagName: Uppercase<string>;
}
