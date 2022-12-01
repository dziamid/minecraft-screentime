import {set} from "date-fns";
import {isDowntimeTime} from "./utils";

describe("isDowntimeTime", function () {
    const interval = {from: "21:00", to: "09:00"};
    it("should return true when current time is within interval", () => {
        const now = set(new Date(), {hours: 22, minutes: 0, seconds: 0});
        expect(isDowntimeTime(interval, now)).toBe(true);
    });

    it("should return false when current time is before interval", () => {
        const now = set(new Date(), {hours: 20, minutes: 0, seconds: 0});
        expect(isDowntimeTime(interval, now)).toBe(false);
    });

    it("should return false when current time is after interval", () => {
        const now = set(new Date(), {hours: 10, minutes: 0, seconds: 0});
        expect(isDowntimeTime(interval, now)).toBe(false);
    });
});