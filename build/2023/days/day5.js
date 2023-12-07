"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
const day5_data_1 = require("./day5-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
function findInGroup(n, groups) {
    for (let i = 0; i < groups.length; i++) {
        const [d, s, r] = groups[i];
        // out of bounds, don't bother
        if (n < s || s + r < n) {
            continue;
        }
        const ind = n - s;
        if (ind >= 0) {
            return d + ind;
        }
    }
    return n;
}
function q1() {
    return;
    console.time('Execution Time');
    const [seed, ...groups] = (0, function_1.pipe)(day5_data_1.data, utils.parseByEmptyLinesToArray);
    const seeds = seed.split(':')[1].trim().split(' ').map(Number);
    const groupMaps = groups.map((g) => (0, function_1.pipe)(g.split(':')[1], utils.parseLinesToArray, ArrayFP.map((a) => a.split(' ').map(Number))));
    const result = groupMaps.reduce((t, c) => {
        return t.map((a) => findInGroup(a, c));
    }, seeds);
    console.log('Q1', seeds, Math.min(...result));
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() {
    console.time('Execution Time');
    const [seed, ...groups] = (0, function_1.pipe)(day5_data_1.data, utils.parseByEmptyLinesToArray);
    const seeds = seed.split(':')[1].trim().split(' ').map(Number);
    const groupMaps = groups.map((g) => (0, function_1.pipe)(g.split(':')[1], utils.parseLinesToArray, ArrayFP.map((a) => a.split(' ').map(Number))));
    let seedChunks = (0, lodash_1.chunk)(seeds, 2);
    seedChunks = seedChunks.map(([s, r]) => [s, s + r - 1]);
    seedChunks.sort((a, b) => (a[0] > b[0] ? -1 : 1));
    console.log(seedChunks);
    const checkGroupMap = (seed) => groupMaps.reduce((t, c) => {
        return findInGroup(t, c);
    }, seed);
    const result = seedChunks.reduce((t, [start, end], ind) => {
        let lowest = t;
        console.log('Start group: ', ind);
        console.time(`Start group ${ind}`);
        for (let i = start; i < end; i++) {
            const found = checkGroupMap(i);
            if (found < lowest) {
                lowest = found;
                console.log('lowest', lowest);
            }
        }
        console.timeEnd(`Start group ${ind}`);
        return lowest;
    }, Infinity);
    console.log('Q2', result);
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
