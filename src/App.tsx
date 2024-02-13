import React, { useState, useEffect } from 'react';
import './App.css';
import Board from './components/Board';

const App: React.FC = () => {
  // Fonction pour initialiser et mélanger les cartes
  const initializeCards = () => {
    // Création des paires de cartes
    let id = 1;
    const initialCards = Array.from({ length: 10 }, (_, pairId) => [
      { id: id++, pairId: pairId + 1, flipped: false },
      { id: id++, pairId: pairId + 1, flipped: false },
    ]).flat();

    // Mélange des cartes
    return initialCards.sort(() => Math.random() - 0.5);
  };

  // Étape : Initialisation et mélange de l'état du jeu avec des paires de cartes
  const [cards, setCards] = useState(initializeCards());
  const [openCards, setOpenCards] = useState<number[]>([]); // Pour suivre les cartes retournées
  const [canFlip, setCanFlip] = useState(true);
  const [timer, setTimer] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // Pour contrôler si une carte peut être retournée
  const [endGameMessage, setEndGameMessage] = useState("");

  useEffect(() => {
      
    // Vérification des correspondances lorsque deux cartes sont retournées
    if (openCards.length === 2) {
      const [firstCard, secondCard] = openCards;
      const first = cards.find(card => card.id === firstCard);
      const second = cards.find(card => card.id === secondCard);

      setCanFlip(false); // Empêche de retourner une nouvelle carte

      if (first?.pairId === second?.pairId) {
        // Les cartes correspondent, les laisser retournées et réinitialiser openCards
        setOpenCards([]);
        setCanFlip(true);
      } else {
        // Pas de correspondance, retourner les cartes face cachée après un délai
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

  // Étape : Gestion du clic sur une carte
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    // Arrêter le timer lorsque le jeu est fini
    return () => clearInterval(interval);
  }, [gameStarted]);

  // Démarrer le jeu lorsque la première carte est retournée
  useEffect(() => {
    if (openCards.length > 0 && !gameStarted) {
      setGameStarted(true);
    }
  }, [openCards, gameStarted]);

  // Vérifier si le jeu est terminé
  useEffect(() => {
    const allMatched = cards.every(card => card.flipped);
    if (allMatched && gameStarted) {
      setGameStarted(false);
      alert(`Félicitations ! Vous avez terminé en ${moves} mouvements et ${timer} secondes.`);
      // Ici, vous pourriez réinitialiser le jeu ou faire autre chose
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

    // Incrémenter les mouvements seulement quand deux cartes sont retournées
    if (openCards.length === 1) {
      setMoves(moves => moves + 1);
    }
  };

  const resetGame = () => {
    setCards(initializeCards()); // Réinitialise et mélange les cartes
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
      // Supprimez ou commentez la ligne suivante
      // alert(message);
    }
  }, [cards, gameStarted, moves, timer]);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Jeu de Mémoire</h2>
        <p>Temps : {timer} secondes</p>
        <p>Mouvements : {moves}</p>
        <button onClick={resetGame}>Réinitialiser le jeu</button> {/* Bouton de réinitialisation */}
        <Board cards={cards} onCardClick={handleCardClick} />
      </header>
    </div>
  );
}

export default App;
