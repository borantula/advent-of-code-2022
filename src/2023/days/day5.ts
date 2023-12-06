import { sampleData, data } from './day5-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { chunk } from 'lodash';

type Group = [number, number, number];
type Groups = Group[];
function findInGroup(n: number, groups: Groups) {
  for (let i = 0; i < groups.length; i++) {
    const [d, s, r] = groups[i];
    // out of bounds, don't bother
    if (n < s || s + r < n) {
      continue;
    }

    const ind = n - s;

    if (ind >= 0) {
      return d + ind;
    }
  }
  return n;
}

export function q1() {
  return;
  console.time('Execution Time');
  const [seed, ...groups] = pipe(data, utils.parseByEmptyLinesToArray);

  const seeds = seed.split(':')[1].trim().split(' ').map(Number);

  const groupMaps = groups.map(
    (g) =>
      pipe(
        g.split(':')[1],
        utils.parseLinesToArray,
        ArrayFP.map((a) => a.split(' ').map(Number)),
      ) as Groups,
  );

  const result = groupMaps.reduce((t, c) => {
    return t.map((a) => findInGroup(a, c));
  }, seeds);
  console.log('Q1', seeds, Math.min(...result));
  console.timeEnd('Execution Time');
}

export function q2() {
  console.time('Execution Time');
  const [seed, ...groups] = pipe(data, utils.parseByEmptyLinesToArray);

  const seeds = seed.split(':')[1].trim().split(' ').map(Number);

  const groupMaps = groups.map(
    (g) =>
      pipe(
        g.split(':')[1],
        utils.parseLinesToArray,
        ArrayFP.map((a) => a.split(' ').map(Number)),
      ) as Groups,
  );

  const seedChunks = chunk(seeds, 2) as [number, number][];

  const checkGroupMap = (seed: number) =>
    groupMaps.reduce((t, c) => {
      return findInGroup(t, c);
    }, seed);

  const result = seedChunks.reduce((t, [s, r]) => {
    let lowest = t;
    for (let i = s; i < s + r; i++) {
      const found = checkGroupMap(i);
      if (found < lowest) {
        lowest = found;
      }
    }
    return lowest;
  }, Infinity);
  console.log('Q2', result);
  console.timeEnd('Execution Time');
}
