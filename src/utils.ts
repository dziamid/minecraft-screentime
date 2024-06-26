import fetch from "node-fetch";
import { addDays, isAfter, isWithinInterval, set } from "date-fns";
import psList, { ProcessDescriptor } from "ps-list";
import { execSync } from "child_process";

export type TimeInterval = { from: string; to: string }; // {from: '21:00', to: '07:00'}

export async function fetchDowntime() {
  const downtimeUrl = process.env.DOWNTIME;
  if (downtimeUrl === undefined) {
    throw `Downtime env var is not defined`;
  }
  const downtime = (await fetch(downtimeUrl).then((data) => data.json())) as TimeInterval;
  if (!downtime || !downtime.from || !downtime.to) {
    throw `Malformed downtime JSON: ${JSON.stringify(
      downtime
    )}, expecting json of TimeInterval type`;
  }

  return downtime;
}

/**
 * Check if current (local) time given downtimeInterval
 *
 */
export function isDowntimeTime(downtimeInterval: TimeInterval, now: Date): boolean {
  const { start, end } = parseDowntimeInterval(downtimeInterval);

  return isWithinInterval(now, { start, end });
}

export function getMinutesBeforeDowntime(downtimeInterval: TimeInterval, now: Date): number {
  const { start } = parseDowntimeInterval(downtimeInterval);

  const diff = start.getTime() - now.getTime();

  return Math.floor(diff / 1000 / 60);
}

export async function killMinecraft() {
  killProcesses(await getMinecraftProcesses());
}

export async function getMinecraftProcesses() {
  const list = await psList();
  const processes = list
    .filter((l) => /minecraft/i.test(l.cmd || ""))
    .filter((l) => !/minecraft-screentime/i.test(l.cmd || ""));

  return processes;
}

export async function isMineCraftRunning() {
  return (await getMinecraftProcesses()).length > 0;
}

export function killProcesses(processes: ProcessDescriptor[]) {
  const pids = processes.map((p) => p.pid);
  const names = processes.map((p) => p.name);
  if (pids.length === 0) {
    console.log(`No processes to kill, exiting`);
    return;
  }

  const killCommand = pids.map((pid) => `kill ${pid}`).join(";");
  console.log(`Running: "${killCommand}"`);
  execSync(killCommand);
  console.log(`Killed: ${names.join(", ")}`);
}

function parseDowntimeInterval(downtimeInterval: TimeInterval) {
  const { from: startTime, to: endTime } = downtimeInterval;
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  const start = set(new Date(), { hours: startHour, minutes: startMin, seconds: 0 });
  const _end = set(new Date(), { hours: endHour, minutes: endMin, seconds: 0 });
  const end = isAfter(start, _end) ? addDays(_end, 1) : _end;

  return { start, end };
}
