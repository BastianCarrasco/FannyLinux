import React, { useState } from 'react';
import Modal from 'react-modal';

function AgrandarMenu() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Abrir Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Ejemplo de Modal"
      >
        <h2>Modal de Agrandar Menú</h2>
        <p>Contenido del modal para agrandar el menú...</p>
        <button onClick={closeModal}>Cerrar Modal</button>
      </Modal>
    </div>
  );
}

export default AgrandarMenu;
