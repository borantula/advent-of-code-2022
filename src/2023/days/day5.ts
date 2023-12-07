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

  let seedChunks = chunk(seeds, 2) as [number, number][];
  seedChunks = seedChunks.map(([s, r]) => [s, s + r - 1]);

  seedChunks.sort((a, b) => (a[0] > b[0] ? -1 : 1));
  console.log(seedChunks);

  const checkGroupMap = (seed: number) =>
    groupMaps.reduce((t, c) => {
      return findInGroup(t, c);
    }, seed);

  const result = seedChunks.reduce((t, [start, end], ind) => {
    let lowest = t;
    console.log('Start group: ', ind);
    console.time(`Start group ${ind}`);
    for (let i = start; i < end; i++) {
      const found = checkGroupMap(i);
      if (found < lowest) {
        lowest = found;

        console.log('lowest', lowest);
      }
    }
    console.timeEnd(`Start group ${ind}`);
    return lowest;
  }, Infinity);

  console.log('Q2', result);
  console.timeEnd('Execution Time');
}
