import fs = require('fs/promises');
import path = require('path');

export function parseLinesToArray(str: string) {
  return str.split('\n').filter((e) => e);
}

export function parseByEmptyLinesToArray(str: string) {
  return str.split('\n\n').filter((e) => e);
}

export function parseToMatrix(str: string) {
  return parseLinesToArray(str).map((e) => e.split(''));
}

export function parseToNumberMatrix(str: string) {
  return parseLinesToArray(str).map((e) => e.split('').map(Number));
}

export function backToMatrixString(m: string[][]) {
  return m.map((row) => row.join('')).join('\n');
}

export function logger<T>(a: T) {
  console.log(a);
  return a;
}

// Greatest common devisor
// export function gcd(a: number, b: number) {
//   return !b ? a : gcd(b, a % b);
// }

export function calcAngleDegrees(dx: number, dy: number) {
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

export async function readFileContent(fileName = 'testData.txt') {
  const file = await fs.readFile(path.join(__dirname, fileName));

  return file.toString();
}

export function multiply(numbers: number[]) {
  return numbers.reduce((t, c) => t * c, 1);
}

export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

export function lcmArray(arr: number[]): number {
  let currentLcm = arr[0];
  for (let i = 1; i < arr.length; i++) {
    currentLcm = lcm(currentLcm, arr[i]);
  }
  return currentLcm;
}

export type Matrix = Array<Array<string | number>>;
export type Position = [number, number];
// function isEdge(matrix: Matrix, position: Position) {
//   const [x, y] = position;
//   const width = matrix[0].length - 1;
//   const height = matrix.length - 1;
//   return x === 0 || y === 0 || y === height || x === width;
// }

export function getNeighbors(matrix: Matrix, p: Position) {
  const [x, y] = p;
  const val = (pos: Position) => matrix[pos[1]][pos[0]];

  const neighbors: Record<string, unknown[]> = {
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

export function getImmediateNeighbors(matrix: Matrix, p: Position) {
  const [x, y] = p;
  const val = (pos: Position) => matrix[pos[1]][pos[0]];

  const neighbors: Record<string, unknown[]> = {
    north: [],
    south: [],
    west: [],
    east: [],
  };

  // for (let i = y - 1; i >= 0; i--) {
  neighbors.north.push(val([x, y - 1]));
  // }

  neighbors.south.push(val([x, y + 1]));

  neighbors.east.push(val([x + 1, y]));

  neighbors.west.push(val([x - 1, y]));

  return neighbors;
}
