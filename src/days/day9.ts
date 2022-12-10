import * as ArrayFP from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import { pipe } from 'fp-ts/function';
import utils = require('../utils');
import { sampleData, data } from './day9-data';
import { take } from 'lodash';

type Position = [number, number];
type Dir = 'R' | 'U' | 'L' | 'D';
type Command = { dir: Dir; step: number };

const travelledH: string[] = [];
const travelledT: string[] = [];

function move(positions: { h: Position; t: Position }, { dir, step }: Command) {
  for (let i = 1; i <= step; i++) {
    switch (dir) {
      case 'R':
        positions.h[0]++;
        break;
      case 'L':
        positions.h[0]--;
        break;
      case 'U':
        positions.h[1]--;
        break;
      case 'D':
        positions.h[1]++;
        break;
      default:
        break;
    }

    if (
      Math.abs(Math.abs(positions.h[0]) - Math.abs(positions.t[0])) > 1 ||
      Math.abs(Math.abs(positions.h[1]) - Math.abs(positions.t[1])) > 1
    ) {
      switch (dir) {
        case 'R':
          positions.t[1] = positions.h[1];
          positions.t[0]++;
          break;
        case 'L':
          positions.t[1] = positions.h[1];
          positions.t[0]--;
          break;
        case 'U':
          positions.t[0] = positions.h[0];
          positions.t[1]--;
          break;
        case 'D':
          positions.t[0] = positions.h[0];
          positions.t[1]++;
          break;
        default:
          break;
      }
    }
    console.log(dir, step, i, positions);
    travelledH.push(positions.h.join('|'));
    travelledT.push(positions.t.join('|'));
  }

  return positions;
}

export function q1() {
  const startingPosition: { h: Position; t: Position } = {
    h: [0, 0],
    t: [0, 0],
  };
  const cmds = pipe(
    utils.parseLinesToArray(data),
    // (a) => take(a, 10),
    ArrayFP.map((a) => a.split(' ')),
    ArrayFP.map((a): Command => ({ dir: a[0] as Dir, step: Number(a[1]) })),
  );

  pipe(
    cmds,
    ArrayFP.reduce(startingPosition, (acc, cmd) => {
      return move(acc, cmd);
    }),
  );

  console.log(
    'Q1',
    ArrayFP.uniq(S.Eq)(travelledT),
    new Set(travelledH).size,
    new Set(travelledT).size,
  );
}
export function q2() {
  console.log('Q2');
}
