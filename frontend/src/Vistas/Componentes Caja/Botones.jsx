import React, { useEffect, useState } from 'react';
import { obtenerDatosSemana, obtenerDatosMenu } from '../../funciones backend/consultas';
import { agregarAlPedido, imprimirVariables } from './partesOrden';

function Botones() {
    const [datosSemana, setDatosSemana] = useState([]);
    const [datosMenu, setDatosMenu] = useState([]);
    const [pedido, setPedido] = useState([]); // Arreglo para guardar los datos seleccionados

    const diasNumeros = {
        LUNES: 1,
        MARTES: 2,
        MIÉRCOLES: 3,
        JUEVES: 4,
        VIERNES: 5,
        SÁBADO: 6,
        DOMINGO: 7
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerDatosSemana();
                setDatosSemana(data);
            } catch (error) {
                console.error('Error al obtener datos de la semana:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerDatosMenu();
                setDatosMenu(data);
            } catch (error) {
                console.error('Error al obtener datos de la semana:', error);
            }
        };

        fetchData();
    }, []);

    // Función para obtener el día actual y su valor numérico
    const obtenerDiaActual = () => {
        const hoy = new Date();
        const dia = hoy.toLocaleDateString('es-ES', { weekday: 'long' }).toUpperCase(); // Obtener el nombre completo del día en español
        return dia;
    };

    // Obtener el día actual
    const diaActual = obtenerDiaActual();

    // Filtrar los datos de la semana para mostrar solo los del día actual
    const datosDiaActual = datosSemana.filter(item => item.dia === diaActual).slice(0, 9); // Mostrar solo los primeros 9 elementos
    const datosPapas = datosSemana.filter(item => item.dia === diaActual).slice(9, 11); // Mostrar solo los primeros 9 elementos
    const datosEnsalada = datosMenu.filter(item => [36, 33, 24].includes(item.id));

    // Función para manejar el evento onClick del botón
    const handleClick = (item) => {
        setPedido([...pedido, item]); // Agregar el item al arreglo pedido
        agregarAlPedido(item);
    };

    useEffect(() => {
        imprimirVariables();
    }, [pedido]);

    return (
        <div style={{ textAlign: "left" }}>
            <div className="botones-container-caja">
                {datosDiaActual.map(item => (
                    <button key={item.id} onClick={() => handleClick(item)} className="boton" style={{ paddingTop: '3px' }}>
                        {item.nombre}<br></br>{item.stockD}
                    </button>
                ))}

                {datosPapas.map(item => (
                    <button key={item.id} onClick={() => handleClick(item)} className="boton" style={{ backgroundColor: "orange",paddingTop: '3px' }}>
                        {item.nombre}<br></br>{item.stockD}
                    </button>
                ))}

                {datosEnsalada.map(item => (
                    <button key={item.id} onClick={() => handleClick(item)} className="boton" style={{ backgroundColor: "lightgreen",paddingTop: '3px' }}>
                        {item.nombre}<br></br>{item.stockG}
                    </button>
                ))}

            </div>
        </div>
    );
}

export default Botones;






