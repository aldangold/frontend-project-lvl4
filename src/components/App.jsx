import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';


import Login from './Login';
import NotFound from './NotFound';
import useAuth from '../hooks/index.jsx';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
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

          <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/404">NotFound</Nav.Link>
        </Nav>

          <Routes>
          <Route exact path="/" element={
            <RequireAuth>
              <Home />
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

  function Home() {
    return <h1>HOME</h1>;
  }
  
  function MissRoute() {
    return < Navigate to={{pathname: '/404'}} />
   }
};