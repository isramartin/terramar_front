import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/login';
import HomeClient from './views/homeClients';
import HomeAdmin from './views/homeAdmin';
import './App.css';

function App() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  const PrivateRoute = ({ children, role }: { children: JSX.Element; role: 'admin' | 'client' }) => {
    if (!user) {
      // Redirigir a login si no hay usuario autenticado
      return <Navigate to="/login" />;
    }

    // Verificar el rol del usuario
    if (user.role === role) {
      return children;
    } else {
      return <Navigate to="/home-client" />; // Redirigir si el rol no coincide
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home-client" element={<HomeClient />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route 
          path="/home-admin" 
          element={
            <PrivateRoute role="admin">
              <HomeAdmin />
            </PrivateRoute>
          } 
        />
        {/* <Route 
          path="/payment" 
          element={
            user ? <Payment /> : <Navigate to="/login" />
          }
        /> */}
        <Route path="/" element={<Navigate to="/home-client" />} />
      </Routes>
    </Router>
  );
}

export default App;