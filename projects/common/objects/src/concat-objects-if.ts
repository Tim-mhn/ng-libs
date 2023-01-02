/**
 * Concat properties from @argument objToConcatIfCondition into @param obj if @param condition is true
 * ```
 * const obj1 = {
 *  a: 1,
 *  b: 2
 * };
 *
 * const obj2 = {
 *  c: 3,
 *  d: 4
 * }
 *
 * concatObjectIf(obj1, obj2, true) = { a: 1, b: 2, c: 3, d: 4 };
 * concatObjectIf(obj1, obj2, false) = { a: 1, b: 2 }

 * ```
 */
export function concatObjectsIf<U, V, R extends U & V = U & V>(
  obj: U,
  objToConcatIfCondition: V,
  condition: boolean
): R {
  return {
    ...obj,
    ...(condition && objToConcatIfCondition),
  } as any as R;
}
