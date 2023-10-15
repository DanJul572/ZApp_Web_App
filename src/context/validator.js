import React, {createContext, useContext, useState} from 'react';

const GlobalStateContext = createContext();

export function GlobalStateProvider({children}) {
    const [globalState, setGlobalState] = useState('Data in Global State');

    return (
        <GlobalStateContext.Provider value={{globalState, setGlobalState}}>
            {children}
        </GlobalStateContext.Provider>
    );
}

export function useGlobalState() {
    return useContext(GlobalStateContext);
}
