'use client';

import {createContext, useContext, useState} from 'react';

const FilesContext = createContext();

export const FilesProvider = ({children}) => {
    const [files, setFiles] = useState([]);

    return <FilesContext.Provider value={{files, setFiles}}>{children}</FilesContext.Provider>;
};

export const useFiles = () => {
    const context = useContext(FilesContext);
    if (!context) {
        throw new Error('useFiles must be used within a FilesProvider');
    }
    return context;
};
