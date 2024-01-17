import React, { useEffect } from "react";
import "./styles.css";
import { fetchRandomWord } from "./utils/fetchRandomWord";
import { Game } from "./components/game/Game";

function App() {
  useEffect(() => {
    fetchRandomWord(5).then(console.log);
  }, []);

  return (
    <div className="container">
      <Game />
    </div>
  );
}

export default App;
