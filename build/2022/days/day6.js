"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
const day6_data_1 = require("./day6-data");
function getMarkerByMagicNumber(msg, magicNumber) {
    const turns = msg.length - magicNumber;
    for (let index = 0; index < turns; index++) {
        const currentSet = new Set(msg.slice(index, index + magicNumber));
        if (currentSet.size === magicNumber) {
            return index + magicNumber;
        }
    }
}
function q1() {
    console.log('Q1', getMarkerByMagicNumber(day6_data_1.data, 4));
}
exports.q1 = q1;
function q2() {
    console.log('Q2', getMarkerByMagicNumber(day6_data_1.data, 14));
}
exports.q2 = q2;
