import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AbmAutos from "./pages/abmAutos";
import Footer from "./components/footer";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Rutas públicas (login/register) deben redirigir a usuarios autenticados */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rutas protegidas: solo accesibles cuando está autenticado */}
          <Route element={<ProtectedRoute />}>
            <Route path="/abmAutos" element={<AbmAutos />} />
          </Route>
        </Routes>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;