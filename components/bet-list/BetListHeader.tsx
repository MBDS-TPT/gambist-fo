import React from 'react';
import styled from 'styled-components';
import { Bet } from '../../model/Model';

export interface BetListHeaderProps {
    className?: string;
}

const BetListHeader:React.FC<BetListHeaderProps> = ({
    className
}) => {


    return (
        <Wrapper className={["bet-list-header", className].join(' ')} >
            <div className="teams-info">
                Teams
            </div>
            <div className="header-columns">
                <div className="column align-left">
                    Team
                </div>
                <div className="column">
                    Odds
                </div>
                <div className="column">
                    Bet value
                </div>
                <div className="column">
                    Bet winning
                </div>
                <div className="column align-center">
                    Bet date
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.bet-list-header {
        display: flex;
        flex-direction: row;
        background-color: var(--white);
        border-bottom: 1px solid var(--light-gray);
    }
    .teams-info {
        width: 35%;
        text-transform: uppercase;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;
    }
    .header-columns {
        width: 65%;
        display: flex;
        flex-direction: row;
    }
    .column {
        width: 20%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding: 4px;
        /*background-color: var(--light-gray);*/
        margin: 10px;
        font-weight: 700;
    }
    .align-left {
        align-items: flex-start;
    }
    .align-center {
        align-items: center;
    }
    .bet-value,
    .bet-winnings {
        padding-right: 10px;
        padding-top: 25px;
        span {
            width: 100%;
            text-align: right;
            font-weight: 700;
        }
    }
    .match-odds {
        font-weight: 700; 
    }
`;

export default BetListHeader;