import { ICONS } from '@tim-mhn/common/icons';
import { TextEditorAction } from '../models/editor-action';

export const TEXT_EDITOR_ACTIONS: TextEditorAction[] = [
  {
    commandId: 'bold',
    icon: ICONS.WYSIWYG_BOLD,
    focusAfterExecution: true,
    tagName: 'B',
  },
  {
    commandId: 'italic',
    icon: ICONS.WYSIWYG_ITALIC,
    focusAfterExecution: true,
    tagName: 'I',
  },
  {
    commandId: 'insertUnorderedList',
    icon: ICONS.WYSIWYG_UNORDERED_LIST,
    tagName: 'UL',
  },
];
