import React, { useEffect, useState } from 'react';
import { obtenerDatosSemana } from '../funciones backend/consultas';
import SelecionMenuSemana from '../Modal/Componentes Semana/SelecionMenuSemana';

function Menu() {
  const [semana, setSemana] = useState([]);
  const [semanaEditable, setSemanaEditable] = useState([]);
  const [mostrarSolo7, setMostrarSolo7] = useState(false);
  const [diaM,setdia] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await obtenerDatosSemana();
        setSemana(data);
        setSemanaEditable(data.slice()); // Crear una copia editable de los datos
      } catch (error) {
        console.error('Error al obtener datos de la semana:', error);
      }
    };

    fetchData();
  }, []);

  const handleStockChange = (event, dia, index) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      const newSemanaEditable = semanaEditable.map((item) => {
        if (item.dia === dia && item.numero === index) {
          return { ...item, stockD: parseInt(value) };
        }
        return item;
      });
      setSemanaEditable(newSemanaEditable); // Actualizar el estado semanaEditable
    }
  };

  const handleMostrarSolo7Change = (event) => {
    setMostrarSolo7(event.target.checked);
  };

  return (
    <div className="menu-container">
      <h2>Menú de la Semana</h2>
      <SelecionMenuSemana></SelecionMenuSemana>
      <div>
        <input
          type="checkbox"
          checked={mostrarSolo7}
          onChange={handleMostrarSolo7Change}
        />
        <label>Mostrar solo platillos</label>
      </div>
      <div className="tables-container">
        {['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'].map((dia, indexDia) => (
          <table key={indexDia} className="day-table">
            <thead>
              <h3>{dia}</h3>
            
              <tr>
                <th style={{ width: '50%' }}>Nombre</th>
                <th style={{ width: '50%' }}>Stock</th>
              </tr>
            </thead>
            <tbody>
              {mostrarSolo7
                ? semanaEditable
                    .filter((item) => item.dia === dia)
                    .slice(0, 7) // Mostrar solo los primeros 7 elementos
                    .map((item, index) => (
                      <tr key={index}>
                        <td style={{ width: '50%' }}>{item.nombre}</td>
                        <td style={{ width: '50%' }}>
                          <input
                            style={{ width: '50%' }}
                            type="number"
                            value={item.stockD}
                            min="0"
                            onChange={(event) => handleStockChange(event, dia, index)}
                          />
                        </td>
                      </tr>
                    ))
                : semanaEditable
                    .filter((item) => item.dia === dia)
                    .slice(7) // Mostrar los elementos después de los primeros 7
                    .map((item, index) => (
                      <tr key={index}>
                        <td style={{ width: '50%' }}>{item.nombre}</td>
                        <td style={{ width: '50%' }}>
                          <input
                            style={{ width: '50%' }}
                            type="number"
                            value={item.stockD}
                            min="0"
                            onChange={(event) => handleStockChange(event, item.dia, item.numero)}
                          />
                        </td>
                      </tr>
                    ))}
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}

export default Menu;






