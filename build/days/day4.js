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
var N = __importStar(require("fp-ts/Number"));
var NEA = __importStar(require("fp-ts/NonEmptyArray"));
var function_1 = require("fp-ts/function");
var utils = require("../utils");
var day4_data_1 = require("./day4-data");
var parseData = (0, function_1.flow)(utils.parseLinesToArray, ArrayFP.map(function (x) { return x.split(','); }), ArrayFP.map(ArrayFP.map(function (x) { return x.split('-'); })), 
// convert to number and create ranges
ArrayFP.map(function (x) {
    var a = x.map(function (b) { return b.map(Number); });
    return [NEA.range.apply(NEA, a[0]), NEA.range.apply(NEA, a[1])];
}));
function q1() {
    var parsed = parseData(day4_data_1.data);
    var result = (0, function_1.pipe)(parsed, ArrayFP.map(function (x) {
        var int = (0, function_1.pipe)(x[0], ArrayFP.intersection(N.Eq)(x[1]));
        // means covering if intersection length equals to one of them
        return x.some(function (a) { return a.length === int.length; });
    }), ArrayFP.filter(function (x) { return x; }), function (x) { return x.length; });
    console.log('Q1', result);
}
exports.q1 = q1;
function q2() {
    var result = (0, function_1.pipe)(parseData(day4_data_1.data), ArrayFP.map(function (x) {
        var int = (0, function_1.pipe)(x[0], ArrayFP.intersection(N.Eq)(x[1]));
        // means covering if intersection length equals to one of them
        return int;
    }), ArrayFP.filter(function (x) { return !!x.length; }), function (x) { return x.length; });
    console.log('Q2', result);
}
exports.q2 = q2;
