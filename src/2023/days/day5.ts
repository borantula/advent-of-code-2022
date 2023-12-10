import { sampleData, data } from './day5-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { chunk, sum } from 'lodash';

type Group = [number, number, number];

function findInGroup(n: number, groups: Group[]) {
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
      ) as Group[],
  );

  const result = groupMaps.reduce((t, c) => {
    return t.map((a) => findInGroup(a, c));
  }, seeds);
  console.log('Q1', seeds, Math.min(...result));
  console.timeEnd('Execution Time');
}
function getTotal(bag: [number, number][]) {
  return sum(bag.map(([a, b]) => b - a + 1));
}
function checkOverlap([first, last]: [number, number], [dst, src, r]: Group) {
  // seeds: 79 80 81 ... 92
  // group1: 98 99
  // group2: 50 51 ... 97
  // in or overlap
  const finalPoint = src + r - 1;

  const delta = dst - src;
  const startsWithin = first >= src && first < finalPoint;
  const endsWithin = last <= finalPoint && last > src;
  // console.log('Some overlap', dst, src, finalPoint, 'delta', delta);
  // super! all is within limit of one thing! we can shift all by that delta
  const points = {
    handled: [] as [number, number][],
    unhandled: [] as [number, number][],
  };

  console.log(
    'startend',
    first,
    last,
    'start:',
    startsWithin,
    'end:',
    endsWithin,
    'fp:',
    finalPoint,
    delta,
    'DS',
    `${dst}/${src}`,
  );

  if (startsWithin && endsWithin) {
    points.handled.push([first + delta, last + delta]);
  }

  if (startsWithin && !endsWithin) {
    points.handled.push([first + delta, finalPoint + delta]);
    points.unhandled.push([finalPoint + 1, last]);
  }

  if (!startsWithin && endsWithin) {
    points.handled.push([src + delta, last + delta]);
    points.unhandled.push([first, src - 1]);
  }

  if (!startsWithin && !endsWithin) {
    if (
      (last < src && first < src) ||
      (last > finalPoint && first > finalPoint)
    ) {
      // if all happened out of bounds goes as is
      // console.log('nooverlap', dst, src, finalPoint);
      points.unhandled.push([first, last]);
    } else {
      points.handled.push([dst, finalPoint + delta]);
      points.unhandled.push([finalPoint + 1, last]);
      points.unhandled.push([first, src - 1]);
    }
  }

  console.log('PTS', points);
  return points;
}

function handleGroupToItemMapping(
  itemRange: [number, number],
  groups: Group[],
) {
  const bag = {
    handled: [] as [number, number][],
    unhandled: [itemRange] as [number, number][],
  };
  const newBag = {
    handled: [] as [number, number][],
    unhandled: [] as [number, number][],
  };
  groups.forEach((group) => {
    bag.unhandled.forEach((a) => {
      const r = checkOverlap(a, group);
      bag.handled = [...bag.handled, ...r.handled];
      bag.unhandled = r.unhandled;
      console.log('checkedOverlap', r.unhandled);
    });
  });
  // console.log('itemRange', bag);
  return [...bag.handled, ...bag.unhandled];
}

// const testItem: [number, number] = [78, 111];
// const testGroups: Group[] = [
//   [45, 77, 23],
//   // [81, 45, 19],
//   // [68, 64, 13],
// ];

// console.log(
//   handleGroupToItemMapping,
//   handleGroupToItemMapping(testItem, testGroups),
//   getTotal(handleGroupToItemMapping(testItem, testGroups)),
//   'should be:',
//   [[81, 94]],
// );
// console.log(testGroups);

export function q2() {
  console.time('Execution Time');
  const [seed, ...groups] = pipe(sampleData, utils.parseByEmptyLinesToArray);

  const seeds = seed.split(':')[1].trim().split(' ').map(Number);

  const groupMaps = groups.map(
    (g) =>
      pipe(
        g.split(':')[1],
        utils.parseLinesToArray,
        ArrayFP.map((a) => a.split(' ').map(Number)),
      ) as Group[],
  );

  let seedChunks = chunk(seeds, 2) as [number, number][];
  seedChunks = seedChunks.map(([s, r]) => [s, s + r - 1]);

  seedChunks.sort((a, b) => (a[0] > b[0] ? -1 : 1));

  // console.log(seedChunks, groupMaps);

  // console.log('BANG', getTotal(seedChunks));
  // return;

  const totalBag: [number, number][] = [];
  seedChunks.forEach((seedChunk, i) => {
    if (i > 1) {
      return;
    }
    const totalInThisChunk = getTotal([seedChunk]);
    const gr = handleGroupToItemMapping(seedChunk, groupMaps[0]);
    console.log(
      '--- RESULT for',
      seedChunk,
      'and total is:',
      totalInThisChunk,
      getTotal(gr),
      gr,
    );
    // utils.logger(gr);
    utils.logger(getTotal(gr) === totalInThisChunk);
    console.log('---END RESULT for', seedChunk);

    return;

    const gr2 = gr.flatMap((a) => handleGroupToItemMapping(a, groupMaps[1]));
    const gr3 = gr2.flatMap((a) => handleGroupToItemMapping(a, groupMaps[2]));
    const gr4 = gr3.flatMap((a) => handleGroupToItemMapping(a, groupMaps[3]));
    const gr5 = gr4.flatMap((a) => handleGroupToItemMapping(a, groupMaps[4]));
    const gr6 = gr5.flatMap((a) => handleGroupToItemMapping(a, groupMaps[5]));
    // .flatMap((x) => x);
    console.log('--- RESULT for g2', seedChunk);
    console.log(
      getTotal(gr2) === totalInThisChunk,
      getTotal(gr2),
      totalInThisChunk,
    );
    // utils.logger(gr2);
    utils.logger(getTotal(gr2) === totalInThisChunk);
    console.log('---END RESULT for', seedChunk);

    console.log('--- RESULT for g3', seedChunk);
    // utils.logger(gr3);
    console.log(
      getTotal(gr3) === totalInThisChunk,
      getTotal(gr3),
      totalInThisChunk,
    );
    console.log('---END RESULT for', seedChunk);

    console.log('--- RESULT for g4', seedChunk);
    // utils.logger(gr4);
    utils.logger(getTotal(gr4) === totalInThisChunk);
    console.log('---END RESULT for', seedChunk);

    console.log('--- RESULT for g5', seedChunk, 'groups:');
    // utils.logger(gr5);
    utils.logger(getTotal(gr5) === totalInThisChunk);
    console.log('---END RESULT for', seedChunk);

    console.log('--- RESULT for g6', seedChunk);
    // utils.logger(gr6);
    utils.logger(getTotal(gr6) === totalInThisChunk);
    console.log('---END RESULT for', seedChunk);

    gr6.forEach((a) => {
      totalBag.push(a);
    });
  });

  console.log(
    'TOTAL',
    // totalBag,
    getTotal(totalBag),
    'first',
    totalBag[0],
    totalBag
      .flatMap((x) => x)
      .sort((a, b) => {
        return a > b ? 1 : -1;
      }),
    // t,
    // tester
    //   .map((t) => testObj.unhandled.map((x) => checkOverlap(x, t)))
    //   .flatMap((x) => x)[0],
    // tester
    //   .map((t) => testObj.unhandled.map((x) => checkOverlap(x, t)))
    //   .flatMap((x) => x),
  );

  console.log('Q2');
  console.timeEnd('Execution Time');
}
