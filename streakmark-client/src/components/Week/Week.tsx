import Day from "../Day/Day";

interface Props {
  startDay: number;
  month: number;
  year: Streakmark.Year;
  weekNumber: number;
  average: number;
  highest: number;
  lowest: number;
  dailyData: Record<number, string[]>;
  borderRadius: number;
}

const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]

function getDayColor(value: number, average: number, highest: number, lowest: number): string {
  if (value === 0) return colors[0];

  if (value <= lowest) return colors[1];
  if (value === average) return colors[2];
  if (value >= highest) return colors[4];

  const diffAvg = Math.abs(average - value);
  const diffHighest = Math.abs(highest - value);
  const diffLowest = Math.abs(lowest - value);
  const minDiff = Math.min(diffAvg, diffHighest, diffLowest);

  if (minDiff === diffAvg)
    return colors[2];
  else if (minDiff === diffHighest)
    return colors[3];
  else
    return colors[1];

}

// const weekDay: Record<number, string> = {
//   0: "Monday",
//   1: "Tuesday",
//   2: "Wednesday",
//   3: "Thursday",
//   4: "Friday",
//   5: "Saturday",
//   6: "Sunday",

// }

const weekStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  backgroundColor: "transparent"
}

function getDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "long" });
}

function Week(props: Props): JSX.Element {
  const dayElements: JSX.Element[] = [];

  let currentDate = new Date(props.year, props.month, props.startDay);
  for (let i = 0; i < 7; i++) {
    currentDate.setDate(currentDate.getDate() - 1);
    if (getDayName(currentDate).toLowerCase() === "sunday") break;

    dayElements.push(
      // Later replace this with another component called PlaceholderDay
      <Day
        borderRadius={props.borderRadius}
        color={colors[0]}
        hoverText=""
      />
    );


  };

  currentDate = new Date(props.year, props.month, props.startDay);

  for (let i = 0; i < 7; i++) {
    const displayDate = currentDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    dayElements.push(
      <Day
        borderRadius={props.borderRadius}
        color={getDayColor(props.dailyData[i].length, props.average, props.highest, props.lowest)}
        hoverText={`${props.dailyData[i].length} tasks completed on ${displayDate}`}
      />
    )

    currentDate.setDate(currentDate.getDate() + 1);
    if (getDayName(currentDate).toLowerCase() === "monday") break;
  };


  return (
    <div className="week" style={weekStyles}>
      {dayElements}
    </div>
  );
}

export default Week;