import { useState } from "react";
import "./Flashcards.css";

const Flashcards = ({ cards, shuffleCards }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [currentCard, setCard] = useState({
    question: "Play ball!",
    answer: "Press the button to begin the quiz!",
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const [userAnswer, setUserAnswer] = useState('');

  const resetCards = () => {
    setCard(cards[0]);
    setCurrentIndex(0);
  }

  const getNextCard = () => {
    setCurrentIndex(currentIndex + 1);
    setCard(cards[currentIndex + 1]);
  }

  const getPreviousCard = () => {
    setCurrentIndex(currentIndex - 1);
    setCard(cards[currentIndex - 1]);
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if(currentIndex === -1) {
      resetCards();
      setIsFlipped(false);
    } else {
      if (currentIndex < cards.length - 1) {
        getNextCard();
        setIsFlipped(false);
      }
    }
  };

  const handlePreviousCard = () => {
    if(currentIndex > 0 && currentIndex < cards.length) {
      getPreviousCard();
    }
  }

  const handleInput = (e) => {
    setUserAnswer(e.target.value)
  }

  const handleShuffle = () => {
    shuffleCards(cards);
    resetCards();
    setIsFlipped(false);
  }

  const handleSubmit = () => {

  }

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
      <div className="user-input">
        <p>Enter your answer here: </p>
        <input type="text" name="userAnswer" id="" value={userAnswer} onChange={handleInput}/>
        <button onClick={handleSubmit}>Submit Answer</button>
      </div>
      <div className="buttons">
        <button onClick={handlePreviousCard}>Previous</button>
        <button onClick={handleNextCard}>Next</button>
        <button onClick={handleShuffle}>Shuffle Cards</button>
      </div>
    </div>
  );
};

export default Flashcards;
