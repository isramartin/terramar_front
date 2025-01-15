import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig"; // Importa desde la configuración centralizada
import "../styles/login.css";
import { OAuthProvider } from "appwrite";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Aquí puedes agregar lógica de autenticación basada en credenciales
  };

  const handleGoogleLogin = async () => {
  try {
    console.log("Iniciando sesión con Google...");

    // Cerrar cualquier sesión existente en Appwrite
    await account.deleteSessions().catch(() => {
      console.log("No hay sesiones activas para cerrar.");
    });

    // Iniciar sesión con Google
    await account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000/callback", // Redirección exitosa
      "http://localhost:3000/" // Redirección en caso de error
    );

    // Después de la redirección, verifica si el usuario está autenticado
    const user = await account.get();
    console.log("Usuario autenticado:", user);

    // Guardar el usuario en localStorage con rol de 'client'
    const userData = { ...user, role: 'client' };
    localStorage.setItem('user', JSON.stringify(userData));

    // Redirigir a la vista de cliente
    navigate('/home-client');
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    setErrorMessage("No se pudo iniciar sesión con Google.");
  }
};

  
  
  
  

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Iniciar Sesión</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <label>
            Correo Electrónico:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={handleGoogleLogin} className="google-login-button">
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}

export default Login;
