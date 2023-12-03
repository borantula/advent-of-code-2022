"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
const lodash_1 = require("lodash");
const utils = require("../utils");
const day2_data_1 = require("./day2-data");
const LOST = 0;
const DRAW = 3;
const WIN = 6;
const R = 1;
const P = 2;
const S = 3;
function q1() {
    const results = {
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
    const choice = {
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
    const parsed = utils
        .parseLinesToArray(day2_data_1.data)
        .map((a) => a.replace(' ', ''))
        .map((a) => {
        return choice[a] + results[a];
    });
    console.log('Q1', (0, lodash_1.sum)(parsed));
}
exports.q1 = q1;
function q2() {
    const results = {
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
    const parsed = utils
        .parseLinesToArray(day2_data_1.data)
        .map((a) => a.replace(' ', ''))
        .map((a) => {
        return results[a];
    });
    console.log('Q2', (0, lodash_1.sum)(parsed));
}
exports.q2 = q2;
