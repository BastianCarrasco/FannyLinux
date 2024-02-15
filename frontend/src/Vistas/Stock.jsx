import React, { useEffect, useState } from 'react';
import AgrandarMenu from '../Modal/AgrandarMenu';
import { obtenerDatosMenu, actualizarStockG } from '../funciones backend/consultas';
import axios from 'axios';

function Stock() {
  const [datosMenu, setDatosMenu] = useState([]);
  const [datosMenuEditable, setDatosMenuEditable] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [hayCambios, setHayCambios] = useState(false); // Estado para indicar si hay cambios

  // Llamada a la función actualizarStockG
async function llamarActualizarStockG() {
  try {
    const resultado = await actualizarStockG();
    console.log('Resultado de la actualización:', resultado);
  } catch (error) {
    console.error('Error al llamar a actualizarStockG:', error);
  }
}

// Llamar a la función








  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const data = await obtenerDatosMenu();
        setDatosMenu(data);
        setDatosMenuEditable(data); // Inicializar la copia editable con los datos originales
      } catch (error) {
        console.error('Error al obtener datos del menú:', error);
      }
    };

    fetchData();
  }, []);

  const handleTipoChange = (event) => {
    setTipoFiltro(event.target.value);
  };

  const handleStockChange = (event, nombre) => {
    const value = event.target.value;
    if (!isNaN(value) && value !== '') {
      setDatosMenuEditable((prevDatosMenuEditable) =>
        prevDatosMenuEditable.map((item) => ({
          ...item,
          stockG: item.nombre === nombre ? parseInt(value) : item.stockG
        }))
      );
      setHayCambios(true); // Indicar que ha habido cambios al modificar el stock
    }
  };

  const handleGuardarCambios = async () => {
    try {
      for (const item of datosMenuEditable) {
        await axios.put(`http://localhost:5150/actualizar-menu/${item.id}`, { stockG: item.stockG });
      }
      setHayCambios(false); // Resetear el estado indicando que no hay cambios después de guardar
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div>
        <label htmlFor="tipoFiltro">Filtrar por tipo:</label>
        <select id="tipoFiltro" value={tipoFiltro} onChange={handleTipoChange}>
          <option value="">Todos</option>
          <option value="1">Proteína</option>
          <option value="2">Acompañamiento</option>
          <option value="3">Papas</option>
          <option value="4">Empanadas</option>
          <option value="5">Bebidas</option>
          <option value="6">Ensalada</option>
          <option value="7">Postre</option>
          <option value="8">Otro</option>
          <option value="9">Special</option>
          <option value="10">Guiso</option>
        </select>

        <br></br>

        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '33%' }}>Nombre</th>
            
              <th style={{ width: '33%' }}>Precio</th>
              <th style={{ width: '33%' }}>Stock Total</th>
            </tr>
          </thead>
          <tbody>
            {datosMenuEditable
              .filter((item) => tipoFiltro === '' || item.tipo === parseInt(tipoFiltro))
              .map((item, index) => (
                <tr key={index}>
                  <td style={{ width: '33%' }}>{item.nombre}</td>
                 
                  <td style={{ width: '33%' }}>{item.precio}</td>
                  <td style={{ width: '33%' }}>
                    {item.tipo !== 1 && item.tipo !== 2 && item.tipo !== 3 && item.tipo !== 4 && item.tipo !== 10 ? (
                      <input
                        style={{ width: '100%', textAlign: 'center' }}
                        type="number"
                        value={item.stockG}
                        onChange={(event) => handleStockChange(event, item.nombre)}
                      />
                    ) : (
                      item.stockG
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <div>
          <br></br><br></br>

                    {hayCambios && (
            <button style={{marginLeft:"40px"}} onClick={handleGuardarCambios}>Guardar Cambios</button>
          )}

        </div>



      </div>
      <div>

        <AgrandarMenu />
      </div>
    </div>
  );
}

export default Stock;







