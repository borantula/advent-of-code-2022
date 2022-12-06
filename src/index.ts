#!/usr/bin/env node
import minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

console.log(`DAY ${argv.day}`);

import day1 = require('./days/day1');
import day2 = require('./days/day2');
import day3 = require('./days/day3');
import day4 = require('./days/day4');
import day5 = require('./days/day5');
import day6 = require('./days/day6');

try {
  switch (argv.day) {
    case 1:
      day1.q1();
      day1.q2();
      break;
    case 2:
      day2.q1();
      day2.q2();
      break;
    case 3:
      day3.q1();
      day3.q2();
      break;
    case 4:
      day4.q1();
      day4.q2();
      break;
    case 5:
      day5.q1();
      day5.q2();
      break;
    case 6:
      day6.q1();
      day6.q2();
      break;

    default:
      break;
  }
} catch (err) {
  console.error(err);
}
