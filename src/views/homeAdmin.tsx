import React from 'react';
import { Menu } from '../components/menu';

function HomeAdmin() {
  const user = JSON.parse(localStorage.getItem('user')!);

  return (
    <div>
      <Menu role={user ? user.role : null} isLoggedIn={!!user} />
      <h1>Bienvenido a la Página Principal del Administrador</h1>
      <p>Aquí puedes gestionar productos, ver estadísticas y administrar pedidos.</p>
    </div>
  );
}

export default HomeAdmin;
