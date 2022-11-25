import {execSync} from "child_process";
import {plist, plistPath} from "./common";

const run = async () => {
    console.log(plist);
    execSync(`echo '${plist}' > ${plistPath}`);
    execSync(`launchctl unload ${plistPath}`);
    execSync(`launchctl load ${plistPath}`);
};

run().catch((e) => console.error(e));
