// Carrusel dinámico que presenta los pedidos realizados de forma visual y detallada
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { ShoppingBag, ChevronLeft, ChevronRight, User, Utensils, Calendar, Receipt } from 'lucide-react'
import { staticOrders } from '../data/staticData'

const API_URL = import.meta.env.VITE_API_URL;


const orderImages = [
  `${import.meta.env.BASE_URL}images/slide1.png`,
  `${import.meta.env.BASE_URL}images/slide2.png`,
  `${import.meta.env.BASE_URL}images/slide3.png`,
  `${import.meta.env.BASE_URL}images/slide4.png`,
  `${import.meta.env.BASE_URL}images/slide5.png`,
]

const OrdersCarousel = () => {
  const [orders, setOrders] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})
  const [error, setError] = useState(null)

  const fetchOrderDetails = useCallback(async (orderId) => {
    if (details[orderId]) return
    try {
      const response = await axios.get(`${API_URL}/order/${orderId}/dishes`, { timeout: 10000 })
      setDetails(prev => ({ ...prev, [orderId]: response.data }))
    } catch (error) {
      console.info('Detalles del pedido no disponibles en modo demostración.')
    }
  }, [details])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/orders`, { timeout: 10000 })
        // Enriquecemos con imágenes
        const enriched = response.data.map((o, i) => ({
          ...o,
          imagen: orderImages[i % orderImages.length]
        }))
        setOrders(enriched)
        if (enriched.length > 0) {
          fetchOrderDetails(enriched[0].pedidoID)
        }
      } catch (error) {
        console.info('Pedidos (Carousel): Backend no disponible.')
        setError('Sin conexión con el servidor. Mostrando pedidos de demostración.')
        const enriched = staticOrders.map((o, i) => ({
          ...o,
          imagen: orderImages[i % orderImages.length]
        }))
        setOrders(enriched)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [fetchOrderDetails])

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % orders.length
    setCurrentIndex(nextIndex)
    fetchOrderDetails(orders[nextIndex].pedidoID)
  }

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + orders.length) % orders.length
    setCurrentIndex(prevIndex)
    fetchOrderDetails(orders[prevIndex].pedidoID)
  }

  if (loading) return (
    <div style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )

  if (orders.length === 0) return null

  const currentOrder = orders[currentIndex]
  const currentDetails = details[currentOrder.pedidoID] || []
  const total = currentDetails.length > 0 
    ? currentDetails.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    : (currentOrder.total || 0)

  return (
    // Estructura del carrusel con diseño de tarjeta de cristal para cada pedido
    <div className="orders-carousel animate-fade-in-up" style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'stretch', 
        gap: '0',
        background: 'rgba(31, 41, 55, 0.4)',
        borderRadius: '40px',
        overflow: 'hidden',
        border: '1px solid var(--border-glass)',
        backdropFilter: 'blur(20px)',
        minHeight: '550px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
      }}>
        {/* Lado izquierdo: Imagen del Pedido */}
        <div style={{ width: '40%', position: 'relative', overflow: 'hidden' }}>
          <img 
            src={currentOrder.imagen} 
            alt="Pedido" 
            key={currentOrder.pedidoID}
            className="animate-fade-in-up"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.8)' }} 
          />
          <div style={{ position: 'absolute', top: '2rem', left: '2rem', zIndex: 5 }}>
            <span style={{ 
              background: 'rgba(2, 6, 23, 0.8)', 
              color: 'var(--primary)', 
              padding: '8px 20px', 
              borderRadius: '15px', 
              fontSize: '0.8rem',
              fontWeight: '900',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--primary)'
            }}>
              #{currentOrder.pedidoID}
            </span>
          </div>
        </div>

        {/* Lado derecho: Información */}
        <div style={{ width: '60%', padding: '3.5rem', display: 'flex', flexDirection: 'column', textAlign: 'left', position: 'relative' }}>
          {/* Navigation Overlay */}
          <div style={{ position: 'absolute', top: '2rem', right: '2rem', display: 'flex', gap: '1rem' }}>
            <button 
              onClick={prevSlide}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={20} color="white" />
            </button>
            <button 
              onClick={nextSlide}
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={20} color="white" />
            </button>
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <h2 className="animate-slide-in-right" key={currentOrder.restaurante} style={{ margin: 0, fontSize: '3rem', fontWeight: '900', color: 'white' }}>
              {currentOrder.restaurante}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', marginTop: '10px' }}>
              <User size={16} /> <span style={{ fontWeight: '600' }}>{currentOrder.nombre} {currentOrder.apellido1}</span>
              <span style={{ margin: '0 10px', opacity: 0.3 }}>|</span>
              <Calendar size={16} /> <span>{new Date(currentOrder.fecha).toLocaleDateString()}</span>
            </div>
          </div>

          <div 
            className="animate-fade-in-up" 
            key={currentOrder.pedidoID + '_details'}
            style={{ 
              flex: 1, 
              background: 'rgba(0,0,0,0.2)', 
              borderRadius: '25px', 
              padding: '2rem',
              border: '1px solid rgba(255,255,255,0.03)'
            }}
          >
            <h4 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: '800' }}>
              <Receipt size={18} /> Artículos del Pedido
            </h4>
            {error && (
              <div style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.05)', padding: '8px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                {error}
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {currentDetails.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1rem', color: 'var(--primary)', fontWeight: '800' }}>{item.cantidad}×</span>
                    <span style={{ color: '#cbd5e1', fontWeight: '500' }}>{item.plato}</span>
                  </div>
                  <span style={{ fontWeight: '700', color: '#fff' }}>{(item.precio * item.cantidad).toFixed(2)}€</span>
                </div>
              ))}
            </div>
            
            <div style={{ 
              marginTop: '2rem', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: '700', color: '#94a3b8' }}>Importe Total</span>
              <span style={{ fontWeight: '900', fontSize: '2.2rem', color: 'var(--primary)' }}>{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores de progreso para conocer el número total de pedidos y la posición actual */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '2.5rem' }}>
        {orders.map((_, i) => (
          <div 
            key={i}
            onClick={() => {
              setCurrentIndex(i)
              fetchOrderDetails(orders[i].pedidoID)
            }}
            style={{ 
              width: i === currentIndex ? '40px' : '10px', 
              height: '10px', 
              borderRadius: '5px', 
              background: i === currentIndex ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersCarousel
