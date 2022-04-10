import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { actions as modalsSlice } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks';

const Remove = () => {
  const { modals } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleClose = () => dispatch(modalsSlice.setHiddenModal());
  const handleRemove = () => {
    socket.emit('removeChannel', modals.item, (response) => {
      if (response.status === 'ok') {
        handleClose();
      }
    });
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
          {'removeChannelTitle'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {'are you serious?'}
        </p>
        <div className="d-flex justify-content-end">
          <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
            {'cancel'}
          </button>
          <button onClick={handleRemove} type="button" className="btn btn-danger">
            {'remove'}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;