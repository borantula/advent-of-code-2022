"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImmediateNeighbors = exports.getNeighbors = exports.lcmArray = exports.lcm = exports.gcd = exports.multiply = exports.readFileContent = exports.calcAngleDegrees = exports.endTimer = exports.startTimer = exports.logger = exports.backToMatrixString = exports.parseToNumberMatrix = exports.parseToMatrix = exports.parseByEmptyLinesToArray = exports.parseLinesToArray = void 0;
const fs = require("fs/promises");
const path = require("path");
function parseLinesToArray(str) {
    return str.split('\n').filter((e) => e);
}
exports.parseLinesToArray = parseLinesToArray;
function parseByEmptyLinesToArray(str) {
    return str.split('\n\n').filter((e) => e);
}
exports.parseByEmptyLinesToArray = parseByEmptyLinesToArray;
function parseToMatrix(str) {
    return parseLinesToArray(str).map((e) => e.split(''));
}
exports.parseToMatrix = parseToMatrix;
function parseToNumberMatrix(str) {
    return parseLinesToArray(str).map((e) => e.split('').map(Number));
}
exports.parseToNumberMatrix = parseToNumberMatrix;
function backToMatrixString(m) {
    return m.map((row) => row.join('')).join('\n');
}
exports.backToMatrixString = backToMatrixString;
function logger(a) {
    console.log(a);
    return a;
}
exports.logger = logger;
function startTimer(a) {
    console.time('Timer test');
    return a;
}
exports.startTimer = startTimer;
function endTimer(a) {
    console.timeEnd('Timer test');
    return a;
}
exports.endTimer = endTimer;
// Greatest common devisor
// export function gcd(a: number, b: number) {
//   return !b ? a : gcd(b, a % b);
// }
function calcAngleDegrees(dx, dy) {
    return (Math.atan2(dy, dx) * 180) / Math.PI;
}
exports.calcAngleDegrees = calcAngleDegrees;
function readFileContent(fileName = 'testData.txt') {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield fs.readFile(path.join(__dirname, fileName));
        return file.toString();
    });
}
exports.readFileContent = readFileContent;
function multiply(numbers) {
    return numbers.reduce((t, c) => t * c, 1);
}
exports.multiply = multiply;
function gcd(a, b) {
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}
exports.gcd = gcd;
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}
exports.lcm = lcm;
function lcmArray(arr) {
    let currentLcm = arr[0];
    for (let i = 1; i < arr.length; i++) {
        currentLcm = lcm(currentLcm, arr[i]);
    }
    return currentLcm;
}
exports.lcmArray = lcmArray;
// function isEdge(matrix: Matrix, position: Position) {
//   const [x, y] = position;
//   const width = matrix[0].length - 1;
//   const height = matrix.length - 1;
//   return x === 0 || y === 0 || y === height || x === width;
// }
function getNeighbors(matrix, p) {
    const [x, y] = p;
    const val = (pos) => matrix[pos[1]][pos[0]];
    const neighbors = {
        t: [],
        b: [],
        l: [],
        r: [],
    };
    for (let i = y - 1; i >= 0; i--) {
        neighbors.t.push(val([x, i]));
    }
    for (let i = y + 1; i < matrix.length; i++) {
        neighbors.b.push(val([x, i]));
    }
    for (let i = x + 1; i < matrix[0].length; i++) {
        neighbors.r.push(val([i, y]));
    }
    for (let i = x - 1; i >= 0; i--) {
        neighbors.l.push(val([i, y]));
    }
    return neighbors;
}
exports.getNeighbors = getNeighbors;
function getImmediateNeighbors(matrix, p) {
    const [x, y] = p;
    const val = (pos) => matrix[pos[1]][pos[0]];
    const neighbors = {
        north: [],
        south: [],
        west: [],
        east: [],
    };
    // for (let i = y - 1; i >= 0; i--) {
    neighbors.north.push(val([x, y - 1]));
    // }
    neighbors.south.push(val([x, y + 1]));
    neighbors.east.push(val([x + 1, y]));
    neighbors.west.push(val([x - 1, y]));
    return neighbors;
}
exports.getImmediateNeighbors = getImmediateNeighbors;
