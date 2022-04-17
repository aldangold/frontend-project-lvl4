import React from 'react';
import { toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalsSlice } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks';

const Remove = () => {

  const { t } = useTranslation();
  const { modals } = useSelector((state) => state.modalsReducer);
  const dispatch = useDispatch();
  const socket = useSocket();

  const notify = () => toast.success(t('success.removedChannel'));

  const handleClose = () => dispatch(modalsSlice.setHiddenModal());
  const handleRemove = () => {
    socket.emit('removeChannel', modals.item, (response) => {
      if (response.status === 'ok') {
        handleClose();
        notify();
      }
    });
  };

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
        {t('modal.removeChannelTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
        {t('modal.removeChannelBody')}
        </p>
        <div className="d-flex justify-content-end">
          <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
          {t('modal.cancelBtn')}
          </button>
          <button onClick={handleRemove} type="button" className="btn btn-danger">
          {t('modal.removeBtn')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
