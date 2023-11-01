import './App.css';
import Footer from './components/footer';
import NavBar from './components/navbar';
import NavBarLogged from './components/navbarLogged';
import Home from './routes/home';
import Profile from './routes/profile';
import Message from './routes/message';
import Settings from './routes/settings';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <NavBar /> */}
      <NavBarLogged />

      <Routes>
          <Route 
            path="/" 
            element={ 
              <Home />
            }
          />

          <Route 
            path="/profile" 
            element={ 
                <Profile />
              }
          />

          <Route 
            path="/message" 
            element={ 
                <Message />
              }
          /> 

          <Route 
            path="/settings" 
            element={ 
                <Settings />
              }
          />          
      </Routes>     

      <Footer />
    </div>
  );
}

export default App;
