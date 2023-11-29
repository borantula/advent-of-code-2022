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
var day8_data_1 = require("./day8-data");
function isEdge(matrix, position) {
    var x = position[0], y = position[1];
    var width = matrix[0].length - 1;
    var height = matrix.length - 1;
    return x === 0 || y === 0 || y === height || x === width;
}
function getNeighbors(matrix, p) {
    var x = p[0], y = p[1];
    var val = function (pos) { return matrix[pos[1]][pos[0]]; };
    var neighbors = {
        t: [],
        b: [],
        l: [],
        r: [],
    };
    for (var i = y - 1; i >= 0; i--) {
        neighbors.t.push(val([x, i]));
    }
    for (var i = y + 1; i < matrix.length; i++) {
        neighbors.b.push(val([x, i]));
    }
    for (var i = x + 1; i < matrix[0].length; i++) {
        neighbors.r.push(val([i, y]));
    }
    for (var i = x - 1; i >= 0; i--) {
        neighbors.l.push(val([i, y]));
    }
    return neighbors;
}
function isVisible(matrix, p) {
    var x = p[0], y = p[1];
    if (isEdge(matrix, p)) {
        return true;
    }
    var treeHeight = matrix[y][x];
    var neighbors = getNeighbors(matrix, p);
    var res = Object.entries(neighbors).every(function (_a) {
        var _dir = _a[0], n = _a[1];
        return n.some(function (h) {
            return treeHeight <= h;
        });
    });
    return !res;
}
function getScenicScore(matrix, p) {
    var x = p[0], y = p[1];
    if (isEdge(matrix, p)) {
        return 0;
    }
    var treeHeight = matrix[y][x];
    var neighbors = getNeighbors(matrix, p);
    var res = Object.entries(neighbors).map(function (_a) {
        var _dir = _a[0], n = _a[1];
        var openViewCount = 0;
        for (var i = 0; i < n.length; i++) {
            var element = n[i];
            if (element < treeHeight) {
                openViewCount += 1;
                continue;
            }
            openViewCount += 1;
            break;
        }
        return openViewCount;
    });
    return res.reduce(function (acc, a) { return acc * a; }, 1);
}
function q1() {
    var parsed = (0, function_1.pipe)(utils.parseToNumberMatrix(day8_data_1.data), function (matrix) {
        var visibleCount = 0;
        matrix.forEach(function (a, y) {
            a.forEach(function (b, x) {
                var position = [x, y];
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
    var parsed = (0, function_1.pipe)(utils.parseToNumberMatrix(day8_data_1.data), function (matrix) {
        return matrix.map(function (a, y) {
            return a.map(function (b, x) {
                var position = [x, y];
                return getScenicScore(matrix, position);
            });
        });
    }, ArrayFP.flatten, function (a) { return Math.max.apply(Math, a); });
    console.log('Q2', parsed);
}
exports.q2 = q2;
