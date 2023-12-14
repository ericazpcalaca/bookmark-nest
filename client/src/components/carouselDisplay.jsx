import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

function CarouselDisplay() {
  const book1 = require('../images/image1.png');
  const book2 = require('../images/image2.png');
  const book3 = require('../images/image3.webp');

  const images = [
    { url: book1, caption: 'Image 1' },
    { url: book2, caption: 'Image 2' },
    { url: book3, caption: 'Image 3' },
  ];

  return (
    <div className="carousel">
      <Carousel showThumbs={false} autoPlay={true} interval={5000} infiniteLoop={true} showArrows={false} >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image.url}
              alt={image.caption}
              style={{ width: '900px', height: '300px' }} 
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselDisplay;
