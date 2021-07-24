import React from 'react';
import styled from 'styled-components';
import StatDivider from './StatDivider';

export interface MatchResultProps {
    className?: string;
}

const MatchResult:React.FC<MatchResultProps> = ({
    className=''
}) => {

    return (
        <Wrapper className={["match-result", className].join(' ')}>
            <StatDivider title="Score" teamA={0} teamB={2} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.match-result {
        min-height: 150px;
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: center;
    }
`;

export default MatchResult;