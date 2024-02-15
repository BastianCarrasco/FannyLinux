import React from 'react';
import Orden_Cantidad_Comentario from './Componentes Caja/Orden_Cantidad_Comentario';
import Botones from './Componentes Caja/Botones';
import ListaCaja from './Componentes Caja/listaCaja';
import { cerrarPedido } from './Componentes Caja/partesOrden';

function Caja() {
  return (
    <div className="container_Caja">
      <div className="column_Caja">
        <Orden_Cantidad_Comentario></Orden_Cantidad_Comentario>
        <Botones></Botones>  
      </div>
      <div className="column_Caja"><ListaCaja></ListaCaja></div>
      <button onClick={cerrarPedido}>Crear Pedido</button>
    </div>
  );
}

export default Caja;
