import './App.css';
import Footer from './components/footer';
import NavBar from './components/navbar';
import NavBarLogged from './components/navbarLogged';

function App() {
  return (
    <div className="App">
      <NavBar />
      {/* <NavBarLogged /> */}
      <Footer />
    </div>
  );
}

export default App;
