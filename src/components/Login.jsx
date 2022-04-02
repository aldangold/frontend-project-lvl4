
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = (props) => {

  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = props;
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        auth.logIn();
        const { from } = location.state || state || { from: { pathname: '/' } };
        navigate(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className='container-fluid h-100'>
      <div className='row justify-content-center align-content-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
          <div className='card shadow-sm'>
            <div className='card-body row p-5'>
              <div className='col-12 col-md-6 d-flex align-items-center justify-content-center'>
              <img className='col-md-12 row' src={'https://cdn.dribbble.com/users/709969/screenshots/2663337/rocket_loader.gif'}></img>
              </div>
                <Form onSubmit={formik.handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
                <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className='form-floating mb-3'>
                    <Form.Control className='form-control'
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="username"
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                  </Form.Group>
                  <Form.Group className='form-floating mb-4'>
                    <Form.Control className='form-control'
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="password"
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Control.Feedback type="invalid">the username or password is incorrect</Form.Control.Feedback>
                  </Form.Group>
                  <Button className='w-100 mb-3 btn btn-outline-primary' type="submit" variant="outline-primary">Submit</Button>
                </Form>
            </div>
            <div className='card-footer p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span>
                  <a href='/'>И не будет</a>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default LoginPage;
