import React from 'react';

export const AppStateContext = React.createContext({
    isConnected: false,
    setIsConnected: () => {},
});
