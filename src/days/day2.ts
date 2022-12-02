import { sum } from 'lodash';
import utils = require('../utils');
import { data } from './day2-data';

const LOST = 0;
const DRAW = 3;
const WIN = 6;
const R = 1;
const P = 2;
const S = 3;

export function q1() {
  const results: Record<string, number> = {
    AX: DRAW,
    AY: WIN,
    AZ: LOST,
    BX: LOST,
    BY: DRAW,
    BZ: WIN,
    CX: WIN,
    CY: LOST,
    CZ: DRAW,
  };

  const choice: Record<string, number> = {
    AX: R,
    AY: P,
    AZ: S,
    BX: R,
    BY: P,
    BZ: S,
    CX: R,
    CY: P,
    CZ: S,
  };
  const parsed = utils
    .parseLinesToArray(data)
    .map((a) => a.replace(' ', ''))
    .map((a: string) => {
      return choice[a] + results[a];
    });

  console.log('Q1', sum(parsed));
}

export function q2() {
  const results: Record<string, number> = {
    AX: LOST + S,
    AY: DRAW + R,
    AZ: WIN + P,
    BX: LOST + R,
    BY: DRAW + P,
    BZ: WIN + S,
    CX: LOST + P,
    CY: DRAW + S,
    CZ: WIN + R,
  };

  const parsed = utils
    .parseLinesToArray(data)
    .map((a) => a.replace(' ', ''))
    .map((a: string) => {
      return results[a];
    });

  console.log('Q2', sum(parsed));
}
