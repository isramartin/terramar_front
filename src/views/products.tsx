// src/views/Products.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Datos from '../assets/mockdata/Datos.json';
import { Menu } from '../components/menu';
import ProductCard from '../components/cards';
import Paginador from '../components/paginador';
import "../styles/global.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating?: number;  // Hacer 'rating' opcional
  reviews?: number;  // Hacer 'reviews' opcional
  
}

const PRODUCTS_PER_PAGE = 8; // Número de productos por página

function Products() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
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

  const totalPaginas = Math.ceil(productList.length / PRODUCTS_PER_PAGE);
  const productosPaginados = productList.slice((paginaActual - 1) * PRODUCTS_PER_PAGE, paginaActual * PRODUCTS_PER_PAGE);

  const handleCambioPagina = (pagina: number) => {
    if (pagina >= 1 && pagina <= totalPaginas) {
      setPaginaActual(pagina);
    }
  };

  return (
    <div className="globalcontainer">
      <div className="content">
        <Menu role={user?.role || null} isLoggedIn={isLoggedIn} />
        <div className="content-home">
          <h1>Productos</h1>
        </div>
        <div className="products-grid">
          {productosPaginados.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              rating={product.rating ?? 0}
              reviews={product.reviews ?? 0}
              onClick={handleCardClick}
              // onAddToCart={handleAddToCart}
              // onBuyNow={handleBuyNow}
            />
          ))}
        </div>
        <Paginador
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          onCambioPagina={handleCambioPagina}
        />
      </div>
      <footer className="footer">
        <p>© 2024 Mi Tienda. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Products;
