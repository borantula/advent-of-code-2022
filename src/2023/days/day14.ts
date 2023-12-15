import { sampleData, data } from './day14-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sum } from 'lodash';
import { number } from 'yargs';

export function q1() {
  return;
  console.time('Execution Time');
  const getColumnOrdered = (rows: string[], ind: number) =>
    rows
      .map((x) => x.charAt(ind))
      .join('')
      .split('#')
      .map((x) => {
        // it'll sort . first 0 second so we reverse
        const splitted = x.split('').sort().reverse();
        return splitted.join('');
      })
      .join('#');

  const rowScores = (col: string) =>
    col
      .split('')
      .reverse()
      .map((c, ind) => {
        return c === 'O' ? ind + 1 : 0;
      });
  const parsed = pipe(data, utils.parseLinesToArray);

  const orderedColumns = parsed.map((_x, i) => getColumnOrdered(parsed, i));

  const res = orderedColumns.map(rowScores).map(sum);

  console.log('Q1', parsed, orderedColumns, res, sum(res));
  console.timeEnd('Execution Time');
}

// 90 degrees
function rotateMatrix(matrix: string[][], cw = true): string[][] {
  // Transpose the matrix
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i; j < matrix[0].length; j++) {
      // Swap elements
      const temp = matrix[i][j];
      matrix[i][j] = matrix[j][i];
      matrix[j][i] = temp;
    }
  }

  // Reverse each row
  if (!cw) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i].reverse();
    }
  }

  return matrix;
}

// north -> col reverse sort
// north -> col sort
// west -> row reverse sort
// east -> row sort
export function q2() {
  console.time('Execution Time');

  const getColumnOrderedNorth = (rows: string[], ind: number) =>
    rows
      .map((x) => x.charAt(ind))
      .join('')
      .split('#')
      .map((x) => {
        // it'll sort . first 0 second so we reverse
        const splitted = x.split('').sort().reverse();
        return splitted.join('');
      })
      .join('#')
      .split('');

  const getColumnOrderedSouth = (rows: string[], ind: number) =>
    rows
      .map((x) => x.charAt(ind))
      .join('')
      .split('#')
      .map((x) => {
        // it'll sort . first 0 second
        const splitted = x.split('').sort();
        return splitted.join('');
      })
      .join('#')
      .split('');

  const getColumnOrderedWest = (rows: string[], ind: number) =>
    rows[ind]
      .split('#')
      .map((x) => {
        // it'll sort . first 0 second so we reverse
        const splitted = x.split('').sort().reverse();
        return splitted.join('');
      })
      .join('#')
      .split('');

  const getColumnOrderedEast = (rows: string[], ind: number) =>
    rows[ind]
      .split('#')
      .map((x) => {
        // it'll sort . first 0 second
        const splitted = x.split('').sort();
        return splitted.join('');
      })
      .join('#')
      .split('');

  const rowScores = (col: string) =>
    col
      .split('')
      .reverse()
      .map((c, ind) => {
        return c === 'O' ? ind + 1 : 0;
      });
  const parsed = pipe(sampleData, utils.parseLinesToArray);

  let orderedColumns: string[] = parsed;

  const resultBag = new Set<number>();
  for (let cycle = 1; cycle <= 1000000000; cycle++) {
    orderedColumns = pipe(
      orderedColumns,
      ArrayFP.mapWithIndex((i) => getColumnOrderedNorth(orderedColumns, i)),
      rotateMatrix,
      ArrayFP.map((x) => x.join('')),
    );

    // const res = sum(orderedColumns.map(rowScores).map(sum));
    // if (res === 64) {
    //   console.log('FOUND REPEAT', cycle);
    //   break;
    // }
    // console.log('orderedColumns');
    // console.log(orderedColumns.join('\n'));

    orderedColumns = pipe(
      orderedColumns,
      ArrayFP.mapWithIndex((i) => getColumnOrderedWest(orderedColumns, i)),
      ArrayFP.map((x) => x.join('')),
    );
    // console.log('orderedColumns 2');
    // console.log(orderedColumns.join('\n'));
    orderedColumns = pipe(
      orderedColumns,
      ArrayFP.mapWithIndex((i) => getColumnOrderedSouth(orderedColumns, i)),
      rotateMatrix,
      ArrayFP.map((x) => x.join('')),
    );
    // console.log('orderedColumns 3');
    // console.log(orderedColumns.join('\n'));
    orderedColumns = pipe(
      orderedColumns,
      ArrayFP.mapWithIndex((i) => getColumnOrderedEast(orderedColumns, i)),
      ArrayFP.map((x) => x.join('')),
    );
    // console.log('orderedColumns 4');
    // console.log(orderedColumns.join('\n'));
    const rbs = resultBag.size;
    const res = sum(orderedColumns.map(rowScores).map(sum));
    resultBag.add(res);
    if (rbs !== resultBag.size) {
      console.log(`CYCLE ${cycle}:`, res);
    }
    if (cycle % 10000 === 0) {
      console.log('still going', cycle, rbs);
    }
  }
  console.log(`END`, sum(orderedColumns.map(rowScores).map(sum)));

  /**
   
    .....#....
    ....#...O#
    ...OO##...
    .OO#......
    .....OOO#.
    .O#...O#.#
    ....O#....
    ......OOOO
    #...O###..
    #..OO#....

   */
  console.timeEnd('Execution Time');
}
