import React from 'react';
import styled from 'styled-components';
import { Loader } from '../svg-icons/Icons';

export interface ButtonProps {
    className?: string;
    onClick?: any;
    value: string;
    success?: Boolean;
    showLoader?: boolean;
    disabled?: boolean;
}

const Button:React.FC<ButtonProps> = ({
    className='',
    onClick,
    value,
    showLoader=false,
    disabled
}) => {


    return (
        <Wrapper disabled={disabled || showLoader} className={["btn", className].join(' ')} type='button' onClick={onClick}>
            {showLoader && <Loader color={'var(--white)'} margin='0 10px 0 0' />}
            <span>{ value }</span>
        </Wrapper>
    );
}

const Wrapper = styled.button`
    &.btn {
        background-color: var(--green);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        svg {
            margin: 0;
        }
        color: white;
    }

    &.btn:hover {
        background-color: var(--yellow);
        color: var(--dark);
    }
`;

export default Button;