"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
var lodash_1 = require("lodash");
var utils = require("../utils");
var day1_data_1 = require("./day1-data");
function q1() {
    var parsed = utils
        .parseByEmptyLinesToArray(day1_data_1.data)
        .map(utils.parseLinesToArray)
        .map(function (a) { return (0, lodash_1.sum)(a.map(Number)); });
    console.log('Q1', Math.max.apply(Math, parsed));
}
exports.q1 = q1;
function q2() {
    var parsed = utils
        .parseByEmptyLinesToArray(day1_data_1.data)
        .map(utils.parseLinesToArray)
        .map(function (a) { return (0, lodash_1.sum)(a.map(Number)); });
    parsed.sort(function (a, b) { return (a > b ? -1 : 1); });
    console.log('Q2', (0, lodash_1.sum)((0, lodash_1.take)(parsed, 3)));
}
exports.q2 = q2;
