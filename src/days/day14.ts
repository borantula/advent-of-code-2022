import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import utils = require('../utils');
import { sampleData, data } from './day14-data';

export function q1() {
  const parsed = pipe(utils.parseLinesToArray(sampleData));

  console.log('Q1', parsed);
}

export function q2() {
  const parsed = pipe(utils.parseLinesToArray(sampleData));

  console.log('Q2', parsed);
}
