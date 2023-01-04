import { Observable } from 'rxjs';

export interface TimControlOption<T = any> {
  value: T;
  selected: boolean;
  clicked$: Observable<this>;
}
