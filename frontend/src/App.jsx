import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Caja from './Vistas/Caja';
import Cola from './Vistas/Cola';
import Encargos from './Vistas/Encargos';
import Stock from './Vistas/Stock';
import Menu from './Vistas/Menu';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ width: "100%" }}>
      <h1>Colaciones Fanny</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" className='botonNav'>Home</Link>
            </li>
            <li>
              <Link to="/caja" className='botonNav'>Caja</Link>
            </li>
            <li>
              <Link to="/cola" className='botonNav'>Cola</Link>
            </li>
            <li>
              <Link to="/encargos" className='botonNav'>Encargos</Link>
            </li>
            <li>
              <Link to="/menu" className='botonNav'>Menu</Link>
            </li>
            <li>
              <Link to="/stock" className='botonNav'>Stock</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caja" element={<Caja />} />
          <Route path="/cola" element={<Cola />} />
          <Route path="/encargos" element={<Encargos />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




