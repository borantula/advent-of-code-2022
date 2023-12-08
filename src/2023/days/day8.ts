import { sampleData, data } from './day8-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { chunk, groupBy, sum } from 'lodash';
import { match, P } from 'ts-pattern';

type Assignment = [string, string, string];
type Dir = 'L' | 'R';
type Path = Record<Dir, string>;

export function q1() {
  console.time('Execution Time');
  const [dirArr, ...pathsArr] = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ')),
  );

  const dir = dirArr[0].split('') as Dir[];
  const paths = pathsArr.map(
    (p) =>
      p.map((x) => x.replace(/[^A-Z]/g, '')).filter((x) => x) as Assignment,
  ) as Assignment[];

  const pathsObj = paths.reduce(
    (t, c) => ({ ...t, [c[0]]: { L: c[1], R: c[2] } }),
    {},
  ) as Record<string, Path>;

  let current = 'AAA';
  let currentDirIndex = 0;
  let steps = 0;
  const totalDirLength = dir.length;

  while (current !== 'ZZZ') {
    pathsObj;
    steps++;

    if (!pathsObj[current]) {
      throw `no key ${current}`;
    }
    const currentDir = dir[currentDirIndex];
    current = pathsObj[current][currentDir];

    currentDirIndex =
      totalDirLength > currentDirIndex + 1 ? currentDirIndex + 1 : 0;

    // if (currentDirIndex > 10) break;
  }

  console.log('Q1', steps);
  console.timeEnd('Execution Time');
}
export function q2() {}
