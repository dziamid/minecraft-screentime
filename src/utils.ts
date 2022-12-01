import fetch from "node-fetch";
import { addDays, isAfter, isWithinInterval, set } from "date-fns";

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
  const { from: startTime, to: endTime } = downtimeInterval;
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);
  const start = set(new Date(), { hours: startHour, minutes: startMin, seconds: 0 });
  const _end = set(new Date(), { hours: endHour, minutes: endMin, seconds: 0 });
  const end = isAfter(start, _end) ? addDays(_end, 1) : _end;

  return isWithinInterval(now, { start, end });
}
