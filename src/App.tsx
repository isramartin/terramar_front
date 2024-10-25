// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/login';
import HomeClient from './views/homeClient';
import HomeAdmin from './views/homeAdmin';
import Products from './views/products';
import FormularioContacto from './views/formulario';
import FormularioRegistro from './views/registro';
import ProductDetailPage from './views/productDetail';
import OAuthCallback from './appwrite/OAuthCallback';
import './App.css';


function App() {
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

  const PrivateRoute = ({ children, role }: { children: JSX.Element; role: 'admin' | 'client' }) => {
    if (!user) {
      return <Navigate to="/" />;
    }

    if (user.role === role) {
      return children;
    } else {
      return <Navigate to="/home-client" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<OAuthCallback />} />
        <Route path="/home-client" element={<HomeClient />} />
        <Route path="/home-admin" element={<HomeAdmin />} />
        <Route path="/products" element={ <Products/>} />
        <Route path="/productos/detalle/:id" element={ <ProductDetailPage/>} />
        <Route path="/formulario" element={ <FormularioContacto/>} />
        <Route path="/register" element={ <FormularioRegistro/>} />
        
        <Route 
          path="/home-admin" 
          element={
            <PrivateRoute role="admin">
              <HomeAdmin />
            </PrivateRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/home-client" />} />
      </Routes>
    </Router>
  );
}

export default App;
