// Carrusel de contenido destacado para la página de inicio
import { useState, useEffect } from 'react'

const slides = [
  {
    image: '/images/slide1.png',
    title: 'Sabores que Inspiran',
    description: 'Descubre nuestra selección de ensaladas gourmet con los ingredientes más frescos de la huerta.'
  },
  {
    image: '/images/slide2.png',
    title: 'Tradición al Horno',
    description: 'Pizzas artesanas cocinadas en horno de leña siguiendo la receta tradicional italiana.'
  },
  {
    image: '/images/slide3.png',
    title: 'Dulces Momentos',
    description: 'Termina tu experiencia con nuestros postres de autor, diseñados para sorprender a tu paladar.'
  }
]

const FeaturedCarousel = () => {
  const [current, setCurrent] = useState(0)

  // Gestión del cambio automático de diapositivas mediante un intervalo de tiempo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="carousel-container">
      {/* Visualización de cada diapositiva basada en el estado actual */}
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`carousel-slide ${index === current ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.title} className="carousel-image" />
          <div className="carousel-content">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
      {/* Controles de navegación manual por puntos indicadores */}
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <div 
            key={index}
            className={`carousel-dot ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default FeaturedCarousel
