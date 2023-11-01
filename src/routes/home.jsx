import React from 'react';
import BookSearch from '../components/bookSearch';
import ReleaseList from '../components/releaseList';
import CarouselDisplay from '../components/carouselDisplay';

const Home = () => {
  return (
    <>
      <div className="home">

        <CarouselDisplay />

        <ReleaseList/>        
        
        <div className="trending">
          <h3>Tranding this week</h3>
          <p>imagens pro trending release</p>
        </div>

      </div>
    </>
  );
}

export default Home;
