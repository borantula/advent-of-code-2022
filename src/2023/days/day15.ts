import { sampleData, data } from './day15-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';

export function q1() {
  console.time('Execution Time');
  const currentData = data;
  const parsed = pipe(
    currentData,
    (a) => a.split(','),
    ArrayFP.map((x) => x.split('')),
    ArrayFP.map((a) =>
      a.reduce((t, c) => {
        const val = c.charCodeAt(0);
        const newVal = ((t + val) * 17) % 256;
        console.log(newVal);

        return newVal;
      }, 0),
    ),
  );

  console.log('Q1', parsed, sum(parsed));
  console.timeEnd('Execution Time');
}

export function q2() {}
