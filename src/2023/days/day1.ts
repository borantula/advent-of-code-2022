import { sum, take } from 'lodash';
import { sampleData, sampleData2, data } from './day1-data';
import * as utils from '../../utils';
import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';

export function q1() {
  const parsed = utils
    .parseLinesToArray(data)
    .map((a) => a.match(/\d+/g) || [])
    .map((a) => a.join('').split('').map(Number))
    .map((a) => a[0] * 10 + a[a?.length - 1]);
  console.log('Q1', sum(parsed));
}

export function q2() {
  const convertNumbers = (str: string) => {
    const wordsToDigits: { [key: string]: string } = {
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9',
    };

    const matches = [];
    str.matchAll(/one|two|three|four|five|six|seven|eight|nine/g);
    str = str.replaceAll(
      /one|two|three|four|five|six|seven|eight|nine/g,
      (m: string) => {
        // console.log(m);
        // because eightwone should be 821 so cheating a bit
        return wordsToDigits[m] + m[m.length - 1];
      },
    );

    return str;
  };

  const parsed = utils
    .parseLinesToArray(data)
    .map(convertNumbers)
    .map(convertNumbers)
    .map((a) => a.match(/\d+/g) || [])
    .map((a) => a.join('').split('').map(Number))
    .map((a) => a[0] * 10 + a[a?.length - 1]);
  console.log('Q2', sum(parsed));
}
