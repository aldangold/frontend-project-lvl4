import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { Navbar, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Login from './Login';
import NotFound from './NotFound';
import { useAuth } from '../hooks'
import Chat from './Chat';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userId ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

export default function App() {

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
            <Navbar.Brand as={Link} to="/">
              Frontend Chat
            </Navbar.Brand>
            </Container>
        </Navbar>

          <Routes>
          <Route exact path="/" element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
           />
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<MissRoute/>}>
          </Route>
          </Routes>

      </div>
      <ToastContainer />
    </Router>
  );

 
  function MissRoute() {
    return < Navigate to={{pathname: '/404'}} />
   }
};
