import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

import { Navbar, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import Login from './login';

export default function App() {

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
            <Navbar.Brand as={Link} to="/">
              Frontend Chat
            </Navbar.Brand>
            </div>
        </Navbar>
          <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>

          <Switch>
          <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/404">
              <NotFound/>
            </Route>
            <Route path="*">
              <Redirect to="/404"/>
            </Route>
          </Switch>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );

  function Home() {
    return <h2>Home</h2>;
  }

  function NotFound() {
      return <h3>NotFound</h3>
  }

};
