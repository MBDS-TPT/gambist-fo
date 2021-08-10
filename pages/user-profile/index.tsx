import { GetServerSideProps } from "next";
import React, { useState } from "react";
import styled from "styled-components";
import Page from "../../components/page-wrapper/Page";
import { AuthService } from "../../services/auth/auth.service";
import { useEffect } from "react";
import SectionTitle from "../../components/section-title/SectionTitle";
import FormatUtil from "../../utils/format.util";
import EditProfile from "../../components/edit-profile/EditProfile";
import ProgressCardWidget from "../../components/card-widget/ProgressCardWidget";
import { useContext } from "react";
import UIContext from "../../components/ui-context/UIContext";

interface PageProps {
    
}

const ProfilePage = (props: PageProps) => {

    const {
        
    } = props;

    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();
    const [userInfos, setUserInfos] = useState<any>();
    const [balance, setBalance] = useState<number>(500000);
    const appContext = useContext(UIContext);

    useEffect(() => {
        setUserInfos(AuthService.getUserInfosFromLS());
        setBalance(AuthService.getUserBalance());
    }, []);

    return (
        <Wrapper>
            <Page>
                <div className="profile-section">
                    <SectionTitle title="Balance" />
                    <span className="balance">{FormatUtil.formatCurrency(balance)} {appContext?.currency}</span>
                </div>
                <div className="profile-section">
                    <SectionTitle title="User infos" />
                    <EditProfile 
                        userInfos={userInfos}
                        onSubmit={() => {}}
                        />
                </div>
                <div className="profile-section">
                    <SectionTitle title="Statistics" />
                    <div className="bet-count-stat">
                        <ProgressCardWidget
                            className="bet-stat" 
                            value={100}
                            color={"var(--gray)"}
                            label="TOTAL BET"
                        />
                        <ProgressCardWidget 
                            className="bet-stat"
                            value={25}
                            color={"var(--green)"}
                            label="WON BETS"
                        />
                        <ProgressCardWidget 
                            className="bet-stat"
                            value={50}
                            color={"var(--red)"}
                            label="LOST BETS"
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
    }
    .bet-stat {
        margin: 10px;
    }
`;


export const getServerProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            statistics: {}
        }
    }
}

export default ProfilePage;