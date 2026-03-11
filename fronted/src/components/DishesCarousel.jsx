import { useState, useEffect } from 'react'

const slides = [
  {
    image: '/images/slide4.png',
    title: 'Tapas de Tradición',
    description: 'Nuestras tapas combinan la esencia de siempre con técnicas culinarias de vanguardia.'
  },
  {
    image: '/images/slide5.png',
    title: 'Carnes a la Brasa',
    description: 'Cortes seleccionados de la mejor calidad, cocinados al punto perfecto para resaltar su sabor.'
  },
  {
    image: '/images/slide2.png',
    title: 'Pizzas de Autor',
    description: 'Masa madre de larga fermentación e ingredientes D.O. para una experiencia italiana auténtica.'
  }
]

const DishesCarousel = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="carousel-container" style={{ height: '400px' }}>
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`carousel-slide ${index === current ? 'active' : ''}`}
        >
          <img src={slide.image} alt={slide.title} className="carousel-image" />
          <div className="carousel-content" style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '2.8rem' }}>{slide.title}</h2>
            <p style={{ fontSize: '1.1rem' }}>{slide.description}</p>
          </div>
        </div>
      ))}
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

export default DishesCarousel
