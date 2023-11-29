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
var ArrayFP = __importStar(require("fp-ts/Array"));
var N = __importStar(require("fp-ts/number"));
var function_1 = require("fp-ts/function");
var utils = require("../utils");
var day11_data_1 = require("./day11-data");
var initMonkey = function (rules) {
    var items = rules[1]
        .replace('Starting items: ', '')
        .split(', ')
        .map(Number);
    return {
        items: items,
        inspectCount: 0,
        operation: rules[2].replace('Operation: ', ''),
        throwingRules: {
            test: (0, function_1.pipe)(rules[3], function (a) { return a.replace('Test: divisible by ', ''); }, function (a) { return Number(a); }),
            onTrue: (0, function_1.pipe)(rules[4], function (a) { return a.replace('If true: throw to monkey', ''); }, function (a) { return Number(a.trim()); }),
            onFalse: (0, function_1.pipe)(rules[5], function (a) { return a.replace('If false: throw to monkey', ''); }, function (a) { return Number(a.trim()); }),
        },
    };
};
var runRounds = function (round, until) {
    if (until === void 0) { until = 1; }
    if (until === round.order) {
        return round;
    }
    var monkeys = round.monkeys;
    var _loop_1 = function (i) {
        var monkey = monkeys[i];
        monkey.items
            .map(function (a) {
            // eslint-disable-next-line prefer-const
            var valuenew = a;
            eval("value".concat(monkey.operation.replace(new RegExp('old', 'g'), String(a))));
            return Math.floor(valuenew / 3);
        })
            .forEach(function (a) {
            if (a % monkey.throwingRules.test === 0) {
                monkeys[monkey.throwingRules.onTrue].items.push(a);
            }
            else {
                monkeys[monkey.throwingRules.onFalse].items.push(a);
            }
            monkeys[i].items.shift();
            monkeys[i].inspectCount++;
        });
    };
    for (var i = 0; i < monkeys.length; i++) {
        _loop_1(i);
    }
    var newRound = { order: round.order + 1, monkeys: monkeys };
    return runRounds(newRound, until);
};
var runRounds2 = function (round, until, lcm) {
    if (until === void 0) { until = 1; }
    if (lcm === void 0) { lcm = 1; }
    var newRound = round;
    var monkeys = round.monkeys;
    for (var r = 1; r <= until; r++) {
        var _loop_2 = function (i) {
            var monkey = monkeys[i];
            monkey.items
                .map(function (a) {
                // eslint-disable-next-line prefer-const
                var valuenew = a;
                eval("value".concat(monkey.operation.replace(new RegExp('old', 'g'), String(a))));
                return valuenew;
            })
                .forEach(function (a) {
                if (a % monkey.throwingRules.test === 0) {
                    monkeys[monkey.throwingRules.onTrue].items.push(a % lcm);
                }
                else {
                    monkeys[monkey.throwingRules.onFalse].items.push(a % lcm);
                }
                monkeys[i].items.shift();
                monkeys[i].inspectCount++;
            });
        };
        for (var i = 0; i < monkeys.length; i++) {
            _loop_2(i);
        }
        newRound.order = r;
        newRound.monkeys = round.monkeys;
    }
    return newRound;
};
var lcm = function (monkeys) {
    return monkeys.reduce(function (acc, cur) { return acc * cur.throwingRules.test; }, 1);
};
var parseMonkeys = function (data) {
    return (0, function_1.pipe)(utils.parseLinesToArray(data), ArrayFP.chunksOf(6), ArrayFP.map(initMonkey));
};
function q1() {
    var RUNCOUNT = 20;
    var parsed = (0, function_1.pipe)(day11_data_1.data, parseMonkeys, function (monkeys) { return runRounds({ order: 0, monkeys: monkeys }, RUNCOUNT); }, function (_a) {
        var monkeys = _a.monkeys;
        return monkeys;
    }, ArrayFP.map(function (_a) {
        var inspectCount = _a.inspectCount;
        return inspectCount;
    }), ArrayFP.sort(N.Ord), ArrayFP.reverse, function (r) { return r[0] * r[1]; });
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    var RUNCOUNT = 10000;
    var parsed = (0, function_1.pipe)(day11_data_1.data, parseMonkeys, function (monkeys) { return runRounds2({ order: 0, monkeys: monkeys }, RUNCOUNT, lcm(monkeys)); }, function (_a) {
        var monkeys = _a.monkeys;
        return monkeys;
    }, ArrayFP.map(function (_a) {
        var inspectCount = _a.inspectCount;
        return inspectCount;
    }), ArrayFP.sort(N.Ord), ArrayFP.reverse, function (r) { return r[0] * r[1]; });
    console.log('Q2', parsed);
}
exports.q2 = q2;
