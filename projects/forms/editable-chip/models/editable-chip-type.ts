import { InputType } from '@tim-mhn/ng-forms/input';

export type EditableChipType = Extract<
  InputType,
  InputType.NUMBER | InputType.TEXT
>;
