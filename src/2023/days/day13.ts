import { sampleData, data } from './day13-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';

export function q1() {
  console.time('Execution Time');
  const parsed = pipe(sampleData, utils.parseLinesToArray);
  console.log('Q1', parsed);
  console.timeEnd('Execution Time');
}

export function q2() {}
