import { config } from "dotenv";
import { fetchDowntime, getMinutesBeforeDowntime, isDowntimeTime, killMinecraft } from "./utils";
import { execSync } from "child_process";

config();

const run = async () => {
  const downtime = await fetchDowntime();
  console.log(`Downtime: `);
  const now = new Date();
  const isDowntime = isDowntimeTime(downtime, now);
  const isPlaytime = !isDowntime;
  console.log(`Now: ${now}, downtime settings: ${JSON.stringify(downtime)}, isDowntime: ${isDowntime}`);



  if (isPlaytime) {
    const mins = getMinutesBeforeDowntime(downtime, now);
    console.log(`Playtime, ${mins} minutes left to play minecraft`);
    if (mins <= 5) {
      execSync(`say 'You have ${mins} minutes left to play minecraft'`);
    }

    console.log(`Not downtime, exiting!`);
  }

  if (isDowntime) {
    console.log(`Downtime, killing minecraft`);
    await killMinecraft();
  }
};

run().catch((e) => console.error(e));
