import { ChipColor } from './chip-color';
import { ChipSize } from './chip-size';

export interface TimUIChipProps {
  color: ChipColor;
  size: ChipSize;
  clickable: boolean;
  withAction: boolean;
}
