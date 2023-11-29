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
var day5_data_1 = require("./day5-data");
/*
    [D]
[N] [C]
[Z] [M] [P]
 1   2   3
*/
var parseCommands = (0, function_1.flow)(utils.parseLinesToArray, ArrayFP.map(function (a) {
    return a
        .split(' ')
        .map(Number)
        .filter(function (x) { return x; });
}));
function getCratePosition(i) {
    return (i - 1) * 4 + 1;
}
function q1() {
    var parsed = utils.parseByEmptyLinesToArray(day5_data_1.data);
    var stacks = (0, function_1.pipe)(parsed[0], utils.parseLinesToArray);
    var lastLine = stacks.pop();
    if (!lastLine) {
        return;
    }
    var stackGroups = (0, function_1.pipe)(lastLine
        .split(' ')
        .map(Number)
        .filter(function (x) { return x; }), ArrayFP.reduce({}, function (a, b) {
        var _a;
        return __assign(__assign({}, a), (_a = {}, _a[b] = [], _a));
    }));
    console.log(stackGroups, stacks);
    Object.keys(stackGroups).forEach(function (sg) {
        stacks.map(function (s) {
            var p = getCratePosition(Number(sg));
            if (s[p].trim()) {
                stackGroups[sg].push(s[p]);
            }
        });
    });
    // move [0] from [1] to [2]
    var commands = parseCommands(parsed[1]);
    commands.forEach(function (_a) {
        var move = _a[0], from = _a[1], to = _a[2];
        var toMove = stackGroups[String(from)].splice(0, move);
        stackGroups[String(to)] = __spreadArray(__spreadArray([], toMove.reverse(), true), stackGroups[String(to)], true);
    });
    console.log('Q1', Object.values(stackGroups)
        .map(function (a) { return a[0]; })
        .join(''));
}
exports.q1 = q1;
function q2() {
    var parsed = utils.parseByEmptyLinesToArray(day5_data_1.data);
    var stacks = (0, function_1.pipe)(parsed[0], utils.parseLinesToArray);
    var lastLine = stacks.pop();
    if (!lastLine) {
        return;
    }
    var stackGroups = (0, function_1.pipe)(lastLine
        .split(' ')
        .map(Number)
        .filter(function (x) { return x; }), ArrayFP.reduce({}, function (a, b) {
        var _a;
        return __assign(__assign({}, a), (_a = {}, _a[b] = [], _a));
    }));
    console.log(stackGroups, stacks);
    Object.keys(stackGroups).forEach(function (sg) {
        stacks.map(function (s) {
            var p = getCratePosition(Number(sg));
            if (s[p].trim()) {
                stackGroups[sg].push(s[p]);
            }
        });
    });
    // move [0] from [1] to [2]
    var commands = parseCommands(parsed[1]);
    commands.forEach(function (_a) {
        var move = _a[0], from = _a[1], to = _a[2];
        var toMove = stackGroups[String(from)].splice(0, move);
        stackGroups[String(to)] = __spreadArray(__spreadArray([], toMove, true), stackGroups[String(to)], true);
    });
    console.log('Q2', Object.values(stackGroups)
        .map(function (a) { return a[0]; })
        .join(''));
}
exports.q2 = q2;
