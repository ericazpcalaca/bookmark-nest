import React, { useState } from 'react';
import { LiaSearchSolid } from 'react-icons/lia';

function SearchBar() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    // Add your search functionality here
    console.log("procuraaaaaaa");
  };

  return (
    <div className="search-bar">
        <input
            type="text"
            placeholder="Search by title, author..."
            value={searchText}
            onChange={handleSearch}
        />
        <div className="search-icon">
            <LiaSearchSolid
                color={"white"}/>
        </div>
    </div>
  );
}

export default SearchBar;