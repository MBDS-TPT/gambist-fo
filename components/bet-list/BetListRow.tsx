import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Bet } from '../../model/Model';

export interface BetListRowProps {
    className?: string;
    bet: Bet;
}

const BetListRow:React.FC<BetListRowProps> = ({
    className,
    bet
}) => {

    const [betWon, setBetWon] = useState<boolean>(false);

    const wonTheBet = () => {
        if(!bet.team) {
            return bet.match?.scoreA == bet.match?.scoreB
        } else if(bet.team?.id == bet.match?.teamA?.id) {
            return bet.match?.scoreA && bet.match.scoreB && bet.match?.scoreA > bet.match?.scoreB;
        }
        return bet.match?.scoreA && bet.match.scoreB && bet.match?.scoreA < bet.match?.scoreB; 
    }

    useEffect(() => {
        setBetWon(wonTheBet());
    }, []);

    return (
        <Wrapper className={["bet-list-row", className].join(' ')} >
            <div className="teams-info">
                <div className="teams-name">
                    <div className="team-A">{bet?.match?.teamA?.name}</div>
                    <div className="team-B">{bet?.match?.teamB?.name}</div>
                </div>
                <div className="teams-score">
                    <div className="score">{bet?.match?.scoreA}</div>
                    <div className="score">{bet?.match?.scoreB}</div>
                </div>
            </div>
            <div className="bet-choice">
                <div className="selected-team">
                    <span>{bet?.team ? bet?.team?.name : 'Draw'}</span>
                </div>
                <div className="match-odds">
                    <span>{bet?.odds?.toFixed(2)}</span>
                </div>
                <div className={`bet-value`}>
                    <span>{bet.betValue} $</span>
                </div>
                <div className={`bet-winnings ${betWon ? 'bet-won' : 'lost-bet'}`}>
                    {betWon ? (
                        <span>{((bet.betValue * bet.odds)-bet.betValue).toFixed(2)} $</span>
                    ) : (
                        <span>{(-(bet.betValue).toFixed(2))} $</span>
                    )}
                </div>
                <div className="bet-date">
                    <span>{bet.betDate}</span>
                </div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.bet-list-row {
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
    .teams-score {
        border-right: 1px solid var(--light-gray);
        padding-right: 10px;
        color: var(--green);
    }
    .bet-choice {
        width: 65%;
        display: flex;
        flex-direction: row;
    }
    .selected-team,
    .bet-value,
    .match-odds,
    .bet-date,
    .bet-winnings {
        width: 20%;
        display: flex;
        align-items: center;
        padding: 4px;
        border-right: 1px solid var(--light-gray);
        margin: 10px;
    }
    .bet-date {
        text-align: center;
        border-right: 0;
    }
    .bet-won {
        color: var(--green);
    }
    .lost-bet {
        color: var(--red);
    }
    .bet-value,
    .match-odds,
    .bet-winnings {
        padding-right: 10px;
        span {
            width: 100%;
            text-align: right;
            font-weight: 700;
        }
    }
    .label {
        font-weight: 600;
        font-size: 14px;
    }
`;

export default BetListRow;