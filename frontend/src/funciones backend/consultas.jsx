export async function obtenerDatosMenu() {
  try {
    const response = await fetch('http://localhost:5000/datosMenu');
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
    const response = await fetch('http://localhost:5000/datosSemana');
    if (!response.ok) {
      throw new Error('Error al obtener datos de la semana');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener datos de la semana:', error);
    return [];
  }
}


