import "../styles/Dropdown.css";

export default function Dropdown(props) {
  const { characters, isVisible, x, y, handleSubmit } = props;

  //translates dropdown position based off of where you click
  const dropDownPosition = {
    transform: `translate(-50%, -50%) translate(${x + 68}px, ${y + 68}px)`,
  };

  const characterNames = characters.map((character) => {
    if (character.found) return false;
    return <button key={character.id} onClick={() => handleSubmit(character.name)}>{character.name}</button>;
  });

  const dropDown = isVisible ? (
    <div className="dropdown" style={dropDownPosition}>
      {characterNames}
    </div>
  ) : (
    false
  );
  return dropDown;
}
