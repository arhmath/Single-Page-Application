import React, { useState } from 'react';
import { login } from '../utils/api';
import { useLanguage } from '../contexts/LanguageContext';

export default function LoginPage({ onLoginSuccess, navigate }) {
  const { t } = useLanguage();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setError('');
    setLoading(true);

    // api.js login mengembalikan { error, data } — data berisi { accessToken }
    const { error: isError, data } = await login({ email, password });

    setLoading(false);

    if (isError) {
      // pesan error sudah ditampilkan via alert() di api.js,
      // tapi kita juga tampilkan di UI agar lebih baik
      setError(t('loginFailed'));
      return;
    }

    // lempar accessToken ke App agar disimpan & user di-fetch
    onLoginSuccess(data.accessToken);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-card__header">
          <span className="auth-card__logo">✦</span>
          <h1 className="auth-card__title">{t('loginTitle')}</h1>
          <p className="auth-card__sub">{t('loginSub')}</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-field__label" htmlFor="login-email">
              {t('labelEmail')}
            </label>
            <input
              id="login-email"
              className="form-field__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
              autoFocus
              required
            />
          </div>

          <div className="form-field">
            <label className="form-field__label" htmlFor="login-password">
              {t('labelPassword')}
            </label>
            <input
              id="login-password"
              className="form-field__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {t('btnLogin')}
          </button>
        </form>

        <p className="auth-card__footer">
          {t('noAccount')}{' '}
          <button className="auth-link" onClick={() => navigate('/register')}>
            {t('btnRegister')}
          </button>
        </p>
      </div>
    </div>
  );
}