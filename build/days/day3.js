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
var ArrayFP = __importStar(require("fp-ts/Array"));
var function_1 = require("fp-ts/lib/function");
var lodash_1 = require("lodash");
var utils = require("../utils");
var day3_data_1 = require("./day3-data");
var firstLetterLower = 'a'.charCodeAt(0);
var firstLetterUpper = 'A'.charCodeAt(0);
function q1() {
    var parsed = (0, function_1.pipe)(day3_data_1.data, utils.parseLinesToArray, 
    // split to halfs
    ArrayFP.map(function (c) { return [
        c.slice(0, c.length / 2),
        c.slice((-1 * c.length) / 2),
    ]; }), 
    // get common letters
    ArrayFP.map(function (compartments) { return commonLetters.apply(void 0, compartments); }), 
    // total of uniques
    ArrayFP.map(function (a) { return getLetterValue(a.charAt(0)); }), lodash_1.sum);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    var parsed = (0, function_1.pipe)(day3_data_1.data, utils.parseLinesToArray, ArrayFP.chunksOf(3), ArrayFP.map(function (chunk) {
        return commonLetters(chunk[2], commonLetters(chunk[0], chunk[1]));
    }), ArrayFP.map(function (a) { return getLetterValue(a.charAt(0)); }), lodash_1.sum);
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
    var chars1 = str1.split('');
    var chars2 = str2.split('');
    // Use the filter() method to keep only the characters that are present in both arrays
    var commonChars = chars1.filter(function (char) { return chars2.includes(char); });
    // Use the join() method to combine the elements of the resulting array into a single string
    return commonChars.join('');
}
