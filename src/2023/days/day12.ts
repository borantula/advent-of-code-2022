import { sampleData, data } from './day12-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, sum } from 'lodash';

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
  return [
    ...generateCombinations(dotPattern),
    ...generateCombinations(hashPattern),
  ];
}

function checkRow(row: string, pattern: number[]) {
  return pipe(
    row,
    generateCombinations,
    // utils.logger,
    ArrayFP.map((c) =>
      c
        .split('.')
        .filter((x) => x)
        .map((x) => x.length),
    ),
    // only get the matching patterns
    ArrayFP.map((x) => isEqual(x, pattern)),
    ArrayFP.filter((x) => x),
  ).length;
}

// console.log(checkRow('???.###', [1, 1, 3]));
// console.log(checkRow('.??..??...?##.', [1, 1, 3]));
// console.log(checkRow('?###????????', [3, 2, 1]));

export function q1() {
  console.time('Execution Time');
  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ') as [string, string]),
    ArrayFP.map(([str, patternStr]) => {
      const pattern = patternStr.split(',').map(Number);
      return checkRow(str, pattern);
    }),
  );
  console.log('Q1', sum(parsed));
  console.timeEnd('Execution Time');
}

export function q2() {
  return;
  console.time('Execution Time');
  console.log('Q2');
  console.timeEnd('Execution Time');
}
