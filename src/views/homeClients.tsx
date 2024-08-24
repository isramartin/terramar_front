import React from 'react';
import { Menu } from '../components/menu';

export function HomeClient(): JSX.Element {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  const isLoggedIn = !!user;

  return (
    
   
<div>
      <Menu role={user?.role || null} isLoggedIn={isLoggedIn} />
      <h1>Bienvenido a la Página Principal del Cliente</h1>
      <p>Aquí puedes ver productos y hacer pedidos.</p>
    </div>
  );
}

export default HomeClient;
