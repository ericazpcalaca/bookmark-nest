import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from 'react-icons/fa'

const BookDetails = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [pageCount, setPageCount] = useState("");
    const [imageLinks, setImageLinks] = useState("");

    const [isFavorite, setIsFavorite] = useState(false);    
    const [isToRead, setToRead] = useState(false);
    const [isReading, setReading] = useState(false);
    const [isFinished, setFinished] = useState(false);

    // Processing the path parameters
    const { id } = useParams();
    const userID = localStorage.getItem('userID');
    // console.log(userID);

    useEffect(() => {
        const fetchData = async () => {

            const url = `http://localhost:5000/booksinfo/${id}`;

            try {
                const data = await fetch(url);
                const { title, author, publisher, description, pageCount, imageLinks } = await data.json();

                setTitle(title);
                setAuthor(author);
                setPublisher(publisher);
                setDescription(description);
                setPageCount(pageCount);
                setImageLinks(imageLinks);

                // Check if the book is already in the user's favorites
                if(userID != null){                    
                    const user = await getUserToRead();
                    setIsFavorite(user.favorites.includes(id));
                    setToRead(user.toReadList.includes(id));
                    setReading(user.reading.includes(id));
                    setFinished(user.finishedBooks.includes(id));
                }                
            } catch (err) {
                console.log(`Error in fetching data: ${err}`);
            }
        };
        fetchData();
    }, [id]);

    const getUserToRead = async () => {
        const url = `http://localhost:5000/${userID}`;        
        const response = await fetch(url);
        const user = await response.json();
        return user;
    };

    ///////////////////////////////////////////////////////////
    //Favorite Book - handling click => Add & Remove
    const handleFavoriteClick = async () => {
        const addFavoriteURL = `http://localhost:5000/updateuser/${userID}/addfavorite`;
        const removeFavoriteURL = `http://localhost:5000/updateuser/${userID}/removefavorite`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ selectedBook: id }),
        };

        if(isFavorite){
            try {
                const response = await fetch(removeFavoriteURL, requestOptions);
                const updatedUser = await response.json();
                setIsFavorite(false);
            } catch (error) {
                console.error('Error updating user favorites:', error);
            }
        }else{
            try {
                const response = await fetch(addFavoriteURL, requestOptions);
                const updatedUser = await response.json();
                setIsFavorite(true);
            } catch (error) {
                console.error('Error updating user favorites:', error);
            }
        }        
    };

    ///////////////////////////////////////////////////////////
    // Reading a Book - handling click => Add & Remove 
    const handleReadingClick = async () => {
        const addreadingURL = `http://localhost:5000/updateuser/${userID}/addreading`; 
        const removeReadingURL = `http://localhost:5000/updateuser/${userID}/removereading`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ selectedBook: id }),
        };

        if(isReading){
            try {
                const response = await fetch(removeReadingURL, requestOptions);
                const updatedUser = await response.json();
                setToRead(updatedUser.toReadList.includes(id));
                setFinished(updatedUser.finishedBooks.includes(id));                  
                setReading(false);
            } catch (error) {
                console.error('Error updating user favorites:', error);
            }
        }
        else{
            try {
                const response = await fetch(addreadingURL, requestOptions);
                const addReadingResponse = await response.json(); 
                setToRead(addReadingResponse.toReadList.includes(id));
                setFinished(addReadingResponse.finishedBooks.includes(id));  
                setReading(true);
            } catch (error) {
                console.error('Error updating user favorites:', error);
            }
        }        
    };

    ///////////////////////////////////////////////////////////
    // To Read a Book - handling click => Add & Remove 
    const handleToReadClick = async () => {
        const addToReadBookURL = `http://localhost:5000/updateuser/${userID}/addtoread`; 
        const removeToReadBookURL = `http://localhost:5000/updateuser/${userID}/removetoread`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ selectedBook: id }),
        };

        if(isToRead){
            try {
                const variavel = await fetch(removeToReadBookURL, requestOptions);
                const updatedUserToRead = await variavel.json();
                setFinished(updatedUserToRead.finishedBooks.includes(id));
                setReading(updatedUserToRead.reading.includes(id));
                setToRead(false);               
                
            } catch (error) {
                console.error('Error updating user favorites:', error);
            }
        }
        else{
            try {
                const response = await fetch(addToReadBookURL, requestOptions);
                const updatedUserToRead = await response.json();     
                setFinished(updatedUserToRead.finishedBooks.includes(id));
                setReading(updatedUserToRead.reading.includes(id));     
                setToRead(true);
            } catch (error) {
                console.error('Error updating user favorites:', error);
            }
        }        
    }; 
        
    ///////////////////////////////////////////////////////////
    // Finished Book - handling click => Add & Remove
    const handleFinishedBook = async () => {
        const addFinishedBookURL = `http://localhost:5000/updateuser/${userID}/addfinished`;
        const removeFinishedBookURL = `http://localhost:5000/updateuser/${userID}/removefinished`;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ selectedBook: id }),
        };

        if(isFinished){
            try {
                const response = await fetch(removeFinishedBookURL, requestOptions);
                const updatedBooks = await response.json();
                setToRead(updatedBooks.toReadList.includes(id));
                setReading(updatedBooks.reading.includes(id));
                setFinished(false);
            } catch (error) {
                console.error('Error updating user favorites:', error);
            }
        }else{
            try {
                const responseAddFinishedBooks = await fetch(addFinishedBookURL, requestOptions);
                const updatedBooks = await responseAddFinishedBooks.json();
                console.log(updatedBooks);
                setToRead(updatedBooks.toReadList.includes(id));
                setReading(updatedBooks.reading.includes(id));
                setFinished(true);
            } catch (error) {
                console.error('Error updating user favorites:', error);
            }
        }        
    };

    const imgSrc = imageLinks && imageLinks.smallThumbnail;

    return (
        <div className="content">
            <div className="bookDetail">
                <h1>{title}</h1>
                <hr id='hr-style'></hr>

                <div className="image-text-container">
                    <div className="left-column">
                        {imgSrc && <img className="image" src={imgSrc} alt="Book Cover" height="250" width="200" />} <br></br>
                    </div>

                    <div className="right-column-details">
                        <p><strong>Author</strong> {author}</p>
                        <p><strong>Publisher:</strong>{publisher}</p>
                        <p><strong>Page Count:</strong> {pageCount}</p>
                        <p><strong>Description:</strong> {description}</p>
                    </div>
                </div>

                <div className="image-text-container-bottom">
                    <div className="user-actions-book">
                        <FaHeart
                            onClick={userID ? handleFavoriteClick : null}
                            color={isFavorite ? 'red' : 'gray'}
                        />
                        <br></br><br></br>
                        <button 
                            onClick={userID ? handleToReadClick : null} 
                            className={isToRead ? 'btn btn-success' : 'btn btn-secondary'}>to read</button>
                        <button 
                            onClick={userID ? handleReadingClick : null} 
                            className={isReading ? 'btn btn-success' : 'btn btn-secondary'}>reading</button>
                       <button 
                            onClick={userID ? handleFinishedBook : null} 
                            className={isFinished ? 'btn btn-success' : 'btn btn-secondary'}>finished</button>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default BookDetails;
