import { Link } from "react-router-dom";
import gandalf from "../images/gandalf.png";
import groot from "../images/groot.png";
import irongiant from "../images/irongiant.png";
import waldo from "../images/waldo.png";
import "../styles/StartGame.css"

export default function StartGame() {
  return (
    <div className="container">
      <div className="start-game">
        <div className="introduction">
          <p>Find these characters and tag them as fast as you can!</p>
          <p>
            Scroll through the image and click each character and tag them with
            the correct name
          </p>
          <p>You will be timed!</p>
        </div>
        <div className="character-images-container">
          <div className="character-image">
            <img src={gandalf} alt="Gandalf" />
            <h2>Gandalf</h2>
          </div>
          <div className="character-image">
            <img src={groot} alt="Groot" />
            <h2>Groot</h2>
          </div>
          <div className="character-image">
            <img src={irongiant} alt="Iron Giant" />
            <h2>Iron Giant</h2>
          </div>
          <div className="character-image">
            <img src={waldo} alt="Waldo" />
            <h2>Waldo</h2>
          </div>
        </div>
        <Link to={"/game"} className="start-link">
          <button className="start-button">Start Game</button>
        </Link>
      </div>
    </div>
  );
}
