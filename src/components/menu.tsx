// src/components/Menu.tsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  };

  return (
    <nav>
      <ul>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/view-products">View Products</Link></li>
          </>
        ) : (
          <>
            
            {role === 'client' && (
              <>
              <li><Link to="/home-client">Home Client</Link></li>
                <li><Link to="/view-orders">View Orders</Link></li>
                <li><Link to="/account-settings">Account Settings</Link></li>
              </>
            )}
            {role === 'admin' && (
              <>
              <li><Link to="/home-client">Home admin</Link></li>
                <li><Link to="/manage-users">Manage Users</Link></li>
                <li><Link to="/view-reports">View Reports</Link></li>
              </>
            )}
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}
