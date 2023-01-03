import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includedIn',
})
export class IncludedInPipe implements PipeTransform {
  transform<T>(item: T, arr: T[]): boolean {
    return arr?.includes(item);
  }
}
