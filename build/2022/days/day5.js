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
const day5_data_1 = require("./day5-data");
/*
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3
*/
const parseCommands = (0, function_1.flow)(utils.parseLinesToArray, ArrayFP.map((a) => a
    .split(' ')
    .map(Number)
    .filter((x) => x)));
function getCratePosition(i) {
    return (i - 1) * 4 + 1;
}
function q1() {
    const parsed = utils.parseByEmptyLinesToArray(day5_data_1.data);
    const stacks = (0, function_1.pipe)(parsed[0], utils.parseLinesToArray);
    const lastLine = stacks.pop();
    if (!lastLine) {
        return;
    }
    const stackGroups = (0, function_1.pipe)(lastLine
        .split(' ')
        .map(Number)
        .filter((x) => x), ArrayFP.reduce({}, (a, b) => {
        return Object.assign(Object.assign({}, a), { [b]: [] });
    }));
    console.log(stackGroups, stacks);
    Object.keys(stackGroups).forEach((sg) => {
        stacks.map((s) => {
            const p = getCratePosition(Number(sg));
            if (s[p].trim()) {
                stackGroups[sg].push(s[p]);
            }
        });
    });
    // move [0] from [1] to [2]
    const commands = parseCommands(parsed[1]);
    commands.forEach(([move, from, to]) => {
        const toMove = stackGroups[String(from)].splice(0, move);
        stackGroups[String(to)] = [...toMove.reverse(), ...stackGroups[String(to)]];
    });
    console.log('Q1', Object.values(stackGroups)
        .map((a) => a[0])
        .join(''));
}
exports.q1 = q1;
function q2() {
    const parsed = utils.parseByEmptyLinesToArray(day5_data_1.data);
    const stacks = (0, function_1.pipe)(parsed[0], utils.parseLinesToArray);
    const lastLine = stacks.pop();
    if (!lastLine) {
        return;
    }
    const stackGroups = (0, function_1.pipe)(lastLine
        .split(' ')
        .map(Number)
        .filter((x) => x), ArrayFP.reduce({}, (a, b) => {
        return Object.assign(Object.assign({}, a), { [b]: [] });
    }));
    console.log(stackGroups, stacks);
    Object.keys(stackGroups).forEach((sg) => {
        stacks.map((s) => {
            const p = getCratePosition(Number(sg));
            if (s[p].trim()) {
                stackGroups[sg].push(s[p]);
            }
        });
    });
    // move [0] from [1] to [2]
    const commands = parseCommands(parsed[1]);
    commands.forEach(([move, from, to]) => {
        const toMove = stackGroups[String(from)].splice(0, move);
        stackGroups[String(to)] = [...toMove, ...stackGroups[String(to)]];
    });
    console.log('Q2', Object.values(stackGroups)
        .map((a) => a[0])
        .join(''));
}
exports.q2 = q2;
