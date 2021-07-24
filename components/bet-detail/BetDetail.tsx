import React from 'react';
import styled from 'styled-components';
import { Bet } from '../../model/Model';
import TeamCard from '../match-detail/TeamCard';
import Modal from '../modal/Modal';

export interface BetDetailModalProps {
    className?: string;
    bet?: Bet;
    show?: boolean;
    onClose: Function;
}

const BetDetailModal:React.FC<BetDetailModalProps> = ({
    className='',
    bet,
    show = false,
    onClose
}) => {


    return (
        <Modal title={"Bet details"} width={'medium'} show={show} onClose={onClose}>
            <Wrapper className={["bet-details", className].join(' ')}>
                <div className="team-choice">
                    {bet?.team ? (
                        <TeamCard teamName={bet.team.name} imageLink={bet.team.logo} />
                    ) : <span>Draw</span>}
                </div>
                <div className="team-versus">
                    {bet?.match?.teamA?.name} <br/><b>vs</b><br/> {bet?.match?.teamB?.name}
                </div>
                <div className="bet-detail">
                    <span>ODDS</span>
                    <span>{bet?.odds?.toFixed(2)}</span>
                </div>
                <div className="bet-detail">
                    <span>BET</span>
                    <span>{bet?.betValue} $</span>
                </div>
                <div className="bet-detail">
                    <span>WINNINGS</span>
                    <span>{((bet?.betValue || 0) * (bet?.odds || 0)).toFixed(2)} $</span>
                </div>
            </Wrapper>
        </Modal>
    );
}

const Wrapper = styled.div`
    &.bet-details {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 20px 20px 20px;
    }
    .team-versus {
        text-transform: uppercase;
        font-weight: 500;
        letter-spacing: .05em;
        font-size: 14px;
        margin-bottom: 20px;
        text-align: center;
    }
    .team-choice {
        margin: 20px 0;
        align-items: center;
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
    .bet-detail {
        display: flex;
        padding: 0 20px;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        margin: 10px 0;
        font-weight: 500;
        span:last-child {
            color: var(--green);
            font-size: 18px;
        }
    }
`;

export default BetDetailModal;