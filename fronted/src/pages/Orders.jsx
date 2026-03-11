import { useState, useEffect } from 'react'
import axios from 'axios'
import { ShoppingBag, Calendar, User, Utensils, ChevronDown, ChevronUp } from 'lucide-react'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [orderDetails, setOrderDetails] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:4000/orders')
      setOrders(response.data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleOrder = async (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
      return
    }

    setExpandedOrder(orderId)
    
    if (!orderDetails[orderId]) {
      try {
        const response = await axios.get(`http://localhost:4000/order/${orderId}/dishes`)
        setOrderDetails(prev => ({ ...prev, [orderId]: response.data }))
      } catch (error) {
        console.error('Error fetching order dishes:', error)
      }
    }
  }

  if (loading) return <div className="loading">Cargando pedidos...</div>

  return (
    <div className="orders-container" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Historial de Pedidos</h1>
      <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>Consulta las transacciones y platos solicitados</p>

      <div className="orders-list" style={{ width: '100%', maxWidth: '900px' }}>
        {orders.map(order => (
          <div key={order.pedidoID} className="glass-card" style={{ marginBottom: '1.5rem', overflow: 'hidden', padding: 0, textAlign: 'left' }}>
            <div 
              style={{ padding: '1.5rem', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.3s' }}
              onClick={() => toggleOrder(order.pedidoID)}
              className="order-header"
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr', gap: '2rem', alignItems: 'center', width: '100%' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', pading: '10px', borderRadius: '8px', color: 'var(--primary)', padding: '10px' }}>
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <User size={12} /> Cliente
                  </div>
                  <div style={{ fontWeight: '600', fontSize: '1.05rem' }}>{order.nombre} {order.apellido1}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <Utensils size={12} /> Restaurante
                  </div>
                  <div style={{ fontWeight: '600', fontSize: '1.05rem' }}>{order.restaurante}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    <Calendar size={12} /> Fecha
                  </div>
                  <div style={{ fontWeight: '600', fontSize: '1.05rem' }}>{new Date(order.fecha).toLocaleDateString()}</div>
                </div>
              </div>
              <div style={{ marginLeft: '1rem', color: '#94a3b8' }}>
                {expandedOrder === order.pedidoID ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </div>
            </div>

            {expandedOrder === order.pedidoID && (
              <div style={{ padding: '2rem', borderTop: '1px solid var(--border-glass)', background: 'rgba(255, 255, 255, 0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.2rem' }}>Detalle del Pedido</h4>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontWeight: '600' }}>Completado</span>
                </div>
                
                {orderDetails[order.pedidoID] ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {orderDetails[order.pedidoID].map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
                            {item.cantidad}
                          </span>
                          <span style={{ fontWeight: '500' }}>{item.plato}</span>
                        </div>
                        <span style={{ fontWeight: '600', color: '#cbd5e1' }}>{(item.precio * item.cantidad).toFixed(2)}€</span>
                      </div>
                    ))}
                    
                    <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#94a3b8' }}>Total Facturado</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>
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
    </div>
  )
}

export default Orders
