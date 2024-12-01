import { sum, take } from 'lodash';
import { sampleData, data } from './day1-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';

const getSides = (d: string) => {
  const parsed = utils.parseLinesToArray(d).map((a) =>
    a
      .split(' ')
      .filter((x) => x)
      .map(Number),
  );

  const leftSide: number[] = [];
  const rightSide: number[] = [];

  parsed.forEach((a) => {
    leftSide.push(a[0]);
    rightSide.push(a[1]);
  });

  return { leftSide, rightSide };
};

export function q1() {
  const { leftSide, rightSide } = getSides(data);

  leftSide.sort();
  rightSide.sort();

  const total = leftSide.reduce((total, curr, ind) => {
    return total + Math.abs(curr - rightSide[ind]);
  }, 0);

  console.log('Q1', total);
}

export function q2() {
  const { leftSide, rightSide } = getSides(data);

  const total = leftSide.reduce((total, curr, ind) => {
    const countInRight = rightSide.filter((x) => x === curr).length;
    return total + countInRight * curr;
  }, 0);

  console.log('Q2', total);
}
