import React, { useEffect, useState } from 'react';
import Datos from '../assets/mockdata/Datos.json'; // Importa los datos mock
import { Menu } from '../components/menu';
import ProductCard from '../components/cards'; // Importa el componente ProductCard


export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string; // Ahora es opcional
}

function Products() {
  const [productList, setProductList] = useState<Product[]>([]);
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

  return (
    <div className="globalcontainer">
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
            />
          ))}
        </div>
    
    </div>
  );
}

export default Products;
