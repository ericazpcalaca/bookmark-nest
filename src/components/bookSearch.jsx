import React, { useState } from 'react';
import axios from 'axios';

function BookSearch() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const apiKey = 'AIzaSyCZu6WlNM1G959YX6ts3UxLcg1gNIRfhzs';
  const apiUrl = 'https://www.googleapis.com/books/v1/volumes';

  const searchBooks = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: query,
          key: apiKey,
        },
      });
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={searchBooks}>Search</button>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.volumeInfo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookSearch;
