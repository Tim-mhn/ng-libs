import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isDuplicatedEmailInList',
})
export class IsDuplicatedEmailInListPipe implements PipeTransform {
  transform(email: string, index: number, emailList: string[]): boolean {
    return emailList.some(() => emailList.indexOf(email) !== index);
  }
}
