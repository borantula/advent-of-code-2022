import { sampleData, data } from './day1-data';
import * as utils from '../../utils';

export function q1(dataSet: string) {
  console.log('Q1');
  let currentPoint = 50;

  const instructions = utils.parseLinesToArray(dataSet).map((line) => {
    const turn = line.charAt(0);
    const distance = parseInt(line.slice(1), 10);
    return { turn, distance };
  });

  let zeroCounter = 0;
  instructions.forEach((inst) => {
    if (inst.turn === 'L') {
      currentPoint -= inst.distance;
    } else if (inst.turn === 'R') {
      currentPoint += inst.distance;
    }
    currentPoint = (currentPoint + 100) % 100;
    if (currentPoint === 0) {
      zeroCounter++;
    }
  });
  console.log(zeroCounter);
}

export function q2(dataSet: string) {
  console.log('Q2');
  let currentPoint = 50;

  const instructions = utils.parseLinesToArray(dataSet).map((line) => {
    const turn = line.charAt(0);
    const distance = parseInt(line.slice(1), 10);
    return { turn, distance };
  });

  let zeroCounter = 0;
  instructions.forEach((inst) => {
    if (inst.distance >= 100) {
      const passes = Math.floor(inst.distance / 100);
      // console.log('Floored', passes, inst.distance, inst.distance % 100);
      zeroCounter += passes;
      inst.distance = inst.distance % 100;
    }
    if (inst.turn === 'L') {
      currentPoint -= inst.distance;
    } else if (inst.turn === 'R') {
      currentPoint += inst.distance;
    }
    currentPoint = (currentPoint + 100) % 100;
    if (
      (inst.turn === 'R' && currentPoint + inst.distance > 100) ||
      (inst.turn === 'L' && currentPoint + inst.distance > 100)
      // currentPoint === 0
    ) {
      // console.log(inst, lastCurrentPoint, currentPoint);
      if (currentPoint === 0) {
        console.log('its zero', currentPoint === 0);
      }

      zeroCounter++;
    }
  });
  console.log(zeroCounter);
}

export function run() {
  console.log('Day 1');
  console.log('Day 1 Q1 Sample Data');
  q1(sampleData);
  console.log('Day 1 Q1 Actual Data');
  q1(data);
  console.log('Day 1 Q2 Sample Data');
  q2(sampleData);
  console.log('Day 1 Q2 Actual Data');
  q2(data);
}
