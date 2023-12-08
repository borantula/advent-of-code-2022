import { sampleData, sampleData2, data } from './day8-data';
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
      p.map((x) => x.replace(/[^1-9A-Z]/g, '')).filter((x) => x) as Assignment,
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

    currentDirIndex = (currentDirIndex + 1) % totalDirLength;
    // totalDirLength > currentDirIndex + 1 ? currentDirIndex + 1 : 0;

    // if (currentDirIndex > 10) break;
  }

  console.log('Q1', steps);
  console.timeEnd('Execution Time');
}

export function q2() {
  return;
  console.time('Execution Time');
  const [dirArr, ...pathsArr] = pipe(
    sampleData2,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ')),
  );

  const dir = dirArr[0].split('') as Dir[];
  const paths = pathsArr.map(
    (p) =>
      p.map((x) => x.replace(/[^1-9A-Z]/g, '')).filter((x) => x) as Assignment,
  ) as Assignment[];

  const pathsObj = paths.reduce(
    (t, c) => ({ ...t, [c[0]]: { L: c[1], R: c[2] } }),
    {},
  ) as Record<string, Path>;

  const startingPoints = Object.keys(pathsObj).filter((a) => a[2] === 'A');
  console.log(startingPoints);

  function runToZet(point: string, dirIndexToStart: number) {
    let current = point;
    let currentDirIndex = dirIndexToStart;
    let steps = 0;
    const totalDirLength = dir.length;

    while (current[2] !== 'Z') {
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
    return steps;
  }

  function runToZetBySteps(
    point: string,
    dirIndexToStart: number,
    stepsToRun = 1,
  ) {
    let current = point;
    let currentDirIndex = dirIndexToStart;
    let steps = 0;
    const totalDirLength = dir.length;

    while (steps < stepsToRun) {
      pathsObj;
      steps++;

      if (!pathsObj[current]) {
        throw `no key ${current}`;
      }
      const currentDir = dir[currentDirIndex];
      current = pathsObj[current][currentDir];

      currentDirIndex = (currentDirIndex + 1) % totalDirLength;

      // if (currentDirIndex > 10) break;
    }
    return current;
  }

  let sync = false;
  const steps = 0;
  let currentDirIndex = 0;
  const totalDirLength = dir.length;

  const [firstPoint, ...otherPoints] = startingPoints;
  // run the first until it reaches to a Z
  // then check the rest if all can reach to Z in same steps
  // if one fails continue...
  // console.log(runToZet(firstPoint, currentDirIndex));
  while (!sync) {
    const stepsRun = runToZet(firstPoint, currentDirIndex);

    console.log((currentDirIndex + stepsRun) % totalDirLength);
    currentDirIndex = (currentDirIndex + stepsRun) % totalDirLength;

    sync = otherPoints.every((p) => {
      const reachedPoint = runToZetBySteps(p, currentDirIndex, stepsRun);
      return reachedPoint[2] === 'Z';
      // console.log(runToZetBySteps(startingPoints[1], currentDirIndex, stepsRun));
    });

    console.log('passes', totalDirLength, stepsRun, sync, currentDirIndex);
    if (stepsRun > 7) {
      break;
    }
  }

  console.log('Q2', steps);
  console.timeEnd('Execution Time');
}
