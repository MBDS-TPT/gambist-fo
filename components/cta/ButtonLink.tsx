import React from 'react';
import styled from 'styled-components';

export interface ButtonLinkProps {
    className?: string;
    onClick?: any;
    link?: string;
    borderColor?: string;
    bgColor?: string;
    textColor?: string;
    borderColorHover?: string;
    bgColorHover?: string;
    textColorHover?: string;
}

const ButtonLink:React.FC<ButtonLinkProps> = ({
    children,
    className='',
    onClick,
    link,
    borderColor='var(--white)',
    bgColor='transparent',
    textColor='var(--white)',
    borderColorHover='transparent',
    bgColorHover='var(--green)',
    textColorHover='var(--white)'
}) => {


    return (
        <Wrapper 
            borderColor={borderColor} 
            borderColorHover={borderColorHover}
            bgColor={bgColor} 
            bgColorHover={bgColorHover}
            color={textColor}
            colorHover={textColorHover}
            className={["button-link btn", className].join(' ')} onClick={onClick} href={link}>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.a<{ color: string, bgColor: string, borderColor: string, colorHover: string, bgColorHover: string, borderColorHover: string }>`
    &.button-link {
        border-radius: 4px;
        border: 3px solid ${props => props.borderColor};
        line-height: 30px;
        background-color: ${props => props.bgColor};
        color: ${props => props.color};
    }

    &.button-link:hover {
        color: ${props => props.colorHover};
        background-color: ${props => props.bgColorHover};
        border-color: ${props => props.borderColorHover};
    }
`;

export default ButtonLink;