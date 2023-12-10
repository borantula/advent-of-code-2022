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
const day10_data_1 = require("./day10-data");
const utils = __importStar(require("../../utils"));
const function_1 = require("fp-ts/function");
/**
 | is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
 */
const canGo = {
    '|': { north: ['|', 'F', '7'], south: ['|', 'J', 'L'], east: [], west: [] },
    '-': { east: ['-', 'J', 'F'], west: ['-', 'L', '7'], north: [], south: [] },
    L: { north: ['|', 'F', '7'], east: ['-', 'J', 'F'], south: [], west: [] },
    J: { north: ['|', 'F', '7'], west: ['-', 'L', '7'], east: [], south: [] },
    '7': { south: ['|', 'J', 'L'], west: ['-', 'L', '7'], north: [], east: [] },
    F: { south: ['|', 'J', 'L'], east: ['-', 'J', 'F'], north: [], west: [] },
    '.': { north: [], south: [], east: [], west: [] }, // representing the ground with no pipe
};
const canConnect = {
    '|': { north: true, south: true, east: false, west: false },
    '-': { east: true, west: true, north: false, south: false },
    L: { north: true, east: true, south: false, west: false },
    J: { north: true, west: true, east: false, south: false },
    '7': { south: true, west: true, north: false, east: false },
    F: { south: true, east: true, north: false, west: false },
    '.': { north: false, south: false, east: false, west: false },
};
const getNextCoordinates = (coord, letter) => {
    return Object.entries(canConnect[letter])
        .filter((x) => x[1])
        .map((x) => x[0])
        .map((c) => {
        // they're y,x pairs
        if (c === 'south') {
            return [coord[0] + 1, coord[1]];
        }
        if (c === 'north') {
            return [coord[0] - 1, coord[1]];
        }
        if (c === 'east') {
            return [coord[0], coord[1] + 1];
        }
        if (c === 'west') {
            return [coord[0], coord[1] - 1];
        }
    });
};
function q1() {
    console.time('Execution Time');
    const S = 'F';
    const coordS = [1, 1];
    const parsed = (0, function_1.pipe)(day10_data_1.sampleData2, utils.parseToMatrix);
    const bag = ['1-1'];
    const n1 = utils.getImmediateNeighbors(parsed, coordS);
    const nextCoords = getNextCoordinates([1, 1], 'F');
    console.log(n1, nextCoords);
    nextCoords.forEach((c) => {
        if (c)
            bag.push(c.join('-'));
    });
    let currentCoord = nextCoords[0];
    for (let i = 0; i < 10; i++) {
        if (!currentCoord) {
            break;
        }
        const nextCoords2 = getNextCoordinates(currentCoord, parsed[currentCoord[0]][currentCoord[1]]).filter((x) => x && !bag.includes(x.join('-')));
        nextCoords2.forEach((c) => {
            if (c)
                bag.push(c.join('-'));
        });
        currentCoord = nextCoords2[0];
        console.log(bag, currentCoord);
    }
    // const nextCoords2 = getNextCoordinates([2, 1], parsed[2][1] as Dir).filter(
    //   (x) => x && !bag.includes(x.join('-')),
    // );
    // nextCoords2.forEach((c) => {
    //   if (c) bag.push(c.join('-'));
    // });
    // const nextCoords3 = getNextCoordinates([3, 1], parsed[3][1] as Dir).filter(
    //   (x) => x && !bag.includes(x.join('-')),
    // );
    // nextCoords3.forEach((c) => {
    //   if (c) bag.push(c.join('-'));
    // });
    console.log(bag);
    console.log('Q1', parsed);
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() { }
exports.q2 = q2;
