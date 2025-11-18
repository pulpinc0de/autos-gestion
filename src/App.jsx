import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AbmAutos from "./pages/abmAutos";
import Footer from "./components/footer";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <AuthProvider>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />

          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

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