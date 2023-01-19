import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import Header from "./components/Header";
import Leaderboard from "./components/Leaderboard";
import StartGame from "./components/StartGame";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartGame />}/>
          <Route path="/game" element={<Game />}/>
          <Route path="/leaderboard" element={<Leaderboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
