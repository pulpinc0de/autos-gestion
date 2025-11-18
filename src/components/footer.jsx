import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Gestión de Autos. Todos los derechos reservados.</p>
        <div className="footer-links">
          <a href="#">Política de Privacidad</a>
          <a href="#">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
