import React, { useState } from "react";
import { Menu } from "../components/menu";
import "../styles/formulario.css";

const FormularioContacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    celular: "",
    ciudad: "",
    mensaje: ""
  });

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null;
  const isLoggedIn = !!user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    alert("Formulario enviado");

    setFormData({
      nombre: "",
      email: "",
      celular: "",
      ciudad: "",
      mensaje: ""
    });
  };

  return (
    <div className="contentf">
      <Menu role={user?.role || null} isLoggedIn={isLoggedIn} />

      <div className="form-wrapper">
        {/* Formulario */}
        <form className="form-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Formulario de Contacto</h2>

          <div className="form-group">
            <label className="form-label" htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="form-input"
              placeholder="Tu nombre completo"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Correo electrónico:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="celular">Celular:</label>
            <input
              type="tel"
              id="celular"
              name="celular"
              className="form-input"
              placeholder="Tu número de celular"
              value={formData.celular}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ciudad">Ciudad:</label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              className="form-input"
              placeholder="Tu ciudad de residencia"
              value={formData.ciudad}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="mensaje">Mensaje:</label>
            <textarea
              id="mensaje"
              name="mensaje"
              className="form-textarea"
              placeholder="Escribe tu mensaje aquí"
              value={formData.mensaje}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button className="form-button" type="submit">Enviar mensaje</button>
        </form>

        {/* Información adicional */}
        <div className="form-info">
          <h3>¿Quieres Unirte?</h3>
          <p>
            al unirte al equipo, se otorgara algunos beneficios, como regalos
            productos gratis, y descuentos
          </p>
          <p>
            empieza hoy y se tu propio jefe, invierte hoy y vcosecha las ganancias mañana.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormularioContacto;
