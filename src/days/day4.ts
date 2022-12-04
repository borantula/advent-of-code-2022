import * as ArrayFP from 'fp-ts/Array';
import * as N from 'fp-ts/Number';
import * as NEA from 'fp-ts/NonEmptyArray';
import { flow, pipe } from 'fp-ts/function';
import utils = require('../utils');
import { sampleData, data } from './day4-data';

const parseData = flow(
  utils.parseLinesToArray,
  ArrayFP.map((x) => x.split(',')),
  ArrayFP.map(ArrayFP.map((x) => x.split('-') as [string, string])),
  // convert to number and create ranges
  ArrayFP.map((x) => {
    const a: [number, number][] = x.map(
      (b) => b.map(Number) as [number, number],
    );
    return [NEA.range(...a[0]), NEA.range(...a[1])];
  }),
);

export function q1() {
  const parsed = parseData(data);
  const result = pipe(
    parsed,
    ArrayFP.map((x) => {
      const int = pipe(x[0], ArrayFP.intersection(N.Eq)(x[1]));
      // means covering if intersection length equals to one of them
      return x.some((a) => a.length === int.length);
    }),
    ArrayFP.filter((x) => x),
    (x) => x.length,
  );

  console.log('Q1', result);
}

export function q2() {
  const result = pipe(
    parseData(data),
    ArrayFP.map((x) => {
      const int = pipe(x[0], ArrayFP.intersection(N.Eq)(x[1]));
      // means covering if intersection length equals to one of them
      return int;
    }),
    ArrayFP.filter((x) => !!x.length),
    (x) => x.length,
  );
  console.log('Q2', result);
}
