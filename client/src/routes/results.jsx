import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

function TruncatedText({ text, maxLength }) {
  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncatedText = `${text.slice(0, maxLength)}...`;
  return <span title={text}>{truncatedText}</span>;
}

const Results = () => {
  const { keyword } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/results/${keyword}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error(`Error fetching search results: ${error.message}`);
      }
    };

    fetchData();
  }, [keyword]);

  const maxLength = 150;

  return (
    <div className='content'>
      <h2>Search Results for: " {keyword} "</h2>
      <div>
        {searchResults.length === 0 ? (
          <p>Nothing found</p>
        ) : (
          searchResults.map((result) => (
            <div className='results' key={result._id}>
              <h3>{result.title}</h3>
              <p><strong>Author:</strong> {result.author}</p>
              <TruncatedText text={result.description} maxLength={maxLength} />
              <br></br>
              <br></br>
              <Link to={`/booksinfo/${result._id}`}>Read More</Link>          
            </div>          
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
