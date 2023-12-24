import { sampleData, data } from './day24-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';

type Position = {
  px: number;
  py: number;
  pz: number;
};

type Vector = Position & {
  vx: number;
  vy: number;
  vz: number;
};

// 19, 13, 30 @ -2,  1, -2
function parseLineToVector(str: string): Vector {
  const p = pipe(str, (s) =>
    s
      .split('@')
      .map((x) => x.split(','))
      .flat()
      .map((x) => Number(x.trim())),
  );

  return {
    px: p[0],
    py: p[1],
    pz: p[2],
    vx: p[3],
    vy: p[4],
    vz: p[5],
  };
}
console.log(parseLineToVector('19, 13, 30 @ -2,  1, -2'));

const vec = parseLineToVector('19, 13, 30 @ -2,  1, -2');
const vec2 = parseLineToVector('18, 19, 22 @ -1, -1, -2');

// p2 = p1 + v *t
function getPositionAtTime(vec: Vector, time: number): Position {
  const newP = (p: number, v: number, t: number) => p + v * t;
  return {
    px: newP(vec.px, vec.vx, time),
    py: newP(vec.py, vec.vy, time),
    pz: newP(vec.pz, vec.vz, time),
  };
}

function getSlope(pos1: Position, pos2: Position) {
  // m = y2-y1/x2-x1
  return (pos2.py - pos1.py) / (pos2.px - pos1.px);
}

function yIntercept(vec: Vector, slope: number) {
  return vec.py - slope * vec.px;
}

function checkTwoVectors(vec: Vector, vec2: Vector) {
  // console.log('---V1---');
  // console.log(vec);
  // console.log(getPositionAtTime(vec, 7));
  // console.log(getPositionAtTime(vec, 27));
  const m1 = getSlope(getPositionAtTime(vec, 1), getPositionAtTime(vec, 2));
  const c1 = yIntercept(vec, m1);
  // console.log(m1, c1);

  // console.log('---V2---');
  const m2 = getSlope(getPositionAtTime(vec2, 1), getPositionAtTime(vec2, 2));
  const c2 = yIntercept(vec2, m2);
  // console.log(m2, c2);

  // Function to calculate the x-coordinate of the intersection
  function findXIntersect(
    m1: number,
    c1: number,
    m2: number,
    c2: number,
  ): number {
    return (c2 - c1) / (m1 - m2);
  }

  // Function to calculate the y-coordinate of the intersection
  function findYIntersect(x: number, m1: number, c1: number): number {
    return m1 * x + c1;
  }

  // Calculate the intersection point
  const xIntersect = findXIntersect(m1, c1, m2, c2);
  const yIntersect = findYIntersect(xIntersect, m1, c1);

  // console.log(`Intersection Point: (${xIntersect}, ${yIntersect})`);
  return [xIntersect, yIntersect];
}

function getCombinations<T>(arr: T[]): [T, T][] {
  const result: [T, T][] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      result.push([arr[i], arr[j]]);
    }
  }

  return result;
}

export function q1() {
  console.time('Execution Time');
  const currentData = data;

  // const area = [7, 27];
  const area = [200000000000000, 400000000000000];

  const parsed = pipe(
    currentData,
    utils.parseLinesToArray,
    ArrayFP.map(parseLineToVector),
    getCombinations,

    ArrayFP.map(([vec1, vec2]) => {
      const [x, y] = checkTwoVectors(vec1, vec2);
      const withinArea =
        x >= area[0] && x <= area[1] && y >= area[0] && y <= area[1];
      if (!withinArea) {
        return false;
      }

      const inThePast =
        (vec1.vx < 0 ? vec1.px < x : vec1.px > x) ||
        (vec1.vy < 0 ? vec1.py < y : vec1.py > y) ||
        (vec2.vx < 0 ? vec2.px < x : vec2.px > x) ||
        (vec2.vy < 0 ? vec2.py < y : vec2.py > y);

      return !inThePast;
    }),
  );

  console.log('Q1', parsed, parsed.filter((x) => x).length);
  console.timeEnd('Execution Time');
}

export function q2() {}
