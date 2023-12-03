"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
const function_1 = require("fp-ts/function");
const utils = require("../utils");
const day13_data_1 = require("./day13-data");
function q1() {
    const parsed = (0, function_1.pipe)(utils.parseLinesToArray(day13_data_1.sampleData));
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    const parsed = (0, function_1.pipe)(utils.parseLinesToArray(day13_data_1.sampleData));
    console.log('Q2', parsed);
}
exports.q2 = q2;
