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
const day4_data_1 = require("./day4-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
function q1() {
    const lines = (0, function_1.pipe)(day4_data_1.data, utils.parseLinesToArray);
    const parsed = (0, function_1.pipe)(lines, ArrayFP.map((l) => {
        return l
            .split(':')[1]
            .split('|')
            .map((a) => {
            return a
                .trim()
                .split(' ')
                .filter((a) => a)
                .map(Number);
        });
    }), ArrayFP.map((sides) => {
        const winners = sides[0].filter((x) => sides[1].includes(x));
        return winners.length;
    }), ArrayFP.filter((a) => !!a), ArrayFP.map((a) => Math.pow(2, Math.max(a - 1, 0))), lodash_1.sum);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    const lines = (0, function_1.pipe)(day4_data_1.data, utils.parseLinesToArray);
    const parsed = (0, function_1.pipe)(lines, ArrayFP.map((l) => {
        return l
            .split(':')[1]
            .split('|')
            .map((a) => {
            return a
                .trim()
                .split(' ')
                .filter((a) => a)
                .map(Number);
        });
    }), ArrayFP.map((sides) => {
        const winners = sides[0].filter((x) => sides[1].includes(x));
        return winners.length;
    }));
    const cardPoints = parsed;
    const cardCounts = Array.from(cardPoints, (x) => 1);
    const totalCardCounts = cardCounts.reduce((t, noOfCurrentCard, ind) => {
        const currentPoints = cardPoints[ind];
        for (let j = 1; j <= noOfCurrentCard; j++) {
            for (let i = 1; i <= currentPoints; i++) {
                t[ind + i]++;
            }
        }
        return t;
    }, cardCounts);
    console.log('Q1', (0, lodash_1.sum)(totalCardCounts));
}
exports.q2 = q2;
