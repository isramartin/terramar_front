// src/views/ProductDetailPage.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Datos from '../assets/mockdata/Datos.json';
import ProductDetail from '../components/productDetail'; // Componente
import BreadCrumb from '../components/breadCrumb';
import { Menu } from '../components/menu';
import "../styles/global.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const isLoggedIn = !!user;

  if (!id) {
    return <div>Producto no encontrado</div>;
  }

  const productId = parseInt(id);
  const product = Datos.products.find(p => p.id === productId);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="globalcontainer">
      <div className="content">
      <Menu role={user?.role || null} isLoggedIn={isLoggedIn} />
       
          <BreadCrumb
                      paths={[
                          { label: 'Productos', url: '/products' },
                          { label: 'Detalle', url: `/productos/detalle/${product.id}` },
                          { label: product.name }
                      ]} current={''}   
          />
    
        <div className="product-detail-view">
            <h2>Detalles</h2>
          <ProductDetail
            image={product.image}
            name={product.name}
            price={product.price}
            description={product.description}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
