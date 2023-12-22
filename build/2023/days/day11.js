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
const day11_data_1 = require("./day11-data");
const utils = __importStar(require("../../utils"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
function getAllCombinations(galaxies) {
    const combinations = [];
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            combinations.push([galaxies[i], galaxies[j]]);
        }
    }
    return combinations;
}
function solveTheDay(EXPANSION_RATE = 2) {
    const currentData = day11_data_1.data;
    const parsed = (0, function_1.pipe)(currentData, utils.parseToMatrix);
    const toExpand = {
        col: [],
        row: [],
    };
    const galaxies = [];
    parsed.forEach((row, y) => {
        row.forEach((val, x) => {
            if (val === '#') {
                galaxies.push([x, y]);
            }
        });
    });
    // check rows
    parsed.forEach((row, ind) => {
        if (row.every((x) => x === '.')) {
            toExpand.row.push(ind);
        }
    });
    // check cols
    parsed[0].forEach((_r, x) => {
        for (let y = 0; y < parsed.length; y++) {
            if (parsed[y][x] !== '.') {
                return;
            }
        }
        toExpand.col.push(x);
    });
    const updatedGalaxies = galaxies.map(([x, y]) => {
        const colsToAdd = toExpand.col.filter((c) => c < x).length;
        const rowsToAdd = toExpand.row.filter((r) => r < y).length;
        return [
            x + colsToAdd * (EXPANSION_RATE - 1),
            y + rowsToAdd * (EXPANSION_RATE - 1),
        ];
    });
    return getAllCombinations(updatedGalaxies).map(([[x1, y1], [x2, y2]]) => {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    });
}
function q1() {
    console.time('Execution Time');
    console.log('Q1', (0, lodash_1.sum)(solveTheDay(2)));
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() {
    console.time('Execution Time');
    console.log('Q1', (0, lodash_1.sum)(solveTheDay(1000000)));
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
