import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { obtenerDatosMenu } from '../../funciones backend/consultas'; // Ajusta la ruta según la ubicación de tu archivo de funciones

Modal.setAppElement('#root');

function SelecionMenuSemana() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buttonPressedFrom, setButtonPressedFrom] = useState('');
    const [datosMenu, setDatosMenu] = useState([]);
    const [botonesApretados, setBotonesApretados] = useState({});
    const [diaSeleccionado, setDiaSeleccionado] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await obtenerDatosMenu();
                console.log('Datos del menú:', data);
                // Filtrar los datos para mostrar solo los del tipo 1, 2 y 10
                const filteredData = data.filter(item => [1, 2, 10].includes(item.tipo));
                setDatosMenu(filteredData);
            } catch (error) {
                console.error('Error al obtener datos del menú:', error);
            }
        };

        fetchData();
    }, []); // El array vacío como segundo argumento de useEffect asegura que se ejecute solo una vez al montar el componente

    const openModal = (buttonFrom) => {
        setButtonPressedFrom(buttonFrom);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

  const handleButtonClick = (nombre, id, dia) => {
    const maxItemsPerDay = 7;

    // Verificar si ya se han seleccionado 7 elementos para el día actual
    if (botonesApretados[dia] && botonesApretados[dia].length >= maxItemsPerDay) {
        console.log(`Ya hay ${maxItemsPerDay} elementos seleccionados para el día ${dia}.`);
        return;
    }

    // Verificar si ya hay un día siguiente disponible
    const nextDayIndex = (diasSemana.indexOf(dia) + 1) % 7;
    const nextDay = diasSemana[nextDayIndex];

    // Si el día siguiente está lleno, no permitir agregar más elementos al día actual
    if (botonesApretados[nextDay] && botonesApretados[nextDay].length >= maxItemsPerDay) {
        console.log(`El día siguiente (${nextDay}) también ha alcanzado el límite de ${maxItemsPerDay} elementos.`);
        return;
    }

    // Si no se ha alcanzado el límite de 7 elementos para el día actual, agregar el botón normalmente
    if (botonesApretados[dia] && botonesApretados[dia].find(btn => btn.id === id)) {
        // Si el botón ya está seleccionado, lo eliminamos del arreglo
        setBotonesApretados(prevState => ({
            ...prevState,
            [dia]: prevState[dia].filter(btn => btn.id !== id)
        }));
    } else {
        // Si el botón no está seleccionado, lo agregamos al arreglo con la posición correspondiente
        const newPosition = botonesApretados[dia] ? botonesApretados[dia].length + 1 : 1;
        setBotonesApretados(prevState => ({
            ...prevState,
            [dia]: [...(prevState[dia] || []), { nombre, id, position: newPosition }]
        }));
    }
};

    
    

    // Array de nombres de días de la semana
    const diasSemana = ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];

    return (
        <div>
            <button onClick={() => openModal('Dato que quieres pasar')}>Abrir Modal con Parámetro</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Ejemplo de Modal"
            >
                <h2>{diaSeleccionado}</h2>
               
                {/* Fila de botones con los días de la semana */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    {diasSemana.map(dia => (
                        <button
                            key={dia}
                            style={{ marginRight: '10px' }}
                            onClick={() => setDiaSeleccionado(dia)}
                        >
                            {dia}
                        </button>
                    ))}
                </div>
                {/* Renderizar los botones filtrados según el tipo y el día seleccionado */}
                <ul style={{textAlign:"center"}}> <h3>Proteina</h3>{datosMenu.map(item => {
                    if ([1].includes(item.tipo)) {
                        return (
                            <button
                            key={item.nombre}
                            className={botonesApretados[diaSeleccionado] && botonesApretados[diaSeleccionado].find(btn => btn.id === item.id) ? 'boton-apretado' : 'boton-original'}
                            onClick={() => handleButtonClick(item.nombre, item.id, diaSeleccionado)}
                        >
                            {item.nombre}
                        </button>
                        
                        );
                    } else {
                        return null;
                    }
                })}</ul>
               
               
                <ul style={{textAlign:"center"}}> <h3>Acompañamiento</h3>  {datosMenu.map(item => {
                    if ([2].includes(item.tipo)) {
                        return (
                            <button
                            key={item.nombre}
                            className={botonesApretados[diaSeleccionado] && botonesApretados[diaSeleccionado].find(btn => btn.id === item.id) ? 'boton-apretado' : 'boton-original'}
                            onClick={() => handleButtonClick(item.nombre, item.id, diaSeleccionado)}
                        >
                            {item.nombre}
                        </button>
                        
                        );
                    } else {
                        return null;
                    }
                })}</ul>
             
               
                <ul style={{textAlign:"center"}}><h3>Guiso</h3> {datosMenu.map(item => {
                    if ([10].includes(item.tipo)) {
                        return (
                            <button
                            key={item.nombre}
                            className={botonesApretados[diaSeleccionado] && botonesApretados[diaSeleccionado].find(btn => btn.id === item.id) ? 'boton-apretado' : 'boton-original'}
                            onClick={() => handleButtonClick(item.nombre, item.id, diaSeleccionado)}
                        >
                            {item.nombre}
                        </button>
                        
                        );
                    } else {
                        return null;
                    }
                })}</ul>
               
                <br />

                <button onClick={closeModal}>Cerrar Modal</button>
            </Modal>

            {/* Imprimir la data JSON de los botones apretados */}
            <pre>{JSON.stringify(botonesApretados, null, 2)}</pre>
        </div>
    );
}

export default SelecionMenuSemana;








