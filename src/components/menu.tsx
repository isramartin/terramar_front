import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;

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
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{ backgroundColor: "#01192A" }}
    >
      <div className="container-fluid">
        {}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {}
       <NavLink className="navbar-brand" to="/home">
          TERRAMAR
        </NavLink>
        {}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                View Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/formulario">
                Únete
              </NavLink>
            </li>

            {}
            {isLoggedIn && (role === "client" || isGoogleAuthenticated) && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/view-orders">
                    View Orders
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/account-settings">
                    Account Settings
                  </NavLink>
                </li>
              </>
            )}

            {}
            {isLoggedIn && role === "admin" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home-admin">
                    Home Admin
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/manage-users">
                    Manage Users
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/view-reports">
                    View Reports
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {}
          <ul className="navbar-nav">
            <li className="nav-item">
              <ProfileMenu
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                profileImage={user?.profileImage}
                username={user?.name}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
