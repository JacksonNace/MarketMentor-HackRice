import Home from './pages/Home';
import Profile from './pages/Profile'
import Search from './pages/Search'
import Navbar from './components/Navbar'
import './App.css';
import LoginButton from './components/loginButton';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      <LoginButton/>
    </div>
  );
}

export default App;
