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
const lodash_1 = require("lodash");
const gearBag = {};
function addToGearBag(row, col, n) {
    const key = `gear-${row}-${col}`;
    gearBag[key] = gearBag[key] ? [...gearBag[key], n] : [n];
}
function hasSymbolNeighbors(line, m, lines) {
    if (m.index === undefined) {
        return false;
    }
    // line is the y axis
    // current line +1 -1
    const n = m[0];
    const start = Math.max(m.index - 1, 0);
    const end = start + n.length + (start ? 2 : 1);
    let content = '';
    if (lines[line - 1]) {
        const upper = lines[line - 1].slice(start, end);
        if (upper.includes('*')) {
            [...upper.matchAll(/[*]/g)].forEach((gear) => {
                addToGearBag(line - 1, (gear.index || 0) + start, Number(n));
            });
        }
        content += upper;
    }
    const level = lines[line].slice(start, end);
    content += level;
    if (level.includes('*')) {
        [...level.matchAll(/[*]/g)].forEach((gear) => {
            addToGearBag(line, (gear.index || 0) + start, Number(n));
        });
    }
    if (lines[line + 1]) {
        const lower = lines[line + 1].slice(start, end);
        if (lower.includes('*')) {
            [...lower.matchAll(/[*]/g)].forEach((gear) => {
                addToGearBag(line + 1, (gear.index || 0) + start, Number(n));
            });
        }
        content += lower;
    }
    const matches = [...content.matchAll(/[^.\d]/g)];
    return !!matches.length;
}
function q1() {
    const lines = (0, function_1.pipe)(day3_data_1.data, utils.parseLinesToArray);
    const parsed = (0, function_1.pipe)(lines, ArrayFP.map((a) => {
        return [...a.matchAll(/\d+/g)];
    }), 
    // utils.logger,
    ArrayFP.mapWithIndex((lineIndex, a) => {
        // console.log(lineIndex, a);
        return a.map((b) => {
            return hasSymbolNeighbors(lineIndex, b, lines) ? Number(b[0]) : null;
        });
    }), lodash_1.flatMap, (a) => a.filter((c) => !!c), lodash_1.sum);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    // Q2 depends on Q1 due to global object gearBag
    console.log('Q2', (0, function_1.pipe)(Object.values(gearBag)
        .filter((a) => a.length > 1)
        .map((a) => a.reduce((t, s) => t * s, 1)), lodash_1.sum));
}
exports.q2 = q2;
