import { sampleData, data } from './day3-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { filter, flatMap, sum } from 'lodash';

const gearBag: Record<string, number[]> = {};

function addToGearBag(row: number, col: number, n: number) {
  const key = `gear-${row}-${col}`;
  gearBag[key] = gearBag[key] ? [...gearBag[key], n] : [n];
}

function hasSymbolNeighbors(
  line: number,
  m: RegExpMatchArray,
  lines: string[],
) {
  if (m.index === undefined) {
    return false;
  }
  // line is the y axis
  // current line +1 -1
  const n = m[0];
  const start = Math.max(m.index - 1, 0);
  const end = start + n.length + (start ? 2 : 1);

  let content = '';
  if (lines[line - 1]) {
    const upper = lines[line - 1].slice(start, end);
    if (upper.includes('*')) {
      [...upper.matchAll(/[*]/g)].forEach((gear) => {
        addToGearBag(line - 1, (gear.index || 0) + start, Number(n));
      });
    }
    content += upper;
  }
  const level = lines[line].slice(start, end);
  content += level;
  if (level.includes('*')) {
    [...level.matchAll(/[*]/g)].forEach((gear) => {
      addToGearBag(line, (gear.index || 0) + start, Number(n));
    });
  }

  if (lines[line + 1]) {
    const lower = lines[line + 1].slice(start, end);
    if (lower.includes('*')) {
      [...lower.matchAll(/[*]/g)].forEach((gear) => {
        addToGearBag(line + 1, (gear.index || 0) + start, Number(n));
      });
    }
    content += lower;
  }

  const matches = [...content.matchAll(/[^.\d]/g)];

  return !!matches.length;
}

export function q1() {
  const lines = pipe(data, utils.parseLinesToArray);

  const parsed = pipe(
    lines,
    ArrayFP.map((a) => {
      return [...a.matchAll(/\d+/g)] as RegExpMatchArray[];
    }),
    // utils.logger,
    ArrayFP.mapWithIndex((lineIndex, a) => {
      // console.log(lineIndex, a);
      return a.map((b) => {
        return hasSymbolNeighbors(lineIndex, b, lines) ? Number(b[0]) : null;
      });
    }),
    flatMap,
    (a) => a.filter((c) => !!c),
    sum,
  );

  console.log('Q1', parsed);
}

export function q2() {
  // Q2 depends on Q1 due to global object gearBag
  console.log(
    'Q2',
    pipe(
      Object.values(gearBag)
        .filter((a) => a.length > 1)
        .map((a) => a.reduce((t, s) => t * s, 1)),
      sum,
    ),
  );
}
