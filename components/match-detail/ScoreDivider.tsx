import React from 'react';
import styled from 'styled-components';

export interface ScoreDividerProps {
    className?: string;
    scoreA: any;
    scoreB: any;
}

const ScoreDivider:React.FC<ScoreDividerProps> = ({
    className='',
    scoreA,
    scoreB
}) => {

    return (
        <Wrapper className={["score-divider", className].join(' ')} >
            <span className="score">{scoreA}</span>
            <span>:</span>
            <span className="score">{scoreB}</span>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.score-divider {
        min-width: 80px;
        padding: 24px 0 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        span:nth-child(2) {
            font-weight: 700;
            font-size: 35px;
            color: var(--border-gray);
            margin-bottom: 8px;
        }
    }
    .score {
        font-size: 25px;
        font-weight: 500;
        margin: 5px;
    }
    
`;

export default ScoreDivider;