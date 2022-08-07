import noroutine from 'noroutine';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const start = async (iterations, cpuCount) => {
    let modules  = [];
    const piFunc = {};
    for (let i = 1; i <= cpuCount; i += 1) {
        piFunc[i] = await require('./pi.cjs');
        modules.push(piFunc[i]);
    }
    noroutine.init({
        modules,
        pool      : cpuCount,
        wait      : 100,
        timeout   : 100_000,
        monitoring: 1_000,
    });
    const chunk = Math.trunc(iterations / cpuCount);
    let result = [];
    for (let i = 0; i < cpuCount; i += 1) {
        result.push(await piFunc[i+1].calc(i*chunk, (i+1)*chunk));
    }
    await noroutine.finalize();

    return result.sort().reduce((a = 0, cur) => a+cur);
}
