import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';

const App: React.FC = () => {
  const initializeCards = () => {
    let id = 1;
    const initialCards = Array.from({ length: 10 }, (_, pairId) => [
      { id: id++, pairId: pairId + 1, flipped: false },
      { id: id++, pairId: pairId + 1, flipped: false },
    ]).flat();

    
    return initialCards.sort(() => Math.random() - 0.5);
  };

  
  const [cards, setCards] = useState(initializeCards());
  const [openCards, setOpenCards] = useState<number[]>([]);
  const [canFlip, setCanFlip] = useState(true);
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [endGameMessage, setEndGameMessage] = useState("");

  useEffect(() => {
      
    
    if (openCards.length === 2) {
      const [firstCard, secondCard] = openCards;
      const first = cards.find(card => card.id === firstCard);
      const second = cards.find(card => card.id === secondCard);

      setCanFlip(false); 

      if (first?.pairId === second?.pairId) {
        setOpenCards([]);
        setCanFlip(true);
      } else {
        setTimeout(() => {
          setCards(cards =>
            cards.map(card => {
              if (card.id === firstCard || card.id === secondCard) {
                return { ...card, flipped: false };
              }
              return card;
            }),
          );
          setOpenCards([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  }, [openCards, cards]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (openCards.length > 0 && !gameStarted) {
      setGameStarted(true);
    }
  }, [openCards, gameStarted]);

  useEffect(() => {
    const allMatched = cards.every(card => card.flipped);
    if (allMatched && gameStarted) {
      setGameStarted(false);
      alert(`Félicitations ! Vous avez terminé en ${moves} mouvements et ${timer} secondes.`);
    }
  }, [cards, gameStarted, moves, timer]);

  const handleCardClick = (id: number) => {
    if (!canFlip || openCards.length >= 2 || openCards.includes(id)) return;

    const newCards = cards.map(card => {
      if (card.id === id) {
        return { ...card, flipped: true };
      }
      return card;
    });

    setCards(newCards);
    setOpenCards([...openCards, id]);

    if (openCards.length === 1) {
      setMoves(moves => moves + 1);
    }
  };

  const resetGame = () => {
    setCards(initializeCards()); 
    setOpenCards([]);
    setCanFlip(true);
    setTimer(0);
    setMoves(0);
    setGameStarted(false);
  };

  useEffect(() => {
    const allMatched = cards.every(card => card.flipped);
    if (allMatched && gameStarted) {
      setGameStarted(false);
      const message = `Félicitations ! Vous avez terminé en ${moves} mouvements et ${timer} secondes.`;
      setEndGameMessage(message);
    }
  }, [cards, gameStarted, moves, timer]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Jeu de Mémoire</h2>
        <p>Temps : {timer} secondes</p>
        <p>Mouvements : {moves}</p>
        <button onClick={resetGame}>Réinitialiser le jeu</button> {}
        <Board cards={cards} onCardClick={handleCardClick} />
      </header>
    </div>
  );
}

export default App;
