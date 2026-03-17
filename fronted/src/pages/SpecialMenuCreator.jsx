// Importación de dependencias necesarias para el creador de menús especiales
import { useState, useEffect } from 'react'
import axios from 'axios'
import DishItem from '../components/DishItem'
import SpecialCarousel from '../components/SpecialCarousel'
import { Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react'
import { staticRestaurants, staticDishes } from '../data/staticData'

const API_URL = import.meta.env.VITE_API_URL;


const SpecialMenuCreator = () => {
  const [restaurants, setRestaurants] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [combinedMenu, setCombinedMenu] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch initial restaurant list on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(`${API_URL}/restaurants`, { timeout: 800 })
        setRestaurants(response.data)
      } catch (error) {
        console.error('Error fetching restaurants, usando datos estáticos:', error)
        setError('Error al cargar restaurantes. Usando catálogo fuera de línea.')
        setRestaurants(staticRestaurants)
      } finally {
        setLoading(false)
      }
    }
    fetchRestaurants()
  }, [])

  // Lógica para alternar la selección de un restaurante en la lista de IDs seleccionados
  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  // Función para obtener y combinar los platos de todos los restaurantes seleccionados
  const generateMenu = async () => {
    if (selectedIds.length === 0) return
    setLoading(true)
    try {
      const requests = selectedIds.map(id => axios.get(`${API_URL}/restaurants/${id}/dishes`, { timeout: 800 }))
      const results = await Promise.all(requests)
      const allDishes = results.flatMap(res => res.data)
      const grouped = allDishes.reduce((acc, dish) => {
        if (!acc[dish.categoria]) acc[dish.categoria] = []
        acc[dish.categoria].push(dish)
        return acc
      }, {})
      setCombinedMenu(grouped)
      } catch (error) {
        console.error('Error generating menu, usando datos estáticos:', error)
        setError('Error en la conexión. Menú generado con datos de prueba.')
        // Fallback: filtrar platos estáticos de los restaurantes seleccionados
        const allDishes = staticDishes.filter(d => selectedIds.includes(d.restauranteID))
        const grouped = allDishes.reduce((acc, dish) => {
          if (!acc[dish.categoria]) acc[dish.categoria] = []
          acc[dish.categoria].push(dish)
          return acc
        }, {})
        setCombinedMenu(grouped)
      } finally {
      setLoading(false)
    }
  }

  if (loading && !combinedMenu) return <div className="loading">Preparando experiencia...</div>

  return (
    <div className="special-menu-container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left', paddingBottom: '100px' }}>
      
      {!combinedMenu ? (
        <div className="selection-view">
          <SpecialCarousel />
          
          <div style={{ padding: '0 2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Selecciona Restaurante</h1>
                {error && (
                  <div style={{ 
                    background: 'rgba(239, 68, 68, 0.1)', 
                    color: '#ef4444', 
                    padding: '0.8rem', 
                    borderRadius: '10px', 
                    marginTop: '1rem',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    fontSize: '0.9rem'
                  }}>
                    {error}
                  </div>
                )}
                <p style={{ color: '#94a3b8', margin: '0.5rem 0 0 0' }}>Elige los establecimientos para fusionar sus cartas</p>
              </div>
              {selectedIds.length > 0 && (
                <button 
                  onClick={() => setSelectedIds([])}
                  style={{ background: 'transparent', color: '#64748b', border: 'none', padding: 0, textDecoration: 'underline', fontSize: '0.9rem' }}
                >
                  Limpiar selección ({selectedIds.length})
                </button>
              )}
            </div>

            <div className="grid-container" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '1.5rem', 
              padding: 0 
            }}>
              {restaurants.map(res => {
                // Determine if the current restaurant is selected based on selectedIds state
                const isSelected = selectedIds.includes(res.restauranteID)
                return (
                  <div 
                    key={res.restauranteID} 
                    className="glass-card"
                    onClick={() => toggleSelection(res.restauranteID)} // Calls the selection logic on click
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-glass)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.1)' : 'rgba(15, 23, 42, 0.4)',
                      transform: isSelected ? 'translateY(-4px)' : 'none',
                      padding: '1.25rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', color: isSelected ? 'white' : '#cbd5e1' }}>{res.restaurante}</h3>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        border: '1.5px solid ' + (isSelected ? 'var(--primary)' : '#475569'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: isSelected ? 'var(--primary)' : 'transparent',
                        transition: 'all 0.2s ease'
                      }}>
                        {isSelected && <Check size={14} color="white" />}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.85rem' }}>
                      <span>{res.barrio}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Barra de acción flotante que aparece cuando hay al menos un restaurante seleccionado */}
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: `translateX(-50%) translateY(${selectedIds.length > 0 ? '0' : '150%'})`,
            zIndex: 100,
            width: '90%',
            maxWidth: '500px',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'white', fontWeight: 'bold' }}>{selectedIds.length} Seleccionados</span>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Listo para fusionar</span>
            </div>
            <button 
              onClick={generateMenu}
              style={{
                borderRadius: '12px',
                padding: '0.8rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'var(--primary)',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)'
              }}
            >
              Generar Menú <ArrowRight size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="menu-display" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
            <h1 style={{ margin: 0 }}>Fusión Exclusiva</h1>
            <button 
              onClick={() => setCombinedMenu(null)} 
              style={{ background: 'transparent', color: '#94a3b8', border: '1px solid var(--border-glass)', padding: '0.6rem 1.2rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <RotateCcw size={16} /> Cambiar Selección
            </button>
          </div>
          
          <div className="menu-sections">
            {Object.entries(combinedMenu).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '4rem' }}>
                <h2 style={{ 
                  fontSize: '1.1rem', 
                  color: 'var(--primary)', 
                  textTransform: 'uppercase', 
                  letterSpacing: '3px',
                  marginBottom: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  {category}
                  <div style={{ flex: 1, height: '1.5px', background: 'linear-gradient(to right, var(--primary), transparent)' }} />
                </h2>
                <div className="dishes-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1rem' }}>
                  {items.map((dish, idx) => (
                    <DishItem key={`${dish.platoID}-${idx}`} dish={dish} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SpecialMenuCreator
