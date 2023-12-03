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
const N = __importStar(require("fp-ts/number"));
const function_1 = require("fp-ts/function");
const utils = require("../utils");
const day11_data_1 = require("./day11-data");
const initMonkey = (rules) => {
    const items = rules[1]
        .replace('Starting items: ', '')
        .split(', ')
        .map(Number);
    return {
        items,
        inspectCount: 0,
        operation: rules[2].replace('Operation: ', ''),
        throwingRules: {
            test: (0, function_1.pipe)(rules[3], (a) => a.replace('Test: divisible by ', ''), (a) => Number(a)),
            onTrue: (0, function_1.pipe)(rules[4], (a) => a.replace('If true: throw to monkey', ''), (a) => Number(a.trim())),
            onFalse: (0, function_1.pipe)(rules[5], (a) => a.replace('If false: throw to monkey', ''), (a) => Number(a.trim())),
        },
    };
};
const runRounds = (round, until = 1) => {
    if (until === round.order) {
        return round;
    }
    const { monkeys } = round;
    for (let i = 0; i < monkeys.length; i++) {
        const monkey = monkeys[i];
        monkey.items
            .map((a) => {
            // eslint-disable-next-line prefer-const
            let valuenew = a;
            eval(`value${monkey.operation.replace(new RegExp('old', 'g'), String(a))}`);
            return Math.floor(valuenew / 3);
        })
            .forEach((a) => {
            if (a % monkey.throwingRules.test === 0) {
                monkeys[monkey.throwingRules.onTrue].items.push(a);
            }
            else {
                monkeys[monkey.throwingRules.onFalse].items.push(a);
            }
            monkeys[i].items.shift();
            monkeys[i].inspectCount++;
        });
    }
    const newRound = { order: round.order + 1, monkeys };
    return runRounds(newRound, until);
};
const runRounds2 = (round, until = 1, lcm = 1) => {
    const newRound = round;
    const { monkeys } = round;
    for (let r = 1; r <= until; r++) {
        for (let i = 0; i < monkeys.length; i++) {
            const monkey = monkeys[i];
            monkey.items
                .map((a) => {
                // eslint-disable-next-line prefer-const
                let valuenew = a;
                eval(`value${monkey.operation.replace(new RegExp('old', 'g'), String(a))}`);
                return valuenew;
            })
                .forEach((a) => {
                if (a % monkey.throwingRules.test === 0) {
                    monkeys[monkey.throwingRules.onTrue].items.push(a % lcm);
                }
                else {
                    monkeys[monkey.throwingRules.onFalse].items.push(a % lcm);
                }
                monkeys[i].items.shift();
                monkeys[i].inspectCount++;
            });
        }
        newRound.order = r;
        newRound.monkeys = round.monkeys;
    }
    return newRound;
};
const lcm = (monkeys) => monkeys.reduce((acc, cur) => acc * cur.throwingRules.test, 1);
const parseMonkeys = (data) => (0, function_1.pipe)(utils.parseLinesToArray(data), ArrayFP.chunksOf(6), ArrayFP.map(initMonkey));
function q1() {
    const RUNCOUNT = 20;
    const parsed = (0, function_1.pipe)(day11_data_1.data, parseMonkeys, (monkeys) => runRounds({ order: 0, monkeys }, RUNCOUNT), ({ monkeys }) => monkeys, ArrayFP.map(({ inspectCount }) => inspectCount), ArrayFP.sort(N.Ord), ArrayFP.reverse, (r) => r[0] * r[1]);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    const RUNCOUNT = 10000;
    const parsed = (0, function_1.pipe)(day11_data_1.data, parseMonkeys, (monkeys) => runRounds2({ order: 0, monkeys }, RUNCOUNT, lcm(monkeys)), ({ monkeys }) => monkeys, ArrayFP.map(({ inspectCount }) => inspectCount), ArrayFP.sort(N.Ord), ArrayFP.reverse, (r) => r[0] * r[1]);
    console.log('Q2', parsed);
}
exports.q2 = q2;
