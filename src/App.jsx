import { useState } from "react";
import Flashcards from "./components/Flashcards";
import flashcards from "./flashcards";
import "./App.css";

function App() {
  const [cards, setCards] = useState(flashcards);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const updateStreak = (yes) => {
    if(yes) {
      setCurrentStreak(currentStreak + 1);
    } else {
      setCurrentStreak(0)
    }
  }

  const updateLongestStreak = (num) => {
    if (currentStreak >= longestStreak && num !== 0) {
      setLongestStreak(currentStreak + 1);
    } else if (num === 0) {
      setLongestStreak(0)
    }
  }

  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setCards(array)
  }

  return (
    <div className="App">
      <h1>MLB All-Star Quiz</h1>
      <h2>
        Test your baseball knowledge from rules of the game to historical player
        factoids
      </h2>
      <p>Number of Flashcards: {cards.length}</p>
      <div id="streaks">
        <p>Current Streak: {currentStreak}</p>
        <p>Longest Streak: {longestStreak}</p>
      </div>
      <Flashcards cards={cards} shuffleCards={shuffleCards} updateStreak={updateStreak} updateLongestStreak={updateLongestStreak}/>
    </div>
  );
}

export default App;
