import { sampleData, data } from './day14-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { isEqual, last, memoize, range, sample, sum } from 'lodash';

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

const rowScores = (col: string) =>
  col
    .split('')
    .reverse()
    .map((c, ind) => {
      const score = c === 'O' ? ind + 1 : 0;

      return score;
    });

const getScore = (cols: string[]) => sum(cols.map(rowScores).map(sum));
const getScores = (list: string[][]) =>
  list.reverse().reduce((t, row, ind) => {
    return t + row.filter((x) => x === 'O').length * (ind + 1);
  }, 0);

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

  const parsed = pipe(data, utils.parseLinesToArray);

  let orderedColumns: string[] = parsed;

  const resultBag = new Set<number>();
  const resultMap = new Map<number, number[]>();
  for (let cycle = 1; cycle <= 1000; cycle++) {
    orderedColumns = pipe(
      orderedColumns,
      ArrayFP.mapWithIndex((i) => getColumnOrderedNorth(orderedColumns, i)),
      rotateMatrix,
      ArrayFP.map((x) => x.join('')),
    );

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
    // console.log('orderedColumns ', cycle);
    // console.log(orderedColumns.join('\n'));
    const rbs = resultBag.size;
    const res = getScores(orderedColumns.map((x) => x.split('')));
    const inMap = resultMap.get(res);
    resultMap.set(res, inMap ? [...inMap, cycle] : [cycle]);
    resultBag.add(res);
    if (rbs !== resultBag.size) {
      console.log(`CYCLE ${cycle}:`, res);
    }
  }
  const endNumber = 1000000000;
  console.log(
    `END`,
    resultMap,
    getScores(orderedColumns.map((x) => x.split(''))),
    (endNumber - 96) % 11,
  );

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

After 1 cycle:
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



After 2 cycles:
.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#..OO###..
#.OOO#...O

After 3 cycles:
.....#....
....#...O#
.....##...
..O#......
.....OOO#.
.O#...O#.#
....O#...O
.......OOO
#...O###.O
#.OOO#...O
   */
  console.timeEnd('Execution Time');
}
