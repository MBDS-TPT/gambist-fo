import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Bet, Match, Team } from '../../model/Model';
import BetSpinner from '../form/BetSpinner';
import Button from '../form/Button';
import Modal from '../modal/Modal';

export interface BetModalProps {
    match?: Match;
    selectedTeam?: Team;
    betCategory?: string;
    show?: Boolean;
    onClose: Function;
    onSubmit: Function;
    defaultValue?: number;
}

const BetModal: React.FC<BetModalProps> = ({
    match,
    selectedTeam,
    betCategory,
    onClose,
    onSubmit,
    show,
    defaultValue=0
}) => {

    const [betValue, setBetValue] = useState<number>(0);

    const getBetOdds = () => {
        if(!match) return 0;
        if(selectedTeam) {
            if(selectedTeam.id == match?.teamA?.id) {
                return match?.oddsA;
            }
            return match?.oddsB;
        } else {
            return match?.oddsNul;
        } 
    }


    const onChangeBet = (value: number) => {
        setBetValue(value);
    }

    const onSubmitBet = (event: any) => {
        const user = 1
        if(betValue > 0) {
            const bet: Bet = {
                betDate: new Date(),
                betValue: betValue,
                odds: getBetOdds(),
                matchId: match?.id,
                userId: user
            }
            if(selectedTeam)
                bet.teamId = selectedTeam.id;
            if(onSubmit) {
                onSubmit(bet)
                .then((res: any)=> {
                    onClose();
                });
            }
        }
    }

    return (
        <Modal onClose={onClose} show={show} title="Placing a bet">
            <Wrapper className="bet-modal" >
                <div className="bet-modal-details">
                    <span>{ betCategory }</span>
                </div>
                <div className="team-choice">
                    <span>{ selectedTeam ? selectedTeam.name : "Draw" }</span>
                    <span className="bet-odds"> { getBetOdds()?.toFixed(2) }</span>
                </div>
                <div className="team-versus">
                    {match?.teamA?.name} vs {match?.teamB?.name}
                </div>
                <BetSpinner value={defaultValue} onChange={onChangeBet} className="bet-modal-spinner" name="bet-value"/>
                <div className="bet-winnings">
                    <span>WINNINGS</span>
                    <span>{(betValue * getBetOdds()).toFixed(2)}</span>
                </div>
                <Button className="bet-modal-btn" onClick={onSubmitBet} value="Place bet" />
            </Wrapper>
        </Modal>
    );
}

const Wrapper = styled.form`
    &.bet-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px 20px 20px;
    }
    .bet-modal-spinner {
        margin-bottom: 10px;
    }
    .bet-modal-btn {
        width: 100%;
        height: 50px;
        text-transform: uppercase;
        font-weight: 600;
    }
    .team-versus {
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: .05em;
        font-size: 14px;
        margin-bottom: 20px;
    }
    .team-choice {
        margin: 20px 0;
        span {
            text-transform: uppercase;
            color: var(--green);
            font-weight: 500;
            letter-spacing: .05em;
        }
        .bet-odds {
            color: var(--dark);
        }
    }
    .bet-winnings {
        display: flex;
        padding: 0 20px;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        margin: 20px 0;
        font-weight: 500;
        span:last-child {
            color: var(--green);
            font-size: 18px;
        }
    }
`;

export default BetModal;