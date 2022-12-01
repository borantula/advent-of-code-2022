import { sum, take } from 'lodash';
import utils = require('../utils');
import { data } from './data';

export function q1() {
  const parsed = utils
    .parseByEmptyLinesToArray(data)
    .map(utils.parseLinesToArray)
    .map((a) => sum(a.map(Number)));
  console.log('Q1', Math.max(...parsed));
}

export function q2() {
  const parsed = utils
    .parseByEmptyLinesToArray(data)
    .map(utils.parseLinesToArray)
    .map((a) => sum(a.map(Number)));
  parsed.sort((a, b) => (a > b ? -1 : 1));
  console.log('Q2', sum(take(parsed, 3)));
}
