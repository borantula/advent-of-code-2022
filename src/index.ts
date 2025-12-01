#!/usr/bin/env node
import minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

const year = argv.year || new Date().getFullYear();
const day = argv.day;
console.log(`DAY ${day} and YEAR ${year}`);

if (!day || !year) {
  throw 'Day or Year is missing!';
}

async function runTheDay(day: number, year: number) {
  try {
    const module = await import(`./${year}/days/day${day}`);
    console.log('Module loaded successfully');
    return module;
  } catch (error) {
    console.error('Error loading the module:', error);
  }
}

runTheDay(day, year).then((currentDay) => {
  if (currentDay.run) {
    return currentDay.run();
  }
  console.log(currentDay.q1());
  console.log(currentDay.q2());
});

// import day1 = require('./days/day1');
// import day2 = require('./days/day2');
// import day3 = require('./days/day3');
// import day4 = require('./days/day4');
// import day5 = require('./days/day5');
// import day6 = require('./days/day6');
// import day7 = require('./days/day7');
// import day8 = require('./days/day8');
// import day9 = require('./days/day9');
// import day10 = require('./days/day10');
// import day11 = require('./days/day11');
// import day12 = require('./days/day12');
// import day13 = require('./days/day13');
// import day14 = require('./days/day14');
/*
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
    case 7:
      day7.q1();
      day7.q2();
      break;
    case 8:
      day8.q1();
      day8.q2();
      break;
    case 9:
      day9.q1();
      day9.q2();
      break;
    case 10:
      day10.q1();
      day10.q2();
      break;
    case 11:
      day11.q1();
      day11.q2();
      break;
      break;
    case 12:
      day12.q1();
      day12.q2();
      break;
      break;
    case 13:
      day13.q1();
      day13.q2();
      break;
      break;
    case 14:
      day14.q1();
      day14.q2();
      break;

    default:
      break;
  }
} catch (err) {
  console.error(err);
}
*/
