import React, { useState } from 'react';
import { addNote } from '../utils/api';
import { useLanguage } from '../contexts/LanguageContext';

const MAX_TITLE_LENGTH = 50;

export default function NewNotePage({ navigate }) {
  const { t } = useLanguage();
  const [title, setTitle]     = useState('');
  const [body, setBody]       = useState('');
  const [loading, setLoading] = useState(false);

  const handleTitleChange = (e) => {
    if (e.target.value.length <= MAX_TITLE_LENGTH) {
      setTitle(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setLoading(true);
    // api.js addNote mengembalikan { error, data }
    const { error } = await addNote({ title: title.trim(), body: body.trim() });
    setLoading(false);

    if (!error) navigate('/');
  };

  const isValid = title.trim().length > 0 && body.trim().length > 0;

  return (
    <div className="page page--form">
      <button className="back-btn" onClick={() => navigate('/')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="14" y1="8" x2="2" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="7,3 2,8 7,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        {t('backToHome')}
      </button>

      <div className="form-card">
        <h2 className="form-card__title">{t('newNoteTitle')}</h2>

        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-field">
            <label className="form-field__label" htmlFor="note-title">
              {t('labelTitle')}
            </label>
            <input
              id="note-title"
              className="form-field__input"
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder={t('titlePlaceholder')}
              autoFocus
            />
            <span className={`form-field__count ${title.length >= MAX_TITLE_LENGTH ? 'form-field__count--limit' : ''}`}>
              {title.length}/{MAX_TITLE_LENGTH}
            </span>
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="note-body">
              {t('labelBody')}
            </label>
            <textarea
              id="note-body"
              className="form-field__textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={t('bodyPlaceholder')}
              rows={8}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={() => navigate('/')}
            >
              {t('btnCancel')}
            </button>
            <button
              type="submit"
              className={`btn btn--primary ${(!isValid || loading) ? 'btn--disabled' : ''}`}
              disabled={!isValid || loading}
            >
              {loading && <span className="btn__spinner" />}
              {t('btnSave')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}