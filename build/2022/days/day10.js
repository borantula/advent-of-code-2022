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
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const utils = require("../utils");
const lodash_1 = require("lodash");
const day10_data_1 = require("./day10-data");
function getCycles(cmds) {
    const startingCycle = { cycle: 0, value: 1, strength: 0, cmd: '' };
    return (0, function_1.pipe)(cmds, ArrayFP.reduce([], (acc, cmd) => {
        const lastCycle = !acc.length
            ? startingCycle
            : acc[acc.length - 1];
        const cycleNo = lastCycle.cycle + 1;
        if (cmd === 'noop') {
            return [
                ...acc,
                Object.assign(Object.assign({}, lastCycle), { cycle: cycleNo, strength: lastCycle.value * cycleNo, cmd }),
            ];
        }
        const cmdValue = parseInt(cmd.replace('addx ', ''));
        return [
            ...acc,
            Object.assign(Object.assign({}, lastCycle), { cycle: lastCycle.cycle + 1, strength: (lastCycle.cycle + 1) * lastCycle.value, cmd }),
            Object.assign(Object.assign({}, lastCycle), { cycle: lastCycle.cycle + 2, value: lastCycle.value + cmdValue, strength: (lastCycle.cycle + 2) * lastCycle.value, cmd }),
        ];
    }));
}
function getLines(cycles) {
    const LIT = '#';
    const DARK = '.';
    return cycles.map((groups) => {
        let spritePosition = 0;
        const line = groups.reduce((acc, { value }, col) => {
            const spritePositions = [
                spritePosition,
                spritePosition + 1,
                spritePosition + 2,
            ];
            // update sprite position at the end
            spritePosition = value - 1;
            return `${acc}${spritePositions.includes(col) ? LIT : DARK}`;
        }, '');
        return line;
    });
}
function q1() {
    const significantCycles = [20, 60, 100, 140, 180, 220];
    const parsed = (0, function_1.pipe)(utils.parseLinesToArray(day10_data_1.data), getCycles, ArrayFP.filter((a) => significantCycles.includes(a.cycle)), 
    // utils.logger,
    (a) => (0, lodash_1.sumBy)(a, (c) => c.strength));
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    const parsed = (0, function_1.pipe)(utils.parseLinesToArray(day10_data_1.data), getCycles, ArrayFP.chunksOf(40), getLines);
    console.log('Q2', parsed);
}
exports.q2 = q2;
