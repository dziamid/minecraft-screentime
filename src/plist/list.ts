import { execSync } from "child_process";
import { plistLabel } from "./common";
import psList from "ps-list";

const run = async () => {
  const list = await psList();
  const processes = list
      .filter((l) => /minecraft/i.test(l.cmd || ""))
      .filter((l) => !/minecraft-screentime/i.test(l.cmd || ""));

  console.log(`Found ${processes.length} minecraft processes`);
  console.log(processes.map((p) => p.cmd).join("\n"));
};

run().catch((e) => console.error(e));
