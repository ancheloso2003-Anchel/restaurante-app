// Vista que muestra el catálogo completo de platos de todos los establecimientos
import { useState, useEffect } from 'react'
import axios from 'axios'
import DishItem from '../components/DishItem'
import DishesCarousel from '../components/DishesCarousel'
import { Search } from 'lucide-react'
import { staticDishes } from '../data/staticData'

const API_URL = import.meta.env.VITE_API_URL;


const AllDishes = () => {
  const [dishes, setDishes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Efecto para cargar todos los platos disponibles al montar el componente
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${API_URL}/dishes`, { timeout: 800 })
        setDishes(response.data)
      } catch (error) {
        console.info('Catálogo Platos: Backend no disponible.')
        setError('No se pudo conectar con el servidor. Mostrando datos de prueba.')
        setDishes(staticDishes)
      } finally {
        setLoading(false)
      }
    }
    fetchDishes()
  }, [])

  // Filtrado reactivo de platos basado en el término de búsqueda ingresado por el usuario
  const filteredDishes = dishes.filter(d => 
    d.plato.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="loading">Cargando platos...</div>

  return (
    <div className="all-dishes-container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <DishesCarousel />
      <h1>Catálogo de Platos</h1>
      {error && (
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: '#ef4444', 
          padding: '1rem', 
          borderRadius: '12px', 
          marginBottom: '2rem',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          display: 'inline-block'
        }}>
          {error}
        </div>
      )}
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Explora todas las opciones gastronómicas de nuestros restaurantes</p>

      <div style={{ position: 'relative', marginBottom: '3rem', maxWidth: '500px', width: '100%' }}>
        <Search style={{ position: 'absolute', left: '12px', top: '12px', color: '#94a3b8' }} size={20} />
        <input 
          type="text" 
          placeholder="Buscar plato (ej: Pizza, Croquetas...)" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '45px' }}
        />
      </div>

      {/* Visualización de la lista filtrada o mensaje informativo si no hay resultados */}
      <div className="dishes-list" style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        {filteredDishes.length > 0 ? (
          filteredDishes.map(dish => (
            <DishItem key={dish.platoID} dish={dish} />
          ))
        ) : (
          <p style={{ color: '#94a3b8' }}>No se encontraron platos que coincidan con la búsqueda.</p>
        )}
      </div>
    </div>
  )
}

export default AllDishes
