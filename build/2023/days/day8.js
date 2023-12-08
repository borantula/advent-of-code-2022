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
    return;
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
    return;
    console.time('Execution Time');
    const [dirArr, ...pathsArr] = (0, function_1.pipe)(day8_data_1.sampleData2, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')));
    const dir = dirArr[0].split('');
    const paths = pathsArr.map((p) => p.map((x) => x.replace(/[^1-9A-Z]/g, '')).filter((x) => x));
    const pathsObj = paths.reduce((t, c) => (Object.assign(Object.assign({}, t), { [c[0]]: { L: c[1], R: c[2] } })), {});
    const startingPoints = Object.keys(pathsObj).filter((a) => a[2] === 'A');
    console.log(startingPoints);
    function runToZet(point, dirIndexToStart) {
        let current = point;
        let currentDirIndex = dirIndexToStart;
        let steps = 0;
        const totalDirLength = dir.length;
        while (current[2] !== 'Z') {
            pathsObj;
            steps++;
            if (!pathsObj[current]) {
                throw `no key ${current}`;
            }
            const currentDir = dir[currentDirIndex];
            current = pathsObj[current][currentDir];
            currentDirIndex =
                totalDirLength > currentDirIndex + 1 ? currentDirIndex + 1 : 0;
            // if (currentDirIndex > 10) break;
        }
        return steps;
    }
    function runToZetBySteps(point, dirIndexToStart, stepsToRun = 1) {
        let current = point;
        let currentDirIndex = dirIndexToStart;
        let steps = 0;
        const totalDirLength = dir.length;
        while (steps < stepsToRun) {
            pathsObj;
            steps++;
            if (!pathsObj[current]) {
                throw `no key ${current}`;
            }
            const currentDir = dir[currentDirIndex];
            current = pathsObj[current][currentDir];
            currentDirIndex = (currentDirIndex + 1) % totalDirLength;
            // if (currentDirIndex > 10) break;
        }
        return current;
    }
    let sync = false;
    const steps = 0;
    let currentDirIndex = 0;
    const totalDirLength = dir.length;
    const [firstPoint, ...otherPoints] = startingPoints;
    // run the first until it reaches to a Z
    // then check the rest if all can reach to Z in same steps
    // if one fails continue...
    // console.log(runToZet(firstPoint, currentDirIndex));
    while (!sync) {
        const stepsRun = runToZet(firstPoint, currentDirIndex);
        console.log('stepsToRun', stepsToRun);
        break;
        // console.log((currentDirIndex + stepsRun) % totalDirLength);
        // currentDirIndex = (currentDirIndex + stepsRun) % totalDirLength;
        // sync = otherPoints.every((p) => {
        //   const reachedPoint = runToZetBySteps(p, currentDirIndex, stepsRun);
        //   return reachedPoint[2] === 'Z';
        //   // console.log(runToZetBySteps(startingPoints[1], currentDirIndex, stepsRun));
        // });
        console.log('passes', totalDirLength, stepsRun, sync, currentDirIndex);
        if (stepsRun > 7) {
            break;
        }
    }
    console.log('Q2', steps);
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
