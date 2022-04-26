import { useState , useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
} from 'react-router-dom';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    updateUserLogin();
  }, []);

  const updateUserLogin = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
      setUser(JSON.parse(atob(accessToken.split(".")[1])));
    }
  }

  return (
    isLoggedIn? (
      <>
    <div className="App">
      <Router>
        <nav>
          <h1>T u k u p e d i a</h1>
          <span>
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
          </span>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
    </>
    ) : (
      <>
        <div className="App">
      <Router>
        <nav>
          <h1>T u k u p e d i a</h1>
          <span>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          </span>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
    </>
    )
  );
}

export default App;
