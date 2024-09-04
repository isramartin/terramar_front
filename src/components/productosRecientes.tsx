import React, { useRef, useEffect } from 'react';
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
}

const RECENT_DAYS = 15; // Número de días para considerar un producto como reciente
const MAX_RECENT_PRODUCTS = 6; // Número máximo de productos recientes a mostrar

const RecentProducts: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const recentProducts = Datos.products
    .filter((product: Product) => {
      const addedDate = new Date(product.addedDate);
      const daysDifference = (now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDifference <= RECENT_DAYS;
    })
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()) // Ordenar por fecha descendente
    .slice(0, MAX_RECENT_PRODUCTS);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const totalWidth = recentProducts.length * 300 + (recentProducts.length - 1) * 20; // Ajusta el cálculo según el tamaño y espaciado de los ítems

      const scrollInterval = setInterval(() => {
        if (carousel) {
          carousel.scrollBy({ left: 1, behavior: 'smooth' });
          if (carousel.scrollLeft >= totalWidth - carousel.clientWidth) {
            carousel.scrollLeft = 0; // Reiniciar el scroll al principio
          }
        }
      }, 10); // Ajusta el intervalo para la velocidad del desplazamiento

      return () => clearInterval(scrollInterval);
    }
  }, [recentProducts]);

  return (
    <div className="recent-products-carousel">
      <div className="carouselP-wrapper">
        <div className="carouselP" ref={carouselRef}>
          <div className="carouselP-inner">
            {recentProducts.map(product => (
              <div key={product.id} className="carouselP-item">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                />
              </div>
            ))}
            {/* Repetir los ítems en el carrusel para el efecto continuo */}
            {recentProducts.map(product => (
              <div key={`repeat-${product.id}`} className="carouselP-item">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentProducts;
