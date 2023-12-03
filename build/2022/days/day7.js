"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
const function_1 = require("fp-ts/function");
const utils = require("../utils");
const day7_data_1 = require("./day7-data");
const lodash_1 = require("lodash");
function makeDir(openDir, dir) {
    return [openDir, dir].join('-');
}
const Q1_MAX = 100000;
const TOTAL_SPACE = 70000000;
const UPGRADE_SPACE = 30000000;
function loopCommands(cmds) {
    const mapped = {};
    const openDir = [];
    function dir() {
        return openDir.join('-');
    }
    cmds.forEach((cmd) => {
        const s = cmd.split(' ');
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
    let dirRef = true;
    while (dirRef) {
        for (const iterator in mapped) {
            const current = mapped[iterator];
            const newOne = current.reduce((acc, a) => {
                if ((0, lodash_1.isString)(a)) {
                    if (mapped[a] && mapped[a]) {
                        return [...acc, ...mapped[a]];
                    }
                }
                return [...acc, a];
            }, []);
            mapped[iterator] = newOne;
        }
        dirRef = hasDirRef(mapped);
    }
    const sizeMap = {};
    Object.keys(mapped).forEach((a) => (sizeMap[a] = (0, lodash_1.sum)(mapped[a])));
    const neededSpace = UPGRADE_SPACE - (TOTAL_SPACE - sizeMap['/']);
    const filtered = Object.keys(sizeMap).filter((k) => sizeMap[k] > neededSpace);
    for (const key in sizeMap) {
        if (!filtered.includes(key)) {
            delete sizeMap[key];
        }
    }
    console.log('Q2', Math.min(...Object.values(sizeMap)));
    return Object.values(mapped).reduce((total, a) => {
        if ((0, lodash_1.sum)(a) < Q1_MAX) {
            total += (0, lodash_1.sum)(a);
        }
        return total;
    }, 0);
}
function hasDirRef(mapped) {
    for (const iterator in mapped) {
        if (mapped[iterator].find((x) => (0, lodash_1.isString)(x))) {
            return true;
        }
    }
    return false;
}
function q1() {
    const parsed = (0, function_1.pipe)(utils.parseLinesToArray(day7_data_1.data), loopCommands);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    console.log('Q2');
}
exports.q2 = q2;
