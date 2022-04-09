import React from 'react';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './slices/index.js';
import { AuthProvider } from './contexts/authContext.jsx';
import SocketContext from './contexts/socketContext.jsx';
import { actions as messagesActions } from './slices/messagesSlice.js';
import 'regenerator-runtime';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

export default (socket) => {
    socket.on('newMessage', (message) => {
        store.dispatch(messagesActions.addMessages(message));
      });

    return (
        <Provider store={store}>
            <AuthProvider>
              <SocketContext.Provider value={socket}>
                <App />
              </SocketContext.Provider>
            </AuthProvider>
        </Provider>
    );
  };
