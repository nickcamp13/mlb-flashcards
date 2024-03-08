import { useState } from "react";
import "./Flashcards.css";

const Flashcards = ({ cards }) => {
  const [currentCard, setCard] = useState({
    question: "Play ball!",
    answer: "Press the button to begin the quiz!",
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    const randCardIndex = Math.floor(Math.random() * cards.length);
    setIsFlipped(false);
    setCard(cards[randCardIndex]);
  };

  return (
    <div className="component">
      <div className={`card ${currentCard.category}`} onClick={handleFlip}>
        {isFlipped ? (
          <>
            <img src={currentCard.imgUrl} alt="" />
            <p>{currentCard.answer}</p>
          </>
        ) : (
            <p>{currentCard.question}</p>
        )}
        <p id="flip">Click to Flip Card</p>
      </div>
      <button onClick={handleNextCard}>⭢</button>
    </div>
  );
};

export default Flashcards;
