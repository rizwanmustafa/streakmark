import Board from "./components/Board/Board";
import Day from "./components/Day/Day";

function App(): JSX.Element {
  return (
    <div style={{ padding: 50, border: "1px solid white", borderRadius:25, display: "flex", flexDirection:"column", alignItems:"center"}}>
      <h1 style={{ color: "white", fontFamily:"Roboto, sans-serif"}}>Programming</h1>
      <Board year={2021} feeds={[]} />
      <Day borderRadius={50} color="#161b22" hoverText="Monday" />
    </div>
  )
}

export default App;