import { useState, useEffect } from "react";
import { ImBooks } from "react-icons/im";
import TabComponent from "../components/tabComponent";
import axios from 'axios';

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState('');
  const [quote, setQuote] = useState('');

  // Retrieve userID from localStorage
  const userID = localStorage.getItem('userID');

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) {
        console.error("UserID is undefined");
        return;
      }
  
      const url = `http://localhost:5000/profile/${userID}`;
      const quoteUrl = "https://type.fit/api/quotes";
  
      try {
        const response = await axios.get(url);
        const { name, email } = response.data;
        setName(name);
        setEmail(email);

        // Fetch quote data - API 
        const quoteResponse = await axios.get(quoteUrl);
        const randomQuote = quoteResponse.data[Math.floor(Math.random() * quoteResponse.data.length)];
        setQuote(randomQuote.text);

      } catch (err) {
        console.error(`Error in fetching data: ${err}`);
      }
    };
  
    fetchData();
  }, [userID]);
  

  return (
    <>
      <div className="content">
        <h2>Profile</h2>
        <hr id='hr-style'></hr>  
        <div className="profile">
          <div className="divided-container">
            <div className="left-column-profile">
              <ImBooks style={{ width: '150px', height: '150px'}} />
            </div>

            <div className="right-column-profile">
              <h1>{name}</h1>
              <p><strong>Email: </strong>{email}</p>
              <p><strong>Quote of the day: </strong>{quote}</p>
            </div> 
          </div>
        </div>
    
        <TabComponent />
      </div>
    </>
  );
};

export default Profile;
