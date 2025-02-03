import React from "react";
import Datos from "../assets/mockdata/Datos.json"; // Importa los datos mock
import "../styles/masVendidos.css"; // Importa los nuevos estilos
import imagen1 from "../assets/image/image4.png";
import imagen2 from "../assets/image/image5.png";
import imagen3 from "../assets/image/image6.png";
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  addedDate: string;
  rating?: number;
  reviews?: number;
  sales: number;
}

const imageMap: { [key: string]: string } = {
  "image4.png": imagen1,
  "image5.png": imagen2,
  "image6.png": imagen3,
};

const MAX_TOP_PRODUCTS = 10; // Top 10 productos más vendidos

const TopSellingProducts: React.FC = () => {
  const topSellingProducts = Datos.products
    .filter((product: Product) => product.sales > 0) // Filtrar productos con ventas
    .sort((a, b) => b.sales - a.sales) // Ordenar por ventas en orden descendente
    .slice(0, MAX_TOP_PRODUCTS); // Limitar a los 10 más vendidos

  return (
    <div className="top-container">
      <h2 className="top-title">Top 10 Productos Más Vendidos</h2>
      <div className="top-grid">
        {topSellingProducts.map((product, index) => (
          <div key={product.id} className="top-card">
            {/* Número del ranking */}
            <div className="top-rank">#{index + 1}</div>

            {/* Imagen del producto */}
            <img
              src={imageMap[product.image]}
              alt={product.image}
              className="top-image"
            />

            {/* Contenido */}
            <div className="top-content">
              <h3 className="top-name">{product.name}</h3>
              <p className="top-price">${product.price.toFixed(2)}</p>

              {/* Reseñas y rating */}
              <div className="top-rating">
                <span>⭐ {product.rating || 0}</span>
                <span>({product.reviews || 0} reseñas)</span>
              </div>

              {/* Botón */}
              <button className="top-button">Ver Producto</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSellingProducts;
