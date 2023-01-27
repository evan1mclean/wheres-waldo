export default function TargetBox({isVisible, x, y}) {
  const circleStyle = {
    zIndex: "0",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    border: "2px dashed white",
    position: "absolute",
    top: `0px`,
    left: `0px`,
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
  };
  const redDotStyle = {
    width: "3px",
    height: "3px",
    backgroundColor: "red",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
  const box = isVisible ? <div style={circleStyle}>
    <div style={redDotStyle}></div>
  </div> : false;
  return box;
}
