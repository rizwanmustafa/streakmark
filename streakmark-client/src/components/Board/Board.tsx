import "./Board.css";
interface Props {
  year: Streakmark.Year;
  feeds: Streakmark.Feed[];
}

const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"]

function getRandomBoxStyle(): React.CSSProperties {
  return {
    backgroundColor: colors[Math.floor(Math.random() * 5)],
    color: "transparent",
    margin: 2,
    fontFamily: "monospace",
    width:12,
    height:12,
    borderRadius: 50,
    userSelect: "none"
  };
}


function Board(props: Props): JSX.Element {
  const myWeeklyElements = [];

  for (let i = 0; i <= 52; i++) {
    myWeeklyElements.push(
      <div className="week">
        <div className="day" style={getRandomBoxStyle()}>&nbsp</div>
        <div className="day" style={getRandomBoxStyle()}>&nbsp</div>
        <div className="day" style={getRandomBoxStyle()}>&nbsp</div>
        <div className="day" style={getRandomBoxStyle()}>&nbsp</div>
        <div className="day" style={getRandomBoxStyle()}>&nbsp</div>
        <div className="day" style={getRandomBoxStyle()}>&nbsp</div>
        <div className="day" style={getRandomBoxStyle()}>&nbsp</div>

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