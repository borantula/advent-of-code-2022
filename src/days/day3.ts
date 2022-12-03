import * as ArrayFP from 'fp-ts/Array';
import { pipe } from 'fp-ts/lib/function';
import { sum } from 'lodash';
import utils = require('../utils');
import { data } from './day3-data';

const firstLetterLower = 'a'.charCodeAt(0);
const firstLetterUpper = 'A'.charCodeAt(0);

export function q1() {
  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    // split to halfs
    ArrayFP.map((c): [string, string] => [
      c.slice(0, c.length / 2),
      c.slice((-1 * c.length) / 2),
    ]),
    // get common letters
    ArrayFP.map((compartments) => commonLetters(...compartments)),
    // total of uniques
    ArrayFP.map((a) => getLetterValue(a.charAt(0))),
    sum,
  );

  console.log('Q1', parsed);
}

export function q2() {
  const parsed = pipe(
    data,
    utils.parseLinesToArray,
    ArrayFP.chunksOf(3),
    ArrayFP.map((chunk) =>
      commonLetters(chunk[2], commonLetters(chunk[0], chunk[1])),
    ),
    ArrayFP.map((a) => getLetterValue(a.charAt(0))),
    sum,
  );
  console.log('Q2', parsed);
}

function isUppercase(letter: string) {
  return letter === letter.toUpperCase();
}

function getLetterValue(letter: string) {
  if (isUppercase(letter)) {
    return letter.charCodeAt(0) - firstLetterUpper + 27;
  }
  return letter.charCodeAt(0) - firstLetterLower + 1;
}

function commonLetters(str1: string, str2: string) {
  // Split the strings into arrays of characters
  const chars1 = str1.split('');
  const chars2 = str2.split('');

  // Use the filter() method to keep only the characters that are present in both arrays
  const commonChars = chars1.filter((char) => chars2.includes(char));

  // Use the join() method to combine the elements of the resulting array into a single string
  return commonChars.join('');
}
