import React, { createContext, useContext, useState, useEffect } from 'react';

export type ViewMode = 'personal' | 'institutional' | 'expert';

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType>({
  viewMode: 'personal',
  setViewMode: () => {},
});

export const useViewMode = () => useContext(ViewModeContext);

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    return (localStorage.getItem('kia_view_mode') as ViewMode) || 'personal';
  });

  const setViewMode = (mode: ViewMode) => {
    localStorage.setItem('kia_view_mode', mode);
    setViewModeState(mode);
  };

  return (
    <ViewModeContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewModeContext.Provider>
  );
};
