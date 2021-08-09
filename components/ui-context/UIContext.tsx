import React from 'react';

export interface UIContextProps {
    baseUrl?: string;
    currency?: string;
    userInfo?: any;
    userLogged?: boolean;
    maximumBet?: number;
    minimumBet?: number;
}

export interface UIContextInterface {
    baseUrl?: string;
    currency?: string;
    userInfo?: any;
    userLogged?: boolean;
    maximumBet?: number;
    minimumBet?: number;
}

const UIContext = React.createContext<UIContextInterface | undefined>(undefined);

export const UIProvider: React.FC<UIContextProps> = ({
    baseUrl='',
    currency='',
    children='',
    userInfo,
    userLogged=false,
    maximumBet=999999999,
    minimumBet=0
}) => {

    const props: UIContextInterface = {
        baseUrl,
        currency,
        maximumBet,
        minimumBet,
        userInfo,
        userLogged
    }

    return <UIContext.Provider value={{...props}}>
        {children}
    </UIContext.Provider>
}

export default UIContext;