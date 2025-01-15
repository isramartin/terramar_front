import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import "../styles/menu.css"; // Asegúrate de que la ruta al archivo CSS sea correcta
import { account } from "../appwrite/appwriteConfig";

interface MenuProps {
  role: "admin" | "client" | null; // Permite que el rol sea null para los no logueados
  isLoggedIn: boolean;
}

export function Menu(props: MenuProps): JSX.Element {
  const { role, isLoggedIn } = props;
  const navigate = useNavigate();

  // Estado adicional para manejar usuarios autenticados con Google
  const [isGoogleAuthenticated, setIsGoogleAuthenticated] = useState(false);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
  
  useEffect(() => {
    // Verificar si el usuario está autenticado con Google
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser.authProvider === "google") {
        setIsGoogleAuthenticated(true);
      } else {
        setIsGoogleAuthenticated(false);
      }
    } else {
      setIsGoogleAuthenticated(false);
    }
  }, []);

  // const handleLogout = () => {
  //   // Elimina el usuario del localStorage
  //   localStorage.removeItem('user');
  //   setIsGoogleAuthenticated(false);
  //   // Redirige a la página de login
  //   navigate('/');
  // };

  const handleLogout = async () => {
    try {
      // Elimina el usuario del localStorage
      localStorage.removeItem("user");
      setIsGoogleAuthenticated(false);

      // Cierra todas las sesiones activas (incluyendo Google OAuth)
      await account.deleteSessions();

      console.log("Sesión cerrada correctamente.");

      // Redirige a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home?=">Home</Link>
        </li>
        <li>
          <Link to="/products">View Products</Link>
        </li>
        <li>
          <Link to="/formulario">Unete</Link>
        </li>

        {/* Opciones específicas para clientes autenticados */}
        {isLoggedIn && (role === "client" || isGoogleAuthenticated) && (
          <>
            <li>
              <Link to="/view-orders">View Orders</Link>
            </li>
            <li>
              <Link to="/account-settings">Account Settings</Link>
            </li>
          </>
        )}

        {/* Opciones específicas para administradores */}
        {isLoggedIn && role === "admin" && (
          <>
            <li>
              <Link to="/home-admin">Home Admin</Link>
            </li>
            <li>
              <Link to="/manage-users">Manage Users</Link>
            </li>
            <li>
              <Link to="/view-reports">View Reports</Link>
            </li>
          </>
        )}

        {/* Menú de perfil */}
        {/* <ProfileMenu isLoggedIn={isLoggedIn} onLogout={handleLogout} /> */}
        <ProfileMenu
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          profileImage={user?.profileImage}
          username={user?.name}
        />
      </ul>
    </nav>
  );
}
