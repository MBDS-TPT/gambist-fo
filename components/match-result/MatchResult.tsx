import React from 'react';
import styled from 'styled-components';
import { Match } from '../../model/Model';
import StatDivider from './StatDivider';

export interface MatchResultProps {
    className?: string;
    match: Match;
}

const MatchResult:React.FC<MatchResultProps> = ({
    className='',
    match
}) => {

    return (
        <Wrapper className={["match-result", className].join(' ')}>
            <StatDivider title="Score" teamA={match.scoreA} teamB={match.scoreB} />
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