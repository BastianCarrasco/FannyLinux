import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { obtenerDatosPedidos } from '../funciones backend/consultas';
import { FaUndoAlt } from 'react-icons/fa';
import Modal from 'react-modal';

function Encargos() {
  const [pedidos, setPedidos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [numeroOrdenSeleccionado, setNumeroOrdenSeleccionado] = useState(null);
  const [pedidosConNumeroOrden, setPedidosConNumeroOrden] = useState([]);
  const [numerosOrdenMostrados, setNumerosOrdenMostrados] = useState([]);
  const [rowSpanCount, setRowSpanCount] = useState(1); // Contador de filas fusionadas

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

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleGuardarPedidosPorNumeroOrden = (numeroOrden) => {
    const pedidosFiltrados = pedidos.filter(pedido => pedido.NumOrden === numeroOrden);
    setPedidosConNumeroOrden(pedidosFiltrados);
  };

  const handleButtonOnClick = (numeroOrden) => {
    setNumeroOrdenSeleccionado(numeroOrden);
    handleGuardarPedidosPorNumeroOrden(numeroOrden);
    openModal();
    setNumerosOrdenMostrados(prevState => [...prevState, numeroOrden]);
    setRowSpanCount(1); // Reiniciar el contador de filas fusionadas
  };

  return (
    <div>
   
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Orden</th>
            <th>Cantidad</th>
            {/* <th>Llaves</th> */}
            <th>Comentario</th>
            <th>Precio</th>
            {/* <th>Estado</th> */}
            {/* <th>Barra</th> */}
            <th>Cliente</th>
            <th>Número de Orden</th>
          </tr>
        </thead>
        <tbody>
          {pedidos
            .filter(pedido => pedido.Estado === 1)
            .map((pedido, index, array) => {
              const isFirstRowOfGroup = array.findIndex(p => p.NumOrden === pedido.NumOrden) === index;
              return (
                <tr key={index}>
                  {/* <td>{pedido.Id_pedidos}</td> */}
                  <td>{pedido.OrdenTxt}</td>
                  <td>{pedido.Cantidad}</td>
                  {/* <td>{pedido.Llaves}</td> */}
                  <td>
                    {pedido.Comentario.split('\n').map((linea, i) => (
                      <div key={i}>{linea}</div>
                    ))}
                  </td>
                  <td>{pedido.Precio}</td>
                  {/* <td>{pedido.Estado}</td> */}
                  {/* <td>{pedido.Barra}</td> */}
                  <td>{pedido.Cliente}</td>
                  {isFirstRowOfGroup && (
                    <td rowSpan={rowSpanCount}>{pedido.NumOrden}</td>
                  )}
                  <td>
                    {isFirstRowOfGroup && (
                      <button onClick={() => handleButtonOnClick(pedido.NumOrden)}>Ver Detalles</button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div>
          <h2>Pedidos con Número de Orden: {numeroOrdenSeleccionado}</h2>
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
              {pedidosConNumeroOrden.map((pedido, index) => (
                <tr key={index}>
                  <td>{pedido.Id_pedidos}</td>
                  <td>{pedido.OrdenTxt}</td>
                  <td>{pedido.Cantidad}</td>
                  <td>{pedido.Llaves}</td>
                  <td>
                    {pedido.Comentario.split('\n').map((linea, i) => (
                      <div key={i}>{linea}</div>
                    ))}
                  </td>
                  <td>{pedido.Precio}</td>
                  <td>{pedido.Estado}</td>
                  <td>{pedido.Barra}</td>
                  <td>{pedido.Cliente}</td>
                  <td>{pedido.NumOrden}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={closeModal}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
}

export default Encargos;






