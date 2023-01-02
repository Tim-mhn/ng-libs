import { ConnectedPosition } from '@angular/cdk/overlay';
import { TimUIDropdownPosition } from '../models/positions';

export const DropdownPosition: {
  [key in TimUIDropdownPosition]: ConnectedPosition;
} = {
  'below-end': {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 8,
    offsetX: 4,
  },
  'below-start': {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 8,
  },
  'above-start': {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -8,
    offsetX: 0,
  },
  'above-end': {
    originX: 'end',
    overlayX: 'end',
    originY: 'top',
    overlayY: 'bottom',
    offsetY: -8,
  },
};
