import { Months } from "../constants";

export function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

export function getMaxDays(month: Months): number {
  if (month === Months.February) {
    return 28;
  } else if (
    month === Months.April ||
    month === Months.June ||
    month === Months.September ||
    month === Months.November
  ) {
    return 30;
  } else {
    return 31;
  }
}

export function getMonthName(month: Months): string {
  return Months[month];
}
