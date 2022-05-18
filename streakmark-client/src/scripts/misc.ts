export function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}