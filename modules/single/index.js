
const pi = (start, end) => {
    let sum = 0;
    for (let i = start; i < end; i += 1) {
        const sign = i % 2 ? -1 : 1;
        const term = 2 * i + 1;
        sum += sign / term;
    }
    return 4 * sum;
}
export const start = (iterations) => {
    return pi(0, iterations);
}
