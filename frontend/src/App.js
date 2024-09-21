import logo from './logo.svg';
import Navbar from './components/navbar';
// import Home from './components/Home';
import './App.css';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Login/>
    </div>
  );
}

export default App;
