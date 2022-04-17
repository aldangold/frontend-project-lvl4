import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import {
  Navbar,
  Container,
  Button,
  Col,
} from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Chat from './components/Chat';
import { useAuth } from './hooks';

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userId ? children : <Navigate to="/login" state={{ from: location }} />
  );
}

function AuthButton() {
  const { t } = useTranslation();
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.userId
      ? <Button onClick={auth.logOut}>{t('logOutBtn')}</Button>
      : location.pathname === '/signup' && <Button as={Link} to="/login">{t('logInBtn')}</Button>
  );
}

export default function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Col className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('logo')}
            </Navbar.Brand>
            <AuthButton />
          </Container>
        </Navbar>

        <Routes>
          <Route
            exact
            path="/"
            element={(
              <RequireAuth>
                <Chat />
              </RequireAuth>
          )}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Col>
      <ToastContainer />
    </Router>
  );
}
