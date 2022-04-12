import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { Navbar, Container, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Chat from './components/Chat';
import { useAuth } from './hooks';

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userId ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userId
      ? <Button onClick={auth.logOut}>Log out</Button>
      : location.pathname === "/signup" && <Button as={Link} to="/login" >Log in</Button>
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
            <AuthButton/>
            </Container>
        </Navbar>

          <Routes>
          <Route exact path="/" element={
            <RequireAuth>
              <Chat />
            </RequireAuth>
          }
           />
          <Route path="/signup" element={<SignUp />} />
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
