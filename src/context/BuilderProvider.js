'use client';

import {createContext, useContext, useState} from 'react';

const BuilderContext = createContext();

export const BuilderProvider = ({children}) => {
    const [vars, setVars] = useState({});

    return <BuilderContext.Provider value={{vars, setVars}}>{children}</BuilderContext.Provider>;
};

export const useBuilder = () => {
    const context = useContext(BuilderContext);
    if (!context) {
        throw new Error('useBuilder must be used within a BuilderProvider');
    }
    return context;
};
