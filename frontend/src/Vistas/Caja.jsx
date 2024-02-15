import React, { useEffect, useState } from 'react';
import Orden_Cantidad_Comentario from './Componentes Caja/Orden_Cantidad_Comentario';
import Botones from './Componentes Caja/Botones';
import ListaCaja from './Componentes Caja/listaCaja';
import { calcularTotalPrecios, cerrarPedido, Cantidad, TextoOrden, Tipos, cambiarPrecio, ArregloPedidos, NumOrden, cambiarNumOrden, resetearArregloPedidos, ListaPedido } from './Componentes Caja/partesOrden';
import { obtenerPrecios, insertarPedido } from '../funciones backend/consultas';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function Caja() {


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [n, setn] = useState(NumOrden);
  const [total,setTotal] = useState(0);

  function openModal() {
    const totalPrecios = calcularTotalPrecios();
    setTotal(totalPrecios);
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    obtenerPrecios()
      .then(data => {
        // Asignar los datos a la variable de estado precios
        setPrecios(data);
      })
      .catch(error => {
        console.error('Error al obtener precios:', error);
        // Manejar el error según sea necesario
      });
  }, []);

  function precio() {
    // Mapear los nombres a sus respectivos contadores
    const nombrePorItem = {
      Proteina: 0,
      Acompaña: 0,
      Papas: 0,
      Empanadas: 0,
      Bebidas: 0,
      Ensalada: 0,
      Postre: 0,
      Otro: 0,
      Special: 0,
      Guiso: 0
    };

    // Incrementar el contador correspondiente según los datos en Tipos
    Tipos.forEach(item => {
      switch (item) {
        case 1:
          nombrePorItem['Proteina']++;
          break;
        case 2:
          nombrePorItem['Acompaña']++;
          break;
        case 3:
          nombrePorItem['Papas']++;
          break;
        case 4:
          nombrePorItem['Empanadas']++;
          break;
        case 5:
          nombrePorItem['Bebidas']++;
          break;
        case 6:
          nombrePorItem['Ensalada']++;
          break;
        case 7:
          nombrePorItem['Postre']++;
          break;
        case 8:
          nombrePorItem['Otro']++;
          break;
        case 9:
          nombrePorItem['Special']++;
          break;
        case 10:
          nombrePorItem['Guiso']++;
          break;
        default:
          break;
      }
    });

    // Verificar si el contador de "Acompaña" es igual a 1 y el contador de "Guiso" es igual a 10
    if (nombrePorItem['Acompaña'] === 1 && nombrePorItem['Guiso'] === 1 && nombrePorItem['Proteina'] === 0 && nombrePorItem['Papas'] === 0 && nombrePorItem['Empanadas'] === 0 && nombrePorItem['Bebidas'] === 0 && nombrePorItem['Ensalada'] === 0 && nombrePorItem['Postre'] === 0 && nombrePorItem['Otro'] === 0 && nombrePorItem['Special'] === 0) {
      // Convertir precios[2].valor y Cantidad a enteros
      const precioValor = parseInt(precios[2].valor);
      const cantidad = parseInt(Cantidad);
      // Calcular el nuevo precio
      const nuevoPrecio = precioValor * cantidad;
      // Cambiar el precio utilizando la función cambiarPrecio
      cambiarPrecio(nuevoPrecio);
    }

    if (nombrePorItem['Acompaña'] === 0 && nombrePorItem['Guiso'] === 1 && nombrePorItem['Proteina'] === 0 && nombrePorItem['Papas'] === 0 && nombrePorItem['Empanadas'] === 0 && nombrePorItem['Bebidas'] === 0 && nombrePorItem['Ensalada'] === 0 && nombrePorItem['Postre'] === 0 && nombrePorItem['Otro'] === 0 && nombrePorItem['Special'] === 0) {
      // Convertir precios[2].valor y Cantidad a enteros
      const precioValor = parseInt(precios[2].valor);
      const cantidad = parseInt(Cantidad);
      // Calcular el nuevo precio
      const nuevoPrecio = precioValor * cantidad;
      // Cambiar el precio utilizando la función cambiarPrecio
      cambiarPrecio(nuevoPrecio);
    }

    if (nombrePorItem['Acompaña'] === 1 && nombrePorItem['Guiso'] === 0 && nombrePorItem['Proteina'] === 1 && nombrePorItem['Papas'] === 0 && nombrePorItem['Empanadas'] === 0 && nombrePorItem['Bebidas'] === 0 && nombrePorItem['Ensalada'] === 1 && nombrePorItem['Postre'] === 0 && nombrePorItem['Otro'] === 0 && nombrePorItem['Special'] === 0) {
      // Convertir precios[2].valor y Cantidad a enteros
      const precioValor = parseInt(precios[0].valor);
      const cantidad = parseInt(Cantidad);
      // Calcular el nuevo precio
      const nuevoPrecio = precioValor * cantidad;
      // Cambiar el precio utilizando la función cambiarPrecio
      cambiarPrecio(nuevoPrecio);
    }



    // Mostrar la cantidad por item por consola
    console.log('Cantidad por item en Tipos:', nombrePorItem);
    console.log('Precios:', precios);
    console.log(Cantidad + "PRECIO");

    // Llamar a la función cerrarPedido
    cerrarPedido();
  }

  function insertarPedidoHandler() {
    // Recorrer cada elemento de ArregloPedidos
    for (let i = 0; i < ArregloPedidos.length; i++) {
      const pedido = ArregloPedidos[i];
      // Insertar el pedido actual
      insertarPedido(pedido)
        .then(data => {
          console.log('Pedido insertado correctamente:', data);
          // Lógica adicional después de insertar el pedido si es necesario
        })
        .catch(error => {
          console.error('Error al insertar el pedido:', error);
          // Manejar el error según sea necesario
        });
    }

    // Incrementar el número de orden en 1

    // Obtener el nuevo valor de NumOrden y sumarle 1
    const nuevoNumOrden = NumOrden + 1;
    // Actualizar el valor de NumOrden en el almacenamiento local
    localStorage.setItem('NumOrden', nuevoNumOrden.toString());
    // Actualizar el estado 'n' con el nuevo valor de NumOrden
    setn(nuevoNumOrden);
    // Resetear el arreglo de pedidos
    cambiarNumOrden(nuevoNumOrden);
    resetearArregloPedidos();
  }


  return (
    <div>
      <div className="container_Caja">
        <div className="column_Caja">
          <Orden_Cantidad_Comentario />
          <Botones />
        </div>
        <div className="column_Caja">
          NUMERO DE ORDEN: {n}
          <ListaCaja />
        </div>
      </div>
      <div className="third_div">
        {/* Contenido del tercer div */}
      </div>
      <button onClick={precio}>Crear Orden</button>
      <button onClick={openModal}>Crear Pedido</button>
     
      <Modal className={voucher}
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Ejemplo Modal"
>
  <div className="modal-headerV">
    <h2>Voucher</h2>
  </div>
  <div className="modal-bodyV">
    <ListaCaja />
  </div>
  <div className="modal-footerV">
    <button onClick={insertarPedidoHandler}>Generar Voucher</button>
    <button onClick={closeModal}>Volver</button>
  </div>
</Modal>


    </div>
  );
}

export default Caja;
