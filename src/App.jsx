import { useState } from "react";
import Flashcards from "./components/Flashcards";
import flashcards from "./flashcards";
import "./App.css";

function App() {
  const [cards, setCards] = useState(flashcards);

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
      <Flashcards cards={cards} shuffleCards={shuffleCards}/>
    </div>
  );
}

export default App;
