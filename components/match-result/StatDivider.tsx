import React, { Component } from 'react';
import styled from 'styled-components';

export interface StatDividerProps {
    className?: string;
    title?: string;
    teamA?: any;
    teamB?: any;
}

const StatDivider:React.FC<StatDividerProps> = ({
    className='',
    title,
    teamA,
    teamB
}) => {


    return (
        <Wrapper className={["stat-divider", className].join(' ')}>
            <div className="stat-title">{ title }</div>
            <div className="divider">
                <div className="teamA">{ teamA }</div>
                <div className="team-divider"></div>
                <div className="teamB">{ teamB }</div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.stat-divider {
        min-height: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        @media (min-width: 932px) {
            min-width: 735px;
        } 
    }
    .stat-title {
        font-size: 25px;
        color: var(--green);
        margin-bottom: 5px;
    }
    .divider {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .team-divider {
        border: 1px solid var(--border-gray);
        margin: 0 10px;
    }
    .teamA,
    .teamB {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 50px;
        color: var(--gray)
    }
`;

export default StatDivider;