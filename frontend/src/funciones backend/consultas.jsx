import axios from 'axios';

export const actualizarStockG = async () => {
  try {
    const response = await axios.put('http://localhost:5150/actualizar-stockG');
    return response.data;
  } catch (error) {
    console.error('Error al enviar la solicitud PUT:', error);
    throw error;
  }
};

export const actualizarStockSemana = async (numero, id_dia, nuevoStock) => {
  try {
    const response = await axios.put(
      `http://localhost:5150/actualizar-stock/${numero}/${id_dia}`,
      { stockD: nuevoStock }
    );
    return response.data;
  } catch (error) {
    console.error('Error al enviar la solicitud PUT:', error);
    throw error;
  }
};


export const actualizarSemana = async (numero, id_dia, id_menu) => {
  try {
    const response = await axios.put(
      `http://localhost:5150/actualizar-semana/${numero}/${id_dia}`,
      { id_menu }
    );
    return response.data;
  } catch (error) {
    console.error('Error al enviar la solicitud PUT:', error);
    throw error;
  }
};

export async function obtenerDatosMenu() {
  try {
    const response = await fetch('http://localhost:5150/datosMenu');
    if (!response.ok) {
      throw new Error('Error al obtener datos del menú');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener datos del menú:', error);
    return [];
  }
}

export async function obtenerDatosSemana() {
  try {
    const response = await fetch('http://localhost:5150/datosSemana');
    if (!response.ok) {
      throw new Error('Error al obtener datos de la semana');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener datos de la semana:', error);
    return [];
  }
}

export async function obtenerPrecios() {
  try {
    const response = await fetch('http://localhost:5150/precio_colaciones');
    if (!response.ok) {
      throw new Error('Error al obtener datos de precio_colaciones');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener datos de precio_colaciones:', error);
    return [];
  }
}


