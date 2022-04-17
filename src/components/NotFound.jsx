import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {

  const { t } = useTranslation();

    return (
      <div className='container-fluid h-100'>
      <div className='row justify-content-center align-items-center h-100'>
        <div className='col-12 col-md-8 col-xxl-6'>
            <div className='row justify-content-center'>
              <div className='col-md-2 d-flex row align-items-center'>
                <div className='display-4 text-uppercase'>{t('notFoundPage.code')}</div>
              </div>
              <div className='col-12 col-md-6 row align-items-center'>
                <div>{t('notFoundPage.title')}<br>
                </br>
                {t('notFoundPage.subTitle')}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default NotFound;
  