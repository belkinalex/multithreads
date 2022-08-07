import { performance } from 'perf_hooks';
import os from 'os';
import * as modules from './modules';

const ITERATIONS = 5_000_000_000;
const CPU_COUNT = os.cpus().length;

const start = async () => {
    for await (let module of Object.keys(modules)) {
        console.log(module, 'module started');
        const t0 = performance.now();
        const result = await modules[module].start(ITERATIONS, CPU_COUNT);
        const t1 = performance.now();
        console.log('    PI:', result);
        console.log(`    time:${(t1-t0)/1000}s`);
    }
};

start().catch(e => console.error(e));
