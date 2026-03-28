'use client';

import { useState, useEffect } from 'react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (!dismissed) setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem('announcement-dismissed', 'true');
  };

  if (!visible) return null;

  return (
    <div className="announcement-bar">
      <p>🆕 10 free calculators now live — all India-specific and GST-aware 🇮🇳</p>
      <button onClick={handleClose} className="announcement-close" aria-label="Close announcement">✕</button>
    </div>
  );
}
