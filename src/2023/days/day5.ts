import { sampleData, data } from './day5-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { filter, flatMap, sum } from 'lodash';
import { range } from 'fp-ts/lib/NonEmptyArray';

type Group = [number, number, number];
type Groups = Group[];
function findInGroup(n: number, groups: Groups) {
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    const src = range(group[1], group[1] + group[2]);
    const ind = src.indexOf(n);
    if (ind > -1) {
      const dest = range(group[0], group[0] + group[2]);
      return dest[ind];
    }
    // console.log('s,d', dest, src);
  }
  return n;
}

export function q1() {
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
  const seedToSoil = pipe(
    groups[0].split(':')[1],
    utils.parseLinesToArray,
    ArrayFP.map((a) => a.split(' ').map(Number)),
  ) as Groups;

  const result = pipe(
    seeds,
    // utils.logger,
    (s) =>
      groupMaps.reduce((t, c) => {
        return t.map((a) => findInGroup(a, c));
      }, s),
  );
  console.log('Q1', seeds, Math.min(...result));
}

export function q2() {}
