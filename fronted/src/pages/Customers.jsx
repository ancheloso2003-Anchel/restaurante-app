// Componente que muestra el listado de clientes premium de la plataforma
import { useState, useEffect } from 'react'
import axios from 'axios'
import { User, MapPin, Mail, Phone, Calendar } from 'lucide-react'
import { staticCustomers } from '../data/staticData'

const API_URL = import.meta.env.VITE_API_URL;


const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Arrays de fotos diversas según el género del cliente
  const malePhotos = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop',
  ]

  const femalePhotos = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
  ]

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${API_URL}/customers`, { timeout: 1000 })
        // Asignamos una foto coherente con el género (H/M) usando dos contadores separados
        let mCount = 0
        let fCount = 0
        
        const enrichedData = response.data.map((c) => {
          if (c.sexo === 'H') {
            const foto = malePhotos[mCount % malePhotos.length]
            mCount++
            return { ...c, foto }
          } else {
            const foto = femalePhotos[fCount % femalePhotos.length]
            fCount++
            return { ...c, foto }
          }
        })
        setCustomers(enrichedData)
      } catch (error) {
        console.error('Error fetching customers, usando datos estáticos:', error)
        setError('No se pudo conectar con el servidor. Mostrando datos de prueba.')
        setCustomers(staticCustomers)
      } finally {
        setLoading(false)
      }
    }
    fetchCustomers()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  )

  return (
    // Estructura principal de la página con rejilla de tarjetas de clientes
    <div className="customers-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header className="animate-fade-in-up" style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: '900', 
          marginBottom: '1rem',
          letterSpacing: '-2px'
        }}>
          Nuestra Comunidad
        </h1>
        {error && (
          <div style={{ 
            background: 'rgba(239, 68, 68, 0.1)', 
            color: '#ef4444', 
            padding: '1rem', 
            borderRadius: '12px', 
            marginBottom: '2rem',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            display: 'inline-block'
          }}>
            {error}
          </div>
        )}
        <p style={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          Conoce a las personas que hacen de nuestra plataforma un lugar especial y gourmet.
        </p>
      </header>
      
      <div className="grid-container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
        gap: '2.5rem' 
      }}>
        {/* Recorre el array de clientes para generar cada tarjeta individual */}
        {customers.map((c, index) => (
          <div key={c.clienteID} className="glass-card animate-fade-in-up" style={{ 
            padding: '2.5rem',
            borderRadius: '30px',
            background: 'var(--bg-card)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-glass)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            animationDelay: `${index * 0.1}s`,
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={c.foto} 
                  alt={c.nombre} 
                  className="customer-avatar"
                  style={{ 
                    width: '90px', 
                    height: '90px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '3px solid var(--primary)',
                    padding: '4px',
                    transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '8px', 
                  right: '8px', 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  background: 'var(--primary)', 
                  border: '3px solid #020617',
                  boxShadow: '0 0 10px var(--primary)'
                }}></div>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: '#fff', fontWeight: '800' }}>
                  {c.nombre} {c.apellido1}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', color: '#64748b', fontSize: '0.9rem', marginTop: '0.4rem', fontWeight: '600' }}>
                  <MapPin size={14} style={{ marginRight: '6px', color: 'var(--primary)' }} />
                  {c.poblacion}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '15px' }}>
                <Mail size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{c.nombre.toLowerCase()}@gastroweb.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8', background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '15px' }}>
                <Calendar size={18} color="var(--primary)" />
                <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>Miembro Gastropass Oro</span>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid rgba(255,255,255,0.05)' 
            }}>
              <span style={{ 
                fontSize: '0.75rem', 
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                background: c.sexo === 'H' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)', 
                color: c.sexo === 'H' ? 'var(--primary)' : '#3b82f6',
                padding: '6px 16px', 
                borderRadius: '99px',
                border: `1px solid ${c.sexo === 'H' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`
              }}>
                {c.sexo === 'H' ? 'PREMIUM GOURMET' : 'PREMIUM GOURMET'}
              </span>
              <button style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--primary)', 
                fontSize: '0.9rem', 
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: 'none'
              }}>
                Perfil <User size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Customers

