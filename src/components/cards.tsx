import React from 'react';
import '../styles/cards.css';

import imagen1 from '../assets/image/image1.png';
import imagen2 from '../assets/image/image2.png';
import imagen3 from '../assets/image/image3.png';

const imageMap: { [key: string]: string } = {
  'image1.png': imagen1,
  'image2.png': imagen2,
  'image3.png': imagen3,
};

export interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string; // Nombre del archivo de imagen
  description?: string;
  onAddToCart?: (id: number) => void;
  onBuyNow?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    id,
    name,
    price,
    image,
    description,
    onAddToCart,
    onBuyNow,
  }) => {
    const imgSrc = imageMap[image] || '/assets/image/default.jpg'; // Imagen por defecto

    return (
        <div className="product-card">
          <img src={imgSrc} className="card-img-top" alt={name} />
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
