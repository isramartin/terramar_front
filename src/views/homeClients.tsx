import React from 'react';

function HomeClient() {
  return (
    <div className="home-client">
      <h1>Home Cliente</h1>
      <div className="product-list">
        <div className="product-card">
          <div className="product-image">
            <img src="https://via.placeholder.com/150" alt="Producto 1" />
          </div>
          <div className="product-info">
            <h2>Producto 1</h2>
            <p>Descripción breve del producto 1.</p>
            <p>Precio: $XX.XX</p>
          </div>
        </div>
        <div className="product-card">
          <div className="product-image">
            <img src="https://via.placeholder.com/150" alt="Producto 2" />
          </div>
          <div className="product-info">
            <h2>Producto 2</h2>
            <p>Descripción breve del producto 2.</p>
            <p>Precio: $XX.XX</p>
          </div>
        </div>
        {/* Agrega más productos aquí */}
      </div>
    </div>
  );
}

export default HomeClient;
