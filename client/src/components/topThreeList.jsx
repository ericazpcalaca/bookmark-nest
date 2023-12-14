import React from 'react';
import Book from './book';

const TopThreeList = ({books}) => { 

    if (books.length===0) return <p>There are no books</p>
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const shuffledBooks = shuffleArray(books);

    return ( <>    
       {shuffledBooks
            .slice(0, 3)
            .map(book => (
                <Book key={book._id} {...book} />
        ))}

    </> );
}
 
export default TopThreeList;