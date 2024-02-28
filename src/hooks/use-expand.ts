'use client';

import { useState } from 'react';

export const useExpand = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function handleExpand(documentId: string) {
    setExpanded(prevExpanded => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  }

  return {
    expanded,
    handleExpand,
  };
};
