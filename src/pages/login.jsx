import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import autonegro from "../assets/autonegro.jpg";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login, loading } = useAuth();
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  try {
    const success = await login({ email, password });
    if (success) navigate("/abmAutos");
  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="login-fullscreen" style={{ backgroundImage: `url(${autonegro})` }}>
      <div className="login-overlay">
        <div className="login-container">
          <h2>Iniciar Sesión</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Ingresar</button>
            {error && <p className="form-error">{error}</p>}
          </form>

          <p>
            ¿No tenés cuenta? <Link to="/register">Registrate aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;