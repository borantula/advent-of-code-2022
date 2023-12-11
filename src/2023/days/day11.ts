import { sampleData, data } from './day11-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { last, sum } from 'lodash';

function getAllCombinations(
  galaxies: utils.Position[],
): [utils.Position, utils.Position][] {
  const combinations: [utils.Position, utils.Position][] = [];
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      combinations.push([galaxies[i], galaxies[j]]);
    }
  }
  return combinations;
}

function solveTheDay(EXPANSION_RATE = 2) {
  const currentData = data;
  const parsed = pipe(currentData, utils.parseToMatrix);
  const toExpand: Record<'col' | 'row', number[]> = {
    col: [],
    row: [],
  };

  const galaxies: utils.Position[] = [];

  parsed.forEach((row, y) => {
    row.forEach((val, x) => {
      if (val === '#') {
        galaxies.push([x, y]);
      }
    });
  });

  // check rows
  parsed.forEach((row, ind) => {
    if (row.every((x) => x === '.')) {
      toExpand.row.push(ind);
    }
  });

  // check cols
  parsed[0].forEach((_r, x) => {
    for (let y = 0; y < parsed.length; y++) {
      if (parsed[y][x] !== '.') {
        return;
      }
    }
    toExpand.col.push(x);
  });

  const updatedGalaxies = galaxies.map(([x, y]) => {
    const colsToAdd = toExpand.col.filter((c) => c < x).length;
    const rowsToAdd = toExpand.row.filter((r) => r < y).length;
    return [
      x + colsToAdd * (EXPANSION_RATE - 1),
      y + rowsToAdd * (EXPANSION_RATE - 1),
    ] as utils.Position;
  });

  return getAllCombinations(updatedGalaxies).map(([[x1, y1], [x2, y2]]) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  });
}

export function q1() {
  console.time('Execution Time');
  console.log('Q1', sum(solveTheDay(2)));
  console.timeEnd('Execution Time');
}

export function q2() {
  console.time('Execution Time');
  console.log('Q1', sum(solveTheDay(1000000)));
  console.timeEnd('Execution Time');
}
