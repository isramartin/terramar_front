import React from 'react';
import Datos from '../assets/mockdata/Datos.json'; // Importa los datos mock
import ProductCard from './cards'; // Importa el componente ProductCard
import '../styles/productosRecientes.css'

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  addedDate: string;
  rating?: number;
  reviews?: number;
  sales: number; // Agrega el atributo 'sales' para determinar las ventas
}

const MAX_TOP_PRODUCTS = 8; // Número máximo de productos más vendidos a mostrar

const TopSellingProducts: React.FC = () => {
  const topSellingProducts = Datos.products
    .filter((product: Product) => product.sales > 0) // Filtrar productos con ventas mayores a 0
    .sort((a, b) => b.sales - a.sales) // Ordenar por ventas en orden descendente
    .slice(0, MAX_TOP_PRODUCTS); // Limitar al máximo de productos a mostrar

  const handleCardClick = (id: number) => {
    console.log(`Producto ${id} clickeado`);
    // Aquí podrías manejar la apertura del modal con detalles del producto o redirigir a otra página
  };

  return (
    <div className="top-selling-products">
      <div className="products-grid">
        {topSellingProducts.map(product => (
          <div key={product.id} className="product-item">
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              rating={product.rating || 0}
              reviews={product.reviews || 0}
              onClick={handleCardClick} // Pasar la función de clic
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
