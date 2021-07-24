import React from 'react';
import styled from 'styled-components';

export interface SectionTitleProps {
    className?: string;
    title: string;
}

const SectionTitle:React.FC<SectionTitleProps> = ({
    children,
    className='',
    title
}) => {


    return (
        <Wrapper className={["section-title", className].join(' ')}>
            <h5>{ title }</h5>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.section-title {
        margin: 35px 0;
        border-bottom: 1px solid var(--border-gray);
        padding-bottom: 10px;
        h5 {
            padding-left: 15px;
            border-left: 6px solid var(--green);
            line-height: 26px;
            font-size: 18px;
            text-transform: uppercase;
            font-weight: 500;
        }
    }
`;

export default SectionTitle;