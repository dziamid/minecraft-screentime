import {execSync} from "child_process";
import {plistLabel} from "./common";

const run = async () => {
    execSync(`launchctl start ${plistLabel}`);
    console.log('Minecraft should exit now');
};

run().catch((e) => console.error(e));
