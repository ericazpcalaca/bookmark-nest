import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReleaseList() {
  const [books, setBooks] = useState([]);
  const apiKey = 'AIzaSyCZu6WlNM1G959YX6ts3UxLcg1gNIRfhzs'; // Replace with your actual API key

  useEffect(() => {
    // Function to fetch the 5 newest books
    const fetchNewestBooks = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes',
          {
            params: {
              key: apiKey,
              orderBy: 'newest',
              maxResults: 10,
            },
          }
        );
        setBooks(response.data.items);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the function when the component mounts
    fetchNewestBooks();
  }, []); // The empty dependency array ensures this effect runs only once

  
  return (
    <div className='release'>
      <h3>Newest Books</h3>
      Text
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReleaseList;
