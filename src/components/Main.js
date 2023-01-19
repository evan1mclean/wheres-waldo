import Game from "./game/Game";
import Leaderboard from "./leaderboard/Leaderboard";

export default function Header() {
  return (
    <div>
      <Game />
      <Leaderboard />
    </div>
  );
}