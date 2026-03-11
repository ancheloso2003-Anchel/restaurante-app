import { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingBag, ChevronLeft, ChevronRight, User, Utensils, Calendar, Receipt } from 'lucide-react'

const OrdersCarousel = () => {
  const [orders, setOrders] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [details, setDetails] = useState({})

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/orders')
        setOrders(response.data)
        if (response.data.length > 0) {
          fetchOrderDetails(response.data[0].pedidoID)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const fetchOrderDetails = async (orderId) => {
    if (details[orderId]) return
    try {
      const response = await axios.get(`http://localhost:4000/order/${orderId}/dishes`)
      setDetails(prev => ({ ...prev, [orderId]: response.data }))
    } catch (error) {
      console.error('Error fetching order details:', error)
    }
  }

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
    <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )

  if (orders.length === 0) return null

  const currentOrder = orders[currentIndex]
  const currentDetails = details[currentOrder.pedidoID] || []
  const total = currentDetails.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  return (
    <div className="orders-carousel" style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '2rem',
        background: 'rgba(31, 41, 55, 0.4)',
        borderRadius: '30px',
        padding: '3rem',
        border: '1px solid var(--border-glass)',
        backdropFilter: 'blur(12px)',
        minHeight: '400px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
      }}>
        {/* Navigation Buttons */}
        <button 
          onClick={prevSlide}
          style={{ 
            background: 'rgba(251, 191, 36, 0.05)', 
            border: '1px solid rgba(251, 191, 36, 0.1)', 
            borderRadius: '50%', 
            width: '50px', 
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
            color: 'var(--primary)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary)';
            e.currentTarget.style.color = '#111827';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.05)';
            e.currentTarget.style.color = 'var(--primary)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Content */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <span style={{ 
                background: 'rgba(251, 191, 36, 0.1)', 
                color: 'var(--primary)', 
                padding: '4px 12px', 
                borderRadius: '8px', 
                fontSize: '0.7rem',
                fontWeight: '800',
                marginBottom: '1rem',
                display: 'inline-block',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                letterSpacing: '1px'
              }}>
                PEDIDO #{currentOrder.pedidoID}
              </span>
              <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to bottom right, #fff, #fbbf24)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {currentOrder.restaurante}
              </h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Estado</div>
              <div style={{ color: '#fbbf24', fontWeight: '800', fontSize: '1.1rem' }}>COMPLETADO</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '15px' }}>
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '10px', borderRadius: '10px' }}>
                <User size={20} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Cliente</div>
                <div style={{ fontWeight: '600', color: '#fff' }}>{currentOrder.nombre} {currentOrder.apellido1}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '15px' }}>
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: '10px', borderRadius: '10px' }}>
                <Calendar size={20} color="var(--primary)" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase' }}>Fecha</div>
                <div style={{ fontWeight: '600', color: '#fff' }}>{new Date(currentOrder.fecha).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'rgba(255,255,255,0.02)', 
            borderRadius: '20px', 
            padding: '2rem',
            marginBottom: '1rem',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h4 style={{ margin: '0 0 1.5rem 0', display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <Receipt size={18} /> Resumen de platos
            </h4>
            {currentDetails.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {currentDetails.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{item.cantidad}x</span>
                      <span style={{ color: '#cbd5e1', fontWeight: '500' }}>{item.plato}</span>
                    </div>
                    <span style={{ fontWeight: '600', color: '#fff' }}>{(item.precio * item.cantidad).toFixed(2)}€</span>
                  </div>
                ))}
                <div style={{ 
                  marginTop: '1.5rem', 
                  paddingTop: '1.5rem', 
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline'
                }}>
                  <span style={{ fontWeight: '700', color: '#94a3b8', fontSize: '1.1rem' }}>Total Factura</span>
                  <span style={{ 
                    fontWeight: '900', 
                    fontSize: '2rem', 
                    color: 'var(--primary)',
                    textShadow: '0 0 20px rgba(251, 191, 36, 0.3)'
                  }}>
                    {total.toFixed(2)}€
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                 <div className="loading" style={{ fontSize: '1rem' }}>Cargando detalles...</div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Button */}
        <button 
          onClick={nextSlide}
          style={{ 
            background: 'rgba(251, 191, 36, 0.05)', 
            border: '1px solid rgba(251, 191, 36, 0.1)', 
            borderRadius: '50%', 
            width: '50px', 
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s',
            color: 'var(--primary)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--primary)';
            e.currentTarget.style.color = '#111827';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(251, 191, 36, 0.05)';
            e.currentTarget.style.color = 'var(--primary)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
        {orders.map((_, i) => (
          <div 
            key={i}
            onClick={() => {
              setCurrentIndex(i)
              fetchOrderDetails(orders[i].pedidoID)
            }}
            style={{ 
              width: i === currentIndex ? '30px' : '8px', 
              height: '8px', 
              borderRadius: '4px', 
              background: i === currentIndex ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default OrdersCarousel
