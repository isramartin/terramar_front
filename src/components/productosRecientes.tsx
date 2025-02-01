import React from 'react';
import Datos from '../assets/mockdata/Datos.json'; // Importa los datos mock
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importa el JS de Bootstrap
import '../styles/productosRecientes.css'; // Importa el CSS personalizado (si es necesario)
import imagen1 from '../assets/image/image4.png';
import imagen2 from '../assets/image/image5.png';
import imagen3 from '../assets/image/image6.png';

const imageMap: { [key: string]: string } = {
  'image4.png': imagen1,
  'image5.png': imagen2,
  'image6.png': imagen3,
};


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
    <div className="recent-products bg-white py-4">
      <div className="container-fluid px-0"> {/* Contenedor fluido sin padding horizontal */}
        <h2 className="product-title mb-4 ps-3">Productos Recientes</h2> {/* Título alineado a la izquierda */}
        <div className="row g-3 ps-3"> {/* Alineación a la izquierda */}
          {recentProducts.map((product) => (
            <div key={product.id} className="col-6 col-md-4 col-lg-3"> {/* 2 tarjetas por fila en móviles */}
              <div className="card h-100" onClick={() => handleCardClick(product.id)}>
                <img
                  src={imageMap[product.image]} 
                  alt={product.image}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h6 className="card-title">{product.name}</h6>
                  <p className="card-text text-success">${product.price.toFixed(2)}</p>
                  {/* Rating y reviews solo en pantallas grandes */}
                  <div className="d-none d-lg-block">
                    <div className="rating-reviews">
                      <span className="rating">⭐ {product.rating?.toFixed(1) || 0}</span>
                      <span className="reviews">({product.reviews || 0} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentProducts;