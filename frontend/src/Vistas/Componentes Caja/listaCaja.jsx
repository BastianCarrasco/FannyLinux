import React, { useEffect, useState } from 'react';


function ListaCaja() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const storedPedidos = JSON.parse(localStorage.getItem('ArregloPedidos')) || [];
    setPedidos(storedPedidos);
  }, [localStorage.getItem('ArregloPedidos')]); // Agregar localStorage.getItem('ArregloPedidos') como dependencia del efecto

  return (
    <div>
      <h2>Lista de Pedidos</h2>
      <table className="full-width-table"> {/* Agrega la clase full-width-table */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Texto de la Orden</th>
            <th>Cantidad</th>
            {/* <th>Llaves</th> */}
            <th>Comentario</th>
            <th>Precio</th>
            {/* <th>Estado</th> */}
            {/* <th>Barra</th> */}
            {/* <th>Cliente</th> */}
            {/* <th>Número de Orden</th> */}
            {/* Agrega más encabezados según las propiedades de cada pedido */}
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pedido.TextoOrden}</td>
              <td>{pedido.Cantidad}</td>
              {/* <td>{pedido.Llaves}</td> */}
              <td>{pedido.Comentario}</td>
              <td>{pedido.Precio}</td>
              {/* <td>{pedido.Estado}</td>
              <td>{pedido.Barra}</td>
              <td>{pedido.Cliente}</td>
              <td>{pedido.NumOrden}</td> */}
              {/* Agrega más celdas según las propiedades de cada pedido */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCaja;


