import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import App from './App.jsx';
import store from './slices/index.js';
import { AuthProvider } from './contexts/authContext.jsx';
import SocketContext from './contexts/socketContext.jsx';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import 'react-toastify/scss/main.scss';
import ru from './locales/ru.js'
import 'regenerator-runtime';

if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

export default async (socket) => {
  await i18n
    .init({
      lng: 'ru',
      debug: false,
      resources: {
        ru,
      },
    });

    socket.on('newMessage', (message) => {
        store.dispatch(messagesActions.addMessages(message));
      });

    socket.on('newChannel', (channel) => {
        store.dispatch(channelsActions.addChannel(channel));
      });
    
    socket.on('removeChannel', (channel) => {
        store.dispatch(channelsActions.removeChannel(channel));
      });

    socket.on('renameChannel', (channel) => {
        store.dispatch(channelsActions.renameChannel(channel));
      });

    return (
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <SocketContext.Provider value={socket}>
                <App />
              </SocketContext.Provider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
    );
  };
