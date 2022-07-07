import { Months } from "../constants";
import { getMaxDays } from "./misc";

export class MonthHandler {
  month: Months;
  daysData: string[][];
  maxDayNum: number;

  constructor(month: Months, daysData: string[][]) {
    this.month = month;
    this.daysData = daysData;
    this.maxDayNum = getMaxDays(month);

    if (daysData.length !== getMaxDays(month)) {
      console.error(
        `MonthHandler: ${daysData.length} !== ${getMaxDays(month)}`
      );
      throw new Error(
        `Expected ${getMaxDays(month)} days but got ${daysData.length}`
      );
    }
  }

  getDayData(dayNum: number): string[] {
    if (dayNum < 1 || dayNum > this.maxDayNum) {
      console.error(`MonthHandler: dayNum ${dayNum} out of range`);
      throw new Error(`Day number ${dayNum} out of range`);
    }

    return this.daysData[dayNum - 1];
  }

  updateDayData(dayNum: number, newData: string[]): void {
    if (dayNum < 1 || dayNum > this.maxDayNum) {
      console.error(`MonthHandler: dayNum ${dayNum} out of range`);
      throw new Error(`Day number ${dayNum} out of range`);
    }

    this.daysData[dayNum - 1] = newData;
  }

}

export default MonthHandler;
