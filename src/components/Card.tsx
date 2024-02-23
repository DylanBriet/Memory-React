import React from 'react';

interface CardProps {
    id: number;
    pairId: number; 
    flipped: boolean;
    onClick: (id: number) => void;
  }

  const Card: React.FC<CardProps> = ({ id, pairId, flipped, onClick }) => {
    return (
      <div className={`card ${flipped ? 'is-flipped' : ''}`} onClick={() => onClick(id)}>
        <div className="card-inner">
          <div className="card-front">
            {}
          </div>
          <div className="card-back">
            {}
            {}
            Card {pairId}
          </div>
        </div>
      </div>
    );
  };

export default Card;
