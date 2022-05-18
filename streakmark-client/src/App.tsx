import Board from "./components/Board/Board";
import Week from "./components/Week/Week";

function App(): JSX.Element {
  return (
    <div style={{ padding: 50, border: "1px solid white", borderRadius: 25, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "white", fontFamily: "Roboto, sans-serif" }}>Programming</h1>
      <Board year={2021} feeds={[]} />
      <Week
      borderRadius={1}
        year={2021}
        weekNumber={2}
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