import * as ArrayFP from 'fp-ts/Array';
import * as N from 'fp-ts/number';
import * as NEA from 'fp-ts/NonEmptyArray';
import { flow, pipe } from 'fp-ts/function';
import utils = require('../utils');
import { sampleData, data } from './day5-data';

/*
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 
*/

const parseCommands = flow(
  utils.parseLinesToArray,
  ArrayFP.map((a) =>
    a
      .split(' ')
      .map(Number)
      .filter((x) => x),
  ),
);

function getCratePosition(i: number) {
  return (i - 1) * 4 + 1;
}

export function q1() {
  const parsed = utils.parseByEmptyLinesToArray(data);

  const stacks = pipe(parsed[0], utils.parseLinesToArray);
  const lastLine = stacks.pop();
  if (!lastLine) {
    return;
  }

  const stackGroups: Record<string, string[]> = pipe(
    lastLine
      .split(' ')
      .map(Number)
      .filter((x) => x),
    ArrayFP.reduce({}, (a, b) => {
      return { ...a, [b]: [] };
    }),
  );
  console.log(stackGroups, stacks);

  Object.keys(stackGroups).forEach((sg) => {
    stacks.map((s) => {
      const p = getCratePosition(Number(sg));

      if (s[p].trim()) {
        stackGroups[sg].push(s[p]);
      }
    });
  });

  // move [0] from [1] to [2]
  const commands = parseCommands(parsed[1]);

  commands.forEach(([move, from, to]) => {
    const toMove = stackGroups[String(from)].splice(0, move);
    stackGroups[String(to)] = [...toMove.reverse(), ...stackGroups[String(to)]];
  });

  console.log(
    'Q1',

    Object.values(stackGroups)
      .map((a) => a[0])
      .join(''),
  );
}

export function q2() {
  const parsed = utils.parseByEmptyLinesToArray(data);

  const stacks = pipe(parsed[0], utils.parseLinesToArray);
  const lastLine = stacks.pop();
  if (!lastLine) {
    return;
  }

  const stackGroups: Record<string, string[]> = pipe(
    lastLine
      .split(' ')
      .map(Number)
      .filter((x) => x),
    ArrayFP.reduce({}, (a, b) => {
      return { ...a, [b]: [] };
    }),
  );
  console.log(stackGroups, stacks);

  Object.keys(stackGroups).forEach((sg) => {
    stacks.map((s) => {
      const p = getCratePosition(Number(sg));

      if (s[p].trim()) {
        stackGroups[sg].push(s[p]);
      }
    });
  });

  // move [0] from [1] to [2]
  const commands = parseCommands(parsed[1]);

  commands.forEach(([move, from, to]) => {
    const toMove = stackGroups[String(from)].splice(0, move);
    stackGroups[String(to)] = [...toMove, ...stackGroups[String(to)]];
  });

  console.log(
    'Q2',

    Object.values(stackGroups)
      .map((a) => a[0])
      .join(''),
  );
}
