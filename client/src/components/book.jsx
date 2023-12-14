import { Link } from "react-router-dom";

const Book = ({ title, author, imageLinks, _id }) => {
  const imgSrc = imageLinks && imageLinks.smallThumbnail;
  return (
    <div className="book" key={_id}>
      <Link to={`/booksinfo/${_id}`}>{imgSrc && <img className="image" src={imgSrc} alt="Book Cover" height="250" width="200" />}</Link>
    </div>
  );
};
  
  export default Book;
  