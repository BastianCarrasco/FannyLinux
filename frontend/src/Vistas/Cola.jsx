import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Importa Axios si aún no lo has hecho
import { obtenerDatosPedidos} from '../funciones backend/consultas';

function Cola() {
  const [pedidos, setPedidos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    async function fetchPedidos() {
      try {
        const data = await obtenerDatosPedidos();
        setPedidos(data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    }

    fetchPedidos();
  }, []);

  useEffect(() => {
    console.log(inputValue);
    const barraEnPedidos = pedidos.find(pedido => pedido.Barra === parseInt(inputValue));
    console.log(Boolean(barraEnPedidos));
  
    if (Boolean(barraEnPedidos)) {
      axios.delete('http://localhost:5150/eliminar-pedidos-barra', {
        data: {
          barra: inputValue
        }
      })
      .then(response => {
        console.log(response.data); // Mensaje de éxito
        // Actualizar los pedidos después de eliminar el pedido
        setPedidos(pedidos.filter(pedido => pedido.Barra !== inputValue));
        // Limpiar el valor del input después de eliminar el pedido
        setInputValue('');
      })
      .catch(error => {
        console.error('Error al eliminar pedidos:', error); // Manejo de errores
      });
    }

    async function fetchPedidos() {
      try {
        const data = await obtenerDatosPedidos();
        setPedidos(data);
      } catch (error) {
        console.error('Error al obtener los pedidos:', error);
      }
    }

    fetchPedidos();



  }, [inputValue, pedidos]);
  
  
  
  

  useEffect(() => {
    const input = document.getElementById('inputBarra');
    if (input) {
      input.focus();
    }
  }, []); // Enfocar el input cuando se monta el componente

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

 

  return (
    <div>
      <h2>Cola de Pedidos</h2>
      <input
        id="inputBarra"
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ingrese el número de barra"
      />
     
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Orden</th>
            <th>Cantidad</th>
            <th>Llaves</th>
            <th>Comentario</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Barra</th>
            <th>Cliente</th>
            <th>Número de Orden</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr key={index}>
              <td>{pedido.Id_pedidos}</td>
              <td>{pedido.OrdenTxt}</td>
              <td>{pedido.Cantidad}</td>
              <td>{pedido.Llaves}</td>
              <td>{pedido.Comentario}</td>
              <td>{pedido.Precio}</td>
              <td>{pedido.Estado}</td>
              <td>{pedido.Barra}</td>
              <td>{pedido.Cliente}</td>
              <td>{pedido.NumOrden}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cola;


