import React from 'react';
import CarouselDisplay from '../components/carouselDisplay';
import BookList from '../components/bookList';
import TopThreeList from '../components/topThreeList';

const Home = ({ books }) => {
  return (
    <>
      <div>
        <div className='carrosel-content'>
          <CarouselDisplay />      
        </div>
        <div className="content">          

          <div className="trending">
            <h3>Top 3 of the week</h3>
            <hr id='hr-style'></hr>
            <div className="centered-book-list">
              <TopThreeList books={books} />
            </div>
          </div>

          <div className="trending">
            <h3>Trending this week</h3>
            <hr id='hr-style'></hr>
            <div className="centered-book-list">
              <BookList books={books} />
            </div>
          </div>

          <div className='phase'>
            <h2>Stuck in the eternal struggle of picking your next literary adventure?</h2>
            <p>Fear not! Spill the beans on the titles or genres that once tickled your fancy, and brace yourself for recommendations so spot-on, they might as well have been delivered by a psychic bookworm.</p>
          </div>

          <div className="divided-container">
            <div className="left-column">
              <img src={require('../images/bookcase.png')} alt="logo" className="brand-logo" width={"450px"}/>
            </div>
            <div className="right-column">
                <p><strong>Eager to know what's cooking in your friends' reading cauldron?</strong></p>
                <p>Chances are, they're spilling the tea (or maybe coffee, if they're feeling rebellious) on their 
                    all-time faves and the literary disasters over at bookmark-nest. Join the bookish gossip party!</p>
              </div>
            </div>
          </div>

        </div>
    </>
  );
}

export default Home;
