// Panel administrativo para la gestión de restaurantes y categorías
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL;


const AdminDashboard = () => {
  const [restaurants, setRestaurants] = useState([])
  const [categories, setCategories] = useState([])
  const [editingRes, setEditingRes] = useState(null)
  const [newRes, setNewRes] = useState({ restaurante: '', barrio: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [resRes, catRes] = await Promise.all([
        axios.get(`${API_URL}/restaurants`),
        axios.get(`${API_URL}/categories`)
      ])
      setRestaurants(resRes.data)
      setCategories(catRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('Error al conectar con la base de datos. Los cambios no se guardarán.')
    } finally {
      setLoading(false)
    }
  }

  // Controlador para procesar la creación de un nuevo restaurante
  const handleAddRestaurant = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API_URL}/restaurants`, newRes)
      setNewRes({ restaurante: '', barrio: '' })
      fetchData()
    } catch (error) {
      console.error('Error adding restaurant:', error)
    }
  }

  // Elimina un restaurante previa confirmación del usuario
  const handleDeleteRestaurant = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este restaurante?')) return
    try {
      await axios.delete(`${API_URL}/restaurants/${id}`)
      fetchData()
    } catch (error) {
      console.error('Error deleting restaurant:', error)
    }
  }

  const handleUpdateRestaurant = async () => {
    try {
      await axios.put(`${API_URL}/restaurants/${editingRes.restauranteID}`, editingRes)
      setEditingRes(null)
      fetchData()
    } catch (error) {
      console.error('Error updating restaurant:', error)
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
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nombre</label>
            <input 
              type="text" 
              value={newRes.restaurante} 
              onChange={(e) => setNewRes({...newRes, restaurante: e.target.value})}
              placeholder="Ej: La Trattoria"
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Barrio</label>
            <input 
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
