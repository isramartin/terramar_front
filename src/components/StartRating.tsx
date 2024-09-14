import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';


interface StarRatingProps {
  rating: number; // Calificación que va de 0 a 5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  // Calcula cuántas estrellas completas y medias debe mostrar
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  // Estilos para las estrellas
  const starStyle: React.CSSProperties = {
    color: 'gold',    // Cambiar el color de las estrellas
    fontSize: '20px', // Tamaño de las estrellas
    marginRight: '2px' // Espaciado entre estrellas
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {[...Array(fullStars)].map((_, index) => (
      <i key={index} className="fas fa-star" style={{ color: 'gold', fontSize: '20px', marginRight: '2px' }} />
    ))}
    {hasHalfStar && (
      <i className="fas fa-star-half-alt" style={{ color: 'gold', fontSize: '20px', marginRight: '2px' }} />
    )}
    {[...Array(emptyStars)].map((_, index) => (
      <i key={index} className="far fa-star" style={{ color: 'gold', fontSize: '20px', marginRight: '2px' }} />
    ))}
  </div>
  );
};

export default StarRating;
