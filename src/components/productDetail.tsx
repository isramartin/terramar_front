// src/components/ProductDetail.tsx
import React from 'react';
import '../styles/productDetail.css'; // Asegúrate de crear este archivo CSS
import imagen1 from '../assets/image/image4.png';
import imagen2 from '../assets/image/image5.png';
import imagen3 from '../assets/image/image6.png';


const imageMap: { [key: string]: string } = {
  'image4.png': imagen1,
  'image5.png': imagen2,
  'image6.png': imagen3,
};


interface ProductDetailProps {
  image: string;
  name: string;
  price: number;
  description: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ image, name, price, description }) => {
    const imgSrc = imageMap[image] || '/assets/image/default.jpg';
  return (
    <div className="product-detail">
    
      <div className="product-image">
      <img src={imgSrc} alt={name} />
      </div>
      <div className="product-info">
        <h2>{name}</h2>
        <p className="price">${price.toFixed(2)}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
