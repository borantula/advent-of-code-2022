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
const N = __importStar(require("fp-ts/number"));
const NEA = __importStar(require("fp-ts/NonEmptyArray"));
const function_1 = require("fp-ts/function");
const utils = require("../utils");
const day4_data_1 = require("./day4-data");
const parseData = (0, function_1.flow)(utils.parseLinesToArray, ArrayFP.map((x) => x.split(',')), ArrayFP.map(ArrayFP.map((x) => x.split('-'))), 
// convert to number and create ranges
ArrayFP.map((x) => {
    const a = x.map((b) => b.map(Number));
    return [NEA.range(...a[0]), NEA.range(...a[1])];
}));
function q1() {
    const parsed = parseData(day4_data_1.data);
    const result = (0, function_1.pipe)(parsed, ArrayFP.map((x) => {
        const int = (0, function_1.pipe)(x[0], ArrayFP.intersection(N.Eq)(x[1]));
        // means covering if intersection length equals to one of them
        return x.some((a) => a.length === int.length);
    }), ArrayFP.filter((x) => x), (x) => x.length);
    console.log('Q1', result);
}
exports.q1 = q1;
function q2() {
    const result = (0, function_1.pipe)(parseData(day4_data_1.data), ArrayFP.map((x) => {
        const int = (0, function_1.pipe)(x[0], ArrayFP.intersection(N.Eq)(x[1]));
        // means covering if intersection length equals to one of them
        return int;
    }), ArrayFP.filter((x) => !!x.length), (x) => x.length);
    console.log('Q2', result);
}
exports.q2 = q2;
