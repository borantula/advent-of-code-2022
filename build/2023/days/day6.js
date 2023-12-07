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
const day6_data_1 = require("./day6-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
function q1() {
    console.time('Execution Time');
    const parsed = (0, function_1.pipe)(day6_data_1.data, utils.parseLinesToArray, ArrayFP.map((x) => x.split(':').map((y) => y.trim())[1]), ArrayFP.map((x) => x.split(' ')), ArrayFP.map((x) => x.filter((y) => !!y).map(Number)));
    const zipped = ArrayFP.zip(parsed[1])(parsed[0]);
    const result = zipped.map(([time, record]) => {
        let winningCount = 0;
        for (let speed = 1; speed < time; speed++) {
            const raceTime = time - speed;
            if (raceTime * speed > record) {
                winningCount++;
            }
        }
        return winningCount;
    });
    console.log('Q1', result.reduce((t, c) => t * c, 1));
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() {
    console.time('Execution Time');
    const parsed = (0, function_1.pipe)(day6_data_1.data, utils.parseLinesToArray, ArrayFP.map((x) => x.split(':').map((y) => y.trim())[1]), ArrayFP.map((x) => x.replace(/\s/g, '')), ArrayFP.map(Number));
    // too lazy to update this part after first question so put them in arrays again :)
    const zipped = ArrayFP.zip([parsed[1]])([parsed[0]]);
    const result = zipped.map(([time, record]) => {
        let winningCount = 0;
        for (let speed = 1; speed < time; speed++) {
            const raceTime = time - speed;
            // console.log('raced', raceTime * speed);
            if (raceTime * speed > record) {
                winningCount++;
            }
        }
        return winningCount;
    });
    console.log('Q2', result.reduce((t, c) => t * c, 1));
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
