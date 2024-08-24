import React from 'react';
import { Menu } from '../components/menu';
import '../styles/global.css'; // Asegúrate de que la ruta sea correcta

export function HomeClient(): JSX.Element {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  const isLoggedIn = !!user;

  return (
    <div className="globalcontainer">
      <Menu role={user?.role || null} isLoggedIn={isLoggedIn} />
      <div className="content-home">
        <h1>Bienvenido a la Página Principal del Cliente</h1>
        <p>Aquí puedes ver productos y hacer pedidos.</p>
      </div>
    </div>
  );
}

export default HomeClient;
