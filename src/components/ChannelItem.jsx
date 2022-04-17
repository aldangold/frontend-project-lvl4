import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';

import { actions as modalsSlice } from '../slices/modalsSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';


const ChannelItem = ({ id, name, removable }) => {

  const { t } = useTranslation();
  const { currentChannel } = useSelector((state) => state.channelsReducer);
  const dispatch = useDispatch();
  const btnClasses = cn({
    'w-100 rounded-0 text-start text-truncate btn': true,
    'btn-secondary': id === currentChannel,
  });

  const handleRename = () => {
    dispatch(modalsSlice.setShowModal({ type: 'renameChannel', item: { id, name } }));
  };

  const handleRemove = () => {
    dispatch(modalsSlice.setShowModal({ type: 'removeChannel', item: { id, name } }));
  };

  if (!removable) {
    return (
      <Nav.Item as="li" className="w-100">
        <button onClick={() => dispatch(channelsActions.setCurrentChannel(id))} type="button" className={btnClasses}>
          <span className="me-1">#</span>
          {name}
        </button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item as="li" className="w-100">
      <Dropdown className="d-flex" as={ButtonGroup}>
        <button onClick={() => dispatch(channelsActions.setCurrentChannel(id))} type="button" className={btnClasses}>
          <span className="me-1">#</span>
          {name}
        </button>

        <Dropdown.Toggle split variant={id === currentChannel ? 'secondary' : ''}>
          <span className="visually-hidden">{t('channels.dropdownName')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRename}>
          {t('channels.dropdownRename')}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleRemove}>
          {t('channels.dropdownRemove')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default ChannelItem;
