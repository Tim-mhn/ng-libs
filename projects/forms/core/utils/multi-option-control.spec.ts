import { areDeepEqual } from '@tim-mhn/common/objects';
import { TimUIOption } from '../components/select/components/option/option.component';
import { MultiOptionControlUtil } from './multi-option-control.util';

describe('MultiOptionControlUtil', () => {
  let util: MultiOptionControlUtil<any>;

  beforeEach(async () => {
    util = new MultiOptionControlUtil();
  });

  describe('isOptionSelected', () => {
    describe('single select (isOptionSelectedFromSingleValue)', () => {
      describe('defaultEqualFn', () => {
        it('isSelected with string value', () => {
          const option: TimUIOption<string> = {
            value: 'a',
          } as TimUIOption<string>;

          const optionIsSelected = util.isOptionSelectedFromSingleValue(
            option,
            'a'
          );

          expect(optionIsSelected).toBeTrue();
        });

        it('notSelected with string value', () => {
          const option: TimUIOption<string> = {
            value: 'a',
          } as TimUIOption<string>;

          const optionIsSelected = util.isOptionSelectedFromSingleValue(
            option,
            'b'
          );

          expect(optionIsSelected).toBeFalse();
        });

        it('isSelected with numbers', () => {
          const option: TimUIOption<number> = {
            value: 1,
          } as TimUIOption<number>;

          const optionIsSelected = util.isOptionSelectedFromSingleValue(
            option,
            1
          );

          expect(optionIsSelected).toBeTrue();
        });

        describe('it should work with falsy values', () => {
          it('with 0', () => {
            const option: TimUIOption<number> = {
              value: 0,
            } as TimUIOption<number>;

            const optionIsSelected = util.isOptionSelectedFromSingleValue(
              option,
              0
            );

            expect(optionIsSelected).toBeTrue();
          });

          it('with false', () => {
            const option: TimUIOption<boolean> = {
              value: false,
            } as TimUIOption<boolean>;

            const optionIsSelected = util.isOptionSelectedFromSingleValue(
              option,
              false
            );

            expect(optionIsSelected).toBeTrue();
          });
        });

        it('will not work with objects that do not have the same reference', () => {
          const user = {
            name: 'john',
          };
          const option: TimUIOption<any> = {
            value: user,
          } as TimUIOption<any>;

          const optionIsSelected = util.isOptionSelectedFromSingleValue(
            option,
            {
              name: 'john',
            }
          );

          expect(optionIsSelected).toBeFalse();
        });

        it('will work with objects only if it is the same reference', () => {
          const user = {
            name: 'john',
          };
          const option: TimUIOption<any> = {
            value: user,
          } as TimUIOption<any>;

          const optionIsSelected = util.isOptionSelectedFromSingleValue(
            option,
            user
          );

          expect(optionIsSelected).toBeTrue();
        });
      });

      describe('custom compare function', () => {
        it('will mark equivalent objects as equal even though they do not have the same reference', () => {
          const user1 = {
            age: 30,
          };

          const user2 = {
            age: 30,
          };

          const option: TimUIOption<any> = {
            value: user1,
          } as TimUIOption<any>;

          util.updateCompareFn(areDeepEqual);

          const optionIsSelected = util.isOptionSelectedFromSingleValue(
            option,
            user2
          );

          expect(optionIsSelected).toBeTrue();
        });

        it('can be used to match objects using specific keys', () => {
          const USER_ID = 'ojceacjoj-caojceacae';
          const bobWithId = {
            id: USER_ID,
            name: 'bob',
            age: 45,
          };

          const bobWithJob = {
            id: USER_ID,
            firstName: 'Bob',
            job: 'engineer',
          };

          const compareById = (a: { id: string }, b: { id: string }) =>
            a.id === b.id;

          util.updateCompareFn(compareById);

          const option: TimUIOption<any> = {
            value: bobWithId,
          } as TimUIOption<any>;

          const optionIsSelected = util.isOptionSelectedFromSingleValue(
            option,
            bobWithJob
          );
          expect(optionIsSelected).toBeTrue();
        });
      });
    });

    describe('multi select (isOptionSelectedFromArray)', () => {
      describe('primitive types with default equal fn', () => {
        it('strings', () => {
          const helloOption: TimUIOption<string> = {
            value: 'hello',
          } as TimUIOption<string>;
          const barOption: TimUIOption<string> = {
            value: 'bar',
          } as TimUIOption<string>;

          const value = ['bar', 'world'];

          const helloIsSelected = util.isOptionSelectedFromArray(
            helloOption,
            value
          );
          const barIsSelected = util.isOptionSelectedFromArray(
            barOption,
            value
          );

          expect(helloIsSelected).toBeFalse();
          expect(barIsSelected).toBeTrue();
        });

        describe('numbers', () => {
          it('should correctly mark numbers as selected / not selected', () => {
            const VALUE = [1, 2, 14, 13];
            const oneIsSelected = util.isOptionSelectedFromArray(
              <TimUIOption<number>>{
                value: 1,
              },
              VALUE
            );

            const threeIsSelected = util.isOptionSelectedFromArray(
              <TimUIOption<number>>{ value: 3 },
              VALUE
            );

            expect(oneIsSelected).toBeTrue();
            expect(threeIsSelected).toBeFalse();
          });
          it('should work with 0', () => {
            const VALUE = [1, 0, 2, 14, 13];
            const zeroIsSelected = util.isOptionSelectedFromArray(
              <TimUIOption<number>>{
                value: 0,
              },
              VALUE
            );

            expect(zeroIsSelected).toBeTrue();
          });
        });

        describe('booleans', () => {
          it('should mark properly mark true/false options as selected', () => {
            const VALUE = [true, false];

            const falseIsSelected = util.isOptionSelectedFromArray(
              <TimUIOption<boolean>>{
                value: false,
              },
              VALUE
            );
            const trueIsSelected = util.isOptionSelectedFromArray(
              <TimUIOption<boolean>>{
                value: true,
              },
              VALUE
            );

            expect(trueIsSelected).toBeTrue();
            expect(falseIsSelected).toBeTrue();
          });

          it('false selected / true not selected', () => {
            const VALUE = [false];

            const falseIsSelected = util.isOptionSelectedFromArray(
              <TimUIOption<boolean>>{
                value: false,
              },
              VALUE
            );
            const trueIsSelected = util.isOptionSelectedFromArray(
              <TimUIOption<boolean>>{
                value: true,
              },
              VALUE
            );

            expect(trueIsSelected).toBeFalse();
            expect(falseIsSelected).toBeTrue();
          });
        });
      });
    });
  });
});
