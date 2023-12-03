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
const lodash_1 = require("lodash");
const day1_data_1 = require("./day1-data");
const utils = __importStar(require("../../utils"));
function q1() {
    const parsed = utils
        .parseLinesToArray(day1_data_1.data)
        .map((a) => a.match(/\d+/g) || [])
        .map((a) => a.join('').split('').map(Number))
        .map((a) => a[0] * 10 + a[(a === null || a === void 0 ? void 0 : a.length) - 1]);
    console.log('Q1', (0, lodash_1.sum)(parsed));
}
exports.q1 = q1;
function q2() {
    const convertNumbers = (str) => {
        const wordsToDigits = {
            one: '1',
            two: '2',
            three: '3',
            four: '4',
            five: '5',
            six: '6',
            seven: '7',
            eight: '8',
            nine: '9',
        };
        const matches = [];
        const regex = /(?=([1-9]|one|two|three|four|five|six|seven|eight|nine))/g;
        [...str.matchAll(regex)].forEach((m) => matches.push(wordsToDigits[m[1]] || m[1]));
        return matches.join('');
    };
    const parsed = utils
        .parseLinesToArray(day1_data_1.data)
        .map(convertNumbers)
        .map((a) => a.match(/\d+/g) || [])
        .map((a) => a.join('').split('').map(Number))
        .map((a) => a[0] * 10 + a[(a === null || a === void 0 ? void 0 : a.length) - 1]);
    console.log('Q2', (0, lodash_1.sum)(parsed));
}
exports.q2 = q2;
