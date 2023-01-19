import gandalf from "../images/gandalfHeader.png";
import groot from "../images/grootHeader.png";
import irongiant from "../images/irongiantHeader.png";
import waldo from "../images/waldoHeader.png";

export default function Game() {
  return (
    <div>
      <div className="characters">
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
    </div>
  );
}