import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { actions as modalsSlice } from '../../slices/modalsSlice.js';
import { useSocket } from '../../hooks';

const Rename = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  const handleClose = () => dispatch(modalsSlice.setHiddenModal());

  const { modals: { item } } = useSelector((state) => state.modalsReducer);

  const listChannels = useSelector((state) => state.channelsReducer.channels
    .map(({ name }) => name));

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object({
      name: yup.string().required().notOneOf(listChannels, '    notOneOf'),
    }),
    onSubmit: (values) => {
      const data = {
        name: values.name,
        id: item.id,
      };

      socket.emit('renameChannel', data, (response) => {
        if (response.status === 'ok') {
            handleClose();
        }
      });
    },
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
          {'renameChannelTitle'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Form.Group className="form-group" controlId="newChannel">
            <Form.Label visuallyHidden>Имя канала</Form.Label>
            <Form.Control
              ref={inputRef}
              isInvalid={formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
              className="mb-2"
              name="name"
              type="text"
            />
            {formik.errors.name && <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <button onClick={handleClose} type="button" className="me-2 btn btn-secondary">
              {'cancel'}
            </button>
            <button type="submit" className="btn btn-primary">
              {'ok'}
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;