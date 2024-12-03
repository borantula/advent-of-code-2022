import { sampleData, sampleData2, data } from './day3-data';
import * as utils from '../../utils';

const totalMultiplications = (str: string) => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
  const matches = [...str.matchAll(regex)];

  let total = 0;

  matches.forEach((match, index) => {
    const fullMatch = match[0]; // The entire matched text
    const x = match[1]; // Captured group for X
    const y = match[2]; // Captured group for Y
    total += Number(x) * Number(y);
    // console.log(`Match ${index + 1}: ${fullMatch}, X=${x}, Y=${y}`);
  });

  return total;
};

const totalMultiplicationsWithDoDont = (str: string) => {
  const regex = /(mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\))/g;
  const matches = [...str.matchAll(regex)];

  let total = 0;
  let shallWeDo = true;

  matches.forEach((match, index) => {
    const fullMatch = match[0]; // The entire matched text
    const x = match[2]; // Captured group for X
    const y = match[3]; // Captured group for Y
    if (fullMatch === 'do()') {
      shallWeDo = true;
    } else if (fullMatch === "don't()") {
      shallWeDo = false;
    } else if (shallWeDo) {
      total += Number(x) * Number(y);
    }
    console.log(`Match ${index + 1}: ${fullMatch}, X=${x}, Y=${y}`);
  });

  return total;
};

export function q1() {
  console.log('Q1', totalMultiplications(data));
}

export function q2() {

  console.log('Q2', totalMultiplicationsWithDoDont(data));
}
