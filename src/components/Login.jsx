
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../hooks';
import routes from '../routes.js';

const Login = () => {

  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const notify = () => toast.error(t('errors.network'));


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
        auth.logIn(res.data);
        navigate('/');
      } catch (err) {
        if (err.message === 'Network Error') {
          notify();
        }
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
                <h1 className="text-center mb-4">{t('loginPage.title')}</h1>
                <Form.FloatingLabel className="mb-3" controlId="username" label={t('loginPage.form.username')}>
                    <Form.Control className='form-control'
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder={t('loginPage.form.username')}
                      name="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      ref={inputRef}
                      required
                    />
                  </Form.FloatingLabel>
                  <Form.FloatingLabel className="mb-4" controlId="password" label={t('loginPage.form.password')}>
                    <Form.Control className='form-control'
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder={t('loginPage.form.password')}
                      name="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Control.Feedback type="invalid" tooltip>{t('errors.authFailed')}</Form.Control.Feedback>
                  </Form.FloatingLabel>
                  <Button className='w-100 mb-3 btn btn-outline-primary' type="submit" variant="outline-primary">{t('loginPage.form.button')}</Button>
                </Form>
            </Card.Body>
            <Card.Footer className='p-4'>
              <Container  className='text-center'>
                <span>{t('loginPage.noAccount')}</span>
                <Link to="/signup">{t('loginPage.registration')}</Link>
              </Container> 
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );

};

export default Login;
