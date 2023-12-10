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
const day9_data_1 = require("./day9-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
function processLine(item) {
    let allZero = false;
    const processed = [item];
    while (!allZero) {
        const last = processed[processed.length - 1];
        const result = last.reduce((t, c, i, arr) => {
            if (i === 0) {
                return t;
            }
            const prev = arr[i - 1];
            const diff = Number(c) - prev;
            return [...t, diff];
        }, []);
        processed.push(result);
        if (result.every((x) => x === 0)) {
            allZero = true;
        }
    }
    const total = processed.map((x) => (0, lodash_1.last)(x));
    return (0, lodash_1.sum)(total);
}
function processLineQ2(item) {
    let allZero = false;
    const processed = [item];
    while (!allZero) {
        const last = processed[processed.length - 1];
        const result = last.reduce((t, c, i, arr) => {
            if (i === 0) {
                return t;
            }
            const prev = arr[i - 1];
            const diff = Number(c) - prev;
            return [...t, diff];
        }, []);
        processed.push(result);
        if (result.every((x) => x === 0)) {
            allZero = true;
        }
    }
    const total = processed
        .map((x) => x[0])
        .map((x, i) => {
        return i % 2 ? -1 * x : x;
    });
    return (0, lodash_1.sum)(total);
}
function q1() {
    console.time('Execution Time');
    const parsed = (0, function_1.pipe)(day9_data_1.data, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')), ArrayFP.map((x) => x.map(Number)));
    const totals = parsed.map(processLine);
    console.log('Q1', (0, lodash_1.sum)(totals));
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() {
    console.time('Execution Time');
    const parsed = (0, function_1.pipe)(day9_data_1.data, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')), ArrayFP.map((x) => x.map(Number)));
    const totals = parsed.map(processLineQ2);
    console.log('Q2', (0, lodash_1.sum)(totals));
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
