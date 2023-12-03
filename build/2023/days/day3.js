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
const day3_data_1 = require("./day3-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
function hasSymbolNeighbors(line, m, lines) {
    // line is the y axis
    // we'll get up down for all the numbers
    // then for first one L L-up L-down
    // then for last one R R-up R-down
    // current line +1 -1
    const n = m[0];
    const start = Math.max(m.index - 1, 0);
    const end = start + n.length + 2;
    let content = '';
    if (lines[line - 1]) {
        content += lines[line - 1].slice(start, end);
    }
    content += lines[line].slice(start, end);
    if (lines[line + 1]) {
        content += lines[line + 1].slice(start, end);
    }
    return !![...content.matchAll(/[^.\d]/g)].length;
    console.log(lines[line], '--', content, content.match(/[^.\d]/g));
    // n.split('').forEach((a) => {
    //   const sur = getSurroundings(matrix, line, Number(a));
    //   console.log(
    //     'SUR',
    //     sur,
    //     Object.values(sur).filter((a) => a && a.match(/[^.\d]/g)),
    //   );
    // });
}
function q1() {
    const lines = (0, function_1.pipe)(day3_data_1.sampleData, utils.parseLinesToArray);
    const matrix = (0, function_1.pipe)(day3_data_1.sampleData, utils.parseToMatrix);
    const parsed = (0, function_1.pipe)(day3_data_1.sampleData, utils.parseLinesToArray, ArrayFP.map((a) => {
        return [...a.matchAll(/\d+/g)];
    }));
    console.log('Q1', parsed);
    // console.log('Q1', matrix);
    // console.log(getTheNeighborhood(0, parsed[0][0], matrix));
    // console.log(parsed[0][0], hasSymbolNeighbors(0, parsed[0][0], lines));
    // console.log(parsed[0][1], hasSymbolNeighbors(0, parsed[0][1], lines));
}
exports.q1 = q1;
function q2() { }
exports.q2 = q2;
