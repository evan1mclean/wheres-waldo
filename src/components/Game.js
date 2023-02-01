import gandalf from "../images/gandalfHeader.png";
import groot from "../images/grootHeader.png";
import irongiant from "../images/irongiantHeader.png";
import waldo from "../images/waldoHeader.png";
import gameImage from "../images/game-image.jpg";
import "../styles/Game.css";
import { useEffect, useState } from "react";
import TargetBox from "./TargetBox";
import Dropdown from "./Dropdown";
import formatTime from "../helper/FormatTime";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import { AiFillCheckCircle } from "react-icons/ai";

export default function Game() {
  //state for the timer
  const [timer, setTimer] = useState(0);

  //state for targeting box
  const [isVisible, setIsVisible] = useState(false);

  //state for target box coordinates
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);

  //state for character coordinates
  const [characterX, setCharacterX] = useState(0);
  const [characterY, setCharacterY] = useState(0);

  //state for characters to find
  const [characters, setCharacters] = useState([
    {
      name: "Gandalf",
      id: 1,
      found: false,
      img: gandalf,
    },
    {
      name: "Groot",
      id: 2,
      found: false,
      img: groot,
    },
    {
      name: "Iron Giant",
      id: 3,
      found: false,
      img: irongiant,
    },
    {
      name: "Waldo",
      id: 4,
      found: false,
      img: waldo,
    },
  ]);

  //state for if the game is over
  const [gameOver, setGameOver] = useState(false)

  function getClickPosition(e) {
    const x = Math.floor((100 * e.nativeEvent.offsetX) / e.target.offsetWidth);
    const y = Math.floor((100 * e.nativeEvent.offsetY) / e.target.offsetHeight);
    return { x, y };
  }

  function handleClick(e) {
    if (!isVisible) {
      const { x, y } = getClickPosition(e);
      setCharacterX(x);
      setCharacterY(y);
      setPageX(e.pageX);
      setPageY(e.pageY);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  //Function for retrieving the character position data
  async function getCharacterData(characterName) {
    const docRef = doc(db, "CharacterPositions", characterName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  //boolean for determining if character was found
  function isCharacterFound(data, x, y) {
    //both x and y have a 2% margin of error for clicking so it's a little bit forgiving
    const positionX = data.x <= x + 2 && data.x >= x - 2 ? true : false;
    const positionY = data.y <= y + 2 && data.y >= y - 2 ? true : false;

    if (positionX && positionY) {
      return true;
    }
    return false;
  }

  //function to update if a character is found
  function setCharacterToFound(characterName) {
    const updatedCharacters = characters.map((character) => {
      if (character.name === characterName) {
        character.found = true;
      }
      return character;
    });
    setCharacters([...updatedCharacters]);
  }

  //Function to check if all characters have been found
  function isGameOver() {
    const notFound = characters.filter(character => character.found === false);
    if (notFound.length === 0) setGameOver(true);
  }

  async function handleSubmit(characterName) {
    const data = await getCharacterData(characterName);
    const found = isCharacterFound(data, characterX, characterY);
    if (found) setCharacterToFound(characterName);
    setIsVisible(false);
    isGameOver();
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    //if game is over stop the timer
    if (gameOver) clearInterval(interval);
    return () => clearInterval(interval);
  }, [gameOver]);

 const sidebar = characters.map(character => {
  const checkmark = character.found ? <span className="checkmark"><AiFillCheckCircle /></span> : false;
  return (
  <div className="character" key={character.id}>
    <img src={character.img} alt={character.name} />
    <h2>{character.name} {checkmark}</h2>
  </div>
  )
 })

  return (
    <div className="game-container">
      <div className="sidebar">
        <div className="timer">{formatTime(timer)}</div>
        {sidebar}
      </div>

      <div className="game-main">
        <img
          src={gameImage}
          alt="Universe 113 Where's Waldo Type Game"
          onClick={handleClick}
        />
        <TargetBox isVisible={isVisible} x={pageX} y={pageY} />
        <Dropdown
          isVisible={isVisible}
          x={pageX}
          y={pageY}
          characters={characters}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
