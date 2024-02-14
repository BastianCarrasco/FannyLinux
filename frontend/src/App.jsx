import { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Sii from './Vistas/Sii';
import Caja from './Vistas/Caja';
import Cola from './Vistas/Cola';
import Encargos from './Vistas/Encargos';
import Stock from './Vistas/Stock';
import Menu from './Vistas/Menu';
import JsBarcode from 'jsbarcode';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Home() {
  const [count, setCount] = useState(0);

  // Función para crear, imprimir y descargar un archivo PDF
  const createAndPrintPDF = () => {
    // Crear un nuevo objeto jsPDF
    const doc = new jsPDF();

    // Definir el contenido de la boleta ficticia
    const content = `Este es el contenido del archivo PDF. Count: ${count}`;

    // Agregar el texto de la boleta al PDF
    doc.text(content, 10, 10);

    // Generar el código de barras
    const barcodeValue = '123456789'; // Valor del código de barras
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, barcodeValue, { format: 'CODE128' });
    const barcodeImageUrl = canvas.toDataURL('image/png');

    // Cargar la imagen del código de barras en el PDF
    doc.addImage(barcodeImageUrl, 'PNG', 10, 30, 100, 30);

    // Guardar el archivo PDF
    doc.save('boleta.pdf');

    // Imprimir el archivo PDF después de guardarlo
    doc.autoPrint();
  };

  return (
    <div>
      <h1>Boleta de Compra Ficticia</h1>
      <p>Contador: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={createAndPrintPDF}>Imprimir Boleta</button>
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
              <Link to="/menu" className='botonNav'>Menu Semana</Link>
            </li>
            <li>
              <Link to="/stock" className='botonNav'>Stock</Link>
            </li>
            <li>
              <Link to="/sii" className='botonNav'>Sii</Link>
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
          <Route path="/sii" element={<Sii />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




