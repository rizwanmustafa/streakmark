import { getDayName } from "../../scripts/misc";
import Week from "../Week/Week";
import "./Board.css";
interface Props {
  year: Streakmark.Year;
  feeds: Streakmark.Feed[];
  colors: string[];
}


function isDateValid(day: number, month: number, year: number) {
  const newDate = new Date(year, month, day);
  return newDate.getFullYear() === year && newDate.getMonth() === month && newDate.getDate() === day;
}

function generateRandomDailyData(): Record<number, string[]> {
  const dailyData: Record<number, string[]> = {};

  for (let i = 0; i < 7; i++) {
    dailyData[i] = [];
    const check = Math.floor(Math.random() * 24);
    for (let j = 0; j < check; j++) {
      dailyData[i].push(Math.floor(Math.random() * 100).toString());
    }
  }

  return dailyData;
}

function Board(props: Props): JSX.Element {
  const weekElements = [];

  for (let month = 0; month < 12; month++) {
    for (let day = 1; day < 31; day++) {
      if (!isDateValid(day, month, props.year)) continue;

      if ((day === 1 && month === 0) || getDayName(new Date(props.year, month, day)).toLowerCase() === "monday") {
        weekElements.push(
          <Week
            average={10}
            borderRadius={10}
            highest={20}
            lowest={5}
            dailyData={generateRandomDailyData()}
            month={month}
            startDay={day}
            year={props.year}
            colors={props.colors}
            key={`${month}-${day}-${props.year}`}
          />
        )

      }
    }
  }

  return (
    <div id="board">
      {weekElements}
    </div>
  );
}

export default Board;