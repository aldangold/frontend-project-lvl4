import axios from 'axios';
import * as yup from 'yup';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks';
import routes from '../routes.js';

const SignUp = () => {

  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validate = yup.object().shape({
    username: yup.string().required().min(3, 'usernameMin').max(20, 'usernameMax'),
    password: yup.string().required().min(6, 'passwordMin'),
    confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'confirmPassword'),
  });


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(routes.signupPath(), values);
        auth.logIn(res.data);
        setRegistrationFailed(false);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setRegistrationFailed(true);
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
              <img className='col-md-12 row img-fluid' src={'https://www.campaignregistry.com/wp-content/uploads/tcr-launch.jpg'}></img>
              </div>
                <Form onSubmit={formik.handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
                <h1 className="text-center mb-4">Регистрация</h1>
                  <Form.Group className='form-floating mb-3'>
                    <Form.Control className='form-control'
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="username"
                      name="username"
                      id="username"
                      autoComplete="username"
                      onBlur={formik.handleBlur}
                      ref={inputRef}
                      isInvalid={(!!formik.errors.username || registrationFailed) && formik.touched.username}
                      required
                    />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                    
                  </Form.Group>
                  <Form.Group className='form-floating mb-4'>
                    <Form.Control className='form-control'
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="password"
                      name="password"
                      id="password"
                      autoComplete="new-password"
                      onBlur={formik.handleBlur}
                      isInvalid={(!!formik.errors.password || registrationFailed) && formik.touched.password}
                      required
                    />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>

                  </Form.Group>
                  <Form.Group className='form-floating mb-4'>
                    <Form.Control className='form-control'
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      placeholder="confirmPassword"
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="new-password"
                      onBlur={formik.handleBlur}
                      isInvalid={(!!formik.errors.confirmPassword || registrationFailed) && formik.touched.confirmPassword}
                      required
                    />
                    { formik.errors.confirmPassword
                    ? <Form.Control.Feedback type="invalid" tooltip> {formik.errors.confirmPassword} </Form.Control.Feedback>
                    : registrationFailed && (<Form.Control.Feedback type="invalid" tooltip >username exist</Form.Control.Feedback>)
                    }
                 
                  </Form.Group>
                  <Button className='w-100 mb-3 btn btn-outline-primary' type="submit" variant="outline-primary">Submit</Button>
                </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SignUp;
