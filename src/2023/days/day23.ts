import { sampleData, data } from './day23-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';
import { log } from 'console';
import { P } from 'ts-pattern';

const getGardenPlots = (matrix: utils.Matrix, plot: utils.Position) =>
  Object.values(utils.getImmediateNeighborsCoordinates(matrix, plot)).filter(
    (p) => {
      if (!p) return false;
      const val = utils.matrixValue(matrix, p);
      return val === '.' || val === 'S';
    },
  ) as utils.Position[];

function getMandatoryDirection(val: Val) {
  switch (val) {
    case '.':
      return;
    case '<':
      return 'west';
    case '>':
      return 'east';
    case '^':
      return 'north';
    case 'v':
      return 'south';
    default:
      return;
  }
}

type Val = '.' | '^' | '>' | 'v' | '<';
function walkThePath(
  startingCoord: utils.Position,
  matrix: utils.Matrix,
  paths: Set<string>,
) {
  const addToPaths = (c: utils.Position) => paths.add(c.join('-'));
  const inPaths = (c: utils.Position) => paths.has(c.join('-'));

  let steps = 0;
  let currentCoord: utils.Position = startingCoord;
  let finalCoordinates: utils.Position[] = [];
  while (currentCoord) {
    steps++;

    // step to the path
    addToPaths(currentCoord);

    const stepVal: Val = utils.matrixValue(matrix, currentCoord) as Val;
    const mandatoryDirection = getMandatoryDirection(stepVal);

    // look around
    const n = utils.getImmediateNeighbors(matrix, currentCoord);
    // no rocks, no out of bounds, no already in path
    const usable = Object.keys(n.values).filter((x) => {
      const c = n.coord[x];
      const hasCoord = c && !inPaths(c);
      if (mandatoryDirection) {
        return x === mandatoryDirection && hasCoord;
      }
      return n.values[x] && n.values[x] !== '#' && hasCoord;
    });

    if (mandatoryDirection && usable.length > 1) {
      console.log('TOO MANY FOR MANDATORY', steps, mandatoryDirection, usable);
      break;
    }

    if (usable.length === 0) {
      finalCoordinates = [];
      break;
    }

    if (usable.length === 1) {
      currentCoord = n.coord[usable[0]] as utils.Position;
    }

    if (usable.length >= 2) {
      finalCoordinates = usable.map((x) => n.coord[x]) as utils.Position[];
      break;
    }
  }
  return { paths, finalCoordinates };
}

// Custom resolver function to generate a unique cache key
const resolver = (
  startingCoord: utils.Position,
  matrix: utils.Matrix,
  paths: Set<string>,
) => {
  // Generate a unique string key based on the arguments
  // This is an example, you might need to adjust it based on the structure of Position, Matrix, and paths
  const coordKey = startingCoord.join('-');
  // const matrixKey = JSON.stringify(matrix); // Be cautious with large matrices as this might be inefficient
  const pathsKey = Array.from(paths).join('-');

  return `${coordKey}_${pathsKey}`;
};

type WalkResult = {
  paths: Set<string>;
  finalCoordinates: utils.Position[];
};
// paths (.), forest (#), and steep slopes (^, >, v, and <).
export function q1() {
  console.time('Execution Time');
  const currentData = data;

  const matrix = pipe(currentData, utils.parseToMatrix);
  const startingCoord: utils.Position = [
    matrix[0].findIndex((x) => x === '.'),
    0,
  ];
  const endingCoord: utils.Position = [
    matrix[matrix[0].length - 1].findIndex((x) => x === '.'),
    matrix[0].length - 1,
  ];

  function walkRecursivePaths(
    sc: utils.Position,
    paths: Set<string>,
  ): WalkResult[] {
    const result = walkThePath(sc, matrix, paths);

    if (result.finalCoordinates.length === 0) {
      return [result];
    }

    return result.finalCoordinates
      .map((r) => walkRecursivePaths(r, new Set(result.paths)))
      .flat();
  }
  const result = walkRecursivePaths(startingCoord, new Set<string>());

  const pathSizes = new Set(
    result
      .filter((x) => x.paths.has(endingCoord.join('-')))
      .map((x) => x.paths.size - 1),
  );
  console.log('Q1', Math.max(...pathSizes), endingCoord);
  console.timeEnd('Execution Time');
}

export function q2() {
  console.time('Execution Time');
  const currentData = data;
  // console.log(currentData);

  // Create a memoized version of walkThePath
  const memoizedWalkThePath = memoize(walkThePath, resolver);

  const charsToReplace = '[\\^><v]';
  const slopesToDots = (s: string) =>
    s.replace(new RegExp(charsToReplace, 'g'), '.');

  // console.log(slopesToDots(currentData));
  const matrix = pipe(currentData, slopesToDots, utils.parseToMatrix);
  const startingCoord: utils.Position = [
    matrix[0].findIndex((x) => x === '.'),
    0,
  ];
  const endingCoord: utils.Position = [
    matrix[matrix[0].length - 1].findIndex((x) => x === '.'),
    matrix[0].length - 1,
  ];

  function walkRecursivePaths(
    sc: utils.Position,
    paths: Set<string>,
  ): WalkResult[] {
    const result = memoizedWalkThePath(sc, matrix, paths);

    if (result.finalCoordinates.length === 0) {
      return [result];
    }

    return result.finalCoordinates
      .map((r) => walkRecursivePaths(r, new Set(result.paths)))
      .flat();
  }
  const result = walkRecursivePaths(startingCoord, new Set<string>());

  const pathSizes = new Set(
    result
      .filter((x) => x.paths.has(endingCoord.join('-')))
      .map((x) => x.paths.size - 1),
  );
  console.log('Q2', Math.max(...pathSizes), endingCoord);
  console.timeEnd('Execution Time');
}
