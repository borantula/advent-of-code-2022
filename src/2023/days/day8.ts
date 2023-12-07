import { sampleData, data } from './day8-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { chunk, groupBy, sum } from 'lodash';
import { match, P } from 'ts-pattern';

export function q1() {
  console.time('Execution Time');
  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ')),
  );

  console.log('Q1', parsed);
  console.timeEnd('Execution Time');
}
export function q2() {}
