import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import { useLanguage } from '../contexts/LanguageContext';

export default function NoteDetailPage({ noteId, navigate, showFormattedDate }) {
  const { t } = useLanguage();
  const [note, setNote]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setNotFound(false);
      // api.js getNote mengembalikan { error, data }
      const { error, data } = await getNote(noteId);
      if (error || !data) {
        setNotFound(true);
      } else {
        setNote(data);
      }
      setLoading(false);
    };
    fetchNote();
  }, [noteId]);

  const handleDelete = async () => {
    const { error } = await deleteNote(note.id);
    if (!error) navigate('/');
  };

  const handleArchiveToggle = async () => {
    if (note.archived) {
      const { error } = await unarchiveNote(note.id);
      if (!error) navigate('/');
    } else {
      const { error } = await archiveNote(note.id);
      if (!error) navigate('/archive');
    }
  };

  /* ── Loading state ────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="page page--detail">
        <LoadingSpinner fullPage />
      </div>
    );
  }

  /* ── Not found state ──────────────────────────────────────────────── */
  if (notFound || !note) {
    return (
      <div className="page page--center">
        <div className="not-found">
          <p className="not-found__code">404</p>
          <p className="not-found__text">{t('noteNotFound')}</p>
          <p className="not-found__sub">{t('noteNotFoundSub')}</p>
          <button className="btn btn--primary" onClick={() => navigate('/')}>
            {t('btnBackHome')}
          </button>
        </div>
      </div>
    );
  }

  /* ── Detail view ──────────────────────────────────────────────────── */
  return (
    <div className="page page--detail">
      <button className="back-btn" onClick={() => navigate(note.archived ? '/archive' : '/')}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <line x1="14" y1="8" x2="2" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="7,3 2,8 7,13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        {note.archived ? t('backToArchive') : t('backToNotes')}
      </button>

      <article className="detail-card">
        <header className="detail-card__header">
          {note.archived && (
            <span className="badge badge--archived">{t('archivedBadge')}</span>
          )}
          <h1 className="detail-card__title">{note.title}</h1>
          <time className="detail-card__date">{showFormattedDate(note.createdAt)}</time>
        </header>

        <div className="detail-card__divider" />

        <p className="detail-card__body">{note.body}</p>

        <footer className="detail-card__footer">
          <button
            className={`btn ${note.archived ? 'btn--primary' : 'btn--secondary'}`}
            onClick={handleArchiveToggle}
          >
            {note.archived ? t('btnUnarchiveFull') : t('btnArchiveFull')}
          </button>
          <button className="btn btn--danger" onClick={handleDelete}>
            {t('btnDeleteFull')}
          </button>
        </footer>
      </article>
    </div>
  );
}