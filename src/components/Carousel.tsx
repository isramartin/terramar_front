import React, { useEffect, useState } from 'react';
import '../styles/carousel.css'; // Asegúrate de importar el archivo CSS

interface CarouselProps {
  images: string[]; // Array de URLs de imágenes
}

export function Carousel({ images }: CarouselProps): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Efecto para cambiar automáticamente cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Cambiar cada 3 segundos

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [images.length]); // Dependencia en el número de imágenes

   return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div className="carousel-slides">
        {images.map((image, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
}
