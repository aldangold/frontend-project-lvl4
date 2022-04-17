import ReactDOM from 'react-dom';
import 'regenerator-runtime';
import { io } from 'socket.io-client';
import '../assets/application.scss';
import init from './init.jsx';

const app = async () => {
  const socket = io.connect();
  const vdom = await init(socket);
  const chat = document.getElementById('chat');
  ReactDOM.render(vdom, chat);
};

app();
