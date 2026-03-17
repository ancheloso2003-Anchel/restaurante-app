// Carrusel especializado con efectos 3D y diseño de tarjetas con glassmorphism
import { useState, useEffect } from 'react'
import { Sparkles, ChevronRight, ChevronLeft, Info } from 'lucide-react'

/**
 * Slides data for the Special Carousel.
 * Each slide contains an image, title, badge, color theme, and description.
 */
const slides = [
  {
    image: `${import.meta.env.BASE_URL}images/slide4.png`,
    title: 'Gourmet Fusion',
    badge: 'ESTRELLA',
    color: '#10b981',
    description: 'La combinación perfecta entre la técnica tradicional y la creatividad moderna.'
  },
  {
    image: `${import.meta.env.BASE_URL}images/slide1.png`,
    title: 'Selección Eco',
    badge: 'FRESCO',
    color: '#34d399',
    description: 'Ingredientes de proximidad seleccionados diariamente para garantizar la máxima calidad.'
  },
  {
    image: `${import.meta.env.BASE_URL}images/slide5.png`,
    title: 'Bocados de Autor',
    badge: 'NUEVO',
    color: '#059669',
    description: 'Pequeñas obras de arte diseñadas para explotar en tu paladar con cada bocado.'
  }
]

/**
 * SpecialCarousel Component
 * Renders a 3D perspective carousel with glassmorphism cards.
 */
const SpecialCarousel = () => {
  const [current, setCurrent] = useState(0) // Index of the active slide
  const [isHovered, setIsHovered] = useState(false) // Pause timer on hover

  // Lógica del carrusel para avanzar automáticamente, pausándose cuando el ratón está encima
  useEffect(() => {
    if (isHovered) return // Don't advance if the user is interacting
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 4500)
    return () => clearInterval(timer)
  }, [isHovered])

  // Navigation handlers
  const next = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1))

  return (
    <div 
      className="special-carousel-wrapper" 
      style={{
        position: 'relative',
        height: '400px',
        width: '100%',
        marginBottom: '4rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px' // Critical for 3D rotation effects
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => {
        // Determine the role of each slide relative to the current index
        const isActive = index === current
        const isPrev = index === (current === 0 ? slides.length - 1 : current - 1)
        const isNext = index === (current === slides.length - 1 ? 0 : current + 1)
        
        let transform = 'translateX(0) scale(0.8) rotateY(0deg)'
        let opacity = 0
        let zIndex = 0

        // Lógica de posicionamiento 3D basada en el índice actual
        if (isActive) {
          transform = 'translateX(0) scale(1) rotateY(0deg)'
          opacity = 1
          zIndex = 10
        } else if (isPrev) {
          transform = 'translateX(-40%) scale(0.75) rotateY(20deg)'
          opacity = 0.4
          zIndex = 5
        } else if (isNext) {
          transform = 'translateX(40%) scale(0.75) rotateY(-20deg)'
          opacity = 0.4
          zIndex = 5
        }

        return (
          <div 
            key={index} 
            style={{
              position: 'absolute',
              width: '80%',
              maxWidth: '700px',
              height: '320px',
              background: 'rgba(15, 23, 42, 0.7)',
              backdropFilter: 'blur(20px)',
              borderRadius: '30px',
              border: `1px solid ${isActive ? 'rgba(16, 185, 129, 0.4)' : 'rgba(255, 255, 255, 0.05)'}`,
              overflow: 'hidden',
              display: 'flex',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth organic movement
              transform,
              opacity,
              zIndex,
              boxShadow: isActive ? '0 30px 60px -15px rgba(0, 0, 0, 0.5)' : 'none'
            }}
          >
            {/* Visual Part: Image & Badge */}
            <div style={{ width: '45%', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={slide.image} 
                alt={slide.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isActive ? 'scale(1)' : 'scale(1.2)',
                  transition: 'transform 10s linear' // Very slow zoom in effect
                }} 
              />
              <div style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                background: slide.color,
                color: 'white',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '1px'
              }}>
                {slide.badge}
              </div>
            </div>

            {/* Content Part: Info & Call to Action */}
            <div style={{ width: '55%', padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left' }}>
              <h2 style={{ fontSize: '2.2rem', margin: '0 0 1rem 0', fontWeight: '800', color: 'white' }}>{slide.title}</h2>
              <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.5', margin: 0 }}>{slide.description}</p>
              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px', color: slide.color, fontWeight: '600', fontSize: '0.9rem' }}>
                <Sparkles size={16} /> Ver detalles exclusivos
              </div>
            </div>
          </div>
        )
      })}

      {/* Manual Navigation Buttons */}
      <button onClick={prev} style={{
        position: 'absolute',
        left: '2rem',
        zIndex: 20,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white'
      }}>
        <ChevronLeft size={24} />
      </button>

      <button onClick={next} style={{
        position: 'absolute',
        right: '2rem',
        zIndex: 20,
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white'
      }}>
        <ChevronRight size={24} />
      </button>

      {/* Puntos de paginación inferiores para control de navegación rápida */}
      <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 20
          }}>
            {slides.map((_, i) => (
              <div 
                key={i} 
                onClick={() => setCurrent(i)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: i === current ? 'var(--primary)' : 'rgba(255,255,255,0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
    </div>
  )
}

export default SpecialCarousel
