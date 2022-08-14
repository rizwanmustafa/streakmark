declare namespace StreakmarkClient {
  interface Feed {
    id: string;
    name: string;
    description: string;
    entries: YearlyEntries;
  }

  type Entry = string;

  type Day = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
  type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
  type Year = number;

  type DailyEntries = Record<Day, Entry[]>;

  type MonthlyEntries = Record<Month, DailyEntries>;

  type YearlyEntries = Record<Year, MonthlyEntries>;
}