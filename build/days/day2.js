"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
var lodash_1 = require("lodash");
var utils = require("../utils");
var day2_data_1 = require("./day2-data");
var LOST = 0;
var DRAW = 3;
var WIN = 6;
var R = 1;
var P = 2;
var S = 3;
function q1() {
    var results = {
        AX: DRAW,
        AY: WIN,
        AZ: LOST,
        BX: LOST,
        BY: DRAW,
        BZ: WIN,
        CX: WIN,
        CY: LOST,
        CZ: DRAW,
    };
    var choice = {
        AX: R,
        AY: P,
        AZ: S,
        BX: R,
        BY: P,
        BZ: S,
        CX: R,
        CY: P,
        CZ: S,
    };
    var parsed = utils
        .parseLinesToArray(day2_data_1.data)
        .map(function (a) { return a.replace(' ', ''); })
        .map(function (a) {
        return choice[a] + results[a];
    });
    console.log('Q1', (0, lodash_1.sum)(parsed));
}
exports.q1 = q1;
function q2() {
    var results = {
        AX: LOST + S,
        AY: DRAW + R,
        AZ: WIN + P,
        BX: LOST + R,
        BY: DRAW + P,
        BZ: WIN + S,
        CX: LOST + P,
        CY: DRAW + S,
        CZ: WIN + R,
    };
    var parsed = utils
        .parseLinesToArray(day2_data_1.data)
        .map(function (a) { return a.replace(' ', ''); })
        .map(function (a) {
        return results[a];
    });
    console.log('Q2', (0, lodash_1.sum)(parsed));
}
exports.q2 = q2;
