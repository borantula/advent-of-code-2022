import { sampleData, data } from './day15-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';

type Lens = {
  box: number;
  code: string;
  focalLen: number;
};

type Boxes = Record<string, Lens[]>;

function hasher(x: string) {
  return pipe(
    x,
    (x) => x.split(''),
    (a) =>
      a.reduce((t, c) => {
        const val = c.charCodeAt(0);
        const newVal = ((t + val) * 17) % 256;

        return newVal;
      }, 0),
  );
}

function boxesTotal(boxes: Boxes) {
  return Object.values(boxes)
    .map((lenses) => {
      return lenses.map(({ box, focalLen }, ind) => {
        return (box + 1) * (ind + 1) * focalLen;
      });
    })
    .flat()
    .reduce((t, c) => t + c, 0);
}

export function q1() {
  return;
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

export function q2() {
  console.time('Execution Time');
  const currentData = data;

  const boxes: Boxes = {};

  const parsed = pipe(
    currentData,
    (a) => a.split(','),
    // split but keep the delimiter chars in result array
    ArrayFP.map((x) => x.split(/(-|=)/).filter((x) => x)),
    (commands) =>
      commands.reduce((t, c) => {
        // console.log('START', c.join(''), t);
        const isLens = c[1] === '=';
        const code = c[0];
        const box = hasher(code);
        const key = `box${box}`;

        if (!isLens) {
          if (!t[key]) {
            return t;
          }

          const newItem = t[key].filter((x) => x.code !== code);
          return { ...t, [key]: newItem };
        }

        const lens: Lens = {
          code,
          box,
          focalLen: Number(c[2]),
        };

        if (t[key]) {
          const existingIndex = t[key].findIndex((x) => x.code === code);
          if (existingIndex >= 0) {
            t[key][existingIndex] = lens;
          } else {
            t[key].push(lens);
          }
        } else {
          t[key] = [lens];
        }
        return { ...t };
      }, boxes),
  );

  /*
  {
    box0: [
      {code:rn,focalLen:3,box:1}
    ]
  }
  */

  console.log('Q2', boxesTotal(parsed));
  console.timeEnd('Execution Time');
}
