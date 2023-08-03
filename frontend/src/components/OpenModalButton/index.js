import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from 'react-modal';

function OpenModalButton({ buttonText, modalComponent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleModalOpen}>{buttonText}</button>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        contentLabel={`${buttonText} Modal`}
      >
        {modalComponent}
        <button onClick={handleModalClose}>Close</button>
      </Modal>
    </>
  );
}

OpenModalButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  modalComponent: PropTypes.node.isRequired,
};

export default OpenModalButton;
