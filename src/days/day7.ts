import * as ArrayFP from 'fp-ts/Array';
import * as N from 'fp-ts/Number';
import * as NEA from 'fp-ts/NonEmptyArray';
import { flow, pipe } from 'fp-ts/function';
import utils = require('../utils');
import { sampleData, data } from './day7-data';
import { isNumber, isString, map, sum } from 'lodash';
import { string } from 'yargs';

function makeDir(openDir: string, dir: string) {
  return [openDir, dir].join('-');
}

const Q1_MAX = 100000;
const TOTAL_SPACE = 70000000;
const UPGRADE_SPACE = 30000000;
function loopCommands(cmds: string[]) {
  const mapped: Record<string, any[]> = {};

  const openDir: string[] = [];

  function dir() {
    return openDir.join('-');
  }

  cmds.forEach((cmd) => {
    const s = cmd.split(' ');
    switch (s[0]) {
      case 'dir':
        mapped[dir()].push(makeDir(dir(), s[1]));

        break;
      case '$':
        if (s[1] === 'cd') {
          if (s[2] === '..') {
            // find parent and set as current

            openDir.pop();
          } else {
            openDir.push(s[2]);
            if (!mapped[dir()]) {
              mapped[dir()] = [];
            }
          }
        }

        break;
      default:
        mapped[dir()].push(Number(s[0]));
        break;
    }
  });

  let dirRef = true;
  while (dirRef) {
    for (const iterator in mapped) {
      const current = mapped[iterator];

      const newOne = current.reduce((acc, a) => {
        if (isString(a)) {
          if (mapped[a] && mapped[a]) {
            return [...acc, ...mapped[a]];
          }
        }
        return [...acc, a];
      }, []);

      mapped[iterator] = newOne;
    }
    dirRef = hasDirRef(mapped);
  }

  const sizeMap: Record<string, number> = {};
  Object.keys(mapped).forEach((a) => (sizeMap[a] = sum(mapped[a])));

  const neededSpace = UPGRADE_SPACE - (TOTAL_SPACE - sizeMap['/']);
  const filtered = Object.keys(sizeMap).filter((k) => sizeMap[k] > neededSpace);

  for (const key in sizeMap) {
    if (!filtered.includes(key)) {
      delete sizeMap[key];
    }
  }
  console.log('Q2', Math.min(...Object.values(sizeMap)));

  return Object.values(mapped).reduce((total, a) => {
    if (sum(a) < Q1_MAX) {
      total += sum(a);
    }
    return total;
  }, 0);
}

function hasDirRef(mapped: Record<string, Array<number | string>>) {
  for (const iterator in mapped) {
    if (mapped[iterator].find((x) => isString(x))) {
      return true;
    }
  }
  return false;
}

export function q1() {
  const parsed = pipe(utils.parseLinesToArray(data), loopCommands);
  console.log('Q1', parsed);
}
export function q2() {
  console.log('Q2');
}
