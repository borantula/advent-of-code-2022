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
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/lib/function");
const lodash_1 = require("lodash");
const utils = require("../utils");
const day3_data_1 = require("./day3-data");
const firstLetterLower = 'a'.charCodeAt(0);
const firstLetterUpper = 'A'.charCodeAt(0);
function q1() {
    const parsed = (0, function_1.pipe)(day3_data_1.data, utils.parseLinesToArray, 
    // split to halfs
    ArrayFP.map((c) => [
        c.slice(0, c.length / 2),
        c.slice((-1 * c.length) / 2),
    ]), 
    // get common letters
    ArrayFP.map((compartments) => commonLetters(...compartments)), 
    // total of uniques
    ArrayFP.map((a) => getLetterValue(a.charAt(0))), lodash_1.sum);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    const parsed = (0, function_1.pipe)(day3_data_1.data, utils.parseLinesToArray, ArrayFP.chunksOf(3), ArrayFP.map((chunk) => commonLetters(chunk[2], commonLetters(chunk[0], chunk[1]))), ArrayFP.map((a) => getLetterValue(a.charAt(0))), lodash_1.sum);
    console.log('Q2', parsed);
}
exports.q2 = q2;
function isUppercase(letter) {
    return letter === letter.toUpperCase();
}
function getLetterValue(letter) {
    if (isUppercase(letter)) {
        return letter.charCodeAt(0) - firstLetterUpper + 27;
    }
    return letter.charCodeAt(0) - firstLetterLower + 1;
}
function commonLetters(str1, str2) {
    // Split the strings into arrays of characters
    const chars1 = str1.split('');
    const chars2 = str2.split('');
    // Use the filter() method to keep only the characters that are present in both arrays
    const commonChars = chars1.filter((char) => chars2.includes(char));
    // Use the join() method to combine the elements of the resulting array into a single string
    return commonChars.join('');
}
