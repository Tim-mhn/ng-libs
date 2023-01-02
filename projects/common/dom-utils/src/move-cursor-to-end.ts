export function moveCursorToEnd(
  htmlEl: HTMLElement,
  doc: Document,
  win: Window
) {
  const range = doc.createRange();
  range.selectNodeContents(htmlEl);
  range.collapse(false);
  const sel = win.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
