import React from 'react';

export interface RestrictedActionProps {
    action: any;
}

const RestrictedAction:React.FC<RestrictedActionProps> = ({
    children,
    action
}) => {

    const hasAuthorization = () => {
        if(action) action();
        return;
    }

    return (
        <a onClick={hasAuthorization} href="#">
            {children}
        </a>
    );
}
