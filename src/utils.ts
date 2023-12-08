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
