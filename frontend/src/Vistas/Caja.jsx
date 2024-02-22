import React, { useEffect, useState } from 'react';
import Orden_Cantidad_Comentario from './Componentes Caja/Orden_Cantidad_Comentario';
import Botones from './Componentes Caja/Botones';
import ListaCaja from './Componentes Caja/listaCaja';
import {resetearValores,
  calcularTotalPrecios, 
  cerrarPedido, 
  Cantidad, 
  cambiarPrecio, 
  ArregloPedidos, 
  NumOrden, 
  cambiarNumOrden, 
  resetearArregloPedidos, 
  ListaPedido} from './Componentes Caja/partesOrden';
import { obtenerPrecios, insertarPedido, insertarEncargo } from '../funciones backend/consultas';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function Caja() {


  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalEncargoIsOpen, setModalEncargoIsOpen] = useState(false);
  const [precios, setPrecios] = useState([]);
  const [n, setn] = useState(NumOrden);
  const [total, setTotal] = useState(0);
  const [nuevoCliente, setNuevoCliente] = useState('');
  const [cambiarEstado,setcambiarEstado] = useState(0);

  const handleNuevoClienteChange = (e) => {
    setNuevoCliente(e.target.value);
  };

  const handleResetClick = () => {
    resetearValores();
    resetearArregloPedidos();

  };

  function openModalEncargo() {
    setModalEncargoIsOpen(true);
    setcambiarEstado(1);
     // Actualiza el valor de Estado en el localStorage
  };
  function closeModalEncargo() {
    setModalEncargoIsOpen(false);
    setcambiarEstado(0);
   // Actualiza el valor de Estado en el localStorage
  };

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

  function buscarPorId(id) {
    return ListaPedido.some(item => item.id === id);
  }
  function buscarPorTipo(tipo) {
    return ListaPedido.some(item => item.tipo === tipo);
  }

  function contarCantidadPorTipo(tipo) {
    return ListaPedido.filter(item => item.tipo === tipo).length;
  }


  function precio() {

    const CantidadAcompanna = contarCantidadPorTipo(2);

    const EnsaladaG = buscarPorId(36);
    const Proteina = buscarPorTipo(1);
    const Guiso = buscarPorTipo(10);
    const Acompanna = buscarPorTipo(2);
    const EnsaladaC = buscarPorId(24);
    const PapaC = buscarPorId(31);
    const Jalea = buscarPorId(42);
    const Flan = buscarPorId(66);
    const Pebre = buscarPorId(74);
    const LargoPedido = ListaPedido.length;
    let resultado = 0;


    // Proteína + acompañamiento + ensalada chica + pan
    if (EnsaladaC && Acompanna && Proteina && LargoPedido === 3) {
      resultado = Cantidad * precios[0].valor;
      cambiarPrecio(resultado);
    }
    // Proteína + ensalada grande + pan
    if (EnsaladaG && Proteina && LargoPedido === 2) {
      resultado = Cantidad * precios[0].valor;
      cambiarPrecio(resultado);
    }
    //Proteína + acompañamiento + postre (jalea o flan) + pan
    // Proteína + acompañamiento + pebre + pan
    if (Proteina && Acompanna && (Flan || Pebre || Jalea) && LargoPedido === 3) {
      resultado = Cantidad * precios[0].valor;
      cambiarPrecio(resultado);
    }

    // Proteína + 2 acompañamientos + postre (jalea o flan) + pan
    //     Proteína + 2 acompañamientos + pebre + pan

    if (Proteina && CantidadAcompanna === 2 && (Flan || Pebre || Jalea) && LargoPedido === 4) {
      resultado = Cantidad * precios[0].valor;
      cambiarPrecio(resultado);
    }
    // Proteína + 2 acompañamientos + ensalada chica + pan
    if (Proteina && CantidadAcompanna === 2 && EnsaladaC && LargoPedido === 4) {
      resultado = Cantidad * precios[0].valor;
      cambiarPrecio(resultado);
    }

    // Guisado + postre (jalea o flan) + pan
    //     Guisado + pebre + pan

    if (Guiso && (Flan || Pebre || Jalea) && LargoPedido === 2) {
      resultado = Cantidad * precios[0].valor;
      cambiarPrecio(resultado);
    }

    // Proteína + papa frita chica + ensalada chica + pan

    if (Proteina && EnsaladaC && PapaC && LargoPedido === 3) {
      resultado = Cantidad * precios[1].valor;
      cambiarPrecio(resultado);
    }
    // Proteína + acompañamiento + papa frita + ensalada chica + pan
    if (Proteina && EnsaladaC && PapaC && Acompanna && LargoPedido === 4) {
      resultado = Cantidad * precios[1].valor;
      cambiarPrecio(resultado);
    }

    // Proteína + papa frita chica + postre (jalea o flan) + pan
    // Proteína + papa frita chica +pebre + pan
    if (Proteina && PapaC && (Flan || Pebre || Jalea) && LargoPedido === 3) {
      resultado = Cantidad * precios[1].valor;
      cambiarPrecio(resultado);
    }
    // Proteína + acompañamiento + papa frita chica +postre (jalea o flan) + pan

    if (Proteina && PapaC && (Flan || Pebre || Jalea) && Acompanna && LargoPedido === 4) {
      resultado = Cantidad * precios[1].valor;
      cambiarPrecio(resultado);
    }
    // Guiso solo / proteína + acompañamiento = $3,500
    if ((Guiso && LargoPedido === 1) || (Proteina && Acompanna && LargoPedido === 2)) {
      resultado = Cantidad * precios[2].valor;
      cambiarPrecio(resultado);
    }

    // INDIVIDUALES

    if (LargoPedido === 1) {
      const dato = ListaPedido[0];
      const precioUnitario = dato.precio;
      resultado = Cantidad * precioUnitario;
      cambiarPrecio(resultado);
    }
    cerrarPedido();
  }

  function insertarPedidoHandler() {
    // Recorrer cada elemento de ArregloPedidos

    if(cambiarEstado===0){
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

    }else{
      for (let i = 0; i < ArregloPedidos.length; i++) {
        const pedido = ArregloPedidos[i];
        // Insertar el pedido actual
        insertarEncargo(pedido,nuevoCliente)
          .then(data => {
            console.log('Pedido insertado correctamente:', data);
            // Lógica adicional después de insertar el pedido si es necesario
          })
          .catch(error => {
            console.error('Error al insertar el pedido:', error);
            // Manejar el error según sea necesario
          });
      }


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
      <button onClick={openModalEncargo}>Crear Encargo </button>
      <button className='cancelar' style={{scale:"80%", fontSize:"18px"}}  onClick={handleResetClick}>CANCELAR</button>
     
      <Modal
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

      <Modal
        isOpen={modalEncargoIsOpen}
        onRequestClose={closeModalEncargo}
        contentLabel="Ejemplo Modal"
      >
        <div className="modal-headerV">
          <h2>Encargo</h2>
        </div>
        <input
        type="text"
        value={nuevoCliente}
        onChange={handleNuevoClienteChange}
        placeholder="Ingrese el nombre del nuevo cliente"
      />
        <div className="modal-bodyV">
          <ListaCaja />
        </div>
        <div className="modal-footerV">
          <button onClick={insertarPedidoHandler}>Generar Voucher</button>
          <button onClick={closeModalEncargo}>Volver</button>
        </div>
      </Modal>


    </div>
  );
}

export default Caja;
