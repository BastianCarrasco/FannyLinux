import React, { useEffect, useState } from 'react';
import { obtenerDatosPedidos } from '../funciones backend/consultas';

function Cola() {
  const [pedidos, setPedidos] = useState([]);

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

  return (
    <div>
      <h2>Cola de Pedidos</h2>
      <table style={{ width: '100%' }}> {/* Establece el ancho de la tabla al 100% */}
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

