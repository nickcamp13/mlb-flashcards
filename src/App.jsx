import { useState } from "react";
import Flashcards from "./components/Flashcard";
import flashcards from "./flashcards";
import "./App.css";

function App() {
  const [cards, setCards] = useState(flashcards);

  return (
    <div>
      <h1>MLB All-Star Quiz</h1>
      <h2>
        Test your baseball knowledge from rules of the game to historical player
        factoids
      </h2>
      <p>Number of Flashcards: {cards.length}</p>
      <Flashcards cards={cards} />
    </div>
  );
}

export default App;
