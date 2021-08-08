import React from 'react';

export interface UIContextProps {
    baseUrl?: string;
    currency?: string;
    userInfo?: any;
}

export interface UIContextInterface {
    baseUrl?: string;
    currency?: string;
    userInfo?: any;
}

const UIContext = React.createContext<UIContextInterface | undefined>(undefined);

export const UIProvider: React.FC<UIContextProps> = ({
    baseUrl='',
    currency='',
    children='',
    userInfo
}) => {
    return <UIContext.Provider value={{ baseUrl, currency, userInfo }}>
        {children}
    </UIContext.Provider>
}

export default UIContext;