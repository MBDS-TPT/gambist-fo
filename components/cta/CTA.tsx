import React from 'react';
import styled from 'styled-components';

export interface CTAProps {
    className?: string;
    onClick: any;
    success?: Boolean;
}

const CTA:React.FC<CTAProps> = ({
    children,
    className='',
    onClick
}) => {


    return (
        <Wrapper className={["cta btn", className].join(' ')} onClick={onClick} href="#">
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