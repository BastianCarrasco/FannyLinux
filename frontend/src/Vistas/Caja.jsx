import React from 'react';
import Orden_Cantidad_Comentario from './Componentes Caja/Orden_Cantidad_Comentario';

function Caja() {
  return (
    <div className="container_Caja">
      <div className="column_Caja"><Orden_Cantidad_Comentario></Orden_Cantidad_Comentario></div>
      <div className="column_Caja">Columna 2</div>
    </div>
  );
}

export default Caja;
