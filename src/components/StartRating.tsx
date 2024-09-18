import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

interface StarRatingProps {
  rating: number; // Calificación actual que va de 0 a 5
  onRate: (rating: number) => void; // Función que se llama cuando se selecciona una estrella
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRate }) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  // Calcula cuántas estrellas completas y medias debe mostrar
  const fullStars = Math.floor(hoveredRating ?? rating);
  const hasHalfStar = (hoveredRating ?? rating) - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Función para manejar el clic en las estrellas
  const handleClick = (value: number) => {
    onRate(value);
  };

  // Función para manejar el paso del ratón sobre las estrellas
  const handleMouseEnter = (value: number) => {
    setHoveredRating(value);
  };

  // Función para manejar la salida del ratón de las estrellas
  const handleMouseLeave = () => {
    setHoveredRating(null);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        let starClass = 'far fa-star'; // Por defecto, estrella vacía
        if (starValue <= fullStars) {
          starClass = 'fas fa-star'; // Estrella llena
        } else if (starValue === fullStars + 1 && hasHalfStar) {
          starClass = 'fas fa-star-half-alt'; // Estrella media
        }

        return (
          <i
            key={index}
            className={starClass}
            style={{ color: 'gold', fontSize: '20px', marginRight: '2px' }}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
