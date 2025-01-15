// src/components/ProductDetail.tsx
import React from 'react';
import '../styles/productDetail.css'; // Asegúrate de crear este archivo CSS
import imagen1 from '../assets/image/image4.png';
import imagen2 from '../assets/image/image5.png';
import imagen3 from '../assets/image/image6.png';
import Apartados from './apartadosReview';


const imageMap: { [key: string]: string } = {
  'image4.png': imagen1,
  'image5.png': imagen2,
  'image6.png': imagen3,
};


interface ProductDetailProps {
  id: number;
  image: string;
  name: string;
  price: number;
  description: string;
  descriptionD: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id, image, name, price, description, descriptionD  }) => {
    const imgSrc = imageMap[image] || '/assets/image/default.jpg';
  return (
    <div className="product-detail">
  <div className="product-top">
    <div className="product-image-container">
      <img src={imgSrc} alt={name} />
    </div>
    <div className="product-info-container">
      <h2>{name}</h2>
      <p className="price">${price.toFixed(2)}</p>
      <p className="description">{description}</p>
    </div>
  </div>
  <div className="additional-info">
    {/* Aquí puedes agregar más contenido según sea necesario */}
    {/* <h2>holaa probando </h2> */}

    <Apartados descriptionD={descriptionD} productId={id}/>
  </div>

 
</div>

  );
};

export default ProductDetail;
