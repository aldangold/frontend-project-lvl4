import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () => {
  const { t } = useTranslation();

  return (
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col xs={12} md={8} xxl={6}>
            <Row className="justify-content-center">
              <Col md={2} className='d-flex row align-items-center'>
                <div className='display-4 text-uppercase'>{t('notFoundPage.code')}</div>
              </Col>
              <Col md={6} className='d-flex row align-items-center'>
                <div>{t('notFoundPage.title')}<br>
                    </br>
                  {t('notFoundPage.subTitle')}
                </div>
              </Col>
            </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
