import { sampleData, data } from './day6-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import { chunk } from 'lodash';

export function q1() {
  console.time('Execution Time');
  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(':').map((y) => y.trim())[1]),
    ArrayFP.map((x) => x.split(' ')),
    ArrayFP.map((x) => x.filter((y: string) => !!y).map(Number)),
  );

  const zipped = ArrayFP.zip(parsed[1])(parsed[0]);

  const result = zipped.map(([time, record]) => {
    let winningCount = 0;
    for (let speed = 1; speed < time; speed++) {
      const raceTime = time - speed;

      if (raceTime * speed > record) {
        winningCount++;
      }
    }
    return winningCount;
  });

  console.log(
    'Q1',
    result.reduce((t, c) => t * c, 1),
  );
  console.timeEnd('Execution Time');
}

export function q2() {
  console.time('Execution Time');

  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.map((x) => x.split(':').map((y) => y.trim())[1]),
    ArrayFP.map((x) => x.replace(/\s/g, '')),
    ArrayFP.map(Number),
  );

  // too lazy to update this part after first question so put them in arrays again :)
  const zipped = ArrayFP.zip([parsed[1]])([parsed[0]]);
  const result = zipped.map(([time, record]) => {
    let winningCount = 0;
    for (let speed = 1; speed < time; speed++) {
      const raceTime = time - speed;
      // console.log('raced', raceTime * speed);
      if (raceTime * speed > record) {
        winningCount++;
      }
    }
    return winningCount;
  });

  console.log(
    'Q2',
    result.reduce((t, c) => t * c, 1),
  );

  console.timeEnd('Execution Time');
}
