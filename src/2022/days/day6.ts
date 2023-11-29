import { data } from './day6-data';

function getMarkerByMagicNumber(msg: string, magicNumber: number) {
  const turns = msg.length - magicNumber;
  for (let index = 0; index < turns; index++) {
    const currentSet = new Set(msg.slice(index, index + magicNumber));
    if (currentSet.size === magicNumber) {
      return index + magicNumber;
    }
  }
}

export function q1() {
  console.log('Q1', getMarkerByMagicNumber(data, 4));
}
export function q2() {
  console.log('Q2', getMarkerByMagicNumber(data, 14));
}
