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

    const matches: string[] = [];

    const regex = /(?=([1-9]|one|two|three|four|five|six|seven|eight|nine))/g;

    [...str.matchAll(regex)].forEach((m) =>
      matches.push(wordsToDigits[m[1]] || m[1]),
    );

    return matches.join('');
  };

  const parsed = utils
    .parseLinesToArray(data)
    .map(convertNumbers)
    .map((a) => a.match(/\d+/g) || [])
    .map((a) => a.join('').split('').map(Number))
    .map((a) => a[0] * 10 + a[a?.length - 1]);
  console.log('Q2', sum(parsed));
}
