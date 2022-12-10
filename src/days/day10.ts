import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import utils = require('../utils');
import { chunk, sumBy } from 'lodash';
import { sampleData, data } from './day10-data';

type Cycle = {
  cycle: number;
  value: number;
  strength: number;
  cmd: string;
};

function getCycles(cmds: string[]) {
  const startingCycle: Cycle = { cycle: 0, value: 1, strength: 0, cmd: '' };

  return pipe(
    cmds,
    ArrayFP.reduce([] as Cycle[], (acc, cmd) => {
      const lastCycle: Cycle = !acc.length
        ? startingCycle
        : acc[acc.length - 1];
      const cycleNo = lastCycle.cycle + 1;
      if (cmd === 'noop') {
        return [
          ...acc,
          {
            ...lastCycle,
            cycle: cycleNo,
            strength: lastCycle.value * cycleNo,
            cmd,
          },
        ];
      }

      const cmdValue = parseInt(cmd.replace('addx ', ''));

      return [
        ...acc,
        {
          ...lastCycle,
          cycle: lastCycle.cycle + 1,
          strength: (lastCycle.cycle + 1) * lastCycle.value,
          cmd,
        } as Cycle,
        {
          ...lastCycle,
          cycle: lastCycle.cycle + 2,
          value: lastCycle.value + cmdValue,
          strength: (lastCycle.cycle + 2) * lastCycle.value,
          cmd,
        } as Cycle,
      ];
    }),
  );
}

function getLines(cycles: Cycle[][]) {
  const LIT = '#';
  const DARK = '.';
  return cycles.map((groups) => {
    let spritePosition = 0;
    const line = groups.reduce((acc, { value }, col) => {
      const spritePositions = [
        spritePosition,
        spritePosition + 1,
        spritePosition + 2,
      ];

      // update sprite position at the end
      spritePosition = value - 1;
      return `${acc}${spritePositions.includes(col) ? LIT : DARK}`;
    }, '');

    return line;
  });
}

export function q1() {
  const significantCycles = [20, 60, 100, 140, 180, 220];

  const parsed = pipe(
    utils.parseLinesToArray(sampleData),
    getCycles,
    ArrayFP.filter((a) => significantCycles.includes(a.cycle)),
    // utils.logger,
    (a) => sumBy(a, (c: Cycle) => c.strength),
  );

  console.log('Q1', parsed);
}

export function q2() {
  const parsed = pipe(
    utils.parseLinesToArray(data),
    getCycles,
    (a) => chunk(a, 40),
    getLines,
  );

  console.log('Q2', parsed);
}
