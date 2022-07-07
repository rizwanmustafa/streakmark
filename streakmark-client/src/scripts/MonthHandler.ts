import { Months } from "../constants";
import { getMaxDays, getMonthName } from "./misc";

export class MonthHandler {
  private month: Months;
  private daysData: string[][];
  private maxDayNum: number;
  private totalTaskCount = -1;

  constructor(month: Months, daysData: string[][]) {
    this.month = month;
    this.daysData = daysData;
    this.maxDayNum = getMaxDays(month);

    if (daysData.length !== getMaxDays(month)) {
      console.error(
        `MonthHandler: ${daysData.length} !== ${getMaxDays(month)}`
      );
      throw new Error(
        `Expected data for ${getMaxDays(month)} days but got ${daysData.length}`
      );
    }

    this.updateTaskCount();
  }

  getMonthName() {
    return getMonthName(this.month);
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

    this.updateTaskCount();
  }

  getTaskCount() {
    return this.totalTaskCount;
  }

  private updateTaskCount() {
    this.totalTaskCount = 0;
    for (const dayData of this.daysData) {
      this.totalTaskCount += dayData.length;
    }
  }
}

export default MonthHandler;
