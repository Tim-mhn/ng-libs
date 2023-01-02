export function cursorIsAtPosition(win: Window, pos: number) {
  const { focusOffset: _focusOffset, anchorOffset: _anchorOffset } =
    win.getSelection();
  return win.getSelection()?.focusOffset === pos;
}

export function cursorIsAtTheStart(win: Window) {
  return cursorIsAtPosition(win, 0);
}

export function cursorIsAtTheEnd(win: Window) {
  const selection = win.getSelection();
  const totalCharsCount = selection?.focusNode?.textContent?.length;
  return totalCharsCount === selection?.focusOffset;
}
