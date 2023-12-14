import React from 'react';
import Book from './book';

const BookList = ({books}) => { 

    if (books.length===0) return <p>There are no books</p>

    return ( <>    
        {books.slice(3, 6).map(book => (
            <Book key={book._id} {...book} />
        ))}

    </> );
}
 
export default BookList;