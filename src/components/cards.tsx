// src/components/ProductCard.tsx
import React from 'react';
import '../styles/cards.css'

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  description?: string;
  onAddToCart?: (id: number) => void;
  onBuyNow?: (id: number) => void;
  customButtons?: React.ReactNode;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    image = 'ruta/de/imagen/por/defecto.jpg', // Imagen por defecto
    description,
    onAddToCart,
    onBuyNow,
  }) => {
    return (
        <div className="card product-card">
          <img src={image} className="card-img-top" alt={name} />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            {description && <p className="card-text">{description}</p>}
            <p className="card-text">${price.toFixed(2)}</p>
            <button className="btn btn-primary" onClick={() => onAddToCart?.(id)}>
              Agregar al Carrito
            </button>
            <button className="btn btn-success ml-2" onClick={() => onBuyNow?.(id)}>
              Comprar Ahora
            </button>
          </div>
        </div>
      );
    
};

export default ProductCard;
