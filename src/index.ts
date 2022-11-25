import psList from 'ps-list';
import {execSync} from "child_process";

const run = async () => {
    const list = await psList();
    const mPids = list.filter(l => /minecraft/i.test(l.cmd)).map(l => l.pid);
    const killCommand = mPids.map(pid => `kill ${pid}`).join(';');
    execSync(killCommand);
};

run().catch((e) => console.error(e));
