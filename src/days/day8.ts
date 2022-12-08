import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import utils = require('../utils');
import { sampleData, data } from './day8-data';

type Matrix = number[][];
type Position = [number, number];
function isEdge(matrix: Matrix, position: Position) {
  const [x, y] = position;
  const width = matrix[0].length - 1;
  const height = matrix.length - 1;
  return x === 0 || y === 0 || y === height || x === width;
}

function getNeighbors(matrix: Matrix, p: Position) {
  const [x, y] = p;
  const val = (pos: Position) => matrix[pos[1]][pos[0]];

  const neighbors: Record<string, number[]> = {
    t: [],
    b: [],
    l: [],
    r: [],
  };

  for (let i = y - 1; i >= 0; i--) {
    neighbors.t.push(val([x, i]));
  }
  for (let i = y + 1; i < matrix.length; i++) {
    neighbors.b.push(val([x, i]));
  }
  for (let i = x + 1; i < matrix[0].length; i++) {
    neighbors.r.push(val([i, y]));
  }
  for (let i = x - 1; i >= 0; i--) {
    neighbors.l.push(val([i, y]));
  }
  return neighbors;
}

function isVisible(matrix: Matrix, p: Position) {
  const [x, y] = p;
  if (isEdge(matrix, p)) {
    return true;
  }

  const treeHeight = matrix[y][x];

  const neighbors = getNeighbors(matrix, p);

  const res = Object.entries(neighbors).every(([_dir, n]) => {
    return n.some((h) => {
      return treeHeight <= h;
    });
  });

  return !res;
}

function getScenicScore(matrix: Matrix, p: Position) {
  const [x, y] = p;
  if (isEdge(matrix, p)) {
    return 0;
  }

  const treeHeight = matrix[y][x];

  const neighbors = getNeighbors(matrix, p);

  const res = Object.entries(neighbors).map(([_dir, n]) => {
    let openViewCount = 0;

    for (let i = 0; i < n.length; i++) {
      const element = n[i];

      if (element < treeHeight) {
        openViewCount += 1;
        continue;
      }
      openViewCount += 1;
      break;
    }
    return openViewCount;
  });

  return res.reduce((acc, a) => acc * a, 1);
}

export function q1() {
  const parsed = pipe(utils.parseToNumberMatrix(data), (matrix) => {
    let visibleCount = 0;

    matrix.forEach((a, y) => {
      a.forEach((b, x) => {
        const position: Position = [x, y];

        if (isVisible(matrix, position)) {
          visibleCount += 1;
        }
      });
    });
    return visibleCount;
  });

  console.log('Q2', parsed);
}
export function q2() {
  const parsed = pipe(
    utils.parseToNumberMatrix(data),
    (matrix) =>
      matrix.map((a, y) => {
        return a.map((b, x) => {
          const position: Position = [x, y];
          return getScenicScore(matrix, position);
        });
      }),
    ArrayFP.flatten,
    (a) => Math.max(...a),
  );

  console.log('Q2', parsed);
}
