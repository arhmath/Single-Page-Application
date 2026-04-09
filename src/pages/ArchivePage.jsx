import React, { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner';
import { getArchivedNotes, deleteNote, unarchiveNote } from '../utils/api';
import { useLanguage } from '../contexts/LanguageContext';

export default function ArchivePage({ navigate, showFormattedDate, searchQuery, onSearchChange }) {
  const { t } = useLanguage();
  const [notes, setNotes]     = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    setLoading(true);
    // api.js getArchivedNotes mengembalikan { error, data }
    const { error, data } = await getArchivedNotes();
    if (!error) setNotes(data);
    setLoading(false);
  };

  useEffect(() => { fetchNotes(); }, []);

  const handleDelete = async (id) => {
    const { error } = await deleteNote(id);
    if (!error) fetchNotes();
  };

  const handleUnarchive = async (id) => {
    const { error } = await unarchiveNote(id);
    if (!error) fetchNotes();
  };

  const filtered = searchQuery
    ? notes.filter((n) => n.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : notes;

  return (
    <div className="page">
      <div className="page__header">
        <div className="page__header-top">
          <h1 className="page__title">{t('archiveTitle')}</h1>
          {!loading && <span className="page__count">{filtered.length} {t('notes')}</span>}
        </div>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>

      {loading ? (
        <LoadingSpinner fullPage />
      ) : (
        <NoteList
          notes={filtered}
          emptyMsg={searchQuery ? `${t('emptySearchArchive')} "${searchQuery}"` : t('emptyArchive')}
          emptySubtext={searchQuery ? t('emptySearchHint') : t('emptyArchiveHint')}
          onDelete={handleDelete}
          onArchive={() => {}}
          onUnarchive={handleUnarchive}
          navigate={navigate}
          showFormattedDate={showFormattedDate}
        />
      )}
    </div>
  );
}