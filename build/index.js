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
            day4.q1();
            day4.q2();
            break;
        default:
            break;
    }
}
catch (err) {
    console.error(err);
}
