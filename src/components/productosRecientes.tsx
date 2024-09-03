import React, { useRef, useEffect, useState } from 'react';
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
  const [scrollPosition, setScrollPosition] = useState(0);

  const now = new Date();
  const recentProducts = Datos.products
    .filter((product: Product) => {
      const addedDate = new Date(product.addedDate);
      const daysDifference = (now.getTime() - addedDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDifference <= RECENT_DAYS;
    })
    .sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()) // Ordenar por fecha descendente
    .slice(0, MAX_RECENT_PRODUCTS); // Tomar los primeros 6 productos recientes

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleScroll = () => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 1) {
          carousel.scrollLeft = 0;
        }
        setScrollPosition(carousel.scrollLeft);
      };

      // Mover el carrusel automáticamente
      const scrollInterval = setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth < carousel.scrollWidth) {
          carousel.scrollLeft += 1; // Ajusta la velocidad del desplazamiento
        } else {
          carousel.scrollLeft = 0; // Reiniciar el desplazamiento al principio
        }
      }, 20); // Ajusta el intervalo de tiempo para el desplazamiento automático

      carousel.addEventListener('scroll', handleScroll);

      return () => {
        clearInterval(scrollInterval);
        carousel.removeEventListener('scroll', handleScroll);
      };
    }
  }, [recentProducts]);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // Ajusta el valor según el tamaño de las tarjetas
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // Ajusta el valor según el tamaño de las tarjetas
    }
  };

  return (
    <div className="recent-products-carousel">

      <div className="carouselP-wrapper">
        <button className="carouselP-button prev" onClick={handlePrev}>❮</button>
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
            {/* Duplicar el contenido para el efecto infinito */}
            {recentProducts.map(product => (
              <div key={`duplicate-${product.id}`} className="carouselP-item">
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
        <button className="carouselP-button next" onClick={handleNext}>❯</button>
      </div>
    </div>
  );
};

export default RecentProducts;
