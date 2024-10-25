import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseApp } from '../firebase/firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Datos from '../assets/mockdata/Datos.json'; // Ajusta la ruta y el nombre del archivo
import '../styles/login.css';

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
  const [errorMessage, setErrorMessage] = useState('');
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
      setErrorMessage('Credenciales inválidas');
      console.error('Credenciales inválidas');
    }
  };

  // Función para iniciar sesión con Google
  const handleGoogleLogin = async () => {
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("logueado", result)
      navigate('/home-client'); // Cambia esto según tu lógica de navegación
    } catch (error) {
      setErrorMessage('Error al iniciar sesión con Google');
      console.error('Error al iniciar sesión con Google:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Iniciar Sesión</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <label className="label">
            Correo Electrónico:
            <input
              type="email"
              className="input-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="login-label">
            Contraseña:
            <input
              type="password"
              className="input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="submit-button">Iniciar Sesión</button>
        </form>
        <button onClick={handleGoogleLogin} className="google-login-button">
          Iniciar Sesión con Google
        </button>
        <a href="/register" className="register-link">Registrarse</a>
      </div>
    </div>
  );
}

export default Login;
