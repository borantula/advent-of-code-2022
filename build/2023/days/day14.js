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
const day14_data_1 = require("./day14-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
function q1() {
    return;
    console.time('Execution Time');
    const getColumnOrdered = (rows, ind) => rows
        .map((x) => x.charAt(ind))
        .join('')
        .split('#')
        .map((x) => {
        // it'll sort . first 0 second so we reverse
        const splitted = x.split('').sort().reverse();
        return splitted.join('');
    })
        .join('#');
    const rowScores = (col) => col
        .split('')
        .reverse()
        .map((c, ind) => {
        return c === 'O' ? ind + 1 : 0;
    });
    const parsed = (0, function_1.pipe)(day14_data_1.data, utils.parseLinesToArray);
    const orderedColumns = parsed.map((_x, i) => getColumnOrdered(parsed, i));
    const res = orderedColumns.map(rowScores).map(lodash_1.sum);
    console.log('Q1', parsed, orderedColumns, res, (0, lodash_1.sum)(res));
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
// 90 degrees
function rotateMatrix(matrix, cw = true) {
    // Transpose the matrix
    for (let i = 0; i < matrix.length; i++) {
        for (let j = i; j < matrix[0].length; j++) {
            // Swap elements
            const temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    // Reverse each row
    if (!cw) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i].reverse();
        }
    }
    return matrix;
}
// north -> col reverse sort
// north -> col sort
// west -> row reverse sort
// east -> row sort
const rowScores = (col) => col
    .split('')
    .reverse()
    .map((c, ind) => {
    const score = c === 'O' ? ind + 1 : 0;
    return score;
});
const getScore = (cols) => (0, lodash_1.sum)(cols.map(rowScores).map(lodash_1.sum));
const getScores = (list) => list.reverse().reduce((t, row, ind) => {
    return t + row.filter((x) => x === 'O').length * (ind + 1);
}, 0);
function q2() {
    console.time('Execution Time');
    const getColumnOrderedNorth = (rows, ind) => rows
        .map((x) => x.charAt(ind))
        .join('')
        .split('#')
        .map((x) => {
        // it'll sort . first 0 second so we reverse
        const splitted = x.split('').sort().reverse();
        return splitted.join('');
    })
        .join('#')
        .split('');
    const getColumnOrderedSouth = (rows, ind) => rows
        .map((x) => x.charAt(ind))
        .join('')
        .split('#')
        .map((x) => {
        // it'll sort . first 0 second
        const splitted = x.split('').sort();
        return splitted.join('');
    })
        .join('#')
        .split('');
    const getColumnOrderedWest = (rows, ind) => rows[ind]
        .split('#')
        .map((x) => {
        // it'll sort . first 0 second so we reverse
        const splitted = x.split('').sort().reverse();
        return splitted.join('');
    })
        .join('#')
        .split('');
    const getColumnOrderedEast = (rows, ind) => rows[ind]
        .split('#')
        .map((x) => {
        // it'll sort . first 0 second
        const splitted = x.split('').sort();
        return splitted.join('');
    })
        .join('#')
        .split('');
    const parsed = (0, function_1.pipe)(day14_data_1.data, utils.parseLinesToArray);
    let orderedColumns = parsed;
    const resultBag = new Set();
    const resultMap = new Map();
    for (let cycle = 1; cycle <= 1000; cycle++) {
        orderedColumns = (0, function_1.pipe)(orderedColumns, ArrayFP.mapWithIndex((i) => getColumnOrderedNorth(orderedColumns, i)), rotateMatrix, ArrayFP.map((x) => x.join('')));
        orderedColumns = (0, function_1.pipe)(orderedColumns, ArrayFP.mapWithIndex((i) => getColumnOrderedWest(orderedColumns, i)), ArrayFP.map((x) => x.join('')));
        // console.log('orderedColumns 2');
        // console.log(orderedColumns.join('\n'));
        orderedColumns = (0, function_1.pipe)(orderedColumns, ArrayFP.mapWithIndex((i) => getColumnOrderedSouth(orderedColumns, i)), rotateMatrix, ArrayFP.map((x) => x.join('')));
        // console.log('orderedColumns 3');
        // console.log(orderedColumns.join('\n'));
        orderedColumns = (0, function_1.pipe)(orderedColumns, ArrayFP.mapWithIndex((i) => getColumnOrderedEast(orderedColumns, i)), ArrayFP.map((x) => x.join('')));
        // console.log('orderedColumns ', cycle);
        // console.log(orderedColumns.join('\n'));
        const rbs = resultBag.size;
        const res = getScores(orderedColumns.map((x) => x.split('')));
        const inMap = resultMap.get(res);
        resultMap.set(res, inMap ? [...inMap, cycle] : [cycle]);
        resultBag.add(res);
        if (rbs !== resultBag.size) {
            console.log(`CYCLE ${cycle}:`, res);
        }
    }
    const endNumber = 1000000000;
    console.log(`END`, resultMap, getScores(orderedColumns.map((x) => x.split(''))), (endNumber - 96) % 11);
    /**
     
      .....#....
      ....#...O#
      ...OO##...
      .OO#......
      .....OOO#.
      .O#...O#.#
      ....O#....
      ......OOOO
      #...O###..
      #..OO#....
  
  After 1 cycle:
  .....#....
  ....#...O#
  ...OO##...
  .OO#......
  .....OOO#.
  .O#...O#.#
  ....O#....
  ......OOOO
  #...O###..
  #..OO#....
  
  
  
  After 2 cycles:
  .....#....
  ....#...O#
  .....##...
  ..O#......
  .....OOO#.
  .O#...O#.#
  ....O#...O
  .......OOO
  #..OO###..
  #.OOO#...O
  
  After 3 cycles:
  .....#....
  ....#...O#
  .....##...
  ..O#......
  .....OOO#.
  .O#...O#.#
  ....O#...O
  .......OOO
  #...O###.O
  #.OOO#...O
     */
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
