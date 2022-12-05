import { useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import './App.css';
import { Home } from './pages/Home';
import { Private } from './pages/Private';
import { RequireAuth } from './context/Auth/RequireAuth';
import { AuthContext } from './context/Auth/AuthContext';

function App() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signout();
    navigate('/');
  };

  return (
    <div className="App">
      <header>
        <h1>Header do Site</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/private">Privada</Link>
          {auth.user && (
            <a href=" " onClick={handleLogout}>
              Sair
            </a>
          )}
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/private"
          element={
            <RequireAuth>
              <Private />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
