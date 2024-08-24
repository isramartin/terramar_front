import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Datos from '../assets/mockdata/Datos.json'; // Ajusta la ruta y el nombre del archivo

// Define la interfaz User para que coincida con la estructura del JSON
interface User {
  id: number;
  email: string;
  password: string;
  role: string; // Cambiado de 'admin' | 'client' a string
}

// Extrae el array de usuarios del mockData
const users: User[] = Datos.users;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Buscar el usuario en los datos mock
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      // Guardar el usuario en el localStorage o el estado global (opcional)
      localStorage.setItem('user', JSON.stringify(user));

      // Redirigir basado en el rol
      if (user.role === 'admin') {
        navigate('/home-admin');
      } else {
        navigate('/home-client');
      }
    } else {
      console.error('Credenciales inválidas');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Iniciar Sesión</h1>
      <label>
        Correo Electrónico:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Contraseña:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
}

export default Login;
