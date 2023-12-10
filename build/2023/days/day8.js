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
const day8_data_1 = require("./day8-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
function q1() {
    console.time('Execution Time');
    const [dirArr, ...pathsArr] = (0, function_1.pipe)(day8_data_1.data, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')));
    const dir = dirArr[0].split('');
    const paths = pathsArr.map((p) => p.map((x) => x.replace(/[^1-9A-Z]/g, '')).filter((x) => x));
    const pathsObj = paths.reduce((t, c) => (Object.assign(Object.assign({}, t), { [c[0]]: { L: c[1], R: c[2] } })), {});
    let current = 'AAA';
    let currentDirIndex = 0;
    let steps = 0;
    const totalDirLength = dir.length;
    while (current !== 'ZZZ') {
        pathsObj;
        steps++;
        if (!pathsObj[current]) {
            throw `no key ${current}`;
        }
        const currentDir = dir[currentDirIndex];
        current = pathsObj[current][currentDir];
        currentDirIndex = (currentDirIndex + 1) % totalDirLength;
    }
    console.log('Q1', steps);
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() {
    console.time('Execution Time');
    const [dirArr, ...pathsArr] = (0, function_1.pipe)(day8_data_1.data, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')));
    const dir = dirArr[0].split('');
    const paths = pathsArr.map((p) => p.map((x) => x.replace(/[^1-9A-Z]/g, '')).filter((x) => x));
    const pathsObj = paths.reduce((t, c) => (Object.assign(Object.assign({}, t), { [c[0]]: { L: c[1], R: c[2] } })), {});
    const startingPoints = Object.keys(pathsObj).filter((a) => a[2] === 'A');
    function runToZetBySteps(point, dirIndexToStart) {
        let current = point;
        const currentDir = dir[dirIndexToStart];
        current = pathsObj[current][currentDir];
        return current;
    }
    let sync = false;
    let steps = 0;
    let currentDirIndex = 0;
    const totalDirLength = dir.length;
    let pointsToRun = startingPoints;
    const found = Array.from({ length: startingPoints.length }, () => 0);
    while (!sync) {
        pointsToRun = pointsToRun.map((p) => {
            // const c = pathsObj[p][currentDir];
            return runToZetBySteps(p, currentDirIndex);
        });
        pointsToRun.forEach((p, i) => {
            if (p[2] === 'Z' && found[i] === 0) {
                found[i] = steps + 1;
            }
        });
        sync = found.every((x) => x);
        currentDirIndex = (currentDirIndex + 1) % totalDirLength;
        steps++;
        if (sync) {
            break;
        }
        if (steps % 1000000 === 0) {
            console.log('Going on', steps, pointsToRun.filter((p) => p[2] === 'Z'));
        }
    }
    console.log('Q2', steps, found, utils.lcmArray(found));
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
