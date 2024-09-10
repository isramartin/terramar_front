import React from 'react';
import '../styles/cards.css';

import imagen1 from '../assets/image/image4.png';
import imagen2 from '../assets/image/image5.png';
import imagen3 from '../assets/image/image6.png';

const imageMap: { [key: string]: string } = {
  'image4.png': imagen1,
  'image5.png': imagen2,
  'image6.png': imagen3,
};

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string; // Nombre del archivo de imagen
  description?: string;
  onAddToCart?: (id: number) => void;
  onBuyNow?: (id: number) => void;
  onClick: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    image,
    description,
    onAddToCart,
    onBuyNow,
    onClick,
  }) => {
    const imgSrc = imageMap[image] || '/assets/image/default.jpg'; // Imagen por defecto

    return (
      <div 
        className="product-card" 
        onClick={() => onClick(id)} // Llama a la función onClick al hacer clic
      >
        <img src={imgSrc} className="card-img-top" alt={name} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          {description && <p className="card-text">{description}</p>}
          <p className="card-text">${price.toFixed(2)}</p>
          <div className="button-group">
            {onAddToCart && (
              <button 
                className="btn btn-primary" 
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el clic en este botón cierre el modal
                  onAddToCart(id);
                }}
              >
                Agregar al Carrito
              </button>
            )}
            {onBuyNow && (
              <button 
                className="btn btn-success ml-2" 
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el clic en este botón cierre el modal
                  onBuyNow(id);
                }}
              >
                Comprar Ahora
              </button>
            )}
          </div>
        </div>
      </div>
    );
};

export default ProductCard;
