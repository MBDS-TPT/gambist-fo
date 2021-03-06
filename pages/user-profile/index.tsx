import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Page from "../../components/page-wrapper/Page";
import { AuthService } from "../../services/auth/auth.service";
import SectionTitle from "../../components/section-title/SectionTitle";
import FormatUtil from "../../utils/format.util";
import EditProfile from "../../components/edit-profile/EditProfile";
import ProgressCardWidget from "../../components/card-widget/ProgressCardWidget";
import { useContext } from "react";
import UIContext from "../../components/ui-context/UIContext";
import { UserService } from "../../services/user/user.service";
import Button from "../../components/form/Button";
import Modal from "../../components/modal/Modal";
import RechargeAccountForm from "../../components/recharge-account-form/RechargeAccountForm";
import { BetService } from "../../services/bet/bet.service";

interface PageProps {
    statistics: any
}

const ProfilePage = (props: PageProps) => {

    const {
        statistics
    } = props;

    const [editProfilMessage, setEditProfilMessage] = useState<any>();
    const [editPasswordMessage, setEditPasswordMessage] = useState<any>();
    const [rechargeAccountMessage, setRechargeAccountMessage] = useState<any>();
    const [userInfos, setUserInfos] = useState<any>(null);
    const [balance, setBalance] = useState<number>(500000);
    const [showRechargeModal, setShowRechargeModal] = useState<boolean>();

    const [totalWonBet, setTotalWonBet] = useState(0);
    const [totalLostBet, setTotalLostBet] = useState(0);
    const [totalBet, setTotalBet] = useState(0);
    
    const appContext = useContext(UIContext);


    useEffect(() => {
        setUserInfos(AuthService.getUserInfosFromLS());
        setBalance(AuthService.getUserBalance());
        BetService.getUserBetStat()
        .then((res) => {
            setTotalWonBet(res.data.won);
            setTotalLostBet(res.data.lost);
            setTotalBet(res.data.won+res.data.lost)
        })
        .catch((err) => {
            console.error(err)
        });
    }, []);

    const onChangePassword = async (password: string, newPassword: string) => {
        return await UserService.changePassword(password, newPassword, (res)=>{
            if(res.message === 'Success') {
                setEditPasswordMessage(<p style={{color: 'var(--green)'}}>Change done with success!</p>);
            } else {
                setEditPasswordMessage(<p style={{color: 'var(--red)'}}>{res.message}</p>);
            }
        });
    }   

    const onEditProfil = async (firstname: string, lastname: string) => {
        return await UserService.editProfil(firstname, lastname, (res)=>{
            if(res.message === 'Success') {
                setEditProfilMessage(<p style={{color: 'var(--green)'}}>Change done with success!</p>);
            } else {
                setEditProfilMessage(<p style={{color: 'var(--red)'}}>{res.message}</p>);
            }
        });
    }

    const onRecharcheAccount = async (password: string, montant: number) => {
        return await UserService.creditAccount(password, montant, (res)=>{
            if(res.message === 'Success') {
                setBalance(res.data.bankBalance);
                setRechargeAccountMessage(<p style={{color: 'var(--green)'}}>Account recharged with success!</p>);
            } else {
                setRechargeAccountMessage(<p style={{color: 'var(--red)'}}>{res.message}</p>);
            }
        })

    }

    return (
        <Wrapper>
            <Page>
                <div className="profile-section">
                    <SectionTitle title="Balance" />
                    <Modal title="Recharge account" show={showRechargeModal} onClose={() => {setShowRechargeModal(false)}}>
                        <RechargeAccountForm onSubmit={onRecharcheAccount} message={rechargeAccountMessage} />
                    </Modal>
                    <div className="account-info">
                        <Button value="Recharge" onClick={() => {setShowRechargeModal(true)}} />
                        <span className="balance">{FormatUtil.formatCurrency(balance)} {appContext?.currency}</span>
                    </div>
                </div>
                <div className="profile-section">
                    <SectionTitle title="User infos" />
                    <EditProfile 
                        onEditProfile={onEditProfil}
                        onChangePassword={onChangePassword}
                        userInfos={userInfos}
                        editProfilMessage={editProfilMessage}
                        editPasswordMessage={editPasswordMessage}
                        />
                </div>
                <div className="profile-section">
                    <SectionTitle title="Statistics" />
                    <div className="bet-count-stat">
                        {/* <ProgressCardWidget
                            className="bet-stat" 
                            value={totalBet}
                            color={"var(--gray)"}
                            label="TOTAL BET"
                            total={totalBet}
                        /> */}
                        <ProgressCardWidget 
                            className="bet-stat"
                            value={totalWonBet}
                            color={"var(--green)"}
                            label="WON BETS"
                            total={totalBet}
                        />
                        <ProgressCardWidget 
                            className="bet-stat"
                            value={totalLostBet}
                            color={"var(--red)"}
                            label="LOST BETS"
                            total={totalBet}
                        />
                    </div>
                </div>
            </Page>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    .balance {
        display: block;
        text-align: right;
        width: 100%;
        font-weight: 600;
        font-size: 22px;
    }
    .bet-count-stat {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .bet-stat {
        margin: 10px;
    }
    .account-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .btn {
            margin-top: -5px;
        }
    }
`;


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            statistics: {}
        }
    }
}

export default ProfilePage;