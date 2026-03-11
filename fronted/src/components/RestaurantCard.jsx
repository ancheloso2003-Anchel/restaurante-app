import { Link } from 'react-router-dom'
import { MapPin, ArrowRight } from 'lucide-react'

const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="glass-card" style={{ textAlign: 'left', position: 'relative' }}>
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem' }}>{restaurant.restaurante}</h3>
      <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        <MapPin size={14} style={{ marginRight: '4px' }} />
        {restaurant.barrio}
      </div>
      
      <Link to={`/restaurant/${restaurant.restauranteID}`}>
        <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          Ver Carta <ArrowRight size={16} />
        </button>
      </Link>
    </div>
  )
}

export default RestaurantCard
