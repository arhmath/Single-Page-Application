import React from 'react';

export default function EmptyState({ message, subtext }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="6" width="32" height="36" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="15" y1="16" x2="33" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="22" x2="33" y2="22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="28" x2="25" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="36" cy="36" r="8" fill="var(--color-paper)" stroke="currentColor" strokeWidth="1.5" />
          <line x1="36" y1="32" x2="36" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="36" cy="39" r="1" fill="currentColor" />
        </svg>
      </div>
      <p className="empty-state__message">{message}</p>
      {subtext && <p className="empty-state__subtext">{subtext}</p>}
    </div>
  );
}