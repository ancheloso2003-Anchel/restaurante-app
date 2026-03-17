// Componente que representa una tarjeta individual para cada restaurante en el listado
import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'

const RestaurantCard = ({ restaurant }) => {
  // Imágenes representativas basadas en el ID para que cada restaurante tenga una distinta
  const restaurantImages = [
    `${import.meta.env.BASE_URL}images/slide1.png`,
    `${import.meta.env.BASE_URL}images/slide2.png`,
    `${import.meta.env.BASE_URL}images/slide3.png`,
    `${import.meta.env.BASE_URL}images/slide4.png`,
    `${import.meta.env.BASE_URL}images/slide5.png`,
  ]
  const image = restaurantImages[restaurant.restauranteID % restaurantImages.length]

  return (
    <div className="glass-card restaurant-card" style={{ 
      textAlign: 'left', 
      position: 'relative', 
      padding: 0, 
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}>
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={image} 
          alt={restaurant.restaurante} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
          className="card-image"
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)'
        }}></div>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', color: '#fff' }}>{restaurant.restaurante}</h3>
        <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          <MapPin size={14} style={{ marginRight: '4px', color: 'var(--primary)' }} />
          {restaurant.barrio}
        </div>
        
        <Link to={`/restaurant/${restaurant.restauranteID}`}>
          <button style={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '8px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
            borderRadius: '12px'
          }}>
            Ver Carta <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default RestaurantCard
