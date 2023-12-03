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
const day2_data_1 = require("./day2-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
const bounds = {
    red: 12,
    green: 13,
    blue: 14,
};
function q1() {
    const playGame = (gameSet) => {
        for (let i = 0; i < gameSet.length; i++) {
            const [n, c] = gameSet[i].trim().split(' ');
            if (bounds[c] < Number(n)) {
                return false;
            }
        }
        return true;
    };
    const parsed = (0, function_1.pipe)(day2_data_1.data, utils.parseLinesToArray, ArrayFP.map((c) => {
        return c.split(':');
    }), ArrayFP.map((c) => {
        const games = c[1].split(';').map((a) => a.trim().split(','));
        return [c[0], ...games];
    }), ArrayFP.map((gameSet) => {
        const [gameIdentifier, ...games] = gameSet;
        const gameId = Number(gameIdentifier.split(' ')[1]);
        for (let i = 0; i < games.length; i++) {
            const colorSets = games[i];
            const result = playGame(colorSets);
            if (!result) {
                return false;
            }
        }
        return gameId;
    }), ArrayFP.filter((a) => !!a), lodash_1.sum);
    console.log('Q1', parsed);
}
exports.q1 = q1;
function q2() {
    const playGame = (gameSet, currentMax) => {
        for (let i = 0; i < gameSet.length; i++) {
            const [n, c] = gameSet[i].trim().split(' ');
            currentMax[c] = Math.max(Number(n), currentMax[c]);
        }
        return currentMax;
    };
    const parsed = (0, function_1.pipe)(day2_data_1.data, utils.parseLinesToArray, ArrayFP.map((c) => c.split(':')), ArrayFP.map((c) => {
        const games = c[1].split(';').map((a) => a.trim().split(','));
        return games;
    }), ArrayFP.map((games) => {
        let currentMax = {
            red: 0,
            green: 0,
            blue: 0,
        };
        for (let i = 0; i < games.length; i++) {
            currentMax = playGame(games[i], currentMax);
        }
        return currentMax;
    }), ArrayFP.map((a) => Object.values(a).reduce((t, s) => t * s, 1)), lodash_1.sum);
    console.log('Q2', parsed);
}
exports.q2 = q2;
