import logo from './logo.svg';
import Navbar from './components/navbar';
import Home from './components/Home';
import './App.css';
import Login from './components/login';
import LogoutButton from './components/logoutButton';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Login/>
      <LogoutButton/>
    </div>
  );
}

export default App;
