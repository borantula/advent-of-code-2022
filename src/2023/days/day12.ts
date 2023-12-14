import { sampleData, data } from './day12-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';
import { or } from 'fp-ts/lib/Predicate';

function generateCombinations(pattern: string): string[] {
  if (!pattern.includes('?')) {
    return [pattern];
  }

  // Find the index of the first '?' in the string
  const index = pattern.indexOf('?');

  // Replace '?' with '.' and '#' and recursively process the rest of the string.
  const dotPattern =
    pattern.substring(0, index) + '.' + pattern.substring(index + 1);
  const hashPattern =
    pattern.substring(0, index) + '#' + pattern.substring(index + 1);

  // Recursively generate combinations for the two new patterns and concatenate the results.
  return generateCombinations(dotPattern).concat(
    generateCombinations(hashPattern),
  );
}

const patternCache: Record<string, number> = {};

const cacheKey = (row: string, pattern: number[]) =>
  `${row}-${pattern.join('-')}`;

const genComb = memoize(generateCombinations);
function checkRow(row: string, pattern: number[]) {
  const combinations = genComb(row);
  const result = pipe(
    combinations,
    // utils.logger,
    ArrayFP.map((c) =>
      c
        .split('.')
        .filter((x) => x)
        .map((x) => x.length),
    ),
    // only get the matching patterns
    ArrayFP.map((x) => isEqual(x, pattern)),
    ArrayFP.filter((x) => !!x),
  );
  return result;
}

// console.log(checkRow('???.###', [1, 1, 3]));
// console.log(checkRow('.??..??...?##.', [1, 1, 3]));
// console.log(checkRow('?###????????', [3, 2, 1]));

console.time('Execution Time');
// console.log(checkRow(unfoldTheRow('???.###'), unfoldThePattern([1, 1, 3])));
// console.log(checkRow('.??..??...?##.?', [1, 1, 3]));
// console.log(checkRow('????.#...#...?', [4, 1, 1]));
// console.log(checkRow('????.######..#####.?', [1, 6, 5]));
// console.log(checkRow('?###?????????', [3, 2, 1]));
// console.log(checkRow('?#?#?##?#???.?.?????', [9, 2, 1, 1, 1]));
// console.log(checkRow('??#?#?##?#???.?.??????', [9, 2, 1, 1, 1]));
console.timeEnd('Execution Time');

export function q1() {
  return;
  console.time('Execution Time');
  const parsed = pipe(
    sampleData,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ') as [string, string]),
    ArrayFP.map(([str, patternStr]) => {
      const pattern = patternStr.split(',').map(Number);
      return checkRow(str, pattern).length;
    }),
  );
  console.log('Q1', sum(parsed));
  console.timeEnd('Execution Time');
}

export function q2() {
  // return;
  console.time('Execution Time');
  const parsed = pipe(
    sampleData,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ') as [string, string]),
    ArrayFP.map(([str, patternStr]) => {
      const pattern = patternStr.split(',').map(Number);
      const original = checkRow(str, pattern).length;
      const withQuestionMark = checkRow(`${str}?${str}?${str}?${str}?${str}`, [
        ...pattern,
        ...pattern,
        ...pattern,
        ...pattern,
        ...pattern,
      ]).length;
      console.log(original, withQuestionMark);
      return original;

      // if (original === 1) {
      //   const firstChars = `?{str}`
      //     .substring(0, pattern[0])
      //     .split('')
      //     .every((x) => x === '?');

      //   if (firstChars) {
      //     return original;
      //   }
      // }

      const withQuestionMark2 = checkRow(`?${str}?`, pattern).length;
      const withQuestionMark3 = checkRow(`${str}?${str}?${str}`, [
        ...pattern,
        ...pattern,
        ...pattern,
      ]).length;
      const withQuestionMark4 = checkRow(`${str}?${str}?${str}?${str}`, [
        ...pattern,
        ...pattern,
        ...pattern,
        ...pattern,
      ]).length;

      console.log(
        str,
        `${str.split('').reverse()[0]}${str}?${str}`,
        patternStr,
        original,
        // withQuestionMark,
        '?',
        withQuestionMark2,
        withQuestionMark3,
        withQuestionMark4,
      );

      return (
        original *
        withQuestionMark2 *
        withQuestionMark2 *
        withQuestionMark2 *
        withQuestionMark2
      );
    }),
  );
  console.log('Q2', sum(parsed));
  console.log('Q2', parsed);
  console.timeEnd('Execution Time');
}
