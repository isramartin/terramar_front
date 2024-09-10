import React from 'react';
import '../styles/footer.css'; // Asegúrate de crear y enlazar este archivo CSS

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
      <div className="footer-links">
        <a href="/about">Acerca de</a>
        <a href="/contact">Contacto</a>
        <a href="/privacy">Política de Privacidad</a>
      </div>
    </footer>
  );
};
