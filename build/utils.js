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
exports.readFileContent = exports.calcAngleDegrees = exports.logger = exports.backToMatrixString = exports.parseToNumberMatrix = exports.parseToMatrix = exports.parseByEmptyLinesToArray = exports.parseLinesToArray = void 0;
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
