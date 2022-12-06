import * as ArrayFP from 'fp-ts/Array';
import * as N from 'fp-ts/Number';
import * as NEA from 'fp-ts/NonEmptyArray';
import { flow, pipe } from 'fp-ts/function';
import utils = require('../utils');
import { sampleData, data } from './day6-data';

function getMarkerByMagicNumber(msg: string, magicNumber: number) {
  return pipe(
    msg,
    (x) => {
      const turns = x.length - magicNumber;
      for (let index = 0; index < turns; index++) {
        const currentSet = new Set(x.slice(index, index + magicNumber));
        if (currentSet.size === magicNumber) {
          return index + magicNumber;
        }
      }
    },
    (x) => x,
  );
}

export function q1() {
  console.log('Q1', getMarkerByMagicNumber(data, 4));
}
export function q2() {
  console.log('Q2', getMarkerByMagicNumber(data, 14));
}
