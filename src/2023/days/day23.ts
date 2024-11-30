import { sampleData, data } from './day23-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';

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
  paths: string[],
) {
  const addToPaths = (c: utils.Position) => paths.push(c.join('-'));
  const inPaths = (c: utils.Position) => paths.includes(c.join('-'));

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
      const hasNotSeen = c && !inPaths(c);
      if (!hasNotSeen) {
        console.log('SEEEN ALREADY', c);
      }
      if (mandatoryDirection) {
        return x === mandatoryDirection && hasNotSeen;
      }
      return n.values[x] && n.values[x] !== '#' && hasNotSeen;
    });

    if (mandatoryDirection && usable.length > 1) {
      console.log('TOO MANY FOR MANDATORY', steps, mandatoryDirection, usable);
      break;
    }

    if (usable.length === 0) {
      finalCoordinates = [];
      // console.log('DONE ONE MORE', steps);
      break;
    }

    if (usable.length === 1) {
      currentCoord = n.coord[usable[0]] as utils.Position;
    }

    if (usable.length >= 2) {
      finalCoordinates = usable.map((x) => n.coord[x]) as utils.Position[];
      finalCoordinates = [finalCoordinates[0]];
      break;
    }
  }

  return { paths, finalCoordinates };
}

type WalkResult = {
  paths: string[];
  finalCoordinates: utils.Position[];
};
// paths (.), forest (#), and steep slopes (^, >, v, and <).
export function q1() {
  return;
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
    paths: string[],
  ): WalkResult[] {
    const result = walkThePath(sc, matrix, paths);

    if (result.finalCoordinates.length === 0) {
      console.log('HERE IS ENDED');
      return [result];
    }

    return result.finalCoordinates
      .map((r) => walkRecursivePaths(r, [...result.paths]))
      .flat();
  }
  const result = walkRecursivePaths(startingCoord, []);

  const pathSizes = new Set(
    result
      .filter((x) => x.paths.includes(endingCoord.join('-')))
      .map((x) => x.paths.length - 1),
  );
  console.log('Q1', Math.max(...pathSizes), endingCoord);
  console.timeEnd('Execution Time');
}

export function q2() {
  console.time('Execution Time');
  const currentData = data;

  const charsToReplace = '[\\^><v]';
  const slopesToDots = (s: string) =>
    s.replace(new RegExp(charsToReplace, 'g'), '.');

  const matrix = pipe(currentData, slopesToDots, utils.parseToMatrix);
  const startingCoord: utils.Position = [
    matrix[0].findIndex((x) => x === '.'),
    0,
  ];
  const endingCoord: utils.Position = [
    matrix[matrix[0].length - 1].findIndex((x) => x === '.'),
    matrix[0].length - 1,
  ];

  // // Create a memoized version of walkThePath
  // // Custom resolver function to generate a unique cache key
  const resolver = (
    startingCoord: utils.Position,
    _m: utils.Matrix,
    paths: string[],
  ) => {
    const coordKey = startingCoord.join('-');
    const pathsKey = Buffer.from(paths.join('-'), 'base64');

    return `${coordKey}_${pathsKey}`;
  };
  const memoizedWalkThePath = memoize(walkThePath, resolver);

  function walkRecursivePaths(
    sc: utils.Position,
    paths: string[],
  ): WalkResult[] {
    const result = memoizedWalkThePath(sc, matrix, paths);

    if (result.finalCoordinates.length === 0) {
      return [result];
    }

    return result.finalCoordinates
      .map((r) => walkRecursivePaths(r, result.paths.slice(0)))
      .flat();
  }

  const result = walkRecursivePaths(startingCoord, []);

  const pathSizes = new Set(
    result
      .filter((x) => x.paths.includes(endingCoord.join('-')))
      .map((x) => x.paths.length - 1),
  );
  console.log(
    'Q2',
    result.map((x) => x.paths.slice(-1)),
    Math.max(...pathSizes),
    endingCoord,
    utils.matrixValue(matrix, [14, 9]),
    utils.getImmediateNeighbors(matrix, [14, 9]),
  );
  console.timeEnd('Execution Time');
}
