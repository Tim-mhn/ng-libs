import { Observable } from 'rxjs';

export interface TimUIControlOption<T = any> {
  value: T;
  selected: boolean;
  clicked$: Observable<this>;
}
