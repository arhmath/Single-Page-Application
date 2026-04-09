import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { getAccessToken, putAccessToken, getUserLogged } from './utils/api';
import { showFormattedDate } from './utils/index';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import NoteDetailPage from './pages/NoteDetailPage';
import NewNotePage from './pages/NewNotePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LoadingSpinner from './components/LoadingSpinner';

function getHashPath() {
  return window.location.hash.replace('#', '') || '/';
}

function AppContent() {
  const [path, setPath]               = useState(getHashPath());
  const [user, setUser]               = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  /* ── Routing ──────────────────────────────────────────────────────── */
  useEffect(() => {
    const onHashChange = () => {
      setPath(getHashPath());
      setSearchQuery('');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (to) => { window.location.hash = to; };

  /* ── Auth bootstrap: cek token di localStorage saat app dibuka ────── */
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setAuthLoading(false);
      return;
    }
    getUserLogged().then(({ error, data }) => {
      if (!error) setUser(data);
      // jika error: token tidak valid, user tetap null
    }).finally(() => setAuthLoading(false));
  }, []);

  /* ── Dipanggil LoginPage setelah dapat accessToken dari API ───────── */
  const handleLoginSuccess = async (accessToken) => {
    putAccessToken(accessToken);
    const { error, data } = await getUserLogged();
    if (!error) {
      setUser(data);
      navigate('/');
    }
  };

  const handleLogout = () => {
    putAccessToken('');
    setUser(null);
    navigate('/login');
  };

  /* ── Routing logic ────────────────────────────────────────────────── */
  const matchDetail = path.match(/^\/notes\/(.+)$/);
  const noteId      = matchDetail ? matchDetail[1] : null;

  let activePage = '404';
  if (path === '/' || path === '')  activePage = 'home';
  else if (path === '/archive')     activePage = 'archive';
  else if (path === '/notes/new')   activePage = 'new';
  else if (noteId)                  activePage = 'detail';
  else if (path === '/login')       activePage = 'login';
  else if (path === '/register')    activePage = 'register';

  const isAuthPage  = activePage === 'login' || activePage === 'register';
  const isProtected = !isAuthPage && activePage !== '404';

  /* ── Spinner saat cek token awal ─────────────────────────────────── */
  if (authLoading) {
    return (
      <div className="app">
        <LoadingSpinner fullPage />
      </div>
    );
  }

  /* ── Guard: belum login & akses halaman terproteksi → ke /login ───── */
  if (!user && isProtected) {
    navigate('/login');
    return (
      <div className="app">
        <Navbar activePage="login" navigate={navigate} user={null} onLogout={handleLogout} />
        <main className="main-content">
          <LoginPage onLoginSuccess={handleLoginSuccess} navigate={navigate} />
        </main>
      </div>
    );
  }

  /* ── Guard: sudah login & buka /login atau /register → ke / ──────── */
  if (user && isAuthPage) {
    navigate('/');
    return null;
  }

  return (
    <div className="app">
      <Navbar
        activePage={activePage}
        navigate={navigate}
        user={user}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {activePage === 'login'    && <LoginPage    onLoginSuccess={handleLoginSuccess} navigate={navigate} />}
        {activePage === 'register' && <RegisterPage navigate={navigate} />}

        {activePage === 'home' && (
          <HomePage
            navigate={navigate}
            showFormattedDate={showFormattedDate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {activePage === 'archive' && (
          <ArchivePage
            navigate={navigate}
            showFormattedDate={showFormattedDate}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {activePage === 'new'    && <NewNotePage navigate={navigate} />}

        {activePage === 'detail' && (
          <NoteDetailPage
            noteId={noteId}
            navigate={navigate}
            showFormattedDate={showFormattedDate}
          />
        )}

        {activePage === '404' && <NotFoundPage navigate={navigate} />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}