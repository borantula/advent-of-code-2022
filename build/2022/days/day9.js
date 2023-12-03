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
const function_1 = require("fp-ts/function");
const utils = require("../utils");
const day9_data_1 = require("./day9-data");
const lodash_1 = require("lodash");
const travelledH = [];
const travelledT = [];
const travelledH2 = [];
const travelledT2 = [];
function move(positions, { dir, step }) {
    for (let i = 1; i <= step; i++) {
        switch (dir) {
            case 'R':
                positions.h[0]++;
                break;
            case 'L':
                positions.h[0]--;
                break;
            case 'U':
                positions.h[1]--;
                break;
            case 'D':
                positions.h[1]++;
                break;
            default:
                break;
        }
        const diffX = Math.abs(positions.h[0] - positions.t[0]) > 1;
        const diffY = Math.abs(positions.h[1] - positions.t[1]) > 1;
        if (diffX || diffY) {
            switch (dir) {
                case 'R':
                    positions.t[1] = positions.h[1];
                    positions.t[0]++;
                    break;
                case 'L':
                    positions.t[1] = positions.h[1];
                    positions.t[0]--;
                    break;
                case 'U':
                    positions.t[0] = positions.h[0];
                    positions.t[1]--;
                    break;
                case 'D':
                    positions.t[0] = positions.h[0];
                    positions.t[1]++;
                    break;
                default:
                    break;
            }
        }
        travelledH.push(positions.h.join('|'));
        travelledT.push(positions.t.join('|'));
    }
    return positions;
}
function moveLonger(positions, { dir, step }) {
    console.log('DIR', dir, step);
    for (let y = 1; y <= step; y++) {
        switch (dir) {
            case 'R':
                positions[0][0]++;
                break;
            case 'L':
                positions[0][0]--;
                break;
            case 'U':
                positions[0][1]--;
                break;
            case 'D':
                positions[0][1]++;
                break;
            default:
                break;
        }
        // console.log(positions.h);
        for (let i = 1; i < positions.length; i++) {
            const diffX = positions[i - 1][0] - positions[i][0];
            const diffY = positions[i - 1][1] - positions[i][1];
            const aDiffX = Math.abs(diffX);
            const aDiffY = Math.abs(diffY);
            console.log('DIFF', diffX, diffY, aDiffX, aDiffY);
            // if (aDiffX > 1 || aDiffY > 1) {
            //   if (diffX > diffY) {
            //     positions[i] = [
            //       positions[i][0] + dir === 'LEFT' ? -(aDiffX - 1) : aDiffX - 1,
            //       positions[i][1] + dir === 'LEFT' ? -(aDiffY - 1) : aDiffY - 1,
            //     ];
            //   }
            //   if (diffX < diffY) {
            //     positions[i] = [
            //       positions[i - 1][0] + dir === 'UP' ? -(aDiffX - 1) : aDiffX - 1,
            //       positions[i - 1][1] + dir === 'UP' ? -(aDiffY - 1) : aDiffY - 1,
            //     ];
            //   }
            //   if (diffX === diffY) {
            //     positions[i] = [
            //       positions[i - 1][0] + dir === 'LEFT' ? -(aDiffX - 1) : aDiffX - 1,
            //       positions[i - 1][1] + dir === 'UP' ? -(aDiffY - 1) : aDiffY - 1,
            //     ];
            //   }
            // }
            switch (dir) {
                case 'R':
                    positions[i][1] = positions[i - 1][1];
                    positions[i][0]++;
                    break;
                case 'L':
                    positions[i][1] = positions[i - 1][1];
                    positions[i][0]--;
                    break;
                case 'U':
                    positions[i][0] = positions[i - 1][0];
                    positions[i][1]--;
                    break;
                case 'D':
                    positions[i][0] = positions[i - 1][0];
                    positions[i][1]++;
                    break;
                default:
                    break;
                // if (i === positions.length - 1) {
                //   travelledT2.push(positions[i].join('|'));
                // }
            }
            travelledH2.push(positions[0].join('|'));
        }
        console.log(positions);
        return positions;
    }
}
function q1() {
    const startingPosition = {
        h: [0, 0],
        t: [0, 0],
    };
    const cmds = (0, function_1.pipe)(utils.parseLinesToArray(day9_data_1.data), ArrayFP.map((a) => a.split(' ')), ArrayFP.map((a) => ({ dir: a[0], step: Number(a[1]) })));
    (0, function_1.pipe)(cmds, ArrayFP.reduce(startingPosition, (acc, cmd) => {
        return move(acc, cmd);
    }));
    console.log('Q1', new Set(travelledT).size);
}
exports.q1 = q1;
function q2() {
    const startingPosition = Array.from((0, lodash_1.range)(1, 11), () => [0, 0]);
    // return;
    const cmds = (0, function_1.pipe)(utils.parseLinesToArray(day9_data_1.sampleData2), (a) => (0, lodash_1.take)(a, 1), ArrayFP.map((a) => a.split(' ')), ArrayFP.map((a) => ({ dir: a[0], step: Number(a[1]) })));
    // pipe(
    //   cmds,
    //   ArrayFP.reduce(startingPosition, (acc, cmd) => {
    //     // console.log(acc);
    //     return moveLonger(acc, cmd);
    //   }),
    // );
    console.log('Q2', 
    // ArrayFP.uniq(S.Eq)(travelledT),
    // new Set(travelledH2).size,
    new Set(travelledT2).size);
}
exports.q2 = q2;
