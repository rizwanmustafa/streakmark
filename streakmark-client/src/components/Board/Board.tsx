import Day from "../Day/Day";
import "./Board.css";
interface Props {
  year: Streakmark.Year;
  feeds: Streakmark.Feed[];
}

const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]

function Board(props: Props): JSX.Element {
  const myWeeklyElements = [];

  for (let i = 0; i <= 52; i++) {
    myWeeklyElements.push(
      <div className="week">
        <Day borderRadius={50} color={colors[Math.floor(Math.random() * 5)]} hoverText={`Week ${i} Monday`} />
        <Day borderRadius={50} color={colors[Math.floor(Math.random() * 5)]} hoverText={`Week ${i} Tuesday`} />
        <Day borderRadius={50} color={colors[Math.floor(Math.random() * 5)]} hoverText={`Week ${i} Wednesday`} />
        <Day borderRadius={50} color={colors[Math.floor(Math.random() * 5)]} hoverText={`Week ${i} Thursday`} />
        <Day borderRadius={50} color={colors[Math.floor(Math.random() * 5)]} hoverText={`Week ${i} Friday`} />
        <Day borderRadius={50} color={colors[Math.floor(Math.random() * 5)]} hoverText={`Week ${i} Saturday`} />
        <Day borderRadius={50} color={colors[Math.floor(Math.random() * 5)]} hoverText={`Week ${i} Sunday`} />
      </div>
    )
  }
  return (
    <div id="board">
      {myWeeklyElements}
    </div>
  );
}

export default Board;