import { ITimeOfYear } from "../interfaces";
import { ConfigValidation } from "../config-validation";

export class TimeOfYear implements ITimeOfYear {
    public readonly month: number;
    public readonly day: number;

    constructor(month: number, day: number) {
        this.day = ConfigValidation.getNumber(day, "TimeOfYear: day");
        this.month = ConfigValidation.getNumber(month, "TimeOfYear: month");

        if (this.month !== Math.trunc(month) || this.day !== Math.trunc(day)) {
            throw new Error("TimeOfYear: day and month must be integers");
        }

        const daysInMonth: number[] = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (this.month < 1 || this.month > 12) {
            throw new Error("TimeOfYear: month out of bounds");
        }
        if (this.day < 1 || this.day > daysInMonth[this.month]) {
            throw new Error("TimeOfYear: day out of bounds");
        }
    }
}