import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoadingSpinner({ fullPage = false }) {
  const { t } = useLanguage();

  if (fullPage) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner">
          <div className="loading-spinner__ring" />
          <span className="loading-spinner__text">{t('loading')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-inline">
      <div className="loading-spinner__ring loading-spinner__ring--sm" />
    </div>
  );
}