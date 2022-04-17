import React, { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { Modal, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSocket } from '../../hooks';
import { actions as modalsSlice } from '../../slices/modalsSlice.js';

const Rename = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const handleClose = () => dispatch(modalsSlice.setHiddenModal());

  const { modals: { item } } = useSelector((state) => state.modalsReducer);

  const listChannels = useSelector((state) => state.channelsReducer.channels
    .map(({ name }) => name));

  const notify = () => toast.success(t('success.renamedChannel'));

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required(t('yup.required')).notOneOf(listChannels, t('yup.notOneOf')),
    }),
    onSubmit: (values) => {
      const data = {
        name: values.name,
        id: item.id,
      };

      socket.emit('renameChannel', data, (response) => {
        if (response.status === 'ok') {
            handleClose();
            notify();
        }
      });
    },
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
        {t('modal.renameChannelTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Form.Group className="form-group" controlId="name">
            <Form.Label visuallyHidden>{t('modal.nameChannel')}</Form.Label>
            <Form.Control
              ref={inputRef}
              isInvalid={formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder={t('modal.nameChannel')}
              className="mb-2"
              name="name"
              type="text"
            />
            {formik.errors.name && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
              {t('modal.cancelBtn')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('modal.button')}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
