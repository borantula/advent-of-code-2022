import { sampleData, data } from './day3-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { sum } from 'lodash';

function hasSymbolNeighbors(
  line: number,
  m: RegExpMatchArray,
  lines: string[],
) {
  // line is the y axis
  // we'll get up down for all the numbers
  // then for first one L L-up L-down
  // then for last one R R-up R-down
  // current line +1 -1
  const n = m[0];
  const start = Math.max(m.index! - 1, 0);
  const end = start + n.length + 2;

  let content = '';
  if (lines[line - 1]) {
    content += lines[line - 1].slice(start, end);
  }
  content += lines[line].slice(start, end);
  if (lines[line + 1]) {
    content += lines[line + 1].slice(start, end);
  }

  return !![...content.matchAll(/[^.\d]/g)].length;
  console.log(lines[line], '--', content, content.match(/[^.\d]/g));
  // n.split('').forEach((a) => {
  //   const sur = getSurroundings(matrix, line, Number(a));
  //   console.log(
  //     'SUR',
  //     sur,
  //     Object.values(sur).filter((a) => a && a.match(/[^.\d]/g)),
  //   );
  // });
}

export function q1() {
  const lines = pipe(sampleData, utils.parseLinesToArray);
  const matrix = pipe(sampleData, utils.parseToMatrix);
  const parsed = pipe(
    sampleData,
    utils.parseLinesToArray,
    ArrayFP.map((a) => {
      return [...a.matchAll(/\d+/g)] as RegExpMatchArray[];
    }),
    // (a) => a.flatMap,
  );

  console.log('Q1', parsed);
  // console.log('Q1', matrix);
  // console.log(getTheNeighborhood(0, parsed[0][0], matrix));
  // console.log(parsed[0][0], hasSymbolNeighbors(0, parsed[0][0], lines));
  // console.log(parsed[0][1], hasSymbolNeighbors(0, parsed[0][1], lines));
}

export function q2() {}
