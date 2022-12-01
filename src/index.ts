import psList from "ps-list";
import { config } from "dotenv";
import { fetchDowntime, isDowntimeTime, killProcesses } from "./utils";

config();

const run = async () => {
  const downtime = await fetchDowntime();
  console.log(`Downtime: ${JSON.stringify(downtime)}`);
  const now = new Date();
  const isDowntime = isDowntimeTime(downtime, now);

  if (!isDowntime) {
    console.log(`It's ok to play Minecraft`);
    return;
  }

  const list = await psList();
  const processes = list
    .filter((l) => /minecraft/i.test(l.cmd || ""))
    .filter((l) => !/minecraft-screentime/i.test(l.cmd || ""));
  
  killProcesses(processes);
};

run().catch((e) => console.error(e));

