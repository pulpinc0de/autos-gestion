import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import "../styles/abmAutos.css";
import autoIlustracion from "../assets/autoPSD.png";

const initialForm = { marca: "", modelo: "", año: "", precio: "", categoria: "" };

const AbmAutos = () => {
  const { logout, user } = useAuth();
  const [autos, setAutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [newCatName, setNewCatName] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");
  const [catMessage, setCatMessage] = useState(null);

  const fetchAutos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/autos');
      setAutos(res.data || []);
    } catch (err) {
      console.error('Error fetching autos', err);
      setError('Error loading autos');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategorias = async () => {
    try {
      const res = await api.get('/api/categorias');
      setCategorias(res.data || []);
    } catch (err) {
      console.error('Error fetching categorias', err);
    }
  };

  const createCategory = async (e) => {
    e && e.preventDefault();
    setCatMessage(null);
    if (!newCatName) {
      setCatMessage({ type: 'error', text: 'El nombre de la categoría es requerido' });
      return;
    }
    try {
      const res = await api.post('/api/categorias', { nombre: newCatName, descripcion: newCatDesc });
      setCatMessage({ type: 'success', text: `Categoría "${res.data.nombre}" creada correctamente` });
      setNewCatName('');
      setNewCatDesc('');
      await fetchCategorias();
    } catch (err) {
      console.error('Error al crear la categoría', err);
      setCatMessage({ type: 'error', text: err?.response?.data?.mensaje || err.message || 'Error al crear la categoría' });
    }
  };

  useEffect(() => {
    fetchAutos();
    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!form.marca || !form.modelo || !form.año || !form.precio || !form.categoria) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        const res = await api.put(`/api/autos/${editingId}`, {
          marca: form.marca,
          modelo: form.modelo,
          año: Number(form.año),
          precio: Number(form.precio),
          categoria: form.categoria
        });
        setAutos(prev => prev.map(a => a._id === editingId ? res.data : a));
        setEditingId(null);
        setSuccessMessage("Auto actualizado con éxito");
      } else {
        const res = await api.post('/api/autos', {
          marca: form.marca,
          modelo: form.modelo,
          año: Number(form.año),
          precio: Number(form.precio),
          categoria: form.categoria
        });
        setAutos(prev => [res.data, ...prev]);
        setSuccessMessage("Auto creado con éxito");
      }
      setForm(initialForm);
    } catch (err) {
      console.error('Error al guardar', err);
      setError(err?.response?.data?.mensaje || err.message || 'Error al guardar');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  const handleEdit = (auto) => {
    setEditingId(auto._id);
    const categoriaId = auto.categoria?._id ?? (typeof auto.categoria === 'string' ? auto.categoria : "");
    setForm({ marca: auto.marca, modelo: auto.modelo, año: String(auto.año), precio: String(auto.precio), categoria: categoriaId || "" });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Está seguro de que desea eliminar este auto?')) return;
    try {
      await api.delete(`/api/autos/${id}`);
      setAutos(prev => prev.filter(a => a._id !== id));
      setSuccessMessage("Auto eliminado con éxito");
    } catch (err) {
      console.error('Error al eliminar', err);
      setError('Error al eliminar');
    } finally {
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  return (
   <div className="abm-wrapper">
  <h2>Gestión de Autos</h2>
  <div className="user-info">
    <strong>Usuario:</strong> {user?.name || user?.email}
    <button onClick={logout}>Salir</button>
  </div>

  <section className="form-section">
    <form onSubmit={handleSubmit} className="auto-form">
      <input name="marca" placeholder="Marca" value={form.marca} onChange={handleChange} />
      <input name="modelo" placeholder="Modelo" value={form.modelo} onChange={handleChange} />
      <input name="año" type="number" placeholder="Año" value={form.año} onChange={handleChange} />
      <input name="precio" type="number" placeholder="Precio" value={form.precio} onChange={handleChange} />
      <select name="categoria" value={form.categoria ?? ""} onChange={handleChange}>
        <option value="">-- Seleccione categoría --</option>
        {categorias.map(cat => <option key={cat._id} value={cat._id}>{cat.nombre}</option>)}
      </select>
      <div className="form-buttons">
        <button type="submit" disabled={loading}>{editingId ? 'Actualizar' : 'Agregar'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm(initialForm); }}>Cancelar</button>}
      </div>
      {error && <p className="form-error">{error}</p>}
      {successMessage && <p className="form-success">{successMessage}</p>}
    </form>

    <div className="form-image">
      <img src={autoIlustracion} alt="Auto ilustrado" />
    </div>
  </section>

  <section className="categorias-section">
    <h4>Crear nueva categoría</h4>
    <form onSubmit={createCategory} className="categoria-form">
      <input placeholder="Nombre de la categoría" value={newCatName} onChange={e => setNewCatName(e.target.value)} />
      <input placeholder="Descripción (opcional)" value={newCatDesc} onChange={e => setNewCatDesc(e.target.value)} />
      <button type="submit">Crear</button>
    </form>
    {catMessage && <p className={`cat-message ${catMessage.type}`}>{catMessage.text}</p>}
  </section>

  <section className="listado-section">
    <h3>Listado de Autos</h3>
    {loading && <p>Loading...</p>}
    {!loading && autos.length === 0 && <p>No hay autos registrados.</p>}
    <ul>
      {autos.map(auto => {
        let catName = '';
        if (auto.categoria && typeof auto.categoria === 'object') catName = auto.categoria.nombre;
        else if (auto.categoria) {
          const found = categorias.find(c => c._id === auto.categoria);
          catName = found ? found.nombre : auto.categoria;
        }
        return (
          <li key={auto._id}>
            <strong>{auto.marca} {auto.modelo}</strong> — Año: {auto.año} — Precio: {auto.precio} — Categoría: {catName || '—'}
            <div className="action-buttons">
              <button onClick={() => handleEdit(auto)}>Editar</button>
              <button onClick={() => handleDelete(auto._id)}>Eliminar</button>
            </div>
          </li>
        );
      })}
    </ul>
  </section>
</div>
  );
};

export default AbmAutos;  