import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import autoblanco from "../assets/autoblanco.jpg";
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ name, email, password });
      navigate("/", { state: { registered: true } });
    }
    catch (err) {
      setError(err.message || "Error al registrar");
    }
  };
  
    return (
      <div className="auth-background">
            <div className="register-container">
          <h2>Registrarse</h2>

         <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="User name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

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

            <button type="submit">Registrarse</button>
            {error && <p className="form-error">{error}</p>}
        </form>

        <p>
            ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión aquí</Link>
        </p>
        </div>
    </div>
    );
};


export default Register;