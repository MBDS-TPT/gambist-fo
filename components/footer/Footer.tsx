import React from 'react';
import styled from 'styled-components';

export interface FooterProps {
    className?: string;
}

const Footer: React.FC<FooterProps> = ({
    className=''
}) => {
    return (
        <Wrapper className={["footer", className].join(' ')}>
            <div className="container">
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.footer`
    &.footer {
        min-height: 300px;
        width: 100%;
        background-color: #383838;
        color: white;
        display: flex;
        flex-direction: row;
    }
`;

export default Footer;