import React, { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { getActiveNotes, deleteNote, archiveNote } from '../utils/api';
import { useLanguage } from '../contexts/LanguageContext';

export default function HomePage({ navigate, showFormattedDate, searchQuery, onSearchChange }) {
  const { t } = useLanguage();
  const [notes, setNotes]     = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    // api.js getActiveNotes mengembalikan { error, data }
    const { error, data } = await getActiveNotes();
    if (!error) setNotes(data);
    setLoading(false);
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleDelete = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) fetchNotes();
  };

  const handleArchive = async (id) => {
    const { error } = await archiveNote(id);
    if (!error) fetchNotes();
  };

  const filtered = searchQuery
    ? notes.filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-top">
          <h1 className="page__title">{t('homeTitle')}</h1>
          {!loading && <span className="page__count">{filtered.length} {t('notes')}</span>}
        </div>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      {loading ? (
        <LoadingSpinner fullPage />
      ) : (
        <NoteList
          notes={filtered}
          emptyMsg={searchQuery ? `${t('emptySearchNotes')} "${searchQuery}"` : t('emptyNotes')}
          emptySubtext={searchQuery ? t('emptySearchHint') : t('emptyNotesHint')}
          onDelete={handleDelete}
          onArchive={handleArchive}
          onUnarchive={() => {}}
          navigate={navigate}
          showFormattedDate={showFormattedDate}
        />
      )}

      <button className="fab" onClick={() => navigate('/notes/new')} title={t('navNew')}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <line x1="11" y1="4" x2="11" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="4" y1="11" x2="18" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}