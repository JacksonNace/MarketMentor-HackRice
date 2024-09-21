import logo from './logo.svg';
import Home from './pages/Home';
import Profile from './pages/Profile'
import Navbar from './components/navbar';
import './App.css';
import LoginButton from './components/loginButton';
import { Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/home2" element={<Home2 />} /> */}
        </Routes>
      <LoginButton/>
    </div>
  );
}

export default App;
