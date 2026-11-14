"use strict";
function solutionA(A, K) {
    let n = A.length;
    for (let i = 0; i < n - 1; i++) {
        if (A[i] + 1 < A[i + 1])
            return false;
    }
    if (A[0] != 1 && A[n - 1] != K)
        return false;
    else
        return true;
}
// const cache = new Map<number, number>();
function solutionX(num, originalNum, count) {
    if (num === 0) {
        return count;
    }
    const oldCount = cache.get(num);
    if (oldCount) {
        return oldCount + count;
    }
    count++;
    if (num % 2 == 0) {
        num /= 2;
    }
    else {
        num -= 1;
    }
    const result = solutionX(num, originalNum, count);
    cache.set(num, result);
    return result;
}
const cache = new Map();
function solutionZ(num, number) {
    let count = 0;
    if (num === 0) {
        return count;
    }
    let cached;
    for (; num > 0; count++) {
        if (cached = cache.get(num)) {
            break;
        }
        if (num % 2 == 0) {
            num /= 2;
        }
        else {
            num -= 1;
        }
    }
    count += cached ?? 0;
    cache.set(number, count);
    return count;
}
function solutionVV(S) {
    let num = parseInt(S, 2);
    return solutionZ(num, num);
}
function solution(S) {
    let temp = S.split('');
    for (let i = 1; i < temp.length - 1; i++) {
        if (temp[i - 1] == 'H' && temp[i] == '-' && temp[i + 1] == 'H') {
            temp[i - 1] = 'X';
            temp[i] = 'T';
            temp[i - 1] = 'X';
        }
    }
    for (let i = 1; i < temp.length - 1; i++) {
        if (temp[i] != 'H') {
            continue;
        }
        if (i - 1 >= 0 && temp[i - 1] != 'T' && temp[i - 1] == '-') {
            temp[i - 1] = 'T';
            temp[i] = 'X';
        }
        else if (i + 1 <= temp.length && temp[i + 1] != 'T' && temp[i + 1] == '-') {
            temp[i] = 'X';
            temp[i - 1] = 'T';
        }
        else {
            return -1;
        }
    }
    let count = 0;
    for (let i = 1; i < temp.length - 1; i++) {
        if (temp[i] === 'T') {
            count++;
        }
        else if (temp[i] === 'H') {
            return -1;
        }
    }
    return count;
}
//# sourceMappingURL=test-a.js.map