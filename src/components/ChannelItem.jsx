import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Nav,
  ButtonGroup,
  Dropdown,
} from 'react-bootstrap';
import cn from 'classnames';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as modalsSlice } from '../slices/modalsSlice.js';

const ChannelItem = ({ id, name, removable }) => {
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
          <span className="visually-hidden">{'Name'}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRename}>
            {'Rename'}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleRemove}>
            {'Remove'}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

export default ChannelItem;