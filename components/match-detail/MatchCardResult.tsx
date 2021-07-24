import React from 'react';
import styled from 'styled-components';
import { Match } from '../../model/Model';
import ScoreDivider from './ScoreDivider';
import TeamCard from './TeamCard';

export interface MatchCardResultProps {
    className?: string;
    match?: Match;
}

const MatchCardResult:React.FC<MatchCardResultProps> = ({
    className='',
    match,
}) => {

    return (
        <Wrapper className={["match-card-result", className].join(' ')} >
            <div className="match-card-header">
                <h5>{match?.category?.label}</h5>
            </div>
            <div className="teams">
                <TeamCard size="small" imageLink={match?.teamA?.logo} teamName={match?.teamA?.name} />
                <ScoreDivider className="match-score" scoreA={match?.scoreA} scoreB={match?.scoreB} />
                <TeamCard size="small" className="team" imageLink={match?.teamB?.logo} teamName={match?.teamB?.name} />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.match-card-result {
        display: flex;
        flex-direction: column;
        background-color: var(--white);
        border: 1px solid var(--border-gray);
        border-bottom: 4px solid var(--green);
        width: 300px;
        min-height: 200px;
        margin: auto;
    }
    &.match-card-result { 
        .teams.team {
            max-width: 100px;
            height: auto;
        }
    }
    .match-card-header {
        background-color: var(--dark-gray);
        height: 30px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding: 10px 0 6px 6px;
        h5 {
            color: var(--white);
            font-size: 16px;
        }
    }
    .match-time,
    .match-title {
        text-align: center;
        font-weight: 600;
    }
    .match-time {
        color: var(--gray);
    }
    .match-title {
        font-size: 34px;
        text-transform: uppercase;
        margin-bottom: 15px;
    }
    .match-score {
        margin-bottom: 20px;
    }
    .teams {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        margin-bottom: 20px;
    }
    
`;

export default MatchCardResult;