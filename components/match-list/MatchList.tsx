import React, { useState } from 'react';
import styled from 'styled-components';
import { Bet, Match, Team } from '../../model/Model';
import BetDetailModal from '../bet-detail/BetDetail';
import BetModal from '../bet-modal/BetModal';
import BetSpinner from '../form/BetSpinner';
import Modal from '../modal/Modal';
import MatchRow from './MatchRow';

export interface MatchListProps {
    className?: string;
    tableHeader: string;
    matches: Match[];
    userBets?: any[];
    matchDetailPath?: string;
    onPostBet: Function;
}

const MatchList: React.FC<MatchListProps> = ({
    className='',
    tableHeader,
    matches=[],
    matchDetailPath,
    onPostBet,
    userBets
}) => {

    const [modalVisible, setModalVisible] = useState<Boolean>(false);
    const [betDetailVisible, setBetDetailVisible] = useState<boolean>(false);
    const [selectedMatch, setSelectedMatch] = useState<Match>();
    const [selectedTeam, setSelectedTeam] = useState<Team | undefined>();
    const [betModalValue, setBetModalValue] = useState<number>(0);
    const [selectedBet, setSelectedBet] = useState<Bet>();

    const OpenModal = (match: Match, selectedTeam: any, betModalValue=0) => {
        if(!BetAlreadyPlaced(match)) {
            setSelectedMatch(match);
            setModalVisible(true);
            setSelectedTeam(selectedTeam);
            setBetModalValue(betModalValue);
        }
    }

    const BetAlreadyPlaced = (match: Match) => {
        const _bet = userBets?.filter((bet: Bet) => bet.match?.id === match.id);
        if(_bet && _bet.length > 0) {
            setSelectedBet(_bet[0]);
            setBetDetailVisible(_bet[0]);
            return true;
        } return false;
    }

    const CloseModal = (event: any) => {
        setModalVisible(false);
    } 

    const CloseDetailModal = (event: any) => {
        setBetDetailVisible(false);
    }

    return (
        <Wrapper className={["match-list", className].join(' ')}>
            <div className="match-table-header">
                <span>{tableHeader}</span>
            </div>
            {matches.map((match) => {
                return <MatchRow userBets={userBets} onOpenModal={OpenModal} key={match.id} className="match-table-row" matchDetailUrl={`${matchDetailPath}/${match.id}`} match={match}/>
            })}
            <BetDetailModal bet={selectedBet} show={betDetailVisible} onClose={CloseDetailModal} />
            <BetModal defaultValue={betModalValue} onSubmit={onPostBet} onClose={CloseModal} selectedTeam={selectedTeam} match={selectedMatch} show={modalVisible} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.match-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .match-table-row,
    .match-table-header {
        width: 100%;
    }
    .match-table-header {
        background-color: var(--dark-gray);
        height: 45px;
        color: white;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        padding-left: 15px;
    }
`;

export default MatchList;