import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button, Form, Container, Row, Col, Card, Image,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks';
import routes from '../routes.js';

const SignUp = () => {
  const auth = useAuth();
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const notify = () => toast.error(t('errors.network'));

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validate = yup.object().shape({
    username: yup.string().required(t('yup.required')).min(3, t('yup.username')).max(20, t('yup.username')),
    password: yup.string().required(t('yup.required')).min(6, t('yup.passwordMin')),
    confirmPassword: yup.string().required(t('yup.required')).oneOf([yup.ref('password')], t('yup.confirmPassword')),
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
        if (err.message === 'Network Error') {
          notify();
        }
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
    <Container fluid className='h-100'>
      <Row className='justify-content-center align-content-center h-100'>
        <Col xs={12} md={8} xxl={6}>
          <Card className='shadow-sm'>
            <Card.Body className='row p-5'>
              <Col xs={12} md={6} className='d-flex align-items-center justify-content-center'>
                <Col md={12}>
                  <Image className='img-fluid' src={'https://www.campaignregistry.com/wp-content/uploads/tcr-launch.jpg'}/>
                </Col>
              </Col>
                <Form onSubmit={formik.handleSubmit} className='col-12 col-md-6 mt-3 mt-mb-0'>
                <h1 className="text-center mb-4">{t('signupPage.title')}</h1>
                <Form.FloatingLabel className="mb-3" controlId="username" label={t('signupPage.form.username')}>
                    <Form.Control className='form-control'
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder="username"
                      name="username"
                      autoComplete="username"
                      onBlur={formik.handleBlur}
                      ref={inputRef}
                      isInvalid={
                        (!!formik.errors.username || registrationFailed)
                        && formik.touched.username
                      }
                      required
                    />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.username}
                  </Form.Control.Feedback>
                  </Form.FloatingLabel>

                  <Form.FloatingLabel className="mb-4" controlId="password" label={t('signupPage.form.password')}>
                    <Form.Control className='form-control'
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder="password"
                      name="password"
                      autoComplete="new-password"
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (!!formik.errors.password || registrationFailed)
                        && formik.touched.password
                      }
                      required
                    />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  </Form.FloatingLabel>

                  <Form.FloatingLabel className="mb-4" controlId="confirmPassword" label={t('signupPage.form.confirmPassword')}>
                    <Form.Control className='form-control'
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      placeholder="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      onBlur={formik.handleBlur}
                      isInvalid={
                        (!!formik.errors.confirmPassword || registrationFailed)
                        && formik.touched.confirmPassword
                      }
                      required
                    />
                    { formik.errors.confirmPassword
                      ? <Form.Control.Feedback type="invalid" tooltip> {formik.errors.confirmPassword} </Form.Control.Feedback>
                      : registrationFailed && (<Form.Control.Feedback type="invalid" tooltip >{t('errors.signupFailed')}</Form.Control.Feedback>)
                    }
                  </Form.FloatingLabel>
                  <Button className='w-100 mb-3 btn btn-outline-primary' type="submit" variant="outline-primary">{t('signupPage.form.button')}</Button>
                </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
