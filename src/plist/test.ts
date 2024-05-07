import { execSync } from "child_process";
import { plistLabel } from "./common";

const run = async () => {
  execSync(`launchctl start ${plistLabel}`);
};

run().catch((e) => console.error(e));
