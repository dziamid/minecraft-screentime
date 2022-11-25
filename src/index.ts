import {execSync} from "child_process";
import psList from 'ps-list';

const run = async () => {
    const list = await psList();
    const processes = list.filter(l => /minecraft/i.test(l.cmd || '')).filter(l => !/minecraft-screentime/i.test(l.cmd || ''));
    const pids = processes.map(p => p.pid);
    if (pids.length === 0) {
        console.log(`Minecraft seems to be closed`);
        return;
    }
    const killCommand = pids.map(pid => `kill ${pid}`).join(';');
    console.log(`Running: "${killCommand}"`);
    execSync(killCommand);
    console.log(`Finished. Minecraft should be closed now`);
};

run().catch((e) => console.error(e));
