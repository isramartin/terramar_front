// src/views/Products.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Datos from '../assets/mockdata/Datos.json';
import { Menu } from '../components/menu';
import ProductCard from '../components/cards';
import "../styles/global.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

function Products() {
  const [productList, setProductList] = useState<Product[]>([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const isLoggedIn = !!user;

  useEffect(() => {
    // Cargar productos desde los datos mock
    setProductList(Datos.products);
  }, []);

  const handleAddToCart = (id: number) => {
    console.log(`Producto ${id} agregado al carrito`);
  };

  const handleBuyNow = (id: number) => {
    console.log(`Comprar ahora el producto ${id}`);
  };

  const handleCardClick = (id: number) => {
    // Redirigir a la página de detalles del producto
    navigate(`/productos/detalle/${id}`);
  };

  return (
    <div className="globalcontainer">
      <div className="content">
        <Menu role={user?.role || null} isLoggedIn={isLoggedIn} />
        <div className="content-home">
          <h1>Productos</h1>
        </div>
        <div className="products-grid">
          {productList.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
