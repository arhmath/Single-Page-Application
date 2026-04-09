import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function NotFoundPage({ navigate }) {
  const { t } = useLanguage();

  return (
    <div className="page page--center">
      <div className="not-found">
        <p className="not-found__eyebrow">{t('notFoundError')}</p>
        <p className="not-found__code">{t('notFoundCode')}</p>
        <p className="not-found__text">{t('notFoundText')}</p>
        <p className="not-found__sub">{t('notFoundSub')}</p>
        <button className="btn btn--primary" onClick={() => navigate('/')}>
          {t('btnBackHome')}
        </button>
      </div>
    </div>
  );
}