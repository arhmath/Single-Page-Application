import React from 'react';
import NoteCard from './NoteCard';
import EmptyState from './EmptyState';

export default function NoteList({ notes, emptyMsg, emptySubtext, onDelete, onArchive, onUnarchive, navigate, showFormattedDate }) {
  if (notes.length === 0) {
    return <EmptyState message={emptyMsg} subtext={emptySubtext} />;
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          navigate={navigate}
          showFormattedDate={showFormattedDate}
        />
      ))}
    </div>
  );
}