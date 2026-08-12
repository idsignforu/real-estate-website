import React, { createContext, useContext, useState } from 'react';

const PopupContext = createContext(undefined);

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [presetData, setPresetData] = useState({});

  const openPopup = (data = {}) => {
    setPresetData(data);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    // Record in sessionStorage that user dismissed popup in this session
    try {
      sessionStorage.setItem('hasSeenEnquiryPopup', 'true');
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  };

  return (
    <PopupContext.Provider value={{ isOpen, openPopup, closePopup, presetData }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};
