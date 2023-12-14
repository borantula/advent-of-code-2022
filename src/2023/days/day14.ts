import { sampleData, data } from './day14-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';

export function q1() {
  console.time('Execution Time');
  const getColumnOrdered = (rows: string[], ind: number) =>
    rows
      .map((x) => x.charAt(ind))
      .join('')
      .split('#')
      .map((x) => {
        // it'll sort . first 0 second so we reverse
        const splitted = x.split('').sort().reverse();
        return splitted.join('');
      })
      .join('#');

  const rowScores = (col: string) =>
    col
      .split('')
      .reverse()
      .map((c, ind) => {
        return c === 'O' ? ind + 1 : 0;
      });
  const parsed = pipe(data, utils.parseLinesToArray);

  const orderedColumns = parsed.map((_x, i) => getColumnOrdered(parsed, i));
  // const size = parsed[0].length;

  const res = orderedColumns.map(rowScores).map(sum);

  console.log('Q1', parsed, orderedColumns, res, sum(res));
  console.timeEnd('Execution Time');
}

export function q2() {}
