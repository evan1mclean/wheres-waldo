import "../styles/SubmitScore.css";
import formatTime from "../helper/FormatTime";
import { useState } from "react";
import { db } from "../index";
import { collection, addDoc } from "firebase/firestore";
import {useNavigate} from "react-router-dom"

export default function SubmitScore(props) {
  const { time } = props;
  const [username, setUsername] = useState("");
  //useNavigate hook to use for page navigation
  const navigate = useNavigate();

  //Add username and time to firestore database
  async function addDocument(username, time) {
    // Add a new document with a generated id.
    await addDoc(collection(db, "Leaderboard"), {
      name: {username},
      time: {time},
    });
  }

  function handleChange(e) {
    setUsername(e.target.value);
  }

  function refreshPage() {
    window.location.reload();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await addDocument(username, time);
    navigate("/leaderboard");
  }

  return (
    <div className="submit-modal">
      <div className="submit-content">
        <h2>Your time was {formatTime(time)}</h2>
        <p>Enter your name to save your score on the leaderboard</p>
        <form onSubmit={handleSubmit}>
          <div className="username-input">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              maxLength={20}
              pattern="[a-z\d]*"
              required
              onChange={handleChange}
              title="Only numbers and letters are accepted. e.g. Username123"
            />
          </div>
          <div className="buttons">
            <button type="button" className="try-again" onClick={refreshPage}>
              Try Again
            </button>
            <button type="submit" className="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
