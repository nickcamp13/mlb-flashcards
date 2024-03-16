import { useState } from "react";
import "./Flashcards.css";

const Flashcards = ({
  cards,
  shuffleCards,
  updateStreak,
  updateLongestStreak,
}) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [seenCards, setSeenCards] = useState([-1]);

  const [currentCard, setCard] = useState({
    question: "Play ball!",
    answer: "Press the button to begin the quiz!",
  });
  const [isFlipped, setIsFlipped] = useState(false);

  const [userAnswer, setUserAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const resetInput = () => {
    const input = document.getElementById("userAnswer")
    setUserAnswer("");
    input.value = "";
    input.className = "";
  }

  // reset the entire quiz, all states should revert to their initial values
  const resetCards = () => {
    setCard(cards[0]);
    setCurrentIndex(0);
    setSeenCards([-1]);
    setIsFlipped(false);
    setAnswerSubmitted(false);
    updateStreak(false);
    updateLongestStreak(0);
    resetInput();
  };


  // Only use in the case where it makes sense to get the previous card
  const getPreviousCard = () => {
    setCurrentIndex(currentIndex - 1);
    setCard(cards[currentIndex - 1]);
    setIsFlipped(false);
    setAnswerSubmitted(false);
    resetInput();
  };

  // Only use in the case where it makes sense to get the next card
  const getNextCard = () => {
    setCurrentIndex(currentIndex + 1);
    setCard(cards[currentIndex + 1]);
    setAnswerSubmitted(false);
    resetInput();
  };

  // Logic for advancing through the deck of cards
  const handleNextCard = () => {
    if (currentIndex === -1) {
      resetCards();
    } else {
      if (currentIndex < cards.length - 1) {
        getNextCard();
        setIsFlipped(false);
      }
    }
  };

  // Logic for retreating through the deck of cards
  const handlePreviousCard = () => {
    if (currentIndex > 0 && currentIndex < cards.length) {
      getPreviousCard();
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!seenCards.includes(currentIndex)) {
      seenCards.push(currentIndex);
    }
  };

  const handleInput = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleShuffle = () => {
    shuffleCards(cards);
    resetCards();
  };

  const handleSubmit = () => {
    const input = document.getElementById("userAnswer")
    if (
      currentCard["answer"]
        .toLocaleLowerCase()
        .includes(userAnswer.toLocaleLowerCase())
    ) {
      updateStreak(true);
      updateLongestStreak();
      input.classList.add("right");
    } else {
      updateStreak(false);
      input.classList.add("wrong");
    }
    handleFlip();
    setAnswerSubmitted(true);
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
      <div className="user-input">
        <p>Enter your answer here: </p>
        <input
          type="text"
          name="userAnswer"
          id="userAnswer"
          value={userAnswer}
          onChange={handleInput}
          disabled={seenCards.includes(currentIndex) || answerSubmitted}
        />
        <button
          className={userAnswer === "" ? "blocked" : ""}
          onClick={handleSubmit}
          disabled={answerSubmitted}
        >
          Submit Answer
        </button>
      </div>
      <div className="buttons">
        <button
          className={currentIndex <= 0 ? "blocked" : ""}
          onClick={handlePreviousCard}
        >
          Previous
        </button>
        <button
          className={currentIndex >= cards.length - 1 ? "blocked" : ""}
          onClick={handleNextCard}
        >
          Next
        </button>
        <button onClick={handleShuffle}>Shuffle Cards</button>
      </div>
    </div>
  );
};

export default Flashcards;
