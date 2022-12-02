"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
var utils = require("../utils");
var day2_data_1 = require("./day2-data");
var LOST = 0;
var DRAW = 3;
var WIN = 6;
// R P S
// A B C
// X Y Z
var results = {
    AX: 4,
    AY: 2,
    AZ: 3,
    BX: 0,
    BY: 2,
    BZ: 3,
    CX: 0,
    CY: 2,
    CZ: 3,
};
function q1() {
    var parsed = utils.parseLinesToArray(day2_data_1.sampleData);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() { }
exports.q2 = q2;
