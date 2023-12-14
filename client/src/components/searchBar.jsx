import React, { useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';
import { Link, useNavigate } from 'react-router-dom';

const iconSize = 25;
const iconColor = 'white';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/results/${searchTerm}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <Link to={`/results/${searchTerm}`} className="search-icon" onClick={handleSearch}>
        <LiaSearchSolid style={{ fontSize: iconSize, color: iconColor }} />
      </Link>
    </div>
  );
}

export default SearchBar;
