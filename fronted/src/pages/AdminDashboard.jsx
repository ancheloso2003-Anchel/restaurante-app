// Panel administrativo para la gestión de restaurantes y categorías
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'
import { staticRestaurants } from '../data/staticData'

const API_URL = import.meta.env.VITE_API_URL;


const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([])
  const [editingRes, setEditingRes] = useState(null)
  const [newRes, setNewRes] = useState({ restaurante: '', barrio: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/restaurants`, { timeout: 10000 })
      setRestaurants(response.data)
    } catch (error) {
      console.info('Admin: Backend no disponible, usando fallback.')
      setError('Error al conectar con la base de datos. Mostrando inventario de prueba.')
      setRestaurants(staticRestaurants)
    } finally {
      setLoading(false)
    }
  }

  // Controlador para procesar la creación de un nuevo restaurante
  const handleAddRestaurant = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await axios.post(`${API_URL}/restaurants`, newRes)
      setNewRes({ restaurante: '', barrio: '' })
      fetchData()
    } catch (error) {
      console.info('Error al añadir restaurante.')
      setError('No se pudo añadir el restaurante. El servidor no responde.')
      // Autolimpiar el error tras 5 segundos
      setTimeout(() => setError(null), 5000)
    }
  }

  // Elimina un restaurante previa confirmación del usuario
  const handleDeleteRestaurant = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este restaurante?')) return
    setError(null)
    try {
      await axios.delete(`${API_URL}/restaurants/${id}`)
      fetchData()
    } catch (error) {
      console.info('Error al borrar restaurante.')
      setError('No se puede eliminar en modo offline.')
      setTimeout(() => setError(null), 5000)
    }
  }

  const handleUpdateRestaurant = async () => {
    setError(null)
    try {
      await axios.put(`${API_URL}/restaurants/${editingRes.restauranteID}`, editingRes)
      setEditingRes(null)
      fetchData()
    } catch (error) {
      console.info('Error al actualizar restaurante.')
      setError('No se pueden guardar los cambios en modo offline.')
      setTimeout(() => setError(null), 5000)
    }
  }

  if (loading) return <div className="loading">Cargando panel...</div>

  return (
    <div className="admin-container" style={{ textAlign: 'left' }}>
      <h1>Panel de Administración</h1>
      {error && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: '#ef4444', 
          padding: '1rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          {error}
        </div>
      )}
      
      <div className="glass-card" style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginTop: 0 }}>Añadir Nuevo Restaurante</h2>
        <form onSubmit={handleAddRestaurant} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div>
            <label htmlFor="res-name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nombre</label>
            <input 
              id="res-name"
              type="text" 
              value={newRes.restaurante} 
              onChange={(e) => setNewRes({...newRes, restaurante: e.target.value})}
              placeholder="Ej: La Trattoria"
              required
            />
          </div>
          <div>
            <label htmlFor="res-neighborhood" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Barrio</label>
            <input 
              id="res-neighborhood"
              type="text" 
              value={newRes.barrio} 
              onChange={(e) => setNewRes({...newRes, barrio: e.target.value})}
              placeholder="Ej: Centro"
              required
            />
          </div>
          <button type="submit" style={{ height: '45px', marginBottom: '1rem' }}>
            <Plus size={18} /> Añadir
          </button>
        </form>
      </div>

      <h2>Gestionar Restaurantes</h2>
      {/* Listado dinámico de restaurantes con opciones de edición y borrado */}
      <div className="restaurants-list">
        {restaurants.map(res => (
          <div key={res.restauranteID} className="glass-card" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editingRes?.restauranteID === res.restauranteID ? (
              <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                <input 
                  type="text" 
                  value={editingRes.restaurante} 
                  onChange={(e) => setEditingRes({...editingRes, restaurante: e.target.value})}
                  style={{ marginBottom: 0 }}
                />
                <input 
                  type="text" 
                  value={editingRes.barrio} 
                  onChange={(e) => setEditingRes({...editingRes, barrio: e.target.value})}
                  style={{ marginBottom: 0 }}
                />
                <button onClick={handleUpdateRestaurant} className="save-btn"><Save size={18} /></button>
                <button onClick={() => setEditingRes(null)} style={{ background: '#475569' }}><X size={18} /></button>
              </div>
            ) : (
              <>
                <div>
                  <h3 style={{ margin: 0 }}>{res.restaurante}</h3>
                  <p style={{ margin: '0.2rem 0 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>{res.barrio}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setEditingRes(res)} style={{ background: 'rgba(99, 102, 241, 0.2)', border: '1px solid var(--primary)' }}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDeleteRestaurant(res.restauranteID)} style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444' }}>
                    <Trash2 size={16} color="#ef4444" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
