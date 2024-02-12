import React, { useEffect, useState } from 'react';
import AgrandarMenu from '../Modal/AgrandarMenu';
import { obtenerDatosMenu } from '../funciones backend/consultas';
import axios from 'axios';

function Stock() {
  const [datosMenu, setDatosMenu] = useState([]);
  const [datosMenuEditable, setDatosMenuEditable] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [hayCambios, setHayCambios] = useState(false); // Estado para indicar si hay cambios

  useEffect(() => {
    console.log(datosMenuEditable);
  }, [datosMenuEditable]);

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
        await axios.put(`http://localhost:5000/actualizar-menu/${item.id}`, { stockG: item.stockG });
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
        </select>

        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th style={{ width: '25%' }}>Nombre</th>
              <th style={{ width: '25%' }}>Tipo</th>
              <th style={{ width: '25%' }}>Precio</th>
              <th style={{ width: '25%' }}>Stock Total</th>
            </tr>
          </thead>
          <tbody>
            {datosMenuEditable
              .filter((item) => tipoFiltro === '' || item.tipo === parseInt(tipoFiltro))
              .map((item, index) => (
                <tr key={index}>
                  <td style={{ width: '25%' }}>{item.nombre}</td>
                  <td style={{ width: '25%' }}>{item.tipo}</td>
                  <td style={{ width: '25%' }}>{item.precio}</td>
                  <td style={{ width: '25%' }}>
                    {item.tipo !== 1 && item.tipo !== 2 && item.tipo !== 3 && item.tipo !== 4 ? (
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

        {hayCambios && (
          <button onClick={handleGuardarCambios}>Guardar Cambios</button>
        )}
      </div>
      <div>
        <AgrandarMenu />
      </div>
    </div>
  );
}

export default Stock;







