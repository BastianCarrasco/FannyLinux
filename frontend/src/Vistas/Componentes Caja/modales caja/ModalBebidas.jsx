import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { obtenerDatosSemana } from '../../../funciones backend/consultas';
import { FaRegFile, FaIceCream, FaBreadSlice, FaMugHot, FaStar } from 'react-icons/fa'; // Importa los íconos desde React Icons

Modal.setAppElement('#root');

function ModalBebidas() {
    const [datosSemana, setDatosSemana] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

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

    const abrirModal = () => {
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
    };

    return (
        <div >
            <button  style={{ backgroundColor: "yellow", paddingTop: '3px' }} className="boton"   onClick={abrirModal}>  <FaMugHot /> <br></br>BEBIDAS</button>
            <Modal isOpen={modalAbierto} onRequestClose={cerrarModal}>
                <div >
                    {datosSemana ? (
                        <div>
                            {/* Filtra los datos para mostrar solo los de tipo 4 */}
                            {datosSemana.filter(item => item.tipo === 5).map(item => (
                                <p key={item.id}>Datos de la semana: {JSON.stringify(item)}</p>
                            ))}
                            {/* Botón para cerrar el modal */}
                            <button onClick={cerrarModal}>Cerrar</button>
                        </div>
                    ) : (
                        <p>Cargando...</p>
                    )}
                </div>
            </Modal>
        </div>
    );
}

export default ModalBebidas;



