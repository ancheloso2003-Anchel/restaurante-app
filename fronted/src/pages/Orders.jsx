import { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingBag, Calendar, User, Utensils, ChevronDown, ChevronUp } from 'lucide-react'
import OrdersCarousel from '../components/OrdersCarousel'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';


const Orders = () => {
  const [orders, setOrders] = useState([])
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [orderDetails, setOrderDetails] = useState({})
  const [loading, setLoading] = useState(true)

  // Array de imágenes de platos reales para ilustrar los pedidos
  const orderImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop',
  ]

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`)
      // Enriquecemos los datos con una imagen aleatoria para cada pedido
      const enrichedData = response.data.map((order, index) => ({
        ...order,
        imagen: orderImages[index % orderImages.length]
      }))
      setOrders(enrichedData)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  // Alterna la visibilidad de los detalles de un pedido y carga sus platos si es necesario
  const toggleOrder = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
      return
    }

    setExpandedOrder(orderId)
    
    if (!orderDetails[orderId]) {
      try {
        const response = await axios.get(`${API_URL}/order/${orderId}/dishes`)
        setOrderDetails(prev => ({ ...prev, [orderId]: response.data }))
      } catch (error) {
        console.error('Error fetching order dishes:', error)
      }
    }
  }

  if (loading) return <div className="loading">Cargando pedidos...</div>

  return (
    <div className="orders-container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header className="animate-fade-in-up" style={{ marginBottom: '5rem' }}>
        <h1>Historial de Pedidos</h1>
        <p style={{ color: '#94a3b8', marginBottom: '4rem' }}>Gestiona y visualiza todas tus transacciones gastronómicas</p>
        
        {/* Sección Hero: Carrusel destacado de pedidos recientes */}
        <div style={{ padding: '0 2rem' }}>
          <OrdersCarousel />
        </div>
      </header>

      <section className="orders-list-section" style={{ width: '100%', maxWidth: '950px', marginTop: '4rem' }}>
        <h2 className="animate-fade-in-up" style={{ textAlign: 'left', fontSize: '2rem', marginBottom: '2.5rem', color: 'white' }}>Listado Detallado</h2>
        
        <div className="orders-list">
          {orders.map((order, index) => (
            <div 
              key={order.pedidoID} 
              className="glass-card animate-fade-in-up" 
              style={{ 
                marginBottom: '2rem', 
                overflow: 'hidden', 
                padding: 0, 
                textAlign: 'left',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div 
                style={{ padding: '1.5rem 2rem', cursor: 'pointer', display: 'flex', gap: '2rem', alignItems: 'center', transition: 'background 0.3s' }}
                onClick={() => toggleOrder(order.pedidoID)}
                className="order-header"
              >
                <img src={order.imagen} alt="Resumen pedido" className="order-card-image" />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', flex: 1, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      <User size={12} /> Cliente
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'white' }}>{order.nombre} {order.apellido1}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>#{order.pedidoID}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      <Utensils size={12} /> Restaurante
                    </div>
                    <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--primary)' }}>{order.restaurante}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                      <Calendar size={12} /> Fecha
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{new Date(order.fecha).toLocaleDateString()}</div>
                  </div>
                </div>
                <div style={{ color: '#94a3b8', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '12px' }}>
                  {expandedOrder === order.pedidoID ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>

              {expandedOrder === order.pedidoID && (
                <div className="animate-fade-in-up" style={{ padding: '2.5rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(255, 255, 255, 0.02)' }}>
                  {/* Detalle expandible con animaciones de entrada laterales */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.25rem', fontWeight: '800' }}>Detalle de Consumición</h4>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', padding: '6px 16px', borderRadius: '99px', fontWeight: '700', border: '1px solid rgba(16, 185, 129, 0.2)' }}>PAGADO</span>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', padding: '6px 16px', borderRadius: '99px', fontWeight: '700', border: '1px solid rgba(59, 130, 246, 0.2)' }}>DOMICILIO</span>
                    </div>
                  </div>
                  
                  {orderDetails[order.pedidoID] ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                      {orderDetails[order.pedidoID].map((item, idx) => (
                        <div 
                          key={idx} 
                          className="animate-slide-in-right"
                          style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            padding: '1rem', 
                            borderRadius: '12px',
                            background: 'rgba(15, 23, 42, 0.3)',
                            border: '1px solid rgba(255,255,255,0.03)',
                            animationDelay: `${idx * 0.1}s`
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ width: '32px', height: '32px', background: 'var(--primary)', color: '#020617', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: '800' }}>
                              {item.cantidad}
                            </span>
                            <div>
                              <span style={{ fontWeight: '600', color: '#f8fafc', display: 'block' }}>{item.plato}</span>
                              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>PVP: {item.precio.toFixed(2)}€/ud</span>
                            </div>
                          </div>
                          <span style={{ fontWeight: '800', color: '#fff', fontSize: '1.1rem' }}>{(item.precio * item.cantidad).toFixed(2)}€</span>
                        </div>
                      ))}
                      
                      <div style={{ 
                        marginTop: '2rem', 
                        padding: '2rem', 
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)', 
                        borderRadius: '20px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                      }}>
                        <div style={{ textAlign: 'left' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>Total del Pedido</span>
                          <div style={{ color: '#fff', fontSize: '0.8rem', marginTop: '4px' }}>Incluye IVA y gastos de gestión</div>
                        </div>
                        <span style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))' }}>
                          {orderDetails[order.pedidoID].reduce((acc, item) => acc + (item.precio * item.cantidad), 0).toFixed(2)}€
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="loading" style={{ margin: '1rem 0', fontSize: '1rem' }}>Cargando platos del pedido...</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Orders
