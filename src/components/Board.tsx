import React from 'react';
import Card from './Card';

interface BoardProps {
    cards: Array<{
      id: number;
      pairId: number; // Ajoutez cette ligne
      flipped: boolean;
    }>;
    onCardClick: (id: number) => void;
  }

  const Board: React.FC<BoardProps> = ({ cards, onCardClick }) => {
    console.log(cards); // Pour vérifier les données des cartes
    return (
      <div className="board">
        {cards.map((card) => (
          console.log(card), // Pour vérifier chaque carte individuellement
          <Card
            key={card.id}
            id={card.id}
            pairId={card.pairId}
            flipped={card.flipped}
            onClick={onCardClick}
          />
        ))}
      </div>
    );
  };
  
export default Board;
