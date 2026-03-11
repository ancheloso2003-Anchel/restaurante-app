import { useState, useEffect } from 'react'
import axios from 'axios'
import { User, MapPin, Mail, Phone, Calendar } from 'lucide-react'

const Customers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)

  // Array of diverse customer photos from high-quality sources
  const defaultPhotos = [
    '/assets/customers/customer1.png',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
  ]

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/customers')
        // Enrich customers with random photos for demo purposes if they don't have one
        const enrichedData = response.data.map((c, index) => ({
          ...c,
          foto: defaultPhotos[index % defaultPhotos.length]
        }))
        setCustomers(enrichedData)
      } catch (error) {
        console.error('Error fetching customers:', error)
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
    <div className="customers-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: '800', 
          background: 'linear-gradient(to right, #fff, #94a3b8)', 
          WebkitBackgroundClip: 'text', 
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem'
        }}>
          Nuestra Comunidad
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Conoce a las personas que hacen de nuestra plataforma un lugar especial.
        </p>
      </header>
      
      <div className="grid-container" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '2rem' 
      }}>
        {customers.map((c) => (
          <div key={c.clienteID} className="glass-card" style={{ 
            padding: '2rem',
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)'
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <img 
                  src={c.foto} 
                  alt={c.nombre} 
                  style={{ 
                    width: '80px', 
                    height: '80px', 
                    borderRadius: '50%', 
                    objectFit: 'cover',
                    border: '3px solid var(--primary)',
                    padding: '3px'
                  }} 
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '5px', 
                  right: '5px', 
                  width: '15px', 
                  height: '15px', 
                  borderRadius: '50%', 
                  background: '#10b981', 
                  border: '2px solid #0f172a' 
                }}></div>
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#f8fafc' }}>
                  {c.nombre} {c.apellido1}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', color: '#94a3b8', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  <MapPin size={14} style={{ marginRight: '4px' }} />
                  {c.poblacion}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b' }}>
                <Mail size={16} />
                <span style={{ fontSize: '0.9rem' }}>{c.nombre.toLowerCase()}@example.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#64748b' }}>
                <Calendar size={16} />
                <span style={{ fontSize: '0.9rem' }}>Miembro desde 2024</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ 
                fontSize: '0.7rem', 
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                background: c.sexo === 'H' ? 'rgba(56, 189, 248, 0.1)' : 'rgba(244, 114, 182, 0.1)', 
                color: c.sexo === 'H' ? '#38bdf8' : '#f472b6',
                padding: '4px 12px', 
                borderRadius: '99px',
              }}>
                {c.sexo === 'H' ? 'Cliente Premium' : 'Clienta Premium'}
              </span>
              <button style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--primary)', 
                fontSize: '0.85rem', 
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Ver perfil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Customers

