import async from 'async';

const pi = (start, end) => {
    let sum = 0;
    for (let i = start; i < end; i += 1) {
        const sign = i % 2 ? -1 : 1;
        const term = 2 * i + 1;
        sum += sign / term;
    }
    return 4 * sum;
}
export const start = async (iterations, cpuCount) => {
    const chunk = Math.trunc(iterations / cpuCount);
    let result  = [];
    let funcArray  = [];
    for (let i = 0; i < cpuCount; i += 1) {
        funcArray.push([i*chunk, (i+1)*chunk]);
    }

    await async.map(funcArray, async ([start,end]) => result.push(pi(start, end)));
    return result.sort().reduce((a = 0, cur) => a+cur);
}
