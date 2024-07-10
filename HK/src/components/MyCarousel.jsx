import React, { useState, useEffect } from "react";
import c1 from '/images/cr1.jpg';
import c2 from '/images/cr2.jpg';
import c3 from '/images/cr3.jpg';
import '../styles/carousel.css';

const images = [c1, c2, c3];

function MyCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 8000); // Change slide every 5 seconds (5000 milliseconds)

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return (
        <div className="carousel-container">
            <div className="carousel-inner" style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: 'transform 1s ease-in-out' // Smooth transition between slides
            }}>
                {images.map((image, index) => (
                    <div className={`carousel-item ${index === currentIndex ? 'active' : ''}`} key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}>
                &#10094;
            </button>
            <button className="carousel-control-next" onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)}>
                &#10095;
            </button>
            <div className="carousel-indicators">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyCarousel;
