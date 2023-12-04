import { sampleData, data } from './day4-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { filter, flatMap, sum } from 'lodash';

export function q1() {
  const lines = pipe(data, utils.parseLinesToArray);

  const parsed = pipe(
    lines,
    ArrayFP.map((l) => {
      return l
        .split(':')[1]
        .split('|')
        .map((a) => {
          return a
            .trim()
            .split(' ')
            .filter((a) => a)
            .map(Number);
        });
    }),
    ArrayFP.map((sides) => {
      const winners = sides[0].filter((x) => sides[1].includes(x));
      return winners.length;
    }),
    ArrayFP.filter((a) => !!a),
    ArrayFP.map((a) => Math.pow(2, Math.max(a - 1, 0))),
    sum,
  );

  console.log('Q1', parsed);
}

export function q2() {
  const lines = pipe(data, utils.parseLinesToArray);

  const parsed = pipe(
    lines,
    ArrayFP.map((l) => {
      return l
        .split(':')[1]
        .split('|')
        .map((a) => {
          return a
            .trim()
            .split(' ')
            .filter((a) => a)
            .map(Number);
        });
    }),
    ArrayFP.map((sides) => {
      const winners = sides[0].filter((x) => sides[1].includes(x));
      return winners.length;
    }),
  );
  const cardPoints = parsed;

  const cardCounts: number[] = Array.from(cardPoints, (x) => 1);

  const totalCardCounts = cardCounts.reduce((t, noOfCurrentCard, ind) => {
    const currentPoints = cardPoints[ind];
    for (let j = 1; j <= noOfCurrentCard; j++) {
      for (let i = 1; i <= currentPoints; i++) {
        t[ind + i]++;
      }
    }
    return t;
  }, cardCounts);

  console.log('Q1', sum(totalCardCounts));
}
