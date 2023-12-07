import { sampleData, data } from './day7-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { chunk, groupBy, sum } from 'lodash';
import { match, P } from 'ts-pattern';

type Hand = {
  hand: string;
  cards: string[];
  handRank: number;
  bid: number;
};

const cardOrder = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];
/**
Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
 */
const handRanks = {
  '5': 7,
  '41': 6,
  '32': 5,
  '311': 4,
  '221': 3,
  '2111': 2,
  '11111': 1,
} as const;

function getHandRank(cards: string[]) {
  const group = Object.values(groupBy(cards)).sort((a, b) =>
    a.length < b.length ? 1 : -1,
  );
  const lengths = group.map((x) => x.length).join('') as keyof typeof handRanks;
  // console.log(cards, group, lengths);

  return handRanks[lengths];
}

export function q1() {
  console.time('Execution Time');
  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(' ')),
    ArrayFP.map((x) => {
      const cards = x[0].split('');
      return {
        cards,
        hand: x[0],
        handRank: getHandRank(cards),
        bid: Number(x[1]),
      } as Hand;
    }),
  );

  parsed.sort((a, b) => {
    if (a.handRank === b.handRank) {
      // check for card order for equal ranks
      for (let i = 0; i < 5; i++) {
        const aEl = cardOrder.indexOf(a.cards[i]);
        const bEl = cardOrder.indexOf(b.cards[i]);

        if (aEl === bEl) {
          continue;
        }

        return aEl < bEl ? 1 : -1;
      }
      return 0;
    }
    return a.handRank > b.handRank ? 1 : -1;
  });

  const result = parsed.map((hand, i) => {
    return (i + 1) * hand.bid;
  });
  console.log('Q1', parsed, result, sum(result));
  console.timeEnd('Execution Time');
}

export function q2() {}
