#!/usr/bin/env node
import minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

// console.log(argv.day);

import day1 = require('./days/day1');

try {
  day1.q1();
  day1.q2();
} catch (err) {
  console.error(err);
}
