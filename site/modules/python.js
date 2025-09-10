/**
 * @file Python-like Functions, Classes, and Methods for JavaScript
 * @module modules/python.js
 *
 * There are certain functionalities of the Python Standard Library syntax that
 * one might consider as "essential" to readable and efficient coding, but which
 * don't necessarily exist in JavaScript.
 *
 * Or, maybe, you're just super used to coding in Python and you're deeply
 * annoyed (rightfully so) by JavaScript, and you need some of that homefield
 * advantage to keep things together.
 *
 * @author Tommy P. Keane <talk.to.tommypkeane@gmail.com>
 * @copyright Tommy P. Keane, 2023 (https://www.tommypkeane.com)
 * @license CC-BY-4.0
 * @version 1.0.0
 */

/**
 * Pythonic `range` Method for creating a single-dimensional Array of Integers
 *
 * This method mimics the Python Standard Library `range()` method by offering
 * three syntax formats for creating a partially inclusive range:
 *
 * 1. range(n)
 * 2. range(a, b)
 * 3. range(a, b, step)
 *
 * For the first syntax, you get an array of the integer range: [0, n).
 *
 * For the 2nd syntax, you get an array of the integer range: [a, b).
 *
 * For the 3rd syntax, you get an array of the integer range: [a, c) where `c`
 * is the final value `< b` when starting at `a` and "jumping" by the value of
 * `step`.
 *
 * For the 3rd syntax, let's say you call it as `range(0, 10, 3)`, you are
 * asking for integers starting at `0` but less-than `10` which are steps of `3`
 * from the starting value, so we get the Array:
 * `[0, 3, 6, 9]`
 * This is because each value of the array is of the format `a + (i * step)`
 * where `i` is the current index. In this case, we also know that the length of
 * the resultant Array will adhere to the formula: `1 + ((b - a) / step)`, as
 * the first value in the array causes the extra `+1` since it's a partially
 * inclusive range.
 *
 * References:
 * - https://stackoverflow.com/questions/3895478/does-javascript-have-a-method-like-range-to-generate-a-range-within-the-supp
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#sequence_generator_range
 *
 * @param  {Number} start [description]
 * @param  {Number, Optional} stop  [description]
 * @param  {Number, Optional} step  [description]
 *
 * @return {Array} Resultant Range of Numbers
 */
export const range = function hstPythonRangeMethod(start, stop, step) {
  let resultArray = null;
  step ??= 1; // Default

  if (start == null || start == undefined) {
    console.error(`🙈😭 start cannot be nullish!`);
  } else {
    if (stop == null || stop == undefined) {
      const total = start; // re-alias for readability
      // stop ignore, step ignored
      resultArray = [...Array(total).keys()];
    } else {
      resultArray = Array.from(
        {
          "length": (stop - start) / step + 1,
        },
        function hstPythonRangeMethodArrayFrom(_, i) {
          return (start + i * step);
        },
      );
    }
  }
  return resultArray;
}
