import React, { useEffect, useState } from 'react';
import { eliminarPedido } from './partesOrden';
import { FaTrashAlt, FaIceCream, FaBreadSlice, FaMugHot } from 'react-icons/fa'; // Importa los íconos desde React Icons

function ListaCaja() {
  const [pedidos, setPedidos] = useState([]);
  const [sumaTotalPrecios, setSumaTotalPrecios] = useState(0); // Estado para almacenar la suma total de precios

  useEffect(() => {
    const storedPedidos = JSON.parse(localStorage.getItem('ArregloPedidos')) || [];
    setPedidos(storedPedidos);

    // Calcular la suma total de precios
    const total = storedPedidos.reduce((acc, pedido) => acc + pedido.Precio, 0);
    setSumaTotalPrecios(total);

    // Agregar event listener al montar el componente
    document.body.addEventListener('click', handleClick);

    // Remover event listener al desmontar el componente
    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []); // El efecto solo se ejecutará una vez al montar el componente

  // Función para manejar el clic en cualquier parte de la página
  const handleClick = () => {
    // Actualizar pedidos (simplemente volvemos a obtenerlos del localStorage)
    const storedPedidos = JSON.parse(localStorage.getItem('ArregloPedidos')) || [];
    setPedidos(storedPedidos);

    // Recalcular la suma total de precios
    const total = storedPedidos.reduce((acc, pedido) => acc + pedido.Precio, 0);
    setSumaTotalPrecios(total);
  };

  const handleBorrarPedido = (index) => {
    eliminarPedido(index);
    const newPedidos = [...pedidos];
    newPedidos.splice(index, 1);
    setPedidos(newPedidos);
  };

  return (
    <div>
      <h2>Lista de Pedidos - Total: ${sumaTotalPrecios.toFixed(2)}</h2> {/* Mostrar la suma total de precios */}
      <table style={{textAlign:"Left"}} className="full-width-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Texto de la Orden</th>
            <th>#</th>
            <th>Comentario</th>
            <th>Precio</th>
            <th>Acciones</th> {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pedido.TextoOrden}</td>
              <td>{"x"+pedido.Cantidad}</td>
              <td>{pedido.Comentario}</td>
              <td>{pedido.Precio}</td>
              <td>
                <FaTrashAlt onClick={() => handleBorrarPedido(index)} /> {/* Ícono de papelera */}
                <FaIceCream /> {/* Ícono de helado */}
                <FaBreadSlice /> {/* Ícono de pan */}
                <FaMugHot /> {/* Ícono de bebida */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaCaja;






