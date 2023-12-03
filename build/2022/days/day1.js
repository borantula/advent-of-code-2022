"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
const lodash_1 = require("lodash");
const utils = require("../../utils");
const day1_data_1 = require("./day1-data");
function q1() {
    const parsed = utils
        .parseByEmptyLinesToArray(day1_data_1.data)
        .map(utils.parseLinesToArray)
        .map((a) => (0, lodash_1.sum)(a.map(Number)));
    console.log('Q1', Math.max(...parsed));
}
exports.q1 = q1;
function q2() {
    const parsed = utils
        .parseByEmptyLinesToArray(day1_data_1.data)
        .map(utils.parseLinesToArray)
        .map((a) => (0, lodash_1.sum)(a.map(Number)));
    parsed.sort((a, b) => (a > b ? -1 : 1));
    console.log('Q2', (0, lodash_1.sum)((0, lodash_1.take)(parsed, 3)));
}
exports.q2 = q2;
