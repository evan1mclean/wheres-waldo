import gandalf from "../images/gandalfHeader.png";
import groot from "../images/grootHeader.png";
import irongiant from "../images/irongiantHeader.png";
import waldo from "../images/waldoHeader.png";
import gameImage from "../images/game-image.jpg";
import "../styles/Game.css";
import { useEffect, useState } from "react";
import TargetBox from "./TargetBox";

export default function Game() {
  //state for the timer
  const [timer, setTimer] = useState(0);
   //state for targeting box
   const [isVisible, setIsVisible] = useState(false);
   //state for target box size/coordinates
   const [pageX, setPageX] = useState(0);
   const [pageY, setPageY] = useState(0);

  //function for formatting the time correctly
  function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    if (hours >= 1) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  }

  function getClickPosition(e) {
    const x = Math.floor((100 * e.nativeEvent.offsetX) / e.target.offsetWidth);
    const y = Math.floor((100 * e.nativeEvent.offsetY) / e.target.offsetHeight);
    return { x, y };
  }


  function handleClick(e) {
    if (!isVisible) {
      const { x, y } = getClickPosition(e);
      console.log(e)
      setPageX(e.pageX);
      setPageY(e.pageY);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game-container">
      <div className="sidebar">
        <div className="timer">{formatTime(timer)}</div>
        <div className="character">
          <img src={gandalf} alt="Gandalf" />
          <h2>Gandalf</h2>
        </div>
        <div className="character">
          <img src={groot} alt="Groot" />
          <h2>Groot</h2>
        </div>
        <div className="character">
          <img src={irongiant} alt="Iron Giant" />
          <h2>Iron Giant</h2>
        </div>
        <div className="character">
          <img src={waldo} alt="Waldo" />
          <h2>Waldo</h2>
        </div>
      </div>

      <div className="game-main">
        <img
          src={gameImage}
          alt="Universe 113 Where's Waldo Type Game"
          onClick={handleClick}
        />
        <TargetBox isVisible={isVisible} x={pageX} y={pageY}/>
      </div>
    </div>
  );
}
