import React from 'react';
import Card from './Card';

interface BoardProps {
    cards: Array<{
      id: number;
      pairId: number;
      flipped: boolean;
    }>;
    onCardClick: (id: number) => void;
  }

  const Board: React.FC<BoardProps> = ({ cards, onCardClick }) => {
    console.log(cards); 
    return (
      <div className="board">
        {cards.map((card) => (
          console.log(card),
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
