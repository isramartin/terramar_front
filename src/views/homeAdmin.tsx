import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '../components/menu';
import '../styles/global.css'

function HomeAdmin() {
    const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')!);

//    // Si no hay un usuario autenticado o no es admin, redirige al login
//    if (!user || user.role !== 'admin') {
//     navigate('/login');
//     return null; // Evita renderizar el contenido si no está autenticado
//   }

useEffect(() => {
    // Si no hay un usuario autenticado o no es admin, redirige al login
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    // Evita que se renderice el contenido mientras se redirige
    return null;
  }


  return (
    <div className="globalcontainer">
      <Menu role={user ? user.role : null} isLoggedIn={!!user} />
      <div className="title-home">
      <h1>Bienvenido a la Página Principal del Administrador</h1>
      <p>Aquí puedes gestionar productos, ver estadísticas y administrar pedidos.</p>
      </div>
    </div>
  );
}

export default HomeAdmin;
