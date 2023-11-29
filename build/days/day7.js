"use strict";
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
var function_1 = require("fp-ts/function");
var utils = require("../utils");
var day7_data_1 = require("./day7-data");
var lodash_1 = require("lodash");
function makeDir(openDir, dir) {
    return [openDir, dir].join('-');
}
var Q1_MAX = 100000;
var TOTAL_SPACE = 70000000;
var UPGRADE_SPACE = 30000000;
function loopCommands(cmds) {
    var mapped = {};
    var openDir = [];
    function dir() {
        return openDir.join('-');
    }
    cmds.forEach(function (cmd) {
        var s = cmd.split(' ');
        switch (s[0]) {
            case 'dir':
                mapped[dir()].push(makeDir(dir(), s[1]));
                break;
            case '$':
                if (s[1] === 'cd') {
                    if (s[2] === '..') {
                        // find parent and set as current
                        openDir.pop();
                    }
                    else {
                        openDir.push(s[2]);
                        if (!mapped[dir()]) {
                            mapped[dir()] = [];
                        }
                    }
                }
                break;
            default:
                mapped[dir()].push(Number(s[0]));
                break;
        }
    });
    var dirRef = true;
    while (dirRef) {
        for (var iterator in mapped) {
            var current = mapped[iterator];
            var newOne = current.reduce(function (acc, a) {
                if ((0, lodash_1.isString)(a)) {
                    if (mapped[a] && mapped[a]) {
                        return __spreadArray(__spreadArray([], acc, true), mapped[a], true);
                    }
                }
                return __spreadArray(__spreadArray([], acc, true), [a], false);
            }, []);
            mapped[iterator] = newOne;
        }
        dirRef = hasDirRef(mapped);
    }
    var sizeMap = {};
    Object.keys(mapped).forEach(function (a) { return (sizeMap[a] = (0, lodash_1.sum)(mapped[a])); });
    var neededSpace = UPGRADE_SPACE - (TOTAL_SPACE - sizeMap['/']);
    var filtered = Object.keys(sizeMap).filter(function (k) { return sizeMap[k] > neededSpace; });
    for (var key in sizeMap) {
        if (!filtered.includes(key)) {
            delete sizeMap[key];
        }
    }
    console.log('Q2', Math.min.apply(Math, Object.values(sizeMap)));
    return Object.values(mapped).reduce(function (total, a) {
        if ((0, lodash_1.sum)(a) < Q1_MAX) {
            total += (0, lodash_1.sum)(a);
        }
        return total;
    }, 0);
}
function hasDirRef(mapped) {
    for (var iterator in mapped) {
        if (mapped[iterator].find(function (x) { return (0, lodash_1.isString)(x); })) {
            return true;
        }
    }
    return false;
}
function q1() {
    var parsed = (0, function_1.pipe)(utils.parseLinesToArray(day7_data_1.data), loopCommands);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    console.log('Q2');
}
exports.q2 = q2;
