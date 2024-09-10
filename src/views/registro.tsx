import React, { useState } from "react";
import { Menu } from "../components/menu";
import "../styles/login.css";

const FormularioRegistro = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    usuario: "",
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [error, setError] = useState("");

//   const user = localStorage.getItem("user")
//     ? JSON.parse(localStorage.getItem("user")!)
//     : null;
//   const isLoggedIn = !!user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar si las contraseñas coinciden
    if (formData.contraseña !== formData.confirmarContraseña) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Si las contraseñas coinciden, limpiar el error y procesar el formulario
    setError("");
    console.log(formData);
    alert("Registro completado con éxito");

    // Reiniciar el formulario
    setFormData({
      nombres: "",
      apellidos: "",
      usuario: "",
      correo: "",
      contraseña: "",
      confirmarContraseña: "",
    });
  };

  return (
    <div className="login-page">
    

      <div className="login-container">
        <h2 className="heading">Registro de Usuario</h2>

        <form onSubmit={handleSubmit}>
          <label className="label" htmlFor="nombres">Nombres:</label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            className="input-email"
            placeholder="Tus nombres"
            value={formData.nombres}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="apellidos">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            className="input-email"
            placeholder="Tus apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="usuario">Nombre de usuario:</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            className="input-email"
            placeholder="Elige un nombre de usuario"
            value={formData.usuario}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            className="input-email"
            placeholder="tu@email.com"
            value={formData.correo}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            className="input-password"
            placeholder="Crea una contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />

          <label className="label" htmlFor="confirmarContraseña">Confirmar contraseña:</label>
          <input
            type="password"
            id="confirmarContraseña"
            name="confirmarContraseña"
            className="input-password"
            placeholder="Confirma tu contraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            required
          />

          {error && <p className="error-message">{error}</p>}

          <button className="submit-button" type="submit">Registrar</button>

          <p className="p">¿Ya tienes cuenta? <a href="/login" className="register-link">inicia sesion aqui</a></p>
        </form>
      </div>
    </div>
  );
};

export default FormularioRegistro;
