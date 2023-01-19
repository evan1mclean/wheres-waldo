import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <div className="header">
      <h1>Find Them <span className="red-title">All</span></h1>
      <div className="navigation">
        <Link to={"/"} className="link">
          Home
        </Link>
        <Link to={"/leaderboard"} className="link">
          Leaderboards
        </Link>
      </div>
    </div>
  );
}
