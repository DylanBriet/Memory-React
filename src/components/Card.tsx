import React from 'react';

interface CardProps {
    id: number;
    pairId: number; // Ajout de pairId
    flipped: boolean;
    onClick: (id: number) => void;
  }

  const Card: React.FC<CardProps> = ({ id, pairId, flipped, onClick }) => {
    return (
      <div className={`card ${flipped ? 'is-flipped' : ''}`} onClick={() => onClick(id)}>
        <div className="card-inner">
          <div className="card-front">
            {/* Contenu de la face avant (peut-être juste une couleur de fond ou une image générique) */}
          </div>
          <div className="card-back">
            {/* Contenu de la face arrière basé sur pairId */}
            {/* Ici, vous pouvez insérer une image ou du texte basé sur pairId */}
            Card {pairId}
          </div>
        </div>
      </div>
    );
  };

export default Card;
