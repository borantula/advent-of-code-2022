import { sampleData, data } from './day9-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { last, sum } from 'lodash';

function processLine(item: number[]) {
  let allZero = false;
  const processed: number[][] = [item];

  while (!allZero) {
    const last = processed[processed.length - 1];
    const result = last.reduce((t, c, i, arr) => {
      if (i === 0) {
        return t;
      }
      const prev = arr[i - 1];
      const diff = Number(c) - prev;

      return [...t, diff];
    }, [] as number[]);
    processed.push(result);

    if (result.every((x) => x === 0)) {
      allZero = true;
    }
  }
  const total = processed.map((x) => last(x));

  return sum(total);
}

function processLineQ2(item: number[]) {
  let allZero = false;
  const processed: number[][] = [item];

  while (!allZero) {
    const last = processed[processed.length - 1];
    const result = last.reduce((t, c, i, arr) => {
      if (i === 0) {
        return t;
      }
      const prev = arr[i - 1];
      const diff = Number(c) - prev;

      return [...t, diff];
    }, [] as number[]);
    processed.push(result);

    if (result.every((x) => x === 0)) {
      allZero = true;
    }
  }
  const total = processed
    .map((x) => x[0])
    .map((x, i) => {
      return i % 2 ? -1 * x : x;
    });

  return sum(total);
}

export function q1() {
  console.time('Execution Time');
  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ')),
    ArrayFP.map((x) => x.map(Number)),
  );

  const totals = parsed.map(processLine);

  console.log('Q1', sum(totals));
  console.timeEnd('Execution Time');
}

export function q2() {
  console.time('Execution Time');
  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ')),
    ArrayFP.map((x) => x.map(Number)),
  );

  const totals = parsed.map(processLineQ2);

  console.log('Q2', sum(totals));
  console.timeEnd('Execution Time');
}
