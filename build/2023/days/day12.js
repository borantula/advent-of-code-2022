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
const day12_data_1 = require("./day12-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
function generateCombinations(pattern) {
    if (!pattern.includes('?')) {
        return [pattern];
    }
    // Find the index of the first '?' in the string
    const index = pattern.indexOf('?');
    // Replace '?' with '.' and '#' and recursively process the rest of the string.
    const dotPattern = pattern.substring(0, index) + '.' + pattern.substring(index + 1);
    const hashPattern = pattern.substring(0, index) + '#' + pattern.substring(index + 1);
    // Recursively generate combinations for the two new patterns and concatenate the results.
    return generateCombinations(dotPattern).concat(generateCombinations(hashPattern));
}
const patternCache = {};
const cacheKey = (row, pattern) => `${row}-${pattern.join('-')}`;
const genComb = (0, lodash_1.memoize)(generateCombinations);
function checkRow(row, pattern) {
    const combinations = genComb(row);
    const result = (0, function_1.pipe)(combinations, 
    // utils.logger,
    ArrayFP.map((c) => c
        .split('.')
        .filter((x) => x)
        .map((x) => x.length)), 
    // only get the matching patterns
    ArrayFP.map((x) => (0, lodash_1.isEqual)(x, pattern)), ArrayFP.filter((x) => !!x));
    return result;
}
// console.log(checkRow('???.###', [1, 1, 3]));
// console.log(checkRow('.??..??...?##.', [1, 1, 3]));
// console.log(checkRow('?###????????', [3, 2, 1]));
console.time('Execution Time');
// console.log(checkRow(unfoldTheRow('???.###'), unfoldThePattern([1, 1, 3])));
// console.log(checkRow('.??..??...?##.?', [1, 1, 3]));
// console.log(checkRow('????.#...#...?', [4, 1, 1]));
// console.log(checkRow('????.######..#####.?', [1, 6, 5]));
// console.log(checkRow('?###?????????', [3, 2, 1]));
// console.log(checkRow('?#?#?##?#???.?.?????', [9, 2, 1, 1, 1]));
// console.log(checkRow('??#?#?##?#???.?.??????', [9, 2, 1, 1, 1]));
console.timeEnd('Execution Time');
function q1() {
    return;
    console.time('Execution Time');
    const parsed = (0, function_1.pipe)(day12_data_1.sampleData, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')), ArrayFP.map(([str, patternStr]) => {
        const pattern = patternStr.split(',').map(Number);
        return checkRow(str, pattern).length;
    }));
    console.log('Q1', (0, lodash_1.sum)(parsed));
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() {
    // return;
    console.time('Execution Time');
    const parsed = (0, function_1.pipe)(day12_data_1.sampleData, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')), ArrayFP.map(([str, patternStr]) => {
        const pattern = patternStr.split(',').map(Number);
        const original = checkRow(str, pattern).length;
        const withQuestionMark = checkRow(`${str}?${str}?${str}?${str}?${str}`, [
            ...pattern,
            ...pattern,
            ...pattern,
            ...pattern,
            ...pattern,
        ]).length;
        console.log(original, withQuestionMark);
        return original;
        // if (original === 1) {
        //   const firstChars = `?{str}`
        //     .substring(0, pattern[0])
        //     .split('')
        //     .every((x) => x === '?');
        //   if (firstChars) {
        //     return original;
        //   }
        // }
        const withQuestionMark2 = checkRow(`?${str}?`, pattern).length;
        const withQuestionMark3 = checkRow(`${str}?${str}?${str}`, [
            ...pattern,
            ...pattern,
            ...pattern,
        ]).length;
        const withQuestionMark4 = checkRow(`${str}?${str}?${str}?${str}`, [
            ...pattern,
            ...pattern,
            ...pattern,
            ...pattern,
        ]).length;
        console.log(str, `${str.split('').reverse()[0]}${str}?${str}`, patternStr, original, 
        // withQuestionMark,
        '?', withQuestionMark2, withQuestionMark3, withQuestionMark4);
        return (original *
            withQuestionMark2 *
            withQuestionMark2 *
            withQuestionMark2 *
            withQuestionMark2);
    }));
    console.log('Q2', (0, lodash_1.sum)(parsed));
    console.log('Q2', parsed);
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
