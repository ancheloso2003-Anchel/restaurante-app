// Página principal que muestra el carrusel destacado y el listado de restaurantes
import { useState, useEffect } from 'react'
import axios from 'axios'
import RestaurantCard from '../components/RestaurantCard'
import FeaturedCarousel from '../components/FeaturedCarousel'
import { Quote, Star } from 'lucide-react'
import { staticRestaurants } from '../data/staticData'

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Datos estáticos de testimonios para mostrar la satisfacción de los clientes
  const testimonials = [
    {
      id: 1,
      name: 'Elena Rodríguez',
      text: 'La mejor experiencia gastronómica que he tenido. La reserva fue súper sencilla.',
      photo: `${import.meta.env.BASE_URL}assets/customers/customer1.png`,
      stars: 5
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      text: 'Increíble variedad de platos. Recomiendo totalmente el menú degustación.',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      stars: 5
    },
    {
      id: 3,
      name: 'Sofía Martínez',
      text: 'El servicio al cliente es impecable. Volveré sin duda alguna.',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      stars: 4
    }
  ]

  // Carga inicial de todos los restaurantes disponibles en la base de datos
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${API_URL}/restaurants`, { timeout: 2000 })
        setRestaurants(response.data)
      } catch (error) {
        console.error('Error fetching restaurants, usando datos estáticos:', error)
        setError('No se pudo conectar con el servidor. Mostrando datos de prueba.')
        setRestaurants(staticRestaurants)
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  if (loading) return <div className="loading">Cargando restaurantes...</div>

  return (
    <div className="home-container" style={{ paddingBottom: '5rem' }}>
      <FeaturedCarousel />
      
      <section style={{ padding: '4rem 0' }}>
        <h1 style={{ textAlign: 'center' }}>Nuestros Restaurantes</h1>
        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#ef4444', 
            padding: '1rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            {error}
          </div>
        )}
        <p style={{ color: '#94a3b8', marginBottom: '3rem', textAlign: 'center' }}>Descubre la mejor gastronomía de la ciudad</p>
        
        <div className="grid-container">
          {/* Mapeo de restaurantes para crear tarjetas interactivas */}
          {restaurants.map((res) => (
            <RestaurantCard key={res.restauranteID} restaurant={res} />
          ))}
        </div>
      </section>

      <section className="glass-card" style={{ 
        marginTop: '8rem', 
        padding: '5rem 3rem', 
        background: 'rgba(15, 23, 42, 0.4)', 
        borderRadius: '3rem',
        border: '1px solid var(--border-glass)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Lo que dicen nuestros clientes</h2>
          <p style={{ color: '#94a3b8' }}>Opiniones reales de personas que ya han disfrutado con nosotros</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2.5rem' 
        }}>
          {testimonials.map((t) => (
            <div key={t.id} className="glass-card" style={{ 
              padding: '2.5rem', 
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <Quote 
                size={40} 
                style={{ 
                  position: 'absolute', 
                  top: '1.5rem', 
                  right: '1.5rem', 
                  color: 'rgba(255, 255, 255, 0.05)' 
                }} 
              />
              <img 
                src={t.photo} 
                alt={t.name} 
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  objectFit: 'cover',
                  marginBottom: '1.5rem',
                  border: '4px solid var(--primary)',
                  padding: '4px'
                }} 
              />
              <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                {[...Array(t.stars)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              <p style={{ 
                fontStyle: 'italic', 
                color: '#cbd5e1', 
                fontSize: '1.1rem', 
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                "{t.text}"
              </p>
              <h4 style={{ margin: 0, fontWeight: '700', color: '#f8fafc' }}>{t.name}</h4>
              <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Cliente Verificado</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home

