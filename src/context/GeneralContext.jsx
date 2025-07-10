'use client';

import { createContext, useContext, useState } from 'react';

const GeneralContext = createContext();

export function GeneralContextProvider({ children }) {
  // Header Handlers
  const [activeTab, setActiveTab] = useState();

  // 🕹️ Functions
  //   const toggleSidebar = () => {
  //     setIsSidebarOpen((prev) => !prev);
  //   };

  //   const openModal = (content) => {
  //     setIsModalOpen(true);
  //     setModalContent(content);
  //   };

  //   const closeModal = () => {
  //     setIsModalOpen(false);
  //     setModalContent(null);
  //   };

  return (
    <GeneralContext.Provider
      value={{
        // Header
        activeTab,
        setActiveTab,

        // Sidebar & Modal
        // isSidebarOpen,
        // setIsSidebarOpen,
        // toggleSidebar,
        // isModalOpen,
        // setIsModalOpen,
        // modalContent,
        // setModalContent,
        // openModal,
        // closeModal,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export const useGeneralContext = () => useContext(GeneralContext);
