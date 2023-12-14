import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/navbar';
import Login from './components/login';
import Register from './components/register';
import Home from './routes/home';
import Profile from './routes/profile';
import Settings from './routes/settings';
import BookDetails from './routes/bookDetails';
import Results from './routes/results';
import Footer from './components/footer';

const App = () => {
  
  const [books, setBooks] = useState([]);
  // const [users, setUsers] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  //////////////////////////////////////////////////
  // Fetch all the books
  useEffect(() =>{
    const fetchData = async() => {
      const url = `http://localhost:5000/`;
      try{
        const data = await fetch(url);
        const response = await data.json();
        // console.log(response);
        setBooks(response);
      }catch (err){
        console.log(`Error in fetching data: ${err}`);
      }
    }
    fetchData();

    // Check for user authentication
    const userID = localStorage.getItem('userID');
    if (userID) {
      setLoggedIn(true);
    }
  }, []);  
  
  //////////////////////////////////////////////////
  // Handle Register From User 
  const handleRegister = async (name,email,password) =>{
    const url = `http://localhost:5000/register`;
    try{
      const{data, status} = await axios.post(url,{name,email,password})
      if(status === 200){            
        navigate("/login");
      }else{
        console.log("Error in adding the user");
      }
    }catch(err){
      console.log(`ERROR in adding the user: ${err}`);
    }
  }

  //////////////////////////////////////////////////
  // Handle Login From User
  const handleLogin = async (email, password) => {
    try {
      const { data, status } = await axios.post('http://localhost:5000/login', { email, password });
  
      if (status === 200) {
        // console.log(data.userId);
        localStorage.setItem('userID', data.userId);
        setLoggedIn(true);
        navigate('/');
      } else {
        console.log('Error in login:', data.message); 
      }
    } catch (err) {
      console.log('Error in login:', err.message); 
    }
  };  

  ///////////////////////////////////////////////
  // Handle Logout From User 
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('userID');  
  };  

  //////////////////////////////////////////////
  //Handling the settings about the user
  const handleSettings = async (userID, name, email, password) =>{
    const url = `http://localhost:5000/settings/${userID}`;
    try{
      const {data, status} = await axios.put(url,{name, email, password})
      
      if(status === 200){
        navigate(`/profile/${userID}`)
      }else{
        console.log("Error in updating the user");
      }
    }
    catch(err){
      console.log(`ERROR in UPDATING the user; ${err}`);
    }
  }  

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} onLogoutClick={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={<Home books={books}/>}
        />
        <Route
          path="/profile/:id"
          element={<Profile />}
        />
        <Route
          path="/settings/:id"
          element={<Settings onUpdate={handleSettings} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister}/>}
        />
        <Route
          path="/booksinfo/:id"
          element={<BookDetails />}
        />
        <Route
          path="/results/:keyword"
          element={<Results />}
        />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;