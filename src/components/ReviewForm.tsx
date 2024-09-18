import React, { useState } from 'react';
import StarRating from './StartRating'; // Importa el componente StarRating
import '../styles/review.css'

interface ReviewFormProps {
    onSubmit: (review: string, rating: number) => void;
  }
  
  const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (review.trim() && rating > 0) {
        onSubmit(review, rating);
        setReview('');
        setRating(0);
      }
    };
  
    return (
      <form className="review-form" onSubmit={handleSubmit}>
        <h2>Deja tu reseña</h2>
        <div className="star-rating">
          <StarRating rating={rating} onRate={setRating} />
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Escribe tu reseña aquí..."
          rows={4}
        />
        <button type="submit">Enviar Reseña</button>
      </form>
    );
  };
  

export default ReviewForm;
