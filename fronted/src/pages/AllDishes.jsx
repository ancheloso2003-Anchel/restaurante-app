import { useState, useEffect } from 'react'
import axios from 'axios'
import DishItem from '../components/DishItem'
import DishesCarousel from '../components/DishesCarousel'
import { Search } from 'lucide-react'

const AllDishes = () => {
  const [dishes, setDishes] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/dishes')
        setDishes(response.data)
      } catch (error) {
        console.error('Error fetching dishes:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDishes()
  }, [])

  const filteredDishes = dishes.filter(d => 
    d.plato.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="loading">Cargando platos...</div>

  return (
    <div className="all-dishes-container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <DishesCarousel />
      <h1>Catálogo de Platos</h1>
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
