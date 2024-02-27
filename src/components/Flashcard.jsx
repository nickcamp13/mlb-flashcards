import { useState } from "react";

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
    const randCardIndex = Math.floor(Math.random() * (cards.length + 1))
    setIsFlipped(false);
    setCard(cards[randCardIndex]);
  };

  return (
    <div>
      <div onClick={handleFlip}>
        {isFlipped ? (
          <p>{currentCard.answer}</p>
        ) : (
          <p>{currentCard.question}</p>
        )}
      </div>
      <button onClick={handleNextCard}>⭢</button>
    </div>
  );
};

export default Flashcards;
