import React from 'react';
import styled from 'styled-components';
import { Bet } from '../../model/Model';
import BetListHeader from './BetListHeader';
import BetListRow from './BetListRow';

export interface BetListProps {
    className?: string;
    bets: Bet[];
    tableTitle?: string;
}

const BetList:React.FC<BetListProps> = ({
    className,
    bets,
    tableTitle=''
}) => {


    return (
        <Wrapper className={["bet-list", className].join(' ')} >
            <div className="table-title">
                <span>{tableTitle}</span>
            </div>
            <BetListHeader/>
            {bets.length==0 && (
                <div className="no-content">
                    No content
                </div>
            )}
            {bets.map((bet) => {
                return (
                    <BetListRow key={bet.id} bet={bet} className="bet-table-row"/>
                )
            })}
        </Wrapper>
    );
}

const Wrapper = styled.div`
    &.bet-list {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .bet-table-row,
    .bet-table-header {
        width: 100%;
    }
    .bet-table-header {
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
    .no-content {
        color: var(--dark);
        font-weight: 700;
        display: flex;
        justify-content: center;
        padding: 30px;
        font-size: 30px;
    }
    .table-title {
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

export default BetList;