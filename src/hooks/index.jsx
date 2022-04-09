import { useContext } from 'react';

import { AuthContext } from '../contexts/authContext.jsx';
import socketContext from '../contexts/socketContext.jsx';

const useSocket = () => useContext(socketContext);

const useAuth = () => useContext(AuthContext);

export { useAuth, useSocket };
