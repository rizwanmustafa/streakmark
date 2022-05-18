import Board from "./components/Board/Board";
import Week from "./components/Week/Week";

const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"] // Classic Github
// const colors = ["#f89f5b", "#e53f71", "#9c3587", "#653780", "#3f1651"] // Purple stuff

function App(): JSX.Element {
  return (
    <div style={{ padding: 50, border: "1px solid white", borderRadius: 25, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "white", fontFamily: "Roboto, sans-serif" }}>Programming</h1>
      <Board year={2021} feeds={[]} colors={colors} />
      <Week
        colors={colors}
        startDay={1}
        month={1}
        borderRadius={1}
        year={2021}
        average={5}
        highest={10}
        lowest={0}
        dailyData={
          {
            0: ["asdfasdf", "asdfasdf"],
            1: ["asdfasdf", "asdfasdf", "asdfasdf", "asdfasd", "asdfasdf"],
            2: ["asdfasdf", "asdfasdf", "asdfas", "asdfas", "asdf", "asdfasdf", "asdfasdf", "asdf", "asdf", "asdf"],
            3: [],
            4: ["asdfasdf", "asdfasdf", "asdfasdf", "asdfas", "asdfas", "asdfasd"],
            5: ["asdfasdf"],
            6: ["asdfasdf", "asdfasd", "asdfasd"]
          }
        }
      />
    </div>
  )
}

export default App;