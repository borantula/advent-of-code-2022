"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
var ArrayFP = __importStar(require("fp-ts/Array"));
var function_1 = require("fp-ts/function");
var utils = require("../utils");
var lodash_1 = require("lodash");
var day10_data_1 = require("./day10-data");
function getCycles(cmds) {
    var startingCycle = { cycle: 0, value: 1, strength: 0, cmd: '' };
    return (0, function_1.pipe)(cmds, ArrayFP.reduce([], function (acc, cmd) {
        var lastCycle = !acc.length
            ? startingCycle
            : acc[acc.length - 1];
        var cycleNo = lastCycle.cycle + 1;
        if (cmd === 'noop') {
            return __spreadArray(__spreadArray([], acc, true), [
                __assign(__assign({}, lastCycle), { cycle: cycleNo, strength: lastCycle.value * cycleNo, cmd: cmd }),
            ], false);
        }
        var cmdValue = parseInt(cmd.replace('addx ', ''));
        return __spreadArray(__spreadArray([], acc, true), [
            __assign(__assign({}, lastCycle), { cycle: lastCycle.cycle + 1, strength: (lastCycle.cycle + 1) * lastCycle.value, cmd: cmd }),
            __assign(__assign({}, lastCycle), { cycle: lastCycle.cycle + 2, value: lastCycle.value + cmdValue, strength: (lastCycle.cycle + 2) * lastCycle.value, cmd: cmd }),
        ], false);
    }));
}
function getLines(cycles) {
    var LIT = '#';
    var DARK = '.';
    return cycles.map(function (groups) {
        var spritePosition = 0;
        var line = groups.reduce(function (acc, _a, col) {
            var value = _a.value;
            var spritePositions = [
                spritePosition,
                spritePosition + 1,
                spritePosition + 2,
            ];
            // update sprite position at the end
            spritePosition = value - 1;
            return "".concat(acc).concat(spritePositions.includes(col) ? LIT : DARK);
        }, '');
        return line;
    });
}
function q1() {
    var significantCycles = [20, 60, 100, 140, 180, 220];
    var parsed = (0, function_1.pipe)(utils.parseLinesToArray(day10_data_1.data), getCycles, ArrayFP.filter(function (a) { return significantCycles.includes(a.cycle); }), 
    // utils.logger,
    function (a) { return (0, lodash_1.sumBy)(a, function (c) { return c.strength; }); });
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    var parsed = (0, function_1.pipe)(utils.parseLinesToArray(day10_data_1.data), getCycles, ArrayFP.chunksOf(40), getLines);
    console.log('Q2', parsed);
}
exports.q2 = q2;
