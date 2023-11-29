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
var function_1 = require("fp-ts/function");
var utils = require("../utils");
var day9_data_1 = require("./day9-data");
var lodash_1 = require("lodash");
var travelledH = [];
var travelledT = [];
var travelledH2 = [];
var travelledT2 = [];
function move(positions, _a) {
    var dir = _a.dir, step = _a.step;
    for (var i = 1; i <= step; i++) {
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
        var diffX = Math.abs(positions.h[0] - positions.t[0]) > 1;
        var diffY = Math.abs(positions.h[1] - positions.t[1]) > 1;
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
function moveLonger(positions, _a) {
    var dir = _a.dir, step = _a.step;
    console.log('DIR', dir, step);
    for (var y = 1; y <= step; y++) {
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
        for (var i = 1; i < positions.length; i++) {
            var diffX = positions[i - 1][0] - positions[i][0];
            var diffY = positions[i - 1][1] - positions[i][1];
            var aDiffX = Math.abs(diffX);
            var aDiffY = Math.abs(diffY);
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
    var startingPosition = {
        h: [0, 0],
        t: [0, 0],
    };
    var cmds = (0, function_1.pipe)(utils.parseLinesToArray(day9_data_1.data), ArrayFP.map(function (a) { return a.split(' '); }), ArrayFP.map(function (a) { return ({ dir: a[0], step: Number(a[1]) }); }));
    (0, function_1.pipe)(cmds, ArrayFP.reduce(startingPosition, function (acc, cmd) {
        return move(acc, cmd);
    }));
    console.log('Q1', new Set(travelledT).size);
}
exports.q1 = q1;
function q2() {
    var startingPosition = Array.from((0, lodash_1.range)(1, 11), function () { return [0, 0]; });
    // return;
    var cmds = (0, function_1.pipe)(utils.parseLinesToArray(day9_data_1.sampleData2), function (a) { return (0, lodash_1.take)(a, 1); }, ArrayFP.map(function (a) { return a.split(' '); }), ArrayFP.map(function (a) { return ({ dir: a[0], step: Number(a[1]) }); }));
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
