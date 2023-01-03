import { IsDuplicatedEmailInListPipe } from './is-duplicated-email-in-list.pipe';

describe('IsDuplicatedEmailInList', () => {
  let pipe: IsDuplicatedEmailInListPipe;
  let emailList: string[] = [];
  beforeEach(() => {
    pipe = new IsDuplicatedEmailInListPipe();
    emailList = ['jack@gmail.com', 'jonh@gmail.com', 'robert@hotmail.com'];
  });
  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false for a unique email', () => {
    const inputtedEmail = 'kim@outlook.com';
    emailList.push(inputtedEmail);
    const index = emailList.lastIndexOf(inputtedEmail);
    const isDuplicatedEmailInList = pipe.transform(
      inputtedEmail,
      index,
      emailList
    );
    expect(isDuplicatedEmailInList).toBeFalse();
  });
  it('should return true for the second occurrence of a duplicated email', () => {
    const inputtedEmail = 'jonh@gmail.com';
    emailList.push(inputtedEmail);
    const index = emailList.lastIndexOf(inputtedEmail);
    const isDuplicatedEmailInList = pipe.transform(
      inputtedEmail,
      index,
      emailList
    );
    expect(isDuplicatedEmailInList).toBeTrue();
  });
  it('should return false for the first occurrence of a duplicated email', () => {
    const inputtedEmail = 'jonh@gmail.com';
    emailList.push(inputtedEmail);
    const index = emailList.indexOf(inputtedEmail);
    const isDuplicatedEmailInList = pipe.transform(
      inputtedEmail,
      index,
      emailList
    );
    expect(isDuplicatedEmailInList).toBeFalse();
  });
});
