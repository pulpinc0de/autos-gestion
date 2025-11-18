import React from "react";
import { Link, useLocation } from "react-router-dom";
import autoazul from "../assets/autoazul.jpg"; 
import "../styles/home.css";

const Home = () => {
  const location = useLocation();
  const registered = location?.state?.registered;

  return (
    <div className="home-fullscreen" style={{ backgroundImage: `url(${autoazul})` }}>
      <div className="home-overlay">
        <h1>Gestión de Autos</h1>
        <p className="description">Organizá, registrá y controlá tus vehículos de forma eficiente y segura.</p>

        {registered && (
          <p className="success-message"> Registro exitoso. Por favor iniciá sesión.</p>
        )}

        <div className="button-group">
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;