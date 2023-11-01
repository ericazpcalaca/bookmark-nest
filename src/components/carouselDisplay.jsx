import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

function CarouselDisplay() {
    // FIND A WAY TO GET THE IMAGE FROM THE FOLDER LOL
    const book1 = "https://www.hhpl.ca/en/rotatingimages/navTab01/defaultInteriorBanner.jpg";
    const book2 = "https://www.shutterstock.com/image-photo/back-school-concept-stack-books-260nw-1160400937.jpg";
    const book3 = "https://img.freepik.com/free-vector/realistic-book-lovers-day-horizontal-background-with-composition-text-books-with-lamp-cup-vector-illustration_1284-77302.jpg";

    const images = [
      { url: book1, caption: 'Image 1' },
      { url: book2, caption: 'Image 2' },
      { url: book3, caption: 'Image 3' },
    ];
  
    return (
      <div className="carousel">
        <Carousel showThumbs={false} autoPlay={true} interval={5000} infiniteLoop={true}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.url}
                alt={image.caption}
                style={{ width: '1000px', height: '400px' }} // Set your desired width and height
              />

            </div>
          ))}
      </Carousel>
      </div>
    );
  }
  
export default CarouselDisplay;
  