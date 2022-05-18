import "./Day.css";

interface Props {
  borderRadius: number;
  color: string;
  hoverText: string;
}

function getRootStyles(props: Props): React.CSSProperties {
  return {
    backgroundColor: props.color,
    color: "transparent",
    margin: 2,
    borderRadius: props.borderRadius,
    width: 12,
    height: 12,
    fontFamily: "monospace",
    userSelect: "none",
    position: "relative",
    display: "inline-block",
  }
}

function Day(props: Props): JSX.Element {
  const rootStyles = getRootStyles(props);

  return (
    <div className="day" style={rootStyles} >
      &nbsp
      <div className="daytext">{props.hoverText}</div>
    </div>
  )

}

export default Day;