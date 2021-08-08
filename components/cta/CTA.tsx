import React from 'react';
import styled from 'styled-components';

export interface CTAProps {
    className?: string;
    onClick?: any;
    success?: Boolean;
    href?: string;
}

const CTA:React.FC<CTAProps> = ({
    children,
    className='',
    onClick=()=>{},
    href
}) => {


    return (
        <Wrapper className={["cta btn", className].join(' ')} onClick={onClick} href={href}>
            {children}
        </Wrapper>
    );
}

const Wrapper = styled.a`
    &.cta {

    }

    &.cta:hover {
        background-color: var(--green);
        color: white;
    }
`;

export default CTA;