import React from 'react';
import Datos from '../assets/mockdata/Datos.json'; // Importa los datos mock
import ProductCard from './cards'; // Importa el componente ProductCard
import '../styles/productosRecientes.css';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  addedDate: string; // Agrega la fecha de adición
  rating?: number;   // Agrega el campo rating opcionalmente
  reviews?: number;  // Agrega el campo reviews opcionalmente
}

const RECENT_DAYS = 15; // Número de días para considerar un producto como reciente
const MAX_RECENT_PRODUCTS = 8; // Número máximo de productos recientes a mostrar

const RecentProducts: React.FC = () => {
  const now = new Date();
  const recentProducts = Datos.products
    .filter((product: Product) => {
      const addedDate = new Date(product.addedDate);
      const daysDifference = (now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDifference <= RECENT_DAYS;
    })
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()) // Ordenar por fecha descendente
    .slice(0, MAX_RECENT_PRODUCTS);

  const handleCardClick = (id: number) => {
    console.log(`Producto ${id} clickeado`);
    // Aquí podrías manejar la apertura del modal con detalles del producto o redirigir a otra página
  };

  return (
    // <div className="recent-products">
      <div className="products-grid">
        {recentProducts.map(product => (
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
    // </div>
  );
};

export default RecentProducts;
