import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Caja from './Vistas/Caja'; // Asegúrate de importar el componente Caja desde la ubicación correcta
import Cola from './Vistas/Cola';
import Encargos from './Vistas/Encargos';
import Stock from './Vistas/Stock';
import Menu from './Vistas/Menu';

function Home() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ width: "100%" }}> {/* Establece el ancho al 100% */}
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
    <Router >
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/caja">Caja</Link> {/* Cambiamos "/about" por "/caja" */}
            </li>
            <li>
              <Link to="/cola">Cola</Link> {/* Cambiamos "/about" por "/caja" */}
            </li>

            <li>
              <Link to="/caja">Encargos</Link> {/* Cambiamos "/about" por "/caja" */}
            </li>
            <li>
              <Link to="/caja">Menu</Link> {/* Cambiamos "/about" por "/caja" */}
            </li>
            <li>
              <Link to="/caja">Stock</Link> {/* Cambiamos "/about" por "/caja" */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caja" element={<Caja />} /> {/* Usamos el componente Caja en lugar de About */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



