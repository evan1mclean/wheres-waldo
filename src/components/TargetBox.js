export default function TargetBox(props) {
  const {isVisible, x, y} = props;
  const style = {
    zIndex: "0",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    border: "2px dashed white",
    position: "absolute",
    top: `0px`,
    left: `0px`,
    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
  };
  const box = isVisible ? <div style={style}></div> : false;
  return box;
}
