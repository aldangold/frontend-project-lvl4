import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSocket } from '../../hooks';
import { actions as modalsSlice } from '../../slices/modalsSlice.js';
import { actions as channelsActions } from '../../slices/channelsSlice.js';

const Add = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socket = useSocket();
  const handleClose = () => dispatch(modalsSlice.setHiddenModal());
  const JumpToChannel = (channelId) => dispatch(channelsActions.setCurrentChannel(channelId))

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
      name: yup.string().required(t('yup.required')).notOneOf(listChannels, t('yup.notOneOf')),
    }),
    onSubmit: (nameChannel) => {
      socket.emit('newChannel', nameChannel, (response) => {
        if (response.status === 'ok') {
          JumpToChannel(response.data.id);
          handleClose();
        }
      });
    },
  });

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>
        {t('modal.newChannelTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} autoComplete="off">
          <Form.Group className="form-group" id="nameChannel">
            <Form.Label visuallyHidden>{t('modal.nameChannel')}</Form.Label>
            <Form.Control
              ref={inputRef}
              isInvalid={formik.errors.name}
              onChange={formik.handleChange}
              value={formik.values.name}
              placeholder={t('modal.nameChannel')}
              id="nameChannel"
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

export default Add;