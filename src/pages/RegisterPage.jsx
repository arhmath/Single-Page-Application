import React, { useState } from 'react';
import { register } from '../utils/api';
import { useLanguage } from '../contexts/LanguageContext';

export default function RegisterPage({ navigate }) {
  const { t } = useLanguage();
  const [name, setName]                     = useState('');
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError]                   = useState('');
  const [loading, setLoading]               = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    setError('');
    setLoading(true);

    // api.js register mengembalikan { error }
    const { error: isError } = await register({ name, email, password });

    setLoading(false);

    if (isError) {
      setError(t('registerFailed'));
      return;
    }

    // Berhasil → arahkan ke halaman login
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-card__logo">✦</span>
          <h1 className="auth-card__title">{t('registerTitle')}</h1>
          <p className="auth-card__sub">{t('registerSub')}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-field__label" htmlFor="reg-name">
              {t('labelName')}
            </label>
            <input
              id="reg-name"
              className="form-field__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              autoFocus
              required
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="reg-email">
              {t('labelEmail')}
            </label>
            <input
              id="reg-email"
              className="form-field__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="reg-password">
              {t('labelPassword')}
            </label>
            <input
              id="reg-password"
              className="form-field__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="reg-confirm">
              {t('labelConfirmPassword')}
            </label>
            <input
              id="reg-confirm"
              className="form-field__input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className={`btn btn--primary btn--full ${loading ? 'btn--loading' : ''}`}
            disabled={loading}
          >
            {loading && <span className="btn__spinner" />}
            {t('btnRegister')}
          </button>
        </form>

        <p className="auth-card__footer">
          {t('hasAccount')}{' '}
          <button className="auth-link" onClick={() => navigate('/login')}>
            {t('btnLogin')}
          </button>
        </p>
      </div>
    </div>
  );
}