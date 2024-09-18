import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import '../styles/menu.css'; // Asegúrate de que la ruta al archivo CSS sea correcta

interface MenuProps {
  role: 'admin' | 'client' | null; // Permite que el rol sea null para los no logueados
  isLoggedIn: boolean;
}

export function Menu(props: MenuProps): JSX.Element {
  const { role, isLoggedIn } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el usuario del localStorage
    localStorage.removeItem('user');
    // Redirige a la página de login
    navigate('/login');
    //cambios de muestra
  };

  return (
    <nav>
      <ul>
        <li><Link to="/home-client">Home</Link></li>
        <li><Link to="/products">View Products</Link></li>
        <li><Link to="/formulario">Unete</Link></li>

        {isLoggedIn && role === 'client' && (
          <>
            <li><Link to="/view-orders">View Orders</Link></li>
            <li><Link to="/account-settings">Account Settings</Link></li>
          </>
        )}
        {isLoggedIn && role === 'admin' && (
          <>
            <li><Link to="/home-admin">Home Admin</Link></li>
            <li><Link to="/manage-users">Manage Users</Link></li>
            <li><Link to="/view-reports">View Reports</Link></li>
          </>
        )}
        
        <ProfileMenu isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      </ul>
    </nav>
  );
}
