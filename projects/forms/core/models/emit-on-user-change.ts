import { EventEmitter } from '@angular/core';

export interface EmitOnUserChange<T> {
  userChange: EventEmitter<T>;
}
