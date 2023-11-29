"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
var function_1 = require("fp-ts/function");
var utils = require("../utils");
var day12_data_1 = require("./day12-data");
function q1() {
    var parsed = (0, function_1.pipe)(utils.parseLinesToArray(day12_data_1.sampleData));
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    var parsed = (0, function_1.pipe)(utils.parseLinesToArray(day12_data_1.sampleData));
    console.log('Q2', parsed);
}
exports.q2 = q2;
