import React, { useState } from 'react';
import '../styles/apartados.css'; // Asegúrate de tener este archivo CSS
import Datos from '../assets/mockdata/Datos.json';


interface ApartadosProps {
    descriptionD: string;
  }

export default function Apartados({ descriptionD }: ApartadosProps) {
  const [activeTab, setActiveTab] = useState('descripcion');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="apartados-container">
      <div className="apartados-tabs">
        <button
          className={activeTab === 'descripcion' ? 'active' : ''}
          onClick={() => handleTabClick('descripcion')}
        >
          Descripción del producto
        </button>
        <button
          className={activeTab === 'informacion' ? 'active' : ''}
          onClick={() => handleTabClick('informacion')}
        >
          Información
        </button>
        <button
          className={activeTab === 'resenas' ? 'active' : ''}
          onClick={() => handleTabClick('resenas')}
        >
          Reseñas
        </button>
      </div>
      
      <div className="apartados-content">
        {activeTab === 'descripcion' && (
          <div className="descripcion">
            <h2>Descripción del Producto</h2>
            <p>{descriptionD}</p>
          </div>
        )}
        {activeTab === 'informacion' && (
          <div className="informacion">
            <h2>Información</h2>
            <p>Aquí puedes agregar detalles adicionales sobre el producto.</p>
          </div>
        )}
        {activeTab === 'resenas' && (
          <div className="resenas">
            <h2>Reseñas</h2>
            <p>Aquí estarán listadas las reseñas del producto.</p>
          </div>
        )}
      </div>
    </div>
  );
}
