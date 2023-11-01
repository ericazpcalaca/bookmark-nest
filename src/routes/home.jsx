import React from 'react';
import BookSearch from '../components/bookSearch';
import ReleaseList from '../components/releaseList';

const Home = () => {
  return (
    <>
      <div className="home">

        <div className="carousel">
          <h3>Carrossel com imagens felizes :) </h3>
        </div>

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
