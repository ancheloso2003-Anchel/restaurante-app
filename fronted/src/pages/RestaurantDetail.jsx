// Importación de hooks de React para el manejo de estado y efectos secundarios
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import DishItem from '../components/DishItem'
import { ChevronLeft } from 'lucide-react'
import { staticRestaurants, staticDishes } from '../data/staticData'

const API_URL = import.meta.env.VITE_API_URL;


const RestaurantDetail = () => {
  const { id } = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [dishes, setDishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Función asíncrona para obtener los detalles del restaurante y su menú desde la API
    const fetchData = async () => {
      try {
        const [resRes, dishesRes] = await Promise.all([
          axios.get(`${API_URL}/restaurants`, { timeout: 2000 }),
          axios.get(`${API_URL}/restaurants/${id}/dishes`, { timeout: 2000 })
        ])
        
        const currentRes = resRes.data.find(r => r.restauranteID === parseInt(id))
        setRestaurant(currentRes)
        
        // Group dishes by category
        const grouped = dishesRes.data.reduce((acc, dish) => {
          if (!acc[dish.categoria]) acc[dish.categoria] = []
          acc[dish.categoria].push(dish)
          return acc
        }, {})
        setDishes(grouped)
      } catch (error) {
        console.error('Error fetching data, usando datos estáticos:', error)
        setError('Sin conexión con el servidor. Mostrando menú de prueba.')
        
        const currentRes = staticRestaurants.find(r => r.restauranteID === parseInt(id))
        setRestaurant(currentRes)
        
        const filteredDishes = staticDishes.filter(d => d.restauranteID === parseInt(id))
        const grouped = filteredDishes.reduce((acc, dish) => {
          if (!acc[dish.categoria]) acc[dish.categoria] = []
          acc[dish.categoria].push(dish)
          return acc
        }, {})
        setDishes(grouped)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <div className="loading">Cargando menú...</div>
  if (error) return <div className="error-message" style={{ color: '#ef4444', padding: '2rem' }}>{error}</div>
  if (!restaurant) return <div>Restaurante no encontrado</div>

  // Renderizado principal del componente con diseño receptivo y navegación de vuelta
  return (
    <div className="detail-container" style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <ChevronLeft size={20} /> Volver al listado
      </Link>
      
      <div className="restaurant-header" style={{ marginBottom: '3rem' }}>
        <h1 style={{ textAlign: 'left', marginBottom: '0.5rem' }}>{restaurant.restaurante}</h1>
        <p style={{ color: '#94a3b8' }}>Barrio: {restaurant.barrio}</p>
      </div>

      {/* Sección que itera sobre las categorías de platos y los muestra en una lista */}
      <div className="menu-sections">
        {Object.entries(dishes).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>
              {category}
            </h2>
            <div className="dishes-list">
              {items.map(dish => (
                <DishItem key={dish.platoID} dish={dish} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantDetail
