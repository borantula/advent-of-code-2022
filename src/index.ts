#!/usr/bin/env node
import minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

console.log(`DAY ${argv.day}`);

import day1 = require('./days/day1');
import day2 = require('./days/day2');
import day3 = require('./days/day3');

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

    default:
      break;
  }
} catch (err) {
  console.error(err);
}
