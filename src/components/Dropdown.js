import "../styles/Dropdown.css";
import { AiFillCheckCircle } from "react-icons/ai";

export default function Dropdown(props) {
  const { characters, isVisible, x, y, handleSubmit } = props;

  //translates dropdown position based off of where you click
  const dropDownPosition = {
    transform: `translate(-50%, -50%) translate(${x + 68}px, ${y + 68}px)`,
  };

  const characterNames = characters.map((character) => {
    const checkmark = character.found ? <span className="checkmark"><AiFillCheckCircle /></span> : false;
    return <button key={character.id} onClick={() => handleSubmit(character.name)}>{character.name}{checkmark}</button>;
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
