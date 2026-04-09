import React from 'react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <svg className="search-bar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="10.5" y1="10.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        className="search-bar__input"
        type="text"
        placeholder="Cari catatan..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button className="search-bar__clear" onClick={() => onChange('')} aria-label="Hapus pencarian">
          ✕
        </button>
      )}
    </div>
  );
}