import * as path from 'path';
import { fileURLToPath } from 'node:url';
import { fork } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const startWorker = (worker, start, end) => new Promise((resolve, reject) => {
    worker.on('message', msg => resolve(msg.result));
    worker.on('error', reject);
    worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    });
    worker.send({ start, end });
});

export const start = async (iterations, cpuCount) => {
    const piFunc = {};
    for (let i = 1; i <= cpuCount; i += 1) piFunc[i] = fork(path.resolve(__dirname, 'pi.js'));

    const chunk = Math.trunc(iterations / cpuCount);
    let promises = [];
    for (let i = 0; i < cpuCount; i += 1) {
        promises.push(startWorker(piFunc[i + 1], i * chunk, (i + 1) * chunk));
    }
    const result = await Promise.all(promises);
    for (let i = 0; i < cpuCount; i += 1) piFunc[i + 1].kill('SIGHUP');
    return result.sort().reduce((a = 0, cur) => a+cur);
}

