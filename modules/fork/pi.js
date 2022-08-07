const pi = (start, end) => {
    let sum = 0;
    for (let i = start; i < end; i += 1) {
        const sign = i % 2 ? -1 : 1;
        const term = 2 * i + 1;
        sum += sign / term;
    }
    process.send({ result: 4 * sum });
}

process.on('message', ({start, end}) => pi(start, end));

