import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from './appwriteConfig';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await account.get();
        console.log("Usuario autenticado:", user);

        // Guardar el usuario en localStorage con rol de 'client'
        const userData = { ...user, role: 'client' };
        localStorage.setItem('user', JSON.stringify(userData));

        // Redirigir a la vista de cliente
        navigate('/home-client');
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
        navigate('/');
      }
    };

    verifySession();
  }, [navigate]);

  return <p>Autenticando, por favor espera...</p>;
};

export default OAuthCallback;
