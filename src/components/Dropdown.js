import "../styles/Dropdown.css"

export default function Dropdown({characters, isVisible, x, y}) {
  const dropDownStyle = {
    position: "absolute",
    top: `0px`,
    left: `0px`,
    transform: `translate(-50%, -50%) translate(${x + 68}px, ${y + 68}px)`,
  }
  const characterNames = characters.map(character => {
    return <button key={character.id}>{character.name}</button>
  })
  const dropDown = isVisible ? <div className="dropdown" style={dropDownStyle}>{characterNames}</div> : false;
  return dropDown;
}