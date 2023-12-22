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
const day15_data_1 = require("./day15-data");
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
function hasher(x) {
    return (0, function_1.pipe)(x, (x) => x.split(''), (a) => a.reduce((t, c) => {
        const val = c.charCodeAt(0);
        const newVal = ((t + val) * 17) % 256;
        return newVal;
    }, 0));
}
function boxesTotal(boxes) {
    return Object.values(boxes)
        .map((lenses) => {
        return lenses.map(({ box, focalLen }, ind) => {
            return (box + 1) * (ind + 1) * focalLen;
        });
    })
        .flat()
        .reduce((t, c) => t + c, 0);
}
function q1() {
    return;
    console.time('Execution Time');
    const currentData = day15_data_1.data;
    const parsed = (0, function_1.pipe)(currentData, (a) => a.split(','), ArrayFP.map((x) => x.split('')), ArrayFP.map((a) => a.reduce((t, c) => {
        const val = c.charCodeAt(0);
        const newVal = ((t + val) * 17) % 256;
        console.log(newVal);
        return newVal;
    }, 0)));
    console.log('Q1', parsed, (0, lodash_1.sum)(parsed));
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() {
    console.time('Execution Time');
    const currentData = day15_data_1.data;
    const boxes = {};
    const parsed = (0, function_1.pipe)(currentData, (a) => a.split(','), 
    // split but keep the delimiter chars in result array
    ArrayFP.map((x) => x.split(/(-|=)/).filter((x) => x)), (commands) => commands.reduce((t, c) => {
        // console.log('START', c.join(''), t);
        const isLens = c[1] === '=';
        const code = c[0];
        const box = hasher(code);
        const key = `box${box}`;
        if (!isLens) {
            if (!t[key]) {
                return t;
            }
            const newItem = t[key].filter((x) => x.code !== code);
            return Object.assign(Object.assign({}, t), { [key]: newItem });
        }
        const lens = {
            code,
            box,
            focalLen: Number(c[2]),
        };
        if (t[key]) {
            const existingIndex = t[key].findIndex((x) => x.code === code);
            if (existingIndex >= 0) {
                t[key][existingIndex] = lens;
            }
            else {
                t[key].push(lens);
            }
        }
        else {
            t[key] = [lens];
        }
        return Object.assign({}, t);
    }, boxes));
    /*
    {
      box0: [
        {code:rn,focalLen:3,box:1}
      ]
    }
    */
    console.log('Q2', boxesTotal(parsed));
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
