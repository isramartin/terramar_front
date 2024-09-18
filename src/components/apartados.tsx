import React, { useEffect, useState } from 'react';
import '../styles/apartados.css'; // Asegúrate de tener este archivo CSS
import Datos from '../assets/mockdata/Datos.json';
import StarRating from './StartRating';
import ReviewForm from './ReviewForm';

interface ApartadosProps {
    productId: number;
    descriptionD: string;
}

interface Review {
    id: number;
    name: string;
    image: string;
    comment: string;
    rating: number;
}

interface Testimonial {
    productId: number;
    reviews: Review[];
}

export default function Apartados({ productId, descriptionD }: ApartadosProps) {
  const [activeTab, setActiveTab] = useState('descripcion');
  const [reviews, setReviews] = useState<Review[]>([]);


  useEffect(() => {
    // Cargar las reseñas desde el archivo JSON
    const fetchReviews = () => {
      const data = Datos as { testimonials: Testimonial[] };
      const productReviews = data.testimonials.find(
        (testimonial) => testimonial.productId === productId
      );

      if (productReviews) {
        setReviews(productReviews.reviews);
      }
    };

    fetchReviews();
  }, [productId]);
  

  const handleSubmitReview = (review: string, rating: number) => {
    const newReview: Review = {
      id: Date.now(), // Genera un ID único para la nueva reseña
      name: 'Usuario Anónimo', // Puedes reemplazar esto con la información del usuario autenticado
      image: '', // Puedes agregar una imagen de perfil si es necesario
      comment: review,
      rating: rating,
    };
    setReviews([...reviews, newReview]);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="apartados-container">
      <div className="apartados-tabs">
        <button
          className={activeTab === 'descripcion' ? 'active' : ''}
          onClick={() => handleTabClick('descripcion')}
        >
          Descripción del producto
        </button>
        <button
          className={activeTab === 'informacion' ? 'active' : ''}
          onClick={() => handleTabClick('informacion')}
        >
          Información
        </button>
        <button
          className={activeTab === 'resenas' ? 'active' : ''}
          onClick={() => handleTabClick('resenas')}
        >
          Reseñas
        </button>
      </div>
      
      <div className="apartados-content">
        {activeTab === 'descripcion' && (
          <div className="descripcion">
            <h2>Descripción del Producto</h2>
            <p>{descriptionD}</p>
          </div>
        )}
        {activeTab === 'informacion' && (
          <div className="informacion">
            <h2>Información</h2>
            <p>Aquí puedes agregar detalles adicionales sobre el producto.</p>
          </div>
        )}
         {activeTab === 'resenas' && (
          <div className="resenas">
            <div className="reviews-list">
              {reviews.length === 0 ? (
                <p>No hay reseñas disponibles.</p>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="review">
                    <h3>{review.name}</h3>
                    <p>{review.comment}</p>
                    <StarRating rating={review.rating} onRate={function (rating: number): void {
                      throw new Error('Function not implemented.');
                    } } />
                  </div>
                ))
              )}
            </div>
            <div className="review-form-container">
              <ReviewForm onSubmit={handleSubmitReview} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
