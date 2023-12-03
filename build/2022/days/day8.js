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
const day8_data_1 = require("./day8-data");
function isEdge(matrix, position) {
    const [x, y] = position;
    const width = matrix[0].length - 1;
    const height = matrix.length - 1;
    return x === 0 || y === 0 || y === height || x === width;
}
function getNeighbors(matrix, p) {
    const [x, y] = p;
    const val = (pos) => matrix[pos[1]][pos[0]];
    const neighbors = {
        t: [],
        b: [],
        l: [],
        r: [],
    };
    for (let i = y - 1; i >= 0; i--) {
        neighbors.t.push(val([x, i]));
    }
    for (let i = y + 1; i < matrix.length; i++) {
        neighbors.b.push(val([x, i]));
    }
    for (let i = x + 1; i < matrix[0].length; i++) {
        neighbors.r.push(val([i, y]));
    }
    for (let i = x - 1; i >= 0; i--) {
        neighbors.l.push(val([i, y]));
    }
    return neighbors;
}
function isVisible(matrix, p) {
    const [x, y] = p;
    if (isEdge(matrix, p)) {
        return true;
    }
    const treeHeight = matrix[y][x];
    const neighbors = getNeighbors(matrix, p);
    const res = Object.entries(neighbors).every(([_dir, n]) => {
        return n.some((h) => {
            return treeHeight <= h;
        });
    });
    return !res;
}
function getScenicScore(matrix, p) {
    const [x, y] = p;
    if (isEdge(matrix, p)) {
        return 0;
    }
    const treeHeight = matrix[y][x];
    const neighbors = getNeighbors(matrix, p);
    const res = Object.entries(neighbors).map(([_dir, n]) => {
        let openViewCount = 0;
        for (let i = 0; i < n.length; i++) {
            const element = n[i];
            if (element < treeHeight) {
                openViewCount += 1;
                continue;
            }
            openViewCount += 1;
            break;
        }
        return openViewCount;
    });
    return res.reduce((acc, a) => acc * a, 1);
}
function q1() {
    const parsed = (0, function_1.pipe)(utils.parseToNumberMatrix(day8_data_1.data), (matrix) => {
        let visibleCount = 0;
        matrix.forEach((a, y) => {
            a.forEach((b, x) => {
                const position = [x, y];
                if (isVisible(matrix, position)) {
                    visibleCount += 1;
                }
            });
        });
        return visibleCount;
    });
    console.log('Q2', parsed);
}
exports.q1 = q1;
function q2() {
    const parsed = (0, function_1.pipe)(utils.parseToNumberMatrix(day8_data_1.data), (matrix) => matrix.map((a, y) => {
        return a.map((b, x) => {
            const position = [x, y];
            return getScenicScore(matrix, position);
        });
    }), ArrayFP.flatten, (a) => Math.max(...a));
    console.log('Q2', parsed);
}
exports.q2 = q2;
