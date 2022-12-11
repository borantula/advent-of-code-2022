import * as ArrayFP from 'fp-ts/Array';
import * as N from 'fp-ts/number';
import { pipe } from 'fp-ts/function';
import utils = require('../utils');
import { StringIterator, sumBy } from 'lodash';
import { sampleData, data } from './day11-data';

type ThrowingRules = {
  test: number;
  onTrue: number;
  onFalse: number;
};
type Monkey = {
  id: number;
  name: string;
  items: number[];
  inspectCount: number;
  operation: string;
  throwingRules: ThrowingRules;
};

type Round = {
  order: number;
  monkeys: Monkey[];
};

type Rule = [string, string, string, string, string, string];

const initMonkey = (rules: string[]): Monkey => {
  const name = rules[0].replace(':', '');
  const items = rules[1]
    .replace('Starting items: ', '')
    .split(', ')
    .map(Number);

  return {
    id: Number(name.replace('Monkey ', '')),
    name,
    items,
    inspectCount: 0,
    operation: rules[2].replace('Operation: ', ''),
    throwingRules: {
      test: pipe(
        rules[3],
        (a) => a.replace('Test: divisible by ', ''),
        (a) => Number(a),
      ),
      onTrue: pipe(
        rules[4],
        (a) => a.replace('If true: throw to monkey', ''),
        (a) => Number(a.trim()),
      ),
      onFalse: pipe(
        rules[5],
        (a) => a.replace('If false: throw to monkey', ''),
        (a) => Number(a.trim()),
      ),
    },
  };
};

const runRounds = (round: Round, until = 1): Round => {
  if (until === round.order) {
    return round;
  }
  const { monkeys } = round;

  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];
    console.log(monkey);
    monkey.items
      .map((a) => {
        // eslint-disable-next-line prefer-const
        let valuenew = a;
        eval(
          `value${monkey.operation.replace(new RegExp('old', 'g'), String(a))}`,
        );

        return Math.floor(valuenew / 3);
      })
      .forEach((a) => {
        if (a % monkey.throwingRules.test === 0) {
          monkeys[monkey.throwingRules.onTrue].items.push(a);
        } else {
          monkeys[monkey.throwingRules.onFalse].items.push(a);
        }
        monkeys[i].items.shift();
        monkeys[i].inspectCount++;
      });
  }

  const newRound: Round = { order: round.order + 1, monkeys };

  return runRounds(newRound, until);
};

const runRounds2 = (round: Round, until = 1): Round => {
  if (until === round.order) {
    return round;
  }
  const { monkeys } = round;

  for (let i = 0; i < monkeys.length; i++) {
    const monkey = monkeys[i];
    console.log(monkey);
    monkey.items
      .map((a) => {
        // eslint-disable-next-line prefer-const
        let valuenew = a;
        eval(
          `value${monkey.operation.replace(new RegExp('old', 'g'), String(a))}`,
        );

        return valuenew;
      })
      .forEach((a) => {
        if (a % monkey.throwingRules.test === 0) {
          monkeys[monkey.throwingRules.onTrue].items.push(a);
        } else {
          monkeys[monkey.throwingRules.onFalse].items.push(a);
        }
        monkeys[i].items.shift();
        monkeys[i].inspectCount++;
      });
  }

  const newRound: Round = { order: round.order + 1, monkeys };

  return runRounds(newRound, until);
};

export function q1() {
  const parsed = pipe(
    utils.parseLinesToArray(data),
    ArrayFP.chunksOf(6),
    (a) => a as Rule[],
    ArrayFP.map(initMonkey),
    (monkeys) => runRounds({ order: 0, monkeys }, 20),
    utils.logger,
    (r) => r.monkeys.map((a) => a.inspectCount),
    ArrayFP.sort(N.Ord),
    (a) => a.reverse(),
    (r) => r[0] * r[1],
  );

  console.log('Q1', parsed);
}

export function q2() {
  const parsed = pipe(
    utils.parseLinesToArray(sampleData),
    ArrayFP.chunksOf(6),
    (a) => a as Rule[],
    ArrayFP.map(initMonkey),
    (monkeys) => runRounds2({ order: 0, monkeys }, 20),
    utils.logger,
    (r) => r.monkeys.map((a) => a.inspectCount),
    // ArrayFP.sort(N.Ord),
    // (a) => a.reverse(),
    // (r) => r[0] * r[1],
  );

  console.log('Q1', parsed);
}
