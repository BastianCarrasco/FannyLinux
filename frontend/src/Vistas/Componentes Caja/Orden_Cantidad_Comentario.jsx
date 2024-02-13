import React, { useState, useEffect } from 'react';
import { cambiarTextoOrden, TextoOrden } from './partesOrden';

function Orden_Cantidad_Comentario() {
  const [key, setKey] = useState(0); // Estado para actualizar el key y forzar el renderizado del componente

  const [cantidad, setCantidad] = useState('');
  const [comentario, setComentario] = useState('');

  const handleCantidadChange = (event) => {
    const { value } = event.target;
    // Verifica si el valor ingresado es numérico
    if (!isNaN(value)) {
      setCantidad(value);
    }
  };

  const handleComentarioChange = (event) => {
    const { value } = event.target;
    setComentario(value);
  };

  const cambiarTexto = () => {
    cambiarTextoOrden("Texto modificado 4");
    setKey(prevKey => prevKey + 1); // Actualizar el key para forzar el renderizado del componente
  };

  return (
    <div key={key}>
      <div>
        <label>Orden:</label>
        <input style={{ width: "100%", marginBottom: "5px" }} type="text" value={TextoOrden} readOnly />
      </div>

      <div>
        <label>Comentario:</label>
        <input style={{ width: "60%", marginLeft: "10px" }} type="text" value={comentario} onChange={handleComentarioChange} />
        <label style={{ maxWidth: "10%", marginLeft: "10px" }}>Cantidad:</label>
        <input style={{ maxWidth: "10%", marginLeft: "10px" }} type="text" value={cantidad} onChange={handleCantidadChange} />
      </div>

      <button onClick={cambiarTexto}>Cambiar Texto de Orden</button>
    </div>
  );
}

export default Orden_Cantidad_Comentario;





