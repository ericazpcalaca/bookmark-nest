import React, { useState, useEffect } from 'react';
import { MdOutlineDelete } from "react-icons/md";
import axios from 'axios';

const TabComponent = (onDelete = f => f) => {
  // Retrieve userID from localStorage
  const userID = localStorage.getItem('userID');

  const [favorites, setFavorites] = useState([]);
  const [favoriteBooksInfo, setFavoriteBooksInfo] = useState([]);  

  const [toReadList, setToReadList] = useState([]);
  const [toReadListInfo, setToReadListInfo] = useState([]);

  const [reading, setReading] = useState([]);
  const [readingInfo, setReadingInfo] = useState([])

  const [finishedBooks, setFinishedBooks] = useState([]);
  const [finishedBooksInfo, setFinishedBooksInfo] = useState([]);

  const [activeTab, setActiveTab] = useState(1);  

  // Function to handle tab click
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) {
          console.error("UserID is undefined");
          return;
      }  
      const url = `http://localhost:5000/profile/${userID}`;
  
      try {
        const response = await axios.get(url);
        const { favorites, toReadList, reading, finishedBooks } = response.data;
      
        setFavorites(favorites);
        setToReadList(toReadList);
        setReading(reading);
        setFinishedBooks(finishedBooks);
      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      }
    };  
    fetchData();
  },[userID]);

  ///////////////////////////////////////////////////////////
  //Favorite - handling click 
  const handleFavoriteClick = async (id) => {
    const removeFavoriteURL = `http://localhost:5000/updateuser/${userID}/removefavorite`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedBook: id }),
    };

    try {
      const response = await fetch(removeFavoriteURL, requestOptions);
      const updatedUser = await response.json();
      setFavorites(updatedUser.favorites)
    } catch (error) {
      console.error('Error updating user favorites:', error);
    }    
  };

  ///////////////////////////////////////////////////////////
  //To Read Book - handling click 
  const handleToReadClick = async (id) => {
    const removeToReadURL = `http://localhost:5000/updateuser/${userID}/removetoread`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedBook: id }),
    };

    try {
      const response = await fetch(removeToReadURL, requestOptions);
      const updatedUser = await response.json();
      setToReadList(updatedUser.toReadList)
    } catch (error) {
      console.error('Error updating user favorites:', error);
    }    
  };

  ///////////////////////////////////////////////////////////
  //Reagind - handling click  ================== 
  const handleReadingClick = async (id) => {
    const removeReadingURL = `http://localhost:5000/updateuser/${userID}/removereading`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedBook: id }),
    };

    try {
      const response = await fetch(removeReadingURL, requestOptions);
      const updatedUser = await response.json();
      setReading(updatedUser.reading)
    } catch (error) {
      console.error('Error updating user to read list:', error);
    }    
  };
  
  ///////////////////////////////////////////////////////////
  //To Read Book - handling click   
  const handlingFinishedClick = async (id) => {
    const finishedURL = `http://localhost:5000/updateuser/${userID}/removefinished`;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedBook: id }),
    };

    try {
      const response = await fetch(finishedURL, requestOptions);
      const updatedUser = await response.json();
      setFinishedBooks(updatedUser.finishedBooks)
    } catch (error) {
      console.error('Error updating user favorites:', error);
    }    
  };

  const getBookInfo = async (bookIds) => {
    // Fetch book information based on array of book IDs
    const promises = bookIds.map(async (bookId) => {
      const url = `http://localhost:5000/booksinfo/${bookId}`;
      const response = await fetch(url);
      const bookInfo = await response.json();
      return bookInfo;
    });

    return Promise.all(promises);
  };

  useEffect(() => {
    const fetchFavoriteBooksInfo = async () => {
      const favoriteBooksInfo = await getBookInfo(favorites);
      setFavoriteBooksInfo(favoriteBooksInfo);
    };

    const fetchToReadList = async () => {
      const toReadListInfo = await getBookInfo(toReadList);
      setToReadListInfo(toReadListInfo);
    };

    const fetchReading = async () => {
      const readingInfo = await getBookInfo(reading);
      setReadingInfo(readingInfo);
    };

    const fetchFinished = async () => {
      const finishedBooksInfo = await getBookInfo(finishedBooks);
      setFinishedBooksInfo(finishedBooksInfo);
    };

    if (activeTab === 1) {
      fetchFavoriteBooksInfo();
    }

    if (activeTab === 2) {
      fetchToReadList();
    }

    if (activeTab === 3) {
      fetchReading();
    }

    if (activeTab === 4) {
      fetchFinished();
    }
  }, [activeTab, favorites, toReadList, reading, finishedBooks]);

  return (
    <div>
      {/* Tab buttons */}
      <div className='tab-component-header'>
        <button id="tab-component" onClick={() => handleTabClick(1)} className={activeTab === 1 ? 'active' : ''}>
          Favorites
        </button>
        <button id="tab-component" onClick={() => handleTabClick(2)} className={activeTab === 2 ? 'active' : ''}>
          To Read
        </button>
        <button id="tab-component" onClick={() => handleTabClick(3)} className={activeTab === 3 ? 'active' : ''}>
          Reading
        </button>
        <button id="tab-component" onClick={() => handleTabClick(4)} className={activeTab === 4 ? 'active' : ''}>
          Finished
        </button>
      </div>

      {/* Content for each tab */}
      <div className="tab-text">
        {activeTab === 1 && 
          <div>
            <table className="favorites-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {favoriteBooksInfo.map((book, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{book.title} {book._id}</td>
                    <td>
                      <MdOutlineDelete
                        onClick={() => handleFavoriteClick(book._id)}
                        style={{ width: '25px', height: '25px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        {activeTab === 2 && 
          <div>
            <table className="favorites-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {toReadListInfo.map((book, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{book.title} {book._id}</td>
                    <td>
                      <MdOutlineDelete
                        onClick={() => handleToReadClick(book._id)}
                        style={{ width: '25px', height: '25px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        {activeTab === 3 && 
          <div>
            <table className="favorites-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {readingInfo.map((book, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{book.title} {book._id}</td>
                    <td>
                      <MdOutlineDelete
                        onClick={() => handleReadingClick(book._id)}
                        style={{ width: '25px', height: '25px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
        {activeTab === 4 &&
          <div>
            <table className="favorites-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {finishedBooksInfo.map((book, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                    <td>{book.title} {book._id}</td>
                    <td>
                      <MdOutlineDelete
                        onClick={() => handlingFinishedClick(book._id)}
                        style={{ width: '25px', height: '25px' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
        }
      </div>
    </div>
  );
};

export default TabComponent;
