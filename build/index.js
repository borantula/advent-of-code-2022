#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var minimist = require("minimist");
var argv = minimist(process.argv.slice(2));
console.log("DAY ".concat(argv.day));
var day1 = require("./days/day1");
var day2 = require("./days/day2");
var day3 = require("./days/day3");
var day4 = require("./days/day4");
var day5 = require("./days/day5");
var day6 = require("./days/day6");
var day7 = require("./days/day7");
var day8 = require("./days/day8");
var day9 = require("./days/day9");
var day10 = require("./days/day10");
var day11 = require("./days/day11");
var day12 = require("./days/day12");
var day13 = require("./days/day13");
var day14 = require("./days/day14");
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
}
catch (err) {
    console.error(err);
}
