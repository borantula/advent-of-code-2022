"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleData = exports.data = void 0;
exports.data = `
Card   1: 24 76 32 40 51 61 89  6 30 60 | 30 69 24 86  6  8 92 61 51 88 63 67 32 62 15 49 22 77 40 27 89 60 76 58 79
Card   2: 97  3 51 52 79  8 89 76 10 59 | 59 48 52 76 97 16 92 81 62 25 89 51 54  3 79 18 94 78  8 32 99 66 10 70 38
Card   3:  8 67 56 82 96  2 21 47 41 38 |  6 83 17 36  8 21 82 27 68 67  7 38 56 42 66  3 47 87 41 71 88 96  2 98 72
Card   4: 41 83 77 61 91 13 84 63 81 79 | 29 28 85 84 19 83 37 55  7 97  8 11 12 50 72 42 48 92 30  2 27 18 38 89 59
Card   5: 31 96 75 87 56  8 79 80 49 89 | 32 75 80 56 77 48 59 89  6 67 87 33 14 44 50 49 28 82 79 40  9 31 99  8 96
Card   6: 32 94 17 27 59 63  7 87 68 53 |  2 37 31 69 17  7 75 53 87 26 51 96 19 63 59 68 34 56 35 30 93 79 89 61 71
Card   7: 19 40 50 67  3  2 79 33 14 98 | 51 30 70 72  2 20 35 50 94 37 40 74 14 91 33 98 67 92  3 59 79 19 97 75 31
Card   8: 67 12 63 96 61 48 95 40 73 46 | 67 12 40 63 15 46 33 16 43 92 78 74 95 73  4 53 14  9 90 94 72 13 96 54 61
Card   9: 47 23 84 63 95 98 26 90 99 64 | 98 95  4 47  1 23 26 11 74 84 36 82 63 60 53 44  6 59 64 99 17 42 90 85 19
Card  10: 70 82 46 43 38 21  2 98 33 64 | 93  3 64 21 96 80 32 70 79 58 34 42  2 19 39 61 46 31 88 43 87 54 67 69  9
Card  11: 44 79 34 75 85 94  2 81 55 66 | 55 85  6 58 72 51 37 44 29 79 39 66 49 48 75 15 83 81  2 24 94 99 34 59 33
Card  12: 74 34  8 69 16 83 80 97 22 29 | 96 97  5 87 50 84 94 19 93 52 40 46 15  7 41 37 98 12 16 56 65 95 27 90 54
Card  13:  2 56  8 43 13 72 33 11 36 29 | 57 40 14 35 18 65 78 87 58 84 51  2 43 61 37 66 30 10 39 60 64 54 48  9 15
Card  14: 43 84 95 53 44 69  9 94  5 17 | 65 74 88 75 81 10 62 83 33 51 76 26 89 94 80 17 56 42 21  6 87  1 46 95  9
Card  15: 57  7 28  1  5 11 81 43 69 34 | 52 49  8 91 34  2 29 74 94 81 77 58 11 83 96 43 40 55 89 27 10 30  7 57 28
Card  16:  6 14 70 53 54 52 26 72 59 42 | 37 52 60 53 86 49 91 33  4 77 64 51 23 85 89 10 42  8 29 66 61 74 99 26 87
Card  17: 10 86 55 81 40 23 25 67 93 59 | 68 62 15 32 54 85 99  5 10  2 56 38 64 11 55 84 50 67 34 12 52 59 76  1 36
Card  18: 32 90 99 60 31 54 58 78 88 61 | 63 93 58 47 80 60 46 88 21 48 83 31 35 64 23 24 55 91  1 73 45 20 29 77 66
Card  19: 80  1 28 63 37 42 24 81 99 94 | 15 10 33 88 28  2 16 62 81 72 42 67 49 38 65 95 63 61 24 52 11  6 26 39 70
Card  20: 44 26 16  4 55 63 33 36 82 86 | 70  3 46 58 41 95 96 73 15 13 99 69 91 75 87 57 92 65 51 38 53 80 14 52 48
Card  21: 48 36 78  7 17  2 61 54 49 11 | 56 41 84 37 45 62 40 18 35 33 43 57 80  9 32 13 25 46 61 58 55 48 30 11 74
Card  22: 83 30  3  9 31 13 82 81 15 74 | 64 47 66 39 14 17 10 79 84 62 27 81 73 96 43 42 36 40 70 80 90 41 50 55 16
Card  23: 84  6 52 97 89 48 62 20 15 53 | 41 66 12 56 86 61 45 38  1 51 31 92 14 96 16 37 67 98 64 57 77 10 73 39 80
Card  24: 90  8 46 94 95 43 31 74 80 66 | 49 91 47  1 37 48 72 45 29 26 76 58 44 97 20 70 55 77 13 86 19 87 59  4 34
Card  25: 80 52 16 86 65 84 31 36 49 59 | 95 72 65 80 52 97 59  9 81  2 96 36 86 31 16  8 48  6 50 66 84 49 78 18 56
Card  26: 32 56 87 82 62 97 42 22 61 83 | 85 29 58 59 48 20 69 50 98 46 60 25 40 52 73 28 66 63  1  6 74 12 88 37 64
Card  27: 46 65 51 32 83 91 67 52 43 71 | 98 83 43 46 36 71 38 14 30 26  5 47  3 85 61 51  4 91 35 28 67 48 60 52 74
Card  28: 26 60 29 89 24 28 95 92 78 97 | 39 95 41 34 16 25 62 60 53 97 24 92 77 78 29 68 35 86 71 58 89 12 28  9 11
Card  29: 66  6 93 49 51  2 48 96 62 89 |  2 17 62 39  6 51 93 18 95 54 72  1 97 66 84 96 60 89 90 69 13 48 49 36 16
Card  30: 53 95 92 75 76 56 48 87 79 15 |  1  4 97  3  6 79 11 76 88  7 56 75 48 95 60 94 59 36 46 86 70 69 91  2 73
Card  31: 80 63 37 67 35 98 97 72 87 52 | 67 77 58 66 54 19 87 75 76 51 29 80 53 26 24 49 88 91 52 72 86 81  4 39 37
Card  32: 67 23 77 16  4 31 24 13 76 86 | 16  6 69 31 51  4 28 83  1 89 79 24 46 38 99 77 43 50 19 87 90 73 85 56 70
Card  33: 38 41 64 25 96 99 68 58 92 40 | 84 59  5 94 49  6  2 40 73 96 38 23 43 91 47 88 24 17  9 25 35 52 13 92 64
Card  34: 24 52 69 59 55  8 43 15 45 92 | 56 47 84 62  4 81 88 92 54 96 52 89 42 46 49 33 69 10 51 12  5 82 85 65 20
Card  35: 19 82 84 29 58 44 65 87 26 32 | 95 63 13 56 77  3 57 17 32 20 81  2 82 76 48 39 71 93 84  8 15 88 89 74 11
Card  36: 41 13 70 23 65 66 47 75 24 98 | 17 94 89 42 47  9 55 54 48 57 71 69 63 33 35 97 90 20 43 24 18  6 76 82 29
Card  37: 23 39 77 90 56 47  2 82 66 72 |  2 61 16 48 65 62 77  5 49 35 72 93 22 83 18  3 38  1 14 31 99 54 52  8 13
Card  38: 99 18 59 51 94 52 44 71 30  7 | 95 31  1 58 94  8 28 18 50 81 59 26 57 82 67 30 17 86 87 79 37 23 10 83  3
Card  39: 98  3 38 42 18 71 66 80 39 79 | 51 88 43 25 90 27  9 35 29  4 21 10 79 13 54 42 11 61 36 30 24 15  6 65 26
Card  40:  6 27 58  3 67 72 45 12 63 61 | 36 39 75  2 78 95 64 22 41 93 54 91 50 11 55 74 17 56 92 88 87 89 85  6 40
Card  41: 37 76 61 43 25 29 89 11 35 93 | 27 30 81 38 62  4 33 92 71 77  6 22 75 76 97 67 70 13 65 96 15 17 36 56 78
Card  42: 42  7 79 61 98 92  2 95 14 44 | 62 88 67 48 82 59 27 34  6 39 25 97 87 81 37 50 65 10 41 56 12 32 68 30 38
Card  43: 12  9 34 93 71 99 95 86 87 40 |  6 24 93 79 85 25 90 72 71 13 66 86  9  8 12 50 57 30 39 59 29 34 26 17 51
Card  44: 24 96 61 97 83 98 10  1 29 81 | 74 43 92  5  1 56 15 60 83 96 50 72 81 98 29 52 49 24 97 90 95 10 84 12 61
Card  45: 12 29 82  5 83 92 86 51 98 32 | 61 14 28 80 48 55 17  5 19 12 62 27 51 18 86 91 49 58 11 65 13 79 68 98 36
Card  46: 67 47 77 25 15 64 90 76 16 88 | 64 86 26 25 77 78 56 84 87 76 15 88 36 90 93 96  8 13 67 47 10 16 42 27  6
Card  47: 97 25 76 83 35 90 53 16 34 18 |  5 26 77 53 36 90 43 61 94 89 41 99 93 92 56  2 10 29  1 47 55 38 66 13 15
Card  48:  3 75 52 55 41 86  9 54 26 98 | 93 30 12 72 36 62 79 25 61 90 31 87 59 88 27 56 99  6  5 11 58 80 78 77 43
Card  49: 34 44 25 93 74  5 15 37 14 30 |  8 15 89 36 38 60  9 48 93 74 96 20 44 67 30 97  5 70 86 80 31 25 14 51 66
Card  50: 93 78 49 98 76 74 58  7 60 46 | 44 15  1 78 67 28 13 36 46 64 49 98 56 12 97 60 18 55 91 32 89 94 99 66 76
Card  51: 36 78 35 85 27 17 18 42 75 92 | 63  5 62 52 65 71 28  3 15 97 22 99 23 44 16 10 88  4 67 34 80 38 27 83 69
Card  52: 70 74 14 71 11 83 86 18 99 77 | 26 49 98 94 35 67 31 66 46 36 73 87 10 43 92  7 25 81 62 82 55 39 64 78  4
Card  53: 14 83 11 94 46 63 42 29 34 56 | 25 71  3 39  2 64 70  5 68 90 32 75 36 14 74 79 10 58 16 60 83 19 54 35 52
Card  54: 35 77 49 19 41 94 36 83 73 75 | 62 17  8 13 20 98 21 31 88  6 14 30 42 53 59 61 57 22 54 27 74 66 50 58  7
Card  55: 25  6 23 81 19 51 17 58 29 72 | 12 67 61 97 85 76  2 66 27  1 41 73 78 90 22 10 82 79 39 60 42 72 96 17 24
Card  56: 23 13 16 27 17 15  9 66 89 93 | 48 67 53 22 96 33  5 25 94 24 43 68 49 77 63 42 73 97 86 83 56 62 36 31 76
Card  57: 36 67 99 41 58 76  8 72 70 35 | 62 47 69 27  9 48 34 83 50  7 98 78 94 93 15 52 25 84  4 80 24 10 40 91 11
Card  58: 14  6  7 21 88 32 54 42 56 33 | 55 62 54  7 14 21 88 25 11 80 58  5 93 12 23 86  6 42 33 96 67 61 49 56 32
Card  59: 61 60 16 27 13 15 17 49  3 19 | 49 94 17 19 15  1 18 37  4 77 55 12  8 13  9 89 64 60 69 22 16 43 27  3 61
Card  60: 14 95 23 48 96 36 16 77 13 17 | 24 77 53 16 11 36 52 13 26 23 85 50 14 83 96 71 41 48 45 81 95 44 31 17 21
Card  61: 72 13 69 70 52  8 16 76  3 65 | 27 96 13 37 49 79 70 57 23 86  9 18 65 21  1 72 85 22 16 68 31 24 81 73 55
Card  62: 28 94 10 97 71 42 89 53 27 75 | 28 97 12 89  2 54 21 42 48 43 91 82 63 10 71 90 38  3 75 27 46 53 94 66 77
Card  63:  1 36 27 90 97 33 87  9 89 44 | 12 30 97  7 33  5 39 47 14 16 28 83 74  3 38 80 99 20 69 27 85 72 31 18  2
Card  64: 59 52 91 93 90 38 36  9 98  3 | 98 90 52 92 78 36 87 75  9 76 59 39 53 63 86 29  5 64  3 32 93 80 65 38 91
Card  65: 78 61 30 58 32 23  1 28 37 39 |  5 35 32 37  1 20 21 70 30 61 93 34 76 40 58 89 27 26 36 28 39 71 78 56 23
Card  66: 88 68 34  6 60 23 14 94 91 33 | 11 31 50 58 14 33 80 82 99 79 87 40 75 93 88 24 23  6 94 91 63 34 39 38 16
Card  67: 93 88 20 45 69 97 54 80 43 79 |  2 34 18 85 60 63 30 28 90 77 80 65 41 37 69 94  1 71 59 38 40 50 73 96 64
Card  68: 20  7 49 18 56 86  8 43 35 42 | 95 86 35 93 94  6 18 84 42  3 20 14  5 54 17 41 88 82 71 24 87 27 43 16 53
Card  69: 69 46 23 15 97 36 34 24  4 31 | 34 43  6 36 46  4 69 17 97 79 96 67 54 64 23 89 45 76 60 15  2 31 94 24 70
Card  70: 88 55 97 13 26 68 28 25 92 39 | 55 54 80  5 40 39 84 13 60 14 70 90 92 27 26 31 62 91 23 59 28 97 68 88 25
Card  71: 76 78 20 57  1 26 42 50 92 65 |  5 88 16 65 92 17 97 42 74 50 71 76 46 57 26 47 25  9 90 77 78 56 98 20  1
Card  72:  1 49 13 29 14 84 38 73  2 80 | 28 13 92 86 65 89 87 50 98 25 10 30 52 33 40 44 75 21 88 57  5  8 34 70 91
Card  73: 60 30 20  5 76 59 58 77 44 24 | 43 18 77 24 44 76 41 51 53  4 59  5 84 46 45 35 82  1 78 65 58 95 86 30 73
Card  74: 32 92 95 62 46  1 12 53 31  6 | 59 35 65 91 39 40 72 61 45 60 98 51  6 66 43 81 89 47 75 19 85 16 69 96 25
Card  75:  9  2 82 57 36 17 91 11 54  5 |  7 97 11 27  2 36 98 88 45 44 80 34 17 39 31 57 77 73 47 68 62 78 61 91 67
Card  76: 79 36 67 27 35 90 14  1 43 31 | 26 96 48 32 28 11 87 45 81 71 58  5 86 57 34 78 91 12 51 56 40 84  9 64 39
Card  77: 82 36 42 46 40 13 76 51 49 34 | 84 88 68 76 11 56 66 17 96  7 72 31 65 13 97 90  9 39 23 93 28 46 78 44 34
Card  78: 91 20 12 28 84 50 14 94 93 86 | 97 72 58 82 87 67 12 71 50 61  9 35 29 55 39 92 54  7 24 18 41 38 22 49 51
Card  79: 31  6 69 83 94 47 34 33 23 21 | 11 10 61 35 59 90  7 12 54 45 92 52 19  4 64 24 50 71 73 30 65 36 39 79 15
Card  80: 70 39 43 66 31 90 27 88 78 97 |  5 76 31 21 80 11 71 53 15 79 55 93  3 64 14  1 96 41  8  4 44 73 91 77 45
Card  81: 46 69 21 40 35 16 74 50 17 86 | 45 96 48 15 11 20 73  1 59 38 98 55  4 39 24 44 85 13 63 94 92 68 37 10 78
Card  82: 20 42  3  4 71 63 38 83 51 41 | 66 70 34 61 89 96 91 15 62 87 43 23 28 55 67 82  1 53 35 60 16 29 56 95 54
Card  83: 78  1 65 82 90 45 55 67 37 15 | 50 40 46 79  1 80 86 94 85 53 84 13 90 17 16 32 21 19  7 58 44 77 57 81 74
Card  84: 59 82  8 99  1 24 16 48 51  6 |  8  3 22 35 36 58 97 55 73 95 51 48 70 57 84 69 40 66 13 78  5 63 94 49 18
Card  85: 76 83  7 37 28 79 44 39 92 18 | 65 97 61 68 92 40 80 95 29 91 81  6 62 73 44 21  4 17 28 48 36 37 19 25 42
Card  86: 72 77  6 23 42 93 19 87 45 56 | 78 21 18 86 73  2 22  9 98 65 87 89 40  7 69 71 79 37 67 20 74 10 34 15 28
Card  87: 92 72 98 30 24 74 86 52 69 87 | 94 15 60  6  3  5  4 69 33 74 49 51 72 41 76 10 52 67 86 35 34 22 98 92 66
Card  88: 48 96  2 25 95 28 37 94 45 30 | 38 39 56 22 71 21 18 87 46 14 79 77 43 72 10 89 34 57 58 92 31  5 91 54 66
Card  89: 63 31 84 20 99 21 30 67 60 38 | 50 29 21  5  1  8  9 14 76 16 24 17 33 42 99 62 96 39 83 32 44 51 23 88 63
Card  90: 90 96 82 28 20  8 79 94 84 17 | 74 45 12 55 24 94 28 35  4  7 79 57 82 63 84 73 20 10 96 89 69 90 22 16 17
Card  91: 99 44 27 28 15 66 61 41 54 81 | 77 50  8 26 33 28 61 81 41 15 92  2 66 36 62 43 27 11 58 30 88 65 53 57 82
Card  92: 35 99 38 22 33 70 65 14 51 91 | 68 35 65 77 78 33 53 99 38 96 87 34 69  6 83 17 30 91 70 20 85 75 82 14 15
Card  93: 77 42 61 83 98 28  5 34 23 88 | 88 61 20 98 13 36 68 44  5 14 52 80 55 37 25 32 96 58 77 46 28 26 21 83 75
Card  94: 57 17 27 35 62 85 92  7 65 67 | 93 68 79 95 59 64 10 97 96 35 90  6  5 80 73 85 70 62 19 13 52 74 72 17 81
Card  95: 38 96 40 36 44 78 28 47 70 90 | 82 47 32 78  9 84 42 62  6 37 68  7 31 97 93 22 11 58 23 63 79 35 98 36 70
Card  96: 37 66 81 97 23 51 40 31 86 17 | 63 39 23 12 97 55 31 11 47 24 43  8 79 61 49 14 88 53 92 30 94 93 35 60  9
Card  97: 76 97 35 85 90 70 53 54 40 91 | 22 12 33 32 56 23 59 62  6 48 67 17 65 84 94 96  9 41 68 21 10 61 91 52 51
Card  98: 99 14 64 51 61 40 30 59 87  4 | 57 53 36 26 78 37 86  7 43 74 44 33 34 58  3 85 67 82  2 94 38 32 65 80 45
Card  99: 69 79 90 36 45 71 94 43 50 70 | 11 67 31 25 84 57 39 89 34 78 51 68  9 35 54 70 95 29 56 83 63 47 20 58 23
Card 100: 39 35  5 66 47 37  2 90 20  4 | 56 61  1 57 48 14 96 11 42 98  6 24 45 19 31 49 21 74 53 41 25 95 69 40 79
Card 101: 89 50  4 33 80 44 14 92 51 28 | 11 51 95 73 80 44 50 89 93 72 33 29 23 60 59 28 54 49 14 75 92 82  7 24 78
Card 102: 96 88 16 82 75 33 44 72  6 85 |  7 42 68 56 98 30 44 20 62  6 91 95 16 40 18 11 83 13 52 50 61 45 80 74  4
Card 103: 37 42 77 46  8 41 30 62 90 82 | 70 90 72  8 46  9 35 45 37 41  4 93 99 81 42 14 20 57 85 83 82 30 62 43 77
Card 104: 59 43  8 48 32 69 58 40 44 60 | 50 17 95 27 44 89 53 34 59 11 72 48 43 64 40 88  3 58 32 60 37  8 91 69 92
Card 105:  5 63 74 79 60 89 78 95 54  6 | 97 47 24 70 22 92 63 41 67 33 84 16 62  6 52 90 57 82 74 86 46 50  5 32 78
Card 106: 81 64 44 37 41 36 59 50 20 22 | 25 22 39 11 15 36 90 88 16 59 19 84 20 44 58 63 53 71 29 40 94 56 61 81  6
Card 107: 69 39 95 35 82 15 84 49 74 31 | 95 76 61 38 64 58 33 28 97 23 35 78  8  5 34 43 59 65  4 26 30 87 96 50 11
Card 108: 16 36 75 64 66 29 77 12 40 10 | 66 10 83 15 49 40 37 86  9 52 24 50 29 20 23 41 16 25 64 76 56 36 19 34 77
Card 109: 70 41 35 15 46 74 40 77 42 93 | 82 99 30 12 49 64 70 41 56 38  5  6 87 68 80 26 39 35 63 22 27 23 74 93 46
Card 110:  6 77 75 51 74 66 45 80 48 73 | 48 87  5 62 70 56  9 96 12 21 83 49 25 99  3 38 44 18 13  2 28 88 58 78 65
Card 111: 78 28 72 47 41 44 90 74 68 87 | 80 95 90 26 54 48 56 29 96 67  8 98 62 59 63 53 68  5 72 12 18 41 51 14 93
Card 112: 28 91 33 83 81 73 15 24 21 75 | 39 92 21 52 71 85 89 53 62 33 28 95 43 65 88 78 40 55 34 66 20 12 32 91 29
Card 113: 55 40  8  1  7 35 70 65 42 41 | 12 80 19 62 48 39 87 89 96 13 16 88 54 63  9 28 73 43 86 33 26 72 35 17  1
Card 114: 61 15  3  7 35 76  9 66 33 74 | 16  7 38 20 79 70 56 27 99  5 95 39 43 49 73 78 25 11 96 84 85 55 67 91 29
Card 115: 87 99  8 31 43 82 67 74 76 49 | 91 77 49 41  6 45 81 34 24 72 79  1 60 59 12 10  9 22 96  5 83 70  7 93 63
Card 116: 27 96 16 90 61 72 73  9 64 35 | 89 55 44  2 11  7 74 76 85 13 48 15 50 40 63 73 31 58 46  8 38 37 10 97 98
Card 117: 28 83 58 84 81 23 76 41 69 46 | 73 55 87 71  3 20 43 26  7 24 23 92 97 27 88 22 11  6 45 10 38 68 65  5 82
Card 118: 84 47 70 88 25 20 58 82  7 87 | 52 91 53 26 79 73 85  2 12 86 69 49 67 13 92 63 36 62 23 46 35 95 90 40 64
Card 119: 12 28 10 43 44 49 38 36  7 30 | 63 84 43 30 10 44 73 98 49 66 86 82 38 36 76 60 20 28 12  3 26 74  7 79 72
Card 120: 64 47 61 68 90 84 54 10 81 12 | 47 64 10 34 85  7 98 73 68 12 92 42 31 81 54  2 49  4 61 90 84  5 74 93 25
Card 121: 47 50 44 35 40 60 28 80 23 99 | 15 22 16 93 60 40 88 83 34 89 46 69 57 33  3 98  5 81 28  2 44 54 87 71  4
Card 122: 46 53 63 32 87 37 49 25 99 73 | 95 65  7 80 35 74 98 30  8 52 84 40 64 36 23 45 67 33 76 96 90 31 39 78 22
Card 123: 92 37 35 10 89 84 85 16  3  9 | 10 28 15 60  6 21 58 95 75 84 35 99 44 59 37  9 51 91  1 61  3 92 69 85 89
Card 124: 94 67 68  3 39 78 76 79 36 74 | 17 73 75 29 86 89 72 70 12  6 66 85 13 83 37 42 28  2 84 30 10 95 20 65 44
Card 125: 28 64 58 33 90 97  7 98 66 16 |  7 66 46  9 86 56 16 33 47 90 65 87 15 32 31 67 64 28 49 17 25 84 97 55 57
Card 126: 14 22  7 83 85 89 27 39 78 69 | 66 45  2 20 62 38 51 90 11 43 60 57 27  3 18 94 54 59 46 58 37 73 87 12 67
Card 127: 14 39 77 20 29 55 94 38 88 11 | 55 38 51 87 72  4 69 27 41 68  9 94 37 29 58 59 48 20 17 39 92 19 53 14 16
Card 128: 43  1 85 87 45 51 64 91 93 73 | 21 13 55 72 14 57 46 43  2 83 62 36 59 33 86 48 68 19 40 54 50 35 39 81 41
Card 129: 61 90 20  1 76 79 66 18 94 99 | 92 30 20  8 73 28 38 15 13 36 79  1 64 76 33  3 26 88 18 23 93 12 58 91 37
Card 130: 31 34 13 96 55 85 51 95 54 78 |  6 21 47 48 94 27 86 46  8 25 84 15 43 13 23 76 60 32 58 11 99  1 79 88 55
Card 131: 71 52 74  6 43 37 73 89  9 16 | 22 24 12 11 76 40 99 87 17 78 61 63 53 75  1 77 25 58 31 23 86 20 97 49 38
Card 132: 75 27 99 16  5 17 60  1 28 34 | 44  3 82 47 97 30  4 69 23 11 98 46 29 96 81 31 51  7 94 67 83 38 32 73 60
Card 133: 21 46 70 93  7 66 60 51 63 35 |  4 24 17 62 61 15  9 95 72 43 67 83  6 75 88 12  8 22 40 68 54 76 20 37 32
Card 134: 55 33 24 47  9  6 86 43 89 30 | 49 23 59 98 72 90 13 93  1 26 78 44 83 82 40 41 71 79 68 57 96 92 48 17 10
Card 135: 18 88 45 34 65  8 92 37 98 30 | 72 34 88 65 50 30  9 64  8 13 10 36 69  3 22 18 78 35 98 97 81 83 57 92 37
Card 136: 62 13 33 30 58  9 21 68 54 48 | 55 49 81 38 48 39 75 17 54 84 47 24 71 44 91 37  4  3 10 64 86 92 30 51 40
Card 137: 49  8 77 76 25 88 39 17 63 22 | 56 71  8  7 17 41 76 74 77 15 88  3 97 25 48 98 64 39 55 49 33 83 63 22  2
Card 138: 11 36 77 55 53 47 37 76 66  8 | 37 13 24 66 96 35  4 22 53 98 70 50 76 77 97 11 38  8 75 47 51 43 15 36 55
Card 139: 61  9 64 99 47 50  6 75 45 65 |  9 99 31 10 72 66 45 75 14 47 60  2 64  6 50 65  8 52 58 61 25 38 29 90 19
Card 140: 79 41 61 71 96 11 60 24 74 95 | 40 71 11 96 75 33 41 64 49 55 61 76 95 34 24 20  9 60 26 69  1 97 86 29 74
Card 141: 64 44 35 96 32 78 94 53 68 97 |  9 78 40 97 56 83 48 64 95 69 35 68 59 43 17 32  4 60 53 52 98 61 96 94 44
Card 142: 73 34 61 17 49  3 35 66 85 58 | 28 13 21 45 85 19 67 29 49  5 30 61 38 52  2  3 48 31 17 99 58 34 80  9 14
Card 143: 99  8 50 43 75 69 88 40 13 91 | 85 43 67 24 91 62 99 38 18 16  2 34 26 82 98  6 53 37 77 33 30 42  3 31 36
Card 144: 90 86 40 96 44 43 91 93 20 80 | 66 64 19 79 18 10 95 52 72 31 89 92 62 68 23 75 78 84 37 15 13 36 38 26 81
Card 145:  2 92 97 59 98 96 34 41 25 72 | 10 20 43  6 42 22 92 61 73 99 21 46 41 25 34 96 63 50 59 13 91 38 79 57 72
Card 146: 50 81 51 16  9 34 30 65 60 53 | 55  6 75 29 96 42 86 11 18 45 46 77 87 54 25 91 43 94 23 24 99 82 31 72 93
Card 147: 84 27 17 26 33 98 36 58  5 13 | 90 65 96 28 31 10 14 95 46 94 22 16 68 50 77 73  9 42 59 64 91 19 67 63 99
Card 148: 67 62 86  8 87 92 94 80 93 25 |  9  3 60 66 47 23 20 72 28 75 11 37 50 13 34 58  2 64 16 98 88 56 81  7 38
Card 149: 20 93 31 26 11 42 53 37  3 84 | 22 79 34 17 42 94 32 55 33  2 13 36 80 63 14 11 59 12 98  8 50 93 20 53 84
Card 150:  1 75 15  7 80 59 99 86 71 58 | 31 72 14 67 85 18 96 15  8 13 80 47 45 64 60 24 46 98  6 97 39 49 69  4 54
Card 151: 56 46 61 40 86 85 74 79 94 36 | 10  9  2 32 22 43 87 40 68 20 36 94 89 86 45 27 42 71 92 59 16  6 24 81 73
Card 152: 65 40 13 51 60 42  1 99 19 73 | 74 72 39 50 49 27 37 78 51 38  7 41 23 95 81 43 97 19 73 28 89 17 91  6 62
Card 153: 28 76  9 48 94 45 23 32 26 21 |  4 63 33 28 36 81 98 14 50 55  3 31  1 71 62 17 70 80 46 59 51 20 38 22 12
Card 154: 11 53 34 58 30  8 86 71  2 96 | 85 92 62 82 90 75 51 15 41 19 70 55 67 74 77 27 64  6 14 48 76 88 25 83 42
Card 155: 19 83 27 70 46 16 57 48 18 86 | 13  4 73  2 75 36 53 69 15 21  9 10 64 95 78 61 43 71 12 99 92 56  6 42 28
Card 156: 87 63 55 52 11 78 15 42 83 38 | 70 40 42 97 41 48 87 78 83 73 72 99 63 66 11 22  6 69 76  3 61  1 91 16 51
Card 157: 63 87 28 40 56 50 64 73 43 51 | 16 21  7 50 44 88 35  9 32 80 51 30 95 82  5 46 76 65 37 25 29 61 26  4 56
Card 158: 47 63 14 74 88 90 71 87 95 32 | 14 30 47 88 15 29 41 11 59 90 92 64 77 94 68 89 12 19 85 28 62 87 33 71 95
Card 159: 21 46 50 45 92 35 73 33 25 81 | 17 38 72 94 29  6 49  7 71 21  9 80 99 39 58 25 44 45 35 57 20 33 61 50 73
Card 160: 18  1 12 75 88 32 59 51 73  9 | 94 83 70  5  1 73 18 75  9 92 76 45  7 36 30 65 60 32 25 12 33 51 88 59 23
Card 161:  6 15 69 39 76 73 99 84 21 32 | 82  5 64 79 92 91  2 48  6 12 45 43 80 95 33 21 55 15 66 34 73 16 58 39 54
Card 162: 74 67 93 73 40  6 54 81 30 99 | 89  4 36 18  6 17 31 71 96 70 77 83 20 99 11 26 93 62 85 74 24 30  8 84  3
Card 163: 74 58 30 34 37 66 28 22 88 25 | 82 47 88 36 93 81 35 20 12 79 54 24 40 68 41 51 86 30 11 65 34  1  8 69 76
Card 164: 71 77 50 90  5 56 92 80 34 22 | 82 31 50 70 69 90  5 85 39 80 73 77 54 56 75 34 15 92 26 32 22 42 17 71 23
Card 165: 21 41 33 75 19 88 18 40 86 64 | 35 53 99 80 86 30 63 19 50 74  4 41  8 32 21 64 75 51 27  6 23 18 90 72 40
Card 166: 76 73 55 71 90 22 12 81 34  9 | 66 63 23 30 87 62 59  7 67 89 78 24 64 68 27 97 19 25 94 53 48 56 45 70 33
Card 167: 98 60 45 13  8  9 66 82 41 95 | 86 19 46 44 78 23 41 83 84 13 54 12 10  5 98 22 57 21 59 80 58  1 69 82 93
Card 168: 40 36 18  3 44 29 86 23 13 75 | 18 44  3  9 40 62 55  1 78 49 27 13 87 48 12 36 86 17 29 76 34 20 32 50 94
Card 169: 64  4 61 79 17 20 84 37 70 99 | 73  5 90 54 55 96 60 36 28 74 64 99 68 61  4 33 29 70 27 42  8 67 15 17 34
Card 170: 12 91 87 50 84 14 38 93 43 78 | 95 46 66 64 47 60 36 70 97 73 56 93 83 65 11  1 15  7 42 41 59 40 84 82 62
Card 171:  3  6 81 89 27 88 46 37 69 14 | 60 31 64 61 65 25 83 43 19 20 74 75 17 92  4 53  1 91 97 16 26 22 95 50 84
Card 172: 40 35 87 27  3 58 81 45 59 80 | 90 21 88 64 66 52  5 63 65 40 13 79 82 62 85 34 78 37 33 27 87 26 58 95 75
Card 173:  8 45 37 66 63  7 97 42 95 28 | 56 45 24 78 82 57 83 51 18 95  5 79 59 50 30 11 19 43 88 90 49 62 17 68 22
Card 174:  8 56 80 50  6 12 36 32 24 98 | 53 22 70 13 62 58 15 79 78  7  9 38 26 63 75 44 17 82 67 59 71 86 39 46 93
Card 175: 43 47 46 35 94 39 67  3  2 24 | 86 23 52 91 66 45 81 75 61 80 10 17 60 16 44 57 83 62 32 37 38 12 48 93 84
Card 176: 82 97 11 25 15 68  7 24 77 46 | 18 35  2 80 48 75 19 47 70 39 99 43 28 62 33 50 13 17 10 58 86 45 16 88 60
Card 177: 95 59 14 68 13 22  4 75  2 70 | 64 45 12 31 99 77 59 28 91 42 21 89 67  9 90 78 37 14 46 75 52 15 22 79 96
Card 178: 83 17 81 96  9  2 80 70 57 53 | 85 80 62  9 29 25  8 83  2 66 17 68 84  3 81 42 57 23 15 72 96 53 70  7 73
Card 179: 48 84 29 81 88  3 10 27 21 16 | 74 21 97 28 18 81 84  6 42 76 29 89 48 83 50  3 88 73 22 10  2 55 16 27 36
Card 180: 30 77 49 58 39  1 97 13 25 34 | 75 53 61 99 34 62 48  1 51 77 84 25 49 26 79 59 13 11 30 60 21 39 97 93 58
Card 181: 73 52 53 23 83 74  1 87 86 54 | 23 53 54  5 11  1 55 73 74 44 46 82 34 41 60 67 31 96 35 52 86 15 18 87 83
Card 182: 90 48 22 80 52 41 78 11 55 32 | 60  9  2 21 87 42 68 16 15 50 95 51 99 40 30 52 20 12 26 49 92 19 84 36 76
Card 183: 33 63  2 19 24 61 10 14 37  1 | 59 20 32 69 98 55 85 36 29 71 61 68 14  2  7 88 39 16 94 92 74 45 90 38 35
Card 184: 85 65 43  1 75 27 17 10 91 18 | 27 42 55 89 38 66 82 75 64 43 50 39 52 10 59 93 18  3 91  1 85 40 26  8 65
Card 185: 74  7 10 70 95 76 27 50 13 36 | 70 15 58 18 13 74  4 64 50 44 54 27 56 35 87 28 76 92 85 36 66 95 90 96 78
Card 186: 45 59 16 99 43 79 89 90 40 49 | 18 97 56 67 61 29 80 34 91 88 33 95 41 76 78 68 28 46 51 93 98 72 54 74  8
Card 187: 87 69 84 72 92 86 13 76 40 38 | 38  8 37 71 30 49 50 21 51 39 34 90 84 16 11 10  4 63  7 42 36 77 48 85 20
Card 188: 96 18 79 50 81 65 84 74 76 58 | 21 48 35 12 83 70 23 88 58  3 74 84 72 76 43 71  8 27  2 37 46 89  5 54 81
Card 189: 22 90 97 45 19 70 36 23 81  2 |  6 60 40 57 41 16 91 42 58 38 92 31 15 76 35 73 11 33 24 30 32 85 18 51 93
Card 190: 72 69 52 65 14 74 64 57 70 33 | 41 99 32 49 96 34 82 80 42  1 69 40 64 44 88 86 14 31 28 22 38 46 45 54 29
Card 191: 86 70 76 64 97  6 56 34 87 41 | 96 81 52 89 28 16 29 90 41 32 70 68  9 88 30  5 60 92 61 49 56 50 46 37 11
Card 192: 14 42 66 20 48 94 55 51 23 75 | 83 74 97 43 28 72 18 26 13 59 93 19 10 60 89 82 63 50  3 21  4 79 91 98 36
Card 193: 13 33 98 37 19 86 32 15 95 96 | 56 90  5 60 24 21 46 73 29  3 58 75 77 66 41 48 82 84 10 53 43 15 18  2 89
Card 194: 77  6 10 48 14 79 73 51 49 25 | 86 12 37 23 43 34  5 89 97 27 53 70 75 19 15 79 45 26  1 73 68 36  2 78 18
Card 195: 94 57 24 37 46 75 73 10 29  5 | 78 25 21 48 22 46 38 76 19 17 64 32 88 99 63 12 20 41 16  7 14 54 81 97 89
Card 196: 76 48 15 89 44 50 79 80 52 78 | 93 55 21 18 73 31 47 20 97 83 87 30  6 24 77 74 67 45 76 65 37 43 42 98 38
Card 197: 67 21 75 10  9  6 47 88 45 70 | 91 95 58 82 52 50 87 81 78 13 64 53 57 14 55 25 36 76 19 86 56  2 16 54  1
`;
exports.sampleData = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;
