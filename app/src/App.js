import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <h1>T u k u p e d i a</h1>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
