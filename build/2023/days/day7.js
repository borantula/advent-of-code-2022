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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.q2 = exports.q1 = void 0;
const day7_data_1 = require("./day7-data");
const utils = __importStar(require("../../utils"));
const ArrayFP = __importStar(require("fp-ts/Array"));
const function_1 = require("fp-ts/function");
const lodash_1 = require("lodash");
const cardOrder = [
    'A',
    'K',
    'Q',
    'J',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
];
/**
Five of a kind, where all five cards have the same label: AAAAA
Four of a kind, where four cards have the same label and one card has a different label: AA8AA
Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
High card, where all cards' labels are distinct: 23456
 */
const handRanks = {
    '5': 7,
    '41': 6,
    '32': 5,
    '311': 4,
    '221': 3,
    '2111': 2,
    '11111': 1,
};
function getHandRank(cards) {
    const group = Object.values((0, lodash_1.groupBy)(cards)).sort((a, b) => a.length < b.length ? 1 : -1);
    const lengths = group.map((x) => x.length).join('');
    // console.log(cards, group, lengths);
    return handRanks[lengths];
}
function getHandRankWithJoker(cards) {
    const grouped = (0, lodash_1.groupBy)(cards);
    const { J: jokers } = grouped, groups = __rest(grouped, ["J"]);
    const group = Object.values(groups).sort((a, b) => a.length < b.length ? 1 : -1);
    const hasJoker = !!jokers;
    console.log('rank:', jokers);
    if (hasJoker) {
        jokers
            .map(() => group[0][0])
            .forEach((a) => {
            group[0].push(a);
        });
    }
    const lengths = group.map((x) => x.length).join('');
    console.log(cards, group, lengths, hasJoker, jokers);
    return handRanks[lengths];
}
console.log(getHandRankWithJoker('KTJJT'.split('')));
console.log(getHandRankWithJoker('KK677'.split('')));
function q1() {
    return;
    console.time('Execution Time');
    const parsed = (0, function_1.pipe)(day7_data_1.data, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')), ArrayFP.map((x) => {
        const cards = x[0].split('');
        return {
            cards,
            hand: x[0],
            handRank: getHandRank(cards),
            bid: Number(x[1]),
        };
    }));
    parsed.sort((a, b) => {
        if (a.handRank === b.handRank) {
            // check for card order for equal ranks
            for (let i = 0; i < 5; i++) {
                const aEl = cardOrder.indexOf(a.cards[i]);
                const bEl = cardOrder.indexOf(b.cards[i]);
                if (aEl === bEl) {
                    continue;
                }
                return aEl < bEl ? 1 : -1;
            }
            return 0;
        }
        return a.handRank > b.handRank ? 1 : -1;
    });
    const result = parsed.map((hand, i) => {
        return (i + 1) * hand.bid;
    });
    console.log('Q1', parsed, result, (0, lodash_1.sum)(result));
    console.timeEnd('Execution Time');
}
exports.q1 = q1;
function q2() {
    // return;
    console.time('Execution Time');
    const parsed = (0, function_1.pipe)(day7_data_1.data, utils.parseLinesToArray, ArrayFP.map((x) => x.split(' ')), ArrayFP.map((x) => {
        const cards = x[0].split('');
        return {
            cards,
            hand: x[0],
            handRank: getHandRankWithJoker(cards),
            bid: Number(x[1]),
        };
    }));
    parsed.sort((a, b) => {
        if (a.handRank === b.handRank) {
            // check for card order for equal ranks
            for (let i = 0; i < 5; i++) {
                const aEl = cardOrder.indexOf(a.cards[i]);
                const bEl = cardOrder.indexOf(b.cards[i]);
                if (aEl === bEl) {
                    continue;
                }
                return aEl < bEl ? 1 : -1;
            }
            return 0;
        }
        return a.handRank > b.handRank ? 1 : -1;
    });
    const result = parsed.map((hand, i) => {
        return (i + 1) * hand.bid;
    });
    console.log('Q2', parsed, result, (0, lodash_1.sum)(result));
    console.timeEnd('Execution Time');
}
exports.q2 = q2;
