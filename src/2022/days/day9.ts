import * as ArrayFP from 'fp-ts/Array';
import * as S from 'fp-ts/string';
import { pipe } from 'fp-ts/function';
import utils = require('../utils');
import { sampleData, sampleData2, data } from './day9-data';
import { range, take } from 'lodash';

type Position = [number, number];
type Dir = 'R' | 'U' | 'L' | 'D';
type Command = { dir: Dir; step: number };

const travelledH: string[] = [];
const travelledT: string[] = [];

const travelledH2: string[] = [];
const travelledT2: string[] = [];

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

    const diffX = Math.abs(positions.h[0] - positions.t[0]) > 1;
    const diffY = Math.abs(positions.h[1] - positions.t[1]) > 1;

    if (diffX || diffY) {
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

    travelledH.push(positions.h.join('|'));
    travelledT.push(positions.t.join('|'));
  }

  return positions;
}

function moveLonger(positions: Position[], { dir, step }: Command) {
  console.log('DIR', dir, step);

  for (let y = 1; y <= step; y++) {
    switch (dir) {
      case 'R':
        positions[0][0]++;
        break;
      case 'L':
        positions[0][0]--;
        break;
      case 'U':
        positions[0][1]--;
        break;
      case 'D':
        positions[0][1]++;
        break;
      default:
        break;
    }

    // console.log(positions.h);

    for (let i = 1; i < positions.length; i++) {
      const diffX = positions[i - 1][0] - positions[i][0];
      const diffY = positions[i - 1][1] - positions[i][1];
      const aDiffX = Math.abs(diffX);
      const aDiffY = Math.abs(diffY);
      console.log('DIFF', diffX, diffY, aDiffX, aDiffY);

      // if (aDiffX > 1 || aDiffY > 1) {
      //   if (diffX > diffY) {
      //     positions[i] = [
      //       positions[i][0] + dir === 'LEFT' ? -(aDiffX - 1) : aDiffX - 1,
      //       positions[i][1] + dir === 'LEFT' ? -(aDiffY - 1) : aDiffY - 1,
      //     ];
      //   }
      //   if (diffX < diffY) {
      //     positions[i] = [
      //       positions[i - 1][0] + dir === 'UP' ? -(aDiffX - 1) : aDiffX - 1,
      //       positions[i - 1][1] + dir === 'UP' ? -(aDiffY - 1) : aDiffY - 1,
      //     ];
      //   }

      //   if (diffX === diffY) {
      //     positions[i] = [
      //       positions[i - 1][0] + dir === 'LEFT' ? -(aDiffX - 1) : aDiffX - 1,
      //       positions[i - 1][1] + dir === 'UP' ? -(aDiffY - 1) : aDiffY - 1,
      //     ];
      //   }
      // }
      switch (dir) {
        case 'R':
          positions[i][1] = positions[i - 1][1];
          positions[i][0]++;
          break;
        case 'L':
          positions[i][1] = positions[i - 1][1];
          positions[i][0]--;
          break;
        case 'U':
          positions[i][0] = positions[i - 1][0];
          positions[i][1]--;
          break;
        case 'D':
          positions[i][0] = positions[i - 1][0];
          positions[i][1]++;
          break;
        default:
          break;

        // if (i === positions.length - 1) {
        //   travelledT2.push(positions[i].join('|'));
        // }
      }
      travelledH2.push(positions[0].join('|'));
    }

    console.log(positions);

    return positions;
  }
}

export function q1() {
  const startingPosition: { h: Position; t: Position } = {
    h: [0, 0],
    t: [0, 0],
  };
  const cmds = pipe(
    utils.parseLinesToArray(data),
    ArrayFP.map((a) => a.split(' ')),
    ArrayFP.map((a): Command => ({ dir: a[0] as Dir, step: Number(a[1]) })),
  );

  pipe(
    cmds,
    ArrayFP.reduce(startingPosition, (acc, cmd) => {
      return move(acc, cmd);
    }),
  );

  console.log('Q1', new Set(travelledT).size);
}
export function q2() {
  const startingPosition: Position[] = Array.from(range(1, 11), () => [0, 0]);
  // return;
  const cmds = pipe(
    utils.parseLinesToArray(sampleData2),
    (a) => take(a, 1),
    ArrayFP.map((a) => a.split(' ')),
    ArrayFP.map((a): Command => ({ dir: a[0] as Dir, step: Number(a[1]) })),
  );

  // pipe(
  //   cmds,
  //   ArrayFP.reduce(startingPosition, (acc, cmd) => {
  //     // console.log(acc);

  //     return moveLonger(acc, cmd);
  //   }),
  // );

  console.log(
    'Q2',
    // ArrayFP.uniq(S.Eq)(travelledT),

    // new Set(travelledH2).size,
    new Set(travelledT2).size,
  );
}
