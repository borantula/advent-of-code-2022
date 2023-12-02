import { sampleData, data } from './day2-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import * as N from 'fp-ts/number';
import * as NEA from 'fp-ts/NonEmptyArray';
import { flow, pipe } from 'fp-ts/function';
import { sum, take } from 'lodash';

type Color = 'red' | 'blue' | 'green';
const bounds: Record<Color, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export function q1() {
  return;
  const playGame = (gameSet: string[]) => {
    for (let i = 0; i < gameSet.length; i++) {
      const [n, c] = gameSet[i].trim().split(' ') as [string, Color];
      console.log('set', gameSet[i]);
      console.log('color', c);
      if (bounds[c] < Number(n)) {
        return false;
      }
    }
    return true;
  };
  const parsed = pipe(
    data,
    utils.parseLinesToArray,

    ArrayFP.map((c) => {
      return c.split(':') as [string, string];
    }),
    ArrayFP.map((c) => {
      const games = c[1].split(';').map((a) => a.trim().split(','));
      return [c[0], ...games];
    }),
    utils.logger,
    ArrayFP.map((gameSet) => {
      const [gameIdentifier, ...games] = gameSet;
      const gameId = Number((gameIdentifier as string).split(' ')[1]);
      for (let i = 0; i < games.length; i++) {
        const colorSets = games[i] as string[];
        utils.logger(colorSets);
        const result = playGame(colorSets);
        if (!result) {
          return false;
        }
      }
      return gameId;
    }),
    ArrayFP.filter((a) => !!a),
    sum,
  );

  console.log('Q1', parsed);
}

export function q2() {
  const playGame = (gameSet: string[], currentMax: Record<Color, number>) => {
    for (let i = 0; i < gameSet.length; i++) {
      const [n, c] = gameSet[i].trim().split(' ') as [string, Color];
      console.log('set', gameSet[i]);
      console.log('color', c);
      currentMax[c] = Math.max(Number(n), currentMax[c]);
    }
    return currentMax;
  };
  const parsed = pipe(
    data,
    utils.parseLinesToArray,

    ArrayFP.map((c) => {
      return c.split(':') as [string, string];
    }),
    ArrayFP.map((c) => {
      const games = c[1].split(';').map((a) => a.trim().split(','));
      return [c[0], ...games];
    }),
    utils.logger,
    ArrayFP.map((gameSet) => {
      const [gameIdentifier, ...games] = gameSet;
      const gameId = Number((gameIdentifier as string).split(' ')[1]);
      let currentMax: Record<Color, number> = {
        red: 0,
        green: 0,
        blue: 0,
      };
      for (let i = 0; i < games.length; i++) {
        const colorSets = games[i] as string[];
        utils.logger(colorSets);
        currentMax = playGame(colorSets, currentMax);
      }
      return currentMax;
    }),
    ArrayFP.map((a) => Object.values(a).reduce((t, s) => t * s, 1)),
    sum,
  );

  console.log('Q2', parsed);
}
